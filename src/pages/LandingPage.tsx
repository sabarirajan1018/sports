import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Gamepad2, Users, Wallet, Shield, Zap, Gift, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/layout/Footer';

const features = [
  {
    icon: Trophy,
    title: 'Sportsbook',
    description: 'Bet on your favorite sports with competitive odds across football, cricket, basketball, tennis, and esports.',
    color: 'emerald',
  },
  {
    icon: Gamepad2,
    title: 'Casino',
    description: 'Experience world-class casino games from top providers including slots, roulette, blackjack, and live dealers.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Live Betting',
    description: 'Place bets in real-time with dynamic odds and live match tracking for an immersive experience.',
    color: 'red',
  },
  {
    icon: Wallet,
    title: 'Secure Wallet',
    description: 'Multiple payment options including UPI, crypto, and bank transfers with instant deposits and withdrawals.',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Admin Control',
    description: 'Comprehensive admin dashboard with user management, risk monitoring, and detailed analytics.',
    color: 'amber',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Fast and reliable payouts processed within 24 hours for verified accounts.',
    color: 'cyan',
  },
];

const stats = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Daily Bets', value: '100K+' },
  { label: 'Sports Covered', value: '30+' },
  { label: 'Casino Games', value: '500+' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5NzUiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjMiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjMxIiByPSIzIi8+PGNpcmNsZSBjeD0iMzEiIGN5PSIxNSIgcj0iMyIvPjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjMiLz48Y2lyY2xlIGN4PSI1NyIgY3k9IjU3IiByPSIzIi8+PGNpcmNsZSBjeD0iMzEiIGN5PSIzMSIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm mb-8">
            <Star className="w-4 h-4" />
            Demo Platform - No Real Money
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Next-Gen{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Sportsbook
            </span>
            {' '} & Casino Platform
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Experience premium sports betting and casino entertainment with cutting-edge features,
            lightning-fast transactions, and world-class gaming providers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="lg">View Demo</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A complete betting and gaming platform with all the features you need for an exceptional experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all group"
                >
                  <div className={`w-14 h-14 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/50 to-cyan-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Gift className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome Bonus Up To $500
          </h2>
          <p className="text-slate-300 mb-8">
            Get 100% bonus on your first deposit and start your winning journey today!
          </p>
          <Link to="/register">
            <Button size="lg">Claim Your Bonus</Button>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-amber-400 bg-amber-400/10 px-6 py-4 rounded-xl">
            <Shield className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm text-center">
              <strong>Important:</strong> This is a demo platform for software showcase only.
              No real money is involved. This is not a real gambling site.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
