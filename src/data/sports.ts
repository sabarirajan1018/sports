export interface Team {
  id: string;
  name: string;
  logo: string;
  country: string;
}

export interface Match {
  id: string;
  sport: string;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  status: 'upcoming' | 'live' | 'finished';
  minute?: string;
  score?: { home: number; away: number };
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  isLive?: boolean;
}

export const sportsCategories = [
  { id: 'football', name: 'Football', icon: '⚽', count: 156 },
  { id: 'cricket', name: 'Cricket', icon: '🏏', count: 42 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', count: 89 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', count: 67 },
  { id: 'esports', name: 'Esports', icon: '🎮', count: 124 },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'football',
    league: 'Premier League',
    homeTeam: { id: 'manu', name: 'Manchester United', logo: '', country: 'England' },
    awayTeam: { id: 'liv', name: 'Liverpool', logo: '', country: 'England' },
    startTime: '2024-12-21T15:00:00',
    status: 'upcoming',
    odds: { home: 2.45, draw: 3.20, away: 2.80 },
  },
  {
    id: '2',
    sport: 'football',
    league: 'La Liga',
    homeTeam: { id: 'rma', name: 'Real Madrid', logo: '', country: 'Spain' },
    awayTeam: { id: 'bar', name: 'Barcelona', logo: '', country: 'Spain' },
    startTime: '2024-12-21T18:30:00',
    status: 'upcoming',
    odds: { home: 2.10, draw: 3.50, away: 3.25 },
  },
  {
    id: '3',
    sport: 'football',
    league: 'Serie A',
    homeTeam: { id: 'juv', name: 'Juventus', logo: '', country: 'Italy' },
    awayTeam: { id: 'mil', name: 'AC Milan', logo: '', country: 'Italy' },
    startTime: '2024-12-21T20:45:00',
    status: 'upcoming',
    odds: { home: 1.85, draw: 3.40, away: 4.20 },
  },
  {
    id: '4',
    sport: 'cricket',
    league: 'IPL',
    homeTeam: { id: 'mi', name: 'Mumbai Indians', logo: '', country: 'India' },
    awayTeam: { id: 'csk', name: 'Chennai Super Kings', logo: '', country: 'India' },
    startTime: '2024-12-21T14:00:00',
    status: 'upcoming',
    odds: { home: 1.95, draw: 0, away: 1.85 },
  },
  {
    id: '5',
    sport: 'tennis',
    league: 'ATP Finals',
    homeTeam: { id: 'nadal', name: 'R. Nadal', logo: '', country: 'Spain' },
    awayTeam: { id: 'djoko', name: 'N. Djokovic', logo: '', country: 'Serbia' },
    startTime: '2024-12-21T16:00:00',
    status: 'upcoming',
    odds: { home: 2.25, draw: 0, away: 1.65 },
  },
  {
    id: '6',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: { id: 'lal', name: 'LA Lakers', logo: '', country: 'USA' },
    awayTeam: { id: 'bos', name: 'Boston Celtics', logo: '', country: 'USA' },
    startTime: '2024-12-21T19:30:00',
    status: 'upcoming',
    odds: { home: 1.90, draw: 0, away: 1.90 },
  },
  {
    id: '7',
    sport: 'esports',
    league: 'League of Legends',
    homeTeam: { id: 't1', name: 'T1', logo: '', country: 'Korea' },
    awayTeam: { id: 'g2', name: 'G2 Esports', logo: '', country: 'Europe' },
    startTime: '2024-12-21T12:00:00',
    status: 'upcoming',
    odds: { home: 1.55, draw: 0, away: 2.45 },
  },
];

export const liveMatches: Match[] = [
  {
    id: 'live1',
    sport: 'football',
    league: 'Premier League',
    homeTeam: { id: 'ars', name: 'Arsenal', logo: '', country: 'England' },
    awayTeam: { id: 'che', name: 'Chelsea', logo: '', country: 'England' },
    startTime: '2024-12-21T13:00:00',
    status: 'live',
    minute: '65',
    score: { home: 2, away: 1 },
    odds: { home: 1.45, draw: 4.50, away: 6.00 },
    isLive: true,
  },
  {
    id: 'live2',
    sport: 'football',
    league: 'Bundesliga',
    homeTeam: { id: 'bay', name: 'Bayern Munich', logo: '', country: 'Germany' },
    awayTeam: { id: 'dor', name: 'Borussia Dortmund', logo: '', country: 'Germany' },
    startTime: '2024-12-21T14:30:00',
    status: 'live',
    minute: '32',
    score: { home: 0, away: 0 },
    odds: { home: 1.75, draw: 3.80, away: 4.20 },
    isLive: true,
  },
  {
    id: 'live3',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: { id: 'gsw', name: 'Golden State Warriors', logo: '', country: 'USA' },
    awayTeam: { id: 'bkn', name: 'Brooklyn Nets', logo: '', country: 'USA' },
    startTime: '2024-12-21T15:00:00',
    status: 'live',
    minute: 'Q3 8:42',
    score: { home: 78, away: 82 },
    odds: { home: 1.60, draw: 0, away: 2.30 },
    isLive: true,
  },
  {
    id: 'live4',
    sport: 'tennis',
    league: 'WTA Finals',
    homeTeam: { id: 'iga', name: 'I. Swiatek', logo: '', country: 'Poland' },
    awayTeam: { id: 'saba', name: 'S. Sabalenka', logo: '', country: 'Belarus' },
    startTime: '2024-12-21T16:30:00',
    status: 'live',
    minute: 'Set 2',
    score: { home: 1, away: 0 },
    odds: { home: 1.35, draw: 0, away: 3.10 },
    isLive: true,
  },
  {
    id: 'live5',
    sport: 'esports',
    league: 'CS2 Major',
    homeTeam: { id: 'navi', name: 'Natus Vincere', logo: '', country: 'Ukraine' },
    awayTeam: { id: 'faze', name: 'FaZe Clan', logo: '', country: 'International' },
    startTime: '2024-12-21T17:00:00',
    status: 'live',
    minute: 'Map 2',
    score: { home: 1, away: 0 },
    odds: { home: 1.25, draw: 0, away: 3.80 },
    isLive: true,
  },
];
