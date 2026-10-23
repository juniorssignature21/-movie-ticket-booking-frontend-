import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { forgotPassword, resetPassword } from '../api/auth';
import { getApiErrorMessage } from '../api/client';

export const PasswordRecoveryPage: React.FC<{ reset?: boolean }> = ({ reset = false }) => {
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const result = reset
        ? await resetPassword({ uid: params.get('uid') ?? '', token: params.get('token') ?? '', new_password: password })
        : await forgotPassword(email);
      setMessage(result.detail);
    } catch (err) { setError(getApiErrorMessage(err, reset ? 'Could not reset your password.' : 'Could not send reset instructions.')); }
    finally { setBusy(false); }
  };

  return <PageShell><div className="max-w-md mx-auto px-6 py-12">
    <h1 className="text-3xl font-extrabold text-white mb-2">{reset ? 'Choose a new password' : 'Reset your password'}</h1>
    <p className="text-gray-400 text-sm mb-8">{reset ? 'Enter a new password for your account.' : 'We’ll email you a link to choose a new password.'}</p>
    <form onSubmit={submit} className="flex flex-col gap-4">
      {reset ? <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-300">New password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" /></label> : <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-300">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-card border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" /></label>}
      {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}{message && <p role="status" className="text-accentGreen text-sm">{message}</p>}
      <button disabled={busy} className="bg-primary disabled:opacity-60 text-white font-bold py-3 rounded-full">{busy ? 'Please wait…' : reset ? 'Update password' : 'Send reset link'}</button>
    </form>
    <p className="text-center mt-6"><Link to="/login" className="text-primary text-sm hover:underline">Back to login</Link></p>
  </div></PageShell>;
};

export default PasswordRecoveryPage;
