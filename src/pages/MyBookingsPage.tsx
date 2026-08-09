import React, { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { cancelBooking, fetchMyBookings } from '../api/bookings';
import type { Booking } from '../types/booking';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-accentGreen/10 text-accentGreen border-accentGreen/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingRef, setCancellingRef] = useState<string | null>(null);

  const loadBookings = () => {
    setIsLoading(true);
    fetchMyBookings()
      .then((data) => setBookings(data.results))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (reference: string) => {
    setCancellingRef(reference);
    try {
      await cancelBooking(reference);
      loadBookings();
    } finally {
      setCancellingRef(null);
    }
  };

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <h1 className="section-title">My Bookings</h1>

          {isLoading ? (
            <p className="text-gray-400">Loading your bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-400">You haven't made any bookings yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <div key={booking.reference} className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-white font-bold text-lg">{booking.showtime.movie_title}</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {booking.showtime.screen.theater.name} ·{' '}
                        {new Date(booking.showtime.start_time).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border capitalize ${STATUS_STYLES[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                    {booking.seats.map((s) => (
                      <span key={s.seat.id} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                        {s.seat.row_label}
                        {s.seat.number} · {s.seat.seat_type}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white font-extrabold">₦{Number(booking.total_amount).toLocaleString()}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs font-mono">{booking.reference}</span>
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancel(booking.reference)}
                          disabled={cancellingRef === booking.reference}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold disabled:opacity-50"
                        >
                          {cancellingRef === booking.reference ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default MyBookingsPage;
