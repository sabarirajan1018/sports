import { useState } from 'react';
import {
  Users,
  Trophy,
  Wallet,
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye,
  Ban,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatsCard } from '../components/ui/Stats';
import {
  adminStats,
  usersList,
  riskAlerts,
  recentTransactions,
  dashboardStats,
  sportsActivity,
  monthlyRevenue,
} from '../data/admin';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'kyc' | 'transactions' | 'alerts'>('overview');

  const getRiskBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="danger">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      default:
        return <Badge variant="info">Low</Badge>;
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'unusual-betting':
        return 'Unusual Betting';
      case 'high-winnings':
        return 'High Winnings';
      case 'multiple-accounts':
        return 'Multi-Account';
      case 'collusion':
        return 'Collusion';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Monitor and manage platform activity</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon={<Users className="w-5 h-5" />}
        />
        <StatsCard
          title="Total Bets"
          value={adminStats.totalBets.toLocaleString()}
          change="+8.2%"
          trend="up"
          icon={<Trophy className="w-5 h-5" />}
        />
        <StatsCard
          title="Revenue"
          value={`$${(adminStats.totalRevenue / 1000000).toFixed(2)}M`}
          change="+18.3%"
          trend="up"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatsCard
          title="Pending KYC"
          value={adminStats.pendingKyc.toString()}
          change="-5.2%"
          trend="down"
          icon={<Shield className="w-5 h-5" />}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
          <div key={stat.name} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">{stat.name}</span>
              <span className={stat.trend === 'up' ? 'text-emerald-400 text-xs' : 'text-red-400 text-xs'}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'overview' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Activity className="w-4 h-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Users
        </button>
        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'kyc' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          KYC Review
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'transactions' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Wallet className="w-4 h-4 inline mr-2" />
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
            activeTab === 'alerts' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <AlertTriangle className="w-4 h-4 inline mr-2" />
          Risk Alerts
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {riskAlerts.filter((a) => !a.resolved).length}
          </span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
            </CardHeader>
            <CardBody>
              <div className="h-64 flex items-end gap-2">
                {monthlyRevenue.map((item) => {
                  const height = ((item.revenue / 1250000) * 100).toFixed(0);
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-slate-400">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Sports Activity */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Sports Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {sportsActivity.map((sport) => {
                  const percent = ((sport.revenue / 450000) * 100).toFixed(0);
                  return (
                    <div key={sport.sport}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{sport.sport}</span>
                        <span className="text-emerald-400">${(sport.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-slate-700">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">{tx.user}</p>
                      <p className="text-slate-500 text-xs">{tx.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={tx.type === 'deposit' ? 'success' : 'warning'}>{tx.type}</Badge>
                      <span className={tx.type === 'deposit' ? 'text-emerald-400' : 'text-amber-400'}>
                        ${tx.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Pending Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Pending Items</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-amber-400" />
                  <div>
                    <p className="text-white font-medium">Pending KYC Reviews</p>
                    <p className="text-slate-400 text-sm">Users awaiting verification</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-amber-400">{adminStats.pendingKyc}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Pending Withdrawals</p>
                    <p className="text-slate-400 text-sm">Awaiting processing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-400">{adminStats.pendingWithdrawals}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-white font-medium">Active Matches</p>
                    <p className="text-slate-400 text-sm">Currently accepting bets</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-emerald-400">{adminStats.activeMatches}</span>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">User Management</h3>
          </CardHeader>
          <CardBody className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Balance</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">KYC</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Last Active</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{user.username.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-white">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300 text-sm">{user.email}</td>
                    <td className="px-4 py-4 text-emerald-400 font-medium">${user.balance.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <Badge variant={user.kycStatus === 'verified' ? 'success' : user.kycStatus === 'pending' ? 'warning' : 'danger'}>
                        {user.kycStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-sm">{user.lastActive}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      {activeTab === 'kyc' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">KYC Review Queue</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {usersList.filter((u) => u.kycStatus === 'pending').map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{user.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-slate-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="warning">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Review
                    </Badge>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}

              {usersList.filter((u) => u.kycStatus === 'pending').length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No pending KYC reviews
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'transactions' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Transaction Monitoring</h3>
          </CardHeader>
          <CardBody className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-4 text-white">{tx.user}</td>
                    <td className="px-4 py-4">
                      <Badge variant={tx.type === 'deposit' ? 'success' : 'warning'}>{tx.type}</Badge>
                    </td>
                    <td className={`px-4 py-4 font-medium ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      ${tx.amount}
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="success">{tx.status}</Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-sm">{tx.date}</td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}

      {activeTab === 'alerts' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              Risk Alerts
              <Badge variant="danger">{riskAlerts.filter((a) => !a.resolved).length} Active</Badge>
            </h3>
          </CardHeader>
          <CardBody className="space-y-4">
            {riskAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${alert.resolved ? 'bg-slate-800/30 border-slate-700' : 'bg-red-500/10 border-red-500/30'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className={`w-6 h-6 mt-0.5 ${alert.resolved ? 'text-slate-500' : 'text-red-400'}`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{getAlertTypeLabel(alert.type)}</span>
                        {getRiskBadge(alert.severity)}
                        {alert.resolved && <Badge variant="default">Resolved</Badge>}
                      </div>
                      <p className="text-slate-400 text-sm">{alert.description}</p>
                      <p className="text-slate-500 text-xs mt-1">User: {alert.userId} | {alert.timestamp}</p>
                    </div>
                  </div>
                  {!alert.resolved && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                        Investigate
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4" />
                        Resolve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
