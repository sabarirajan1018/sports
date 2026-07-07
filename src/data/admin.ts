export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalBets: number;
  totalRevenue: number;
  pendingKyc: number;
  pendingWithdrawals: number;
  activeMatches: number;
  totalGames: number;
}

export interface UserManagement {
  id: string;
  username: string;
  email: string;
  balance: number;
  kycStatus: 'pending' | 'verified' | 'rejected';
  status: 'active' | 'suspended' | 'banned';
  registered: string;
  lastActive: string;
}

export interface RiskAlert {
  id: string;
  type: 'unusual-betting' | 'high-winnings' | 'multiple-accounts' | 'collusion';
  severity: 'low' | 'medium' | 'high';
  userId: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export const adminStats: AdminStats = {
  totalUsers: 24567,
  activeUsers: 8423,
  totalBets: 156789,
  totalRevenue: 1245678.50,
  pendingKyc: 156,
  pendingWithdrawals: 89,
  activeMatches: 234,
  totalGames: 411,
};

export const usersList: UserManagement[] = [
  { id: '1', username: 'demo_user', email: 'demo@betplatform.com', balance: 5432.50, kycStatus: 'verified', status: 'active', registered: '2024-01-15', lastActive: '2024-12-20' },
  { id: '2', username: 'jane_bet', email: 'jane@example.com', balance: 1250.00, kycStatus: 'pending', status: 'active', registered: '2024-03-20', lastActive: '2024-12-19' },
  { id: '3', username: 'mike_winner', email: 'mike@example.com', balance: 8900.75, kycStatus: 'verified', status: 'active', registered: '2024-02-10', lastActive: '2024-12-18' },
  { id: '4', username: 'suspicious_user', email: 'susp@example.com', balance: 50.00, kycStatus: 'rejected', status: 'suspended', registered: '2024-05-10', lastActive: '2024-12-15' },
  { id: '5', username: 'lucky_one', email: 'lucky@test.com', balance: 15000.00, kycStatus: 'verified', status: 'active', registered: '2024-06-22', lastActive: '2024-12-20' },
];

export const riskAlerts: RiskAlert[] = [
  { id: '1', type: 'unusual-betting', severity: 'high', userId: 'user_12345', description: 'Unusual betting pattern detected - 50 bets in 10 minutes', timestamp: '2024-12-20T18:30:00', resolved: false },
  { id: '2', type: 'high-winnings', severity: 'medium', userId: 'user_67890', description: 'User won $15,000 in last 24 hours across 3 games', timestamp: '2024-12-20T17:45:00', resolved: false },
  { id: '3', type: 'multiple-accounts', severity: 'high', userId: 'user_11111', description: 'Potential multi-account detected - same IP, same device', timestamp: '2024-12-20T15:20:00', resolved: true },
  { id: '4', type: 'collusion', severity: 'medium', userId: 'user_22222', description: 'Suspicious betting synergy between user_22222 and user_33333', timestamp: '2024-12-19T22:10:00', resolved: false },
];

export const recentTransactions = [
  { id: '1', user: 'demo_user', type: 'deposit', amount: 1000, status: 'completed', date: '2024-12-20' },
  { id: '2', user: 'jane_bet', type: 'withdrawal', amount: 500, status: 'pending', date: '2024-12-20' },
  { id: '3', user: 'mike_winner', type: 'deposit', amount: 5000, status: 'completed', date: '2024-12-19' },
  { id: '4', user: 'lucky_one', type: 'withdrawal', amount: 2000, status: 'completed', date: '2024-12-19' },
  { id: '5', user: 'new_player', type: 'deposit', amount: 100, status: 'completed', date: '2024-12-18' },
];

export const dashboardStats = [
  { name: 'Total Bets', value: '156,789', change: '+12.5%', trend: 'up' },
  { name: 'Active Users', value: '8,423', change: '+5.2%', trend: 'up' },
  { name: 'Revenue (Monthly)', value: '$1,245,678', change: '+18.3%', trend: 'up' },
  { name: 'Avg. Bet Size', value: '$45.20', change: '-2.1%', trend: 'down' },
];

export const sportsActivity = [
  { sport: 'Football', bets: 45000, revenue: 450000 },
  { sport: 'Cricket', bets: 25000, revenue: 180000 },
  { sport: 'Basketball', bets: 22000, revenue: 220000 },
  { sport: 'Tennis', bets: 18000, revenue: 150000 },
  { sport: 'Esports', bets: 35000, revenue: 245000 },
];

export const monthlyRevenue = [
  { month: 'Jul', revenue: 850000 },
  { month: 'Aug', revenue: 920000 },
  { month: 'Sep', revenue: 1050000 },
  { month: 'Oct', revenue: 980000 },
  { month: 'Nov', revenue: 1150000 },
  { month: 'Dec', revenue: 1245000 },
];
