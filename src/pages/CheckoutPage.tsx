import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { fetchShowtime } from '../api/cinemas';
import { createBooking } from '../api/bookings';
import { getApiErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Showtime } from '../types/cinema';

export const CheckoutPage: React.FC = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const seatIds = (location.state as { seatIds?: number[] } | null)?.seatIds ?? [];

  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!showtimeId) return;
    fetchShowtime(Number(showtimeId)).then(setShowtime);
  }, [showtimeId]);

  useEffect(() => {
    if (showtimeId && seatIds.length === 0) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = async () => {
    if (!showtimeId) return;
    setError('');
    setIsSubmitting(true);
    try {
      const booking = await createBooking({ showtime_id: Number(showtimeId), seat_ids: seatIds });
      window.location.href = booking.authorization_url;
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not start checkout. Please try again.'));
      setIsSubmitting(false);
    }
  };

  if (!showtime) {
    return (
      <PageShell>
        <p className="text-center text-gray-400 py-20">Loading checkout...</p>
      </PageShell>
    );
  }

  const pricePerSeat = Number(showtime.price_regular);
  const estimatedTotal = seatIds.length * pricePerSeat;

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-lg mx-auto flex flex-col gap-6">
          <h1 className="section-title">Checkout</h1>

          <div className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
            <h2 className="text-white font-bold text-lg">{showtime.movie_title}</h2>
            <p className="text-gray-400 text-sm">
              {showtime.screen.theater.name} · {new Date(showtime.start_time).toLocaleString()} · {showtime.format}
            </p>
            <div className="h-px bg-white/5 my-2" />
            <div className="flex justify-between text-sm text-gray-300">
              <span>Seats selected</span>
              <span>{seatIds.length}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <span>Booking for</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between text-white font-extrabold text-lg mt-2">
              <span>Estimated total*</span>
              <span>₦{estimatedTotal.toLocaleString()}</span>
            </div>
            <p className="text-gray-500 text-xs">
              *Final total is calculated per seat type at payment. You'll be redirected to Paystack to complete payment securely.
            </p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleConfirm}
            disabled={isSubmitting || seatIds.length === 0}
            className="bg-primary hover:bg-primary/95 disabled:opacity-60 text-white font-bold py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
          >
            {isSubmitting ? 'Redirecting to payment...' : 'Pay with Paystack'}
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default CheckoutPage;
