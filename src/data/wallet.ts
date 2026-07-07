export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method?: string;
  description: string;
  date: string;
}

export const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', minDeposit: 100, maxDeposit: 100000, processingTime: 'Instant' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', minDeposit: 500, maxDeposit: 500000, processingTime: '1-3 days' },
  { id: 'crypto', name: 'Crypto', icon: '₿', minDeposit: 50, maxDeposit: 1000000, processingTime: 'Instant' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', minDeposit: 100, maxDeposit: 50000, processingTime: 'Instant' },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'deposit', amount: 1000, status: 'completed', method: 'UPI', description: 'Deposit via UPI', date: '2024-12-20T10:30:00' },
  { id: '2', type: 'bet', amount: -50, status: 'completed', description: 'Bet on Manchester United vs Liverpool', date: '2024-12-20T11:00:00' },
  { id: '3', type: 'win', amount: 125, status: 'completed', description: 'Win from Arsenal vs Chelsea', date: '2024-12-19T16:30:00' },
  { id: '4', type: 'bet', amount: -100, status: 'completed', description: 'Casino - Sweet Bonanza', date: '2024-12-19T14:00:00' },
  { id: '5', type: 'bonus', amount: 500, status: 'completed', description: 'Welcome Bonus Credit', date: '2024-12-18T09:00:00' },
  { id: '6', type: 'withdrawal', amount: -2000, status: 'pending', method: 'Bank Transfer', description: 'Withdrawal to Bank Account', date: '2024-12-18T12:00:00' },
  { id: '7', type: 'deposit', amount: 5000, status: 'completed', method: 'Crypto', description: 'Deposit via Bitcoin', date: '2024-12-17T08:00:00' },
  { id: '8', type: 'bet', amount: -75, status: 'completed', description: 'Live Bet - Bayern Munich', date: '2024-12-17T15:00:00' },
  { id: '9', type: 'win', amount: 350, status: 'completed', description: 'Win from Live Blackjack', date: '2024-12-16T20:00:00' },
  { id: '10', type: 'bet', amount: -200, status: 'failed', description: 'Bet failed - Odds changed', date: '2024-12-16T13:00:00' },
];
