import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Trophy,
  Users,
  Gamepad2,
  Wallet,
  Gift,
  User,
  Shield,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/sportsbook', label: 'Sportsbook', icon: Trophy },
    { path: '/live', label: 'Live Betting', icon: Users },
    { path: '/casino', label: 'Casino', icon: Gamepad2 },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/promotions', label: 'Promotions', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/users', label: 'Users', icon: User },
    { path: '/admin/bets', label: 'Bets', icon: Trophy },
    { path: '/admin/transactions', label: 'Transactions', icon: Wallet },
    { path: '/admin/kyc', label: 'KYC Review', icon: Shield },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="m-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
