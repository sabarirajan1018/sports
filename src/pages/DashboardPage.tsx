import { Link } from 'react-router-dom';
import {
  Trophy,
  Gamepad2,
  Wallet,
  User,
  ArrowRight,
  TrendingUp,
  Gift,
  Flame,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatsCard } from '../components/ui/Stats';
import { useAuth } from '../contexts/AuthContext';
import { recentBets } from '../data/bets';
import { promotions } from '../data/promotions';
import { casinoGames } from '../data/casino';

const quickLinks = [
  { path: '/sportsbook', label: 'Sportsbook', icon: Trophy, color: 'emerald' },
  { path: '/live', label: 'Live Betting', icon: Flame, color: 'red' },
  { path: '/casino', label: 'Casino', icon: Gamepad2, color: 'purple' },
  { path: '/wallet', label: 'Wallet', icon: Wallet, color: 'blue' },
  { path: '/promotions', label: 'Promotions', icon: Gift, color: 'amber' },
  { path: '/profile', label: 'Profile', icon: User, color: ' slate' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const activePromotions = promotions.filter((p) => p.isActive).slice(0, 2);
  const recommendedGames = casinoGames.filter((g) => g.isPopular).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-emerald-100">
              Ready to place your next winning bet?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <p className="text-emerald-100 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-white">${user?.balance.toFixed(2)}</p>
            </div>
            <Link to="/wallet">
              <Button variant="secondary" size="lg">
                <Wallet className="w-5 h-5" />
                Deposit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Active Bets"
          value="3"
          icon={<Trophy className="w-5 h-5" />}
          trend="up"
          change="+2 today"
        />
        <StatsCard
          title="Total Wins"
          value="$1,250"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
          change="+15%"
        />
        <StatsCard
          title="Pending Bonus"
          value="$200"
          icon={<Gift className="w-5 h-5" />}
          trend="neutral"
        />
        <StatsCard
          title="Last Week Profit"
          value="+$450"
          icon={<Flame className="w-5 h-5" />}
          trend="up"
          change="+8.5%"
        />
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                >
                  <div className={`w-12 h-12 bg-${link.color}-500/10 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${link.color}-400`} />
                  </div>
                  <span className="text-sm text-slate-300">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bets */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Bets</h2>
            <Link to="/sportsbook" className="text-emerald-400 text-sm hover:text-emerald-300">
              View All
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-slate-700">
              {recentBets.slice(0, 5).map((bet) => (
                <div key={bet.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      bet.status === 'won' ? 'bg-emerald-500/10' : bet.status === 'lost' ? 'bg-red-500/10' : 'bg-slate-700'
                    }`}>
                      {bet.type === 'sportsbook' ? (
                        <Trophy className={`w-5 h-5 ${bet.status === 'won' ? 'text-emerald-400' : 'text-slate-400'}`} />
                      ) : (
                        <Gamepad2 className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white truncate max-w-xs">{bet.selection}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(bet.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${bet.stake}</p>
                    <Badge
                      variant={bet.status === 'won' ? 'success' : bet.status === 'lost' ? 'danger' : bet.status === 'pending' ? 'warning' : 'default'}
                      size="sm"
                    >
                      {bet.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Active Promotions */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Promotions</h2>
            <Link to="/promotions" className="text-emerald-400 text-sm hover:text-emerald-300">
              View All
            </Link>
          </CardHeader>
          <CardBody className="space-y-4">
            {activePromotions.map((promo) => (
              <div key={promo.id} className="bg-slate-700/30 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="info">{promo.type}</Badge>
                  <span className="text-emerald-400 font-bold">+${promo.bonusAmount}</span>
                </div>
                <h3 className="text-white font-medium mb-1">{promo.title}</h3>
                <p className="text-slate-400 text-xs">{promo.description}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Recommended Games */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Popular Games</h2>
          <Link to="/casino" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedGames.map((game) => (
              <div key={game.id} className="bg-slate-700/30 rounded-xl overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Gamepad2 className="w-10 h-10 text-slate-600" />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{game.name}</p>
                  <p className="text-slate-400 text-xs">{game.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
