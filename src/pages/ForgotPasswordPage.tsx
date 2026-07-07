import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-slate-400 mb-6">
              We've sent a password reset link to <span className="text-white">{email}</span>
            </p>
            <p className="text-slate-400 text-sm mb-6">
              This is a demo platform. In a real application, you would receive an email with reset instructions.
            </p>
            <Link to="/login">
              <Button fullWidth>
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-slate-400">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              icon={<Mail className="w-5" />}
              required
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
