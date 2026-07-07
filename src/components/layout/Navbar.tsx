import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  User,
  Wallet,
  LogOut,
  Settings,
  Home,
  Gamepad2,
  Trophy,
  Gift,
  Users,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/sportsbook', label: 'Sports', icon: Trophy },
    { path: '/live', label: 'Live', icon: Users, badge: 'LIVE' },
    { path: '/casino', label: 'Casino', icon: Gamepad2 },
    { path: '/promotions', label: 'Promos', icon: Gift },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">Bet<span className="text-emerald-400">Pro</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="live" size="sm">{item.badge}</Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/wallet"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-medium">${user?.balance.toFixed(2)}</span>
                </Link>

                <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-white text-sm">{user?.username}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4" />
                        Settings
                      </Link>
                      <Link
                        to="/wallet"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Wallet className="w-4" />
                        Wallet
                      </Link>
                      <hr className="my-1 border-slate-700" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 w-full"
                      >
                        <LogOut className="w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <button
                  className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-slate-400'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
