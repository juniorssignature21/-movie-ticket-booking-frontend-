import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { updateMe } from '../api/auth';
import { getApiErrorMessage } from '../api/client';

export const ProfilePage: React.FC = () => {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    try {
      await updateMe({ first_name: firstName, last_name: lastName, phone_number: phoneNumber });
      await refreshProfile();
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not update your profile.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <PageShell>
      <div className="px-6 md:px-12 lg:px-24 py-6 pb-16">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <h1 className="section-title">My Profile</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">Email</label>
              <input
                disabled
                value={user?.email ?? ''}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-300">Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">Phone number</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
              />
            </div>

            {message && <p className="text-accentGreen text-sm">{message}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/95 disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm tracking-wide transition-all duration-200 mt-2"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 font-semibold text-sm text-center mt-2"
          >
            Log Out
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default ProfilePage;
