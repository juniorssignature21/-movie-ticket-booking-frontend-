import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { fetchMovies } from '../api/movies';
import { fetchShowtimesForMovie, fetchShowtimeSeats } from '../api/cinemas';
import { createFrontdeskBooking } from '../api/bookings';
import { getApiErrorMessage } from '../api/client';
import type { MovieListItem } from '../types/movie';
import type { Seat, Showtime } from '../types/cinema';
import type { Booking } from '../types/booking';

const SEAT_TYPE_STYLES: Record<string, string> = {
  regular: 'border-white/20 text-gray-300',
  premium: 'border-blue-500/40 text-blue-300',
  vip: 'border-yellow-500/40 text-yellow-300',
};

export const FrontDeskPage: React.FC = () => {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [selectedMovieSlug, setSelectedMovieSlug] = useState('');

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null);

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'pos'>('cash');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchMovies({ status: 'now_showing', page_size: 50 }).then((data) => setMovies(data.results));
  }, []);

  useEffect(() => {
    setSelectedShowtimeId(null);
    setSeats([]);
    setSelectedSeats(new Set());
    if (!selectedMovieSlug) {
      setShowtimes([]);
      return;
    }
    fetchShowtimesForMovie(selectedMovieSlug).then(setShowtimes);
  }, [selectedMovieSlug]);

  useEffect(() => {
    setSelectedSeats(new Set());
    if (!selectedShowtimeId) {
      setSeats([]);
      return;
    }
    fetchShowtimeSeats(selectedShowtimeId).then(setSeats);
  }, [selectedShowtimeId]);

  const toggleSeat = (seat: Seat) => {
    if (seat.is_booked || !seat.is_active) return;
    setSelectedSeats((prev) => {
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

  const total = seats.filter((s) => selectedSeats.has(s.id)).reduce((sum, s) => sum + Number(s.price), 0);

  const resetForm = () => {
    setSelectedMovieSlug('');
    setSelectedShowtimeId(null);
    setSeats([]);
    setSelectedSeats(new Set());
    setEmail('');
    setFirstName('');
    setLastName('');
    setPaymentMethod('cash');
    setCompletedBooking(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!selectedShowtimeId || selectedSeats.size === 0 || !email) return;
    setError('');
    setIsSubmitting(true);
    try {
      const booking = await createFrontdeskBooking({
        showtime_id: selectedShowtimeId,
        seat_ids: Array.from(selectedSeats),
        customer_email: email,
        customer_first_name: firstName,
        customer_last_name: lastName,
        payment_method: paymentMethod,
      });
      setCompletedBooking(booking);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not complete this booking.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedBooking) {
    return (
      <PageShell>
        <div className="px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-lg mx-auto flex flex-col items-center text-center gap-4">
            <CheckCircle2 size={56} className="text-accentGreen" />
            <h1 className="text-2xl font-extrabold text-white">Booking Confirmed</h1>
            <p className="text-gray-400">
              {completedBooking.customer_name} · {completedBooking.showtime.movie_title} ·{' '}
              {completedBooking.seats.length} seat(s) · ₦{Number(completedBooking.total_amount).toLocaleString()}
            </p>
            <p className="text-white font-mono text-sm">{completedBooking.reference}</p>
            <button
              onClick={resetForm}
              className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-200 mt-4"
            >
              New Booking
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h1 className="section-title">Front Desk — Book Onsite</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">Movie</label>
              <select value={selectedMovieSlug} onChange={(e) => setSelectedMovieSlug(e.target.value)} className="input">
                <option value="">Select a movie...</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.slug}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">Showtime</label>
              <select
                value={selectedShowtimeId ?? ''}
                onChange={(e) => setSelectedShowtimeId(e.target.value ? Number(e.target.value) : null)}
                disabled={!selectedMovieSlug}
                className="input disabled:opacity-50"
              >
                <option value="">Select a showtime...</option>
                {showtimes.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.screen.theater.name} · {new Date(st.start_time).toLocaleString()} · {st.format}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedShowtimeId && seats.length > 0 && (
            <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6">
              <span className="text-gray-500 text-xs uppercase tracking-widest">Select Seats</span>
              <div className="flex flex-col gap-2">
                {Object.entries(rows).map(([rowLabel, rowSeats]) => (
                  <div key={rowLabel} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-4">{rowLabel}</span>
                    <div className="flex gap-1.5">
                      {rowSeats
                        .sort((a, b) => a.number - b.number)
                        .map((seat) => {
                          const isSelected = selectedSeats.has(seat.id);
                          const disabled = seat.is_booked || !seat.is_active;
                          return (
                            <button
                              key={seat.id}
                              type="button"
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
              <p className="text-white font-bold">
                {selectedSeats.size} seat(s) · ₦{total.toLocaleString()}
              </p>
            </div>
          )}

          {selectedSeats.size > 0 && (
            <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-white font-bold">Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-300">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="customer@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-300">Payment Method</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'pos')} className="input">
                    <option value="cash">Cash</option>
                    <option value="pos">POS / Card</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-300">First name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-300">Last name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email}
                className="bg-primary hover:bg-primary/95 disabled:opacity-60 text-white font-bold py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
              >
                {isSubmitting ? 'Completing booking...' : `Confirm & Collect Payment — ₦${total.toLocaleString()}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default FrontDeskPage;
