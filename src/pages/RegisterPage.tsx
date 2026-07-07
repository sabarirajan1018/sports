import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const success = await register(email, username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join and start your winning journey</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              icon={<User className="w-5" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              icon={<Mail className="w-5" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                icon={<Lock className="w-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
              </button>
            </div>

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              icon={<Lock className="w-5" />}
              required
            />

            <label className="flex items-start gap-2">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 mt-1" required />
              <span className="text-sm text-slate-300">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</Link>
              </span>
            </label>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
