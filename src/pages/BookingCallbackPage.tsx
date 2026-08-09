import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import PageShell from '../components/PageShell';
import { verifyPayment } from '../api/bookings';
import { getApiErrorMessage } from '../api/client';
import type { Booking } from '../types/booking';

export const BookingCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') ?? searchParams.get('trxref');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!reference) {
      setError('Missing payment reference.');
      setIsLoading(false);
      return;
    }
    verifyPayment(reference)
      .then(setBooking)
      .catch((err) => setError(getApiErrorMessage(err, 'Could not verify payment.')))
      .finally(() => setIsLoading(false));
  }, [reference]);

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-lg mx-auto flex flex-col items-center text-center gap-4">
          {isLoading ? (
            <p className="text-gray-400">Verifying your payment...</p>
          ) : error || !booking ? (
            <>
              <XCircle size={56} className="text-red-500" />
              <h1 className="text-2xl font-extrabold text-white">Payment Verification Failed</h1>
              <p className="text-gray-400">{error || 'We could not confirm this payment.'}</p>
            </>
          ) : booking.status === 'confirmed' ? (
            <>
              <CheckCircle2 size={56} className="text-accentGreen" />
              <h1 className="text-2xl font-extrabold text-white">Booking Confirmed!</h1>
              <p className="text-gray-400">
                Your seats for <span className="text-white font-semibold">{booking.showtime.movie_title}</span> are
                booked. Reference: <span className="text-white font-mono">{booking.reference}</span>
              </p>
            </>
          ) : (
            <>
              <XCircle size={56} className="text-red-500" />
              <h1 className="text-2xl font-extrabold text-white">Payment Not Successful</h1>
              <p className="text-gray-400">Your booking was not confirmed. Please try again.</p>
            </>
          )}

          <Link
            to="/bookings"
            className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-200 mt-4"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default BookingCallbackPage;
