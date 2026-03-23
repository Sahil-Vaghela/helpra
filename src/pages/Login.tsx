import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => 
      (u.email === identifier || u.username === identifier) && u.password === password
    );

    if (foundUser) {
      setSuccess(true);
      login({ username: foundUser.username, email: foundUser.email });
      setTimeout(() => {
        // If user was redirected here from a protected route, go back there
        const from = (location.state as any)?.from?.pathname || '/profile';
        navigate(from, { replace: true });
      }, 1500);
    } else {
      setError('Invalid username/email or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-soft border border-border p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dark-text mb-2">Welcome Back</h2>
          <p className="text-secondary-text">Log in to access your assistance dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm">
            <CheckCircle2 size={18} /> Login successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              required
              placeholder="Username or Email"
              className="input-field pl-12"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              required
              placeholder="Password"
              className="input-field pl-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 mt-2">
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-secondary-text text-sm">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}
