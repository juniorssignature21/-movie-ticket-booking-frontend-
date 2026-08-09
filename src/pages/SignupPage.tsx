import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../api/client';

export const SignupPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register({ email, password, first_name: firstName, last_name: lastName });
      navigate('/', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not create your account.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <div className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-white mb-2">Create your account</h1>
        <p className="text-gray-400 text-sm mb-8">Join 9jaCine to book tickets in seconds.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">First name</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-300">Last name</label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors"
              placeholder="At least 8 characters"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/95 disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm tracking-wide transition-all duration-200 mt-2"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </PageShell>
  );
};

export default SignupPage;
