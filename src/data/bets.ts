export interface Bet {
  id: string;
  type: 'sportsbook' | 'casino';
  selection: string;
  odds: number;
  stake: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost' | 'void';
  date: string;
  sport?: string;
}

export const recentBets: Bet[] = [
  { id: '1', type: 'sportsbook', selection: 'Arsenal vs Chelsea - Arsenal Win', odds: 2.10, stake: 50, potentialWin: 105, status: 'won', date: '2024-12-20T15:00:00', sport: 'football' },
  { id: '2', type: 'sportsbook', selection: 'Bayern Munich vs Dortmund - Over 2.5 Goals', odds: 1.85, stake: 75, potentialWin: 138.75, status: 'pending', date: '2024-12-21T14:30:00', sport: 'football' },
  { id: '3', type: 'casino', selection: 'Sweet Bonanza - 100 Spins', odds: 0, stake: 100, potentialWin: 0, status: 'won', date: '2024-12-19T18:00:00' },
  { id: '4', type: 'sportsbook', selection: 'Lakers vs Celtics - Lakers +5.5', odds: 1.90, stake: 40, potentialWin: 76, status: 'lost', date: '2024-12-18T19:30:00', sport: 'basketball' },
  { id: '5', type: 'sportsbook', selection: 'Nadal vs Djokovic - Nadal Win', odds: 2.25, stake: 30, potentialWin: 67.50, status: 'pending', date: '2024-12-21T16:00:00', sport: 'tennis' },
  { id: '6', type: 'casino', selection: 'Aviator - 2.5x Cash Out', odds: 2.5, stake: 20, potentialWin: 50, status: 'won', date: '2024-12-17T21:00:00' },
];
