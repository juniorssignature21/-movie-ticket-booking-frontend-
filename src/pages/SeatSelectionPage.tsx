import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { fetchShowtime, fetchShowtimeSeats } from '../api/cinemas';
import type { Seat, Showtime } from '../types/cinema';

const SEAT_TYPE_STYLES: Record<string, string> = {
  regular: 'border-white/20 text-gray-300',
  premium: 'border-blue-500/40 text-blue-300',
  vip: 'border-yellow-500/40 text-yellow-300',
};

export const SeatSelectionPage: React.FC = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();

  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!showtimeId) return;
    const id = Number(showtimeId);
    setIsLoading(true);
    Promise.all([fetchShowtime(id), fetchShowtimeSeats(id)])
      .then(([st, seatData]) => {
        setShowtime(st);
        setSeats(seatData);
      })
      .finally(() => setIsLoading(false));
  }, [showtimeId]);

  const toggleSeat = (seat: Seat) => {
    if (seat.is_booked || !seat.is_active) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  };

  const rows = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    acc[seat.row_label] = acc[seat.row_label] ? [...acc[seat.row_label], seat] : [seat];
    return acc;
  }, {});

  const total = seats.filter((s) => selected.has(s.id)).reduce((sum, s) => sum + Number(s.price), 0);

  const handleProceed = () => {
    if (!showtimeId || selected.size === 0) return;
    navigate(`/checkout/${showtimeId}`, { state: { seatIds: Array.from(selected) } });
  };

  if (isLoading || !showtime) {
    return (
      <PageShell>
        <p className="text-center text-gray-400 py-20">Loading seats...</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-32">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="section-title mb-2">{showtime.movie_title}</h1>
            <p className="text-gray-400 text-sm">
              {showtime.screen.theater.name} · {new Date(showtime.start_time).toLocaleString()} · {showtime.format}
            </p>
          </div>

          <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col items-center gap-8">
            <div className="w-full max-w-md h-2 bg-white/10 rounded-full mb-2" />
            <span className="text-gray-500 text-xs uppercase tracking-widest -mt-6">Screen</span>

            <div className="flex flex-col gap-2">
              {Object.entries(rows).map(([rowLabel, rowSeats]) => (
                <div key={rowLabel} className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs w-4">{rowLabel}</span>
                  <div className="flex gap-1.5">
                    {rowSeats
                      .sort((a, b) => a.number - b.number)
                      .map((seat) => {
                        const isSelected = selected.has(seat.id);
                        const disabled = seat.is_booked || !seat.is_active;
                        return (
                          <button
                            key={seat.id}
                            disabled={disabled}
                            onClick={() => toggleSeat(seat)}
                            title={`${seat.row_label}${seat.number} · ${seat.seat_type} · ₦${seat.price}`}
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-md border text-[10px] font-bold flex items-center justify-center transition-all duration-150 ${
                              disabled
                                ? 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-primary border-primary text-white scale-110'
                                  : `bg-transparent ${SEAT_TYPE_STYLES[seat.seat_type]} hover:border-primary`
                            }`}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-white/20" /> Regular
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-blue-500/40" /> Premium
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-yellow-500/40" /> VIP
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-primary border border-primary" /> Selected
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-white/5 border border-white/5" /> Taken
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky checkout bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-white/10 px-6 md:px-12 lg:px-24 py-4 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">{selected.size} seat(s) selected</p>
            <p className="text-white text-xl font-extrabold">₦{total.toLocaleString()}</p>
          </div>
          <button
            onClick={handleProceed}
            disabled={selected.size === 0}
            className="bg-primary hover:bg-primary/95 disabled:opacity-40 text-white font-bold px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default SeatSelectionPage;
