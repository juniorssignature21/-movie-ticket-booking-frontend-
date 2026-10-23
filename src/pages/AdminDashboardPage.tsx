import React, { useCallback, useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import { createStaff, fetchAdminBookings, fetchAdminDashboard, fetchAdminUsers } from '../api/admin';
import { getApiErrorMessage } from '../api/client';
import type { AdminDashboard } from '../api/admin';
import type { Booking } from '../types/booking';
import type { User } from '../types/user';

export const AdminDashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<AdminDashboard | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [hasPreviousUsers, setHasPreviousUsers] = useState(false);
  const [hasNextUsers, setHasNextUsers] = useState(false);
  const [hasPreviousBookings, setHasPreviousBookings] = useState(false);
  const [hasNextBookings, setHasNextBookings] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const loadDashboard = useCallback(async (usersPage = 1, bookingsPage = 1) => {
    setIsLoading(true);
    setError('');
    try {
      const [dashboard, userPage, bookingPage] = await Promise.all([
        fetchAdminDashboard(),
        fetchAdminUsers(usersPage),
        fetchAdminBookings(bookingsPage),
      ]);
      setSummary(dashboard);
      setUsers(userPage.results);
      setBookings(bookingPage.results);
      setUserCount(userPage.count);
      setBookingCount(bookingPage.count);
      setHasPreviousUsers(!!userPage.previous);
      setHasNextUsers(!!userPage.next);
      setHasPreviousBookings(!!bookingPage.previous);
      setHasNextBookings(!!bookingPage.next);
      setUserPage(usersPage);
      setBookingPage(bookingsPage);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not load the admin dashboard.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleCreateStaff = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsCreating(true);
    try {
      await createStaff({ email, password, first_name: firstName, last_name: lastName });
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setNotice('Frontdesk account created.');
      setUserPage(1);
      await loadDashboard(1, bookingPage);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not create this staff account.'));
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="section-title">Superadmin Dashboard</h1>
            <p className="text-gray-400 mt-3">Project-wide users, bookings, and successful payment earnings.</p>
          </div>

          {error && <p role="alert" className="text-red-400">{error}</p>}
          {notice && <p role="status" className="text-emerald-400">{notice}</p>}
          {isLoading ? (
            <p className="text-gray-400">Loading dashboard...</p>
          ) : (
            <>
              {summary && (
                <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                  {[
                    ['Total earnings', `₦${Number(summary.total_earnings).toLocaleString()}`],
                    ['Users', summary.user_count],
                    ['Frontdesk staff', summary.staff_count],
                    ['Bookings', summary.booking_count],
                    ['Confirmed', summary.confirmed_booking_count],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-card border border-white/10 rounded-2xl p-5">
                      <p className="text-gray-400 text-sm">{label}</p>
                      <p className="text-white text-2xl font-extrabold mt-2">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              <section className="bg-card border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-5">Add frontdesk staff</h2>
                <form onSubmit={handleCreateStaff} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <input className="input" type="email" required placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  <input className="input" type="password" required minLength={8} placeholder="Temporary password" value={password} onChange={(event) => setPassword(event.target.value)} />
                  <input className="input" placeholder="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                  <input className="input" placeholder="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                  <button className="bg-primary text-white font-bold rounded-xl px-5 py-3 disabled:opacity-60" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create staff'}
                  </button>
                </form>
              </section>

              <section className="bg-card border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <h2 className="text-xl font-bold">All users <span className="text-gray-500 text-sm">({userCount})</span></h2>
                  <div className="flex items-center gap-2">
                    <button disabled={!hasPreviousUsers} onClick={() => void loadDashboard(userPage - 1, bookingPage)} className="px-3 py-1.5 rounded-lg bg-white/5 disabled:opacity-40">Previous</button>
                    <span className="text-gray-400 text-sm">Page {userPage}</span>
                    <button disabled={!hasNextUsers} onClick={() => void loadDashboard(userPage + 1, bookingPage)} className="px-3 py-1.5 rounded-lg bg-white/5 disabled:opacity-40">Next</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-gray-400 border-b border-white/10">
                      <tr><th className="py-3 pr-4">Name</th><th className="py-3 pr-4">Email</th><th className="py-3">Role</th></tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/5">
                          <td className="py-3 pr-4">{`${user.first_name} ${user.last_name}`.trim() || '—'}</td>
                          <td className="py-3 pr-4">{user.email}</td>
                          <td className="py-3 capitalize">{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-card border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <h2 className="text-xl font-bold">All bookings <span className="text-gray-500 text-sm">({bookingCount})</span></h2>
                  <div className="flex items-center gap-2">
                    <button disabled={!hasPreviousBookings} onClick={() => void loadDashboard(userPage, bookingPage - 1)} className="px-3 py-1.5 rounded-lg bg-white/5 disabled:opacity-40">Previous</button>
                    <span className="text-gray-400 text-sm">Page {bookingPage}</span>
                    <button disabled={!hasNextBookings} onClick={() => void loadDashboard(userPage, bookingPage + 1)} className="px-3 py-1.5 rounded-lg bg-white/5 disabled:opacity-40">Next</button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {bookings.map((booking) => (
                    <div key={booking.reference} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-white/5 pb-3">
                      <div>
                        <p className="font-semibold">{booking.customer_name} · {booking.showtime.movie_title}</p>
                        <p className="text-gray-400 text-xs">{booking.customer_email} · {booking.reference}</p>
                      </div>
                      <p className="text-sm capitalize">{booking.status} · ₦{Number(booking.total_amount).toLocaleString()}</p>
                    </div>
                  ))}
                  {bookings.length === 0 && <p className="text-gray-400">No bookings yet.</p>}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default AdminDashboardPage;
