export interface CasinoGame {
  id: string;
  name: string;
  category: 'slots' | 'live-casino' | 'roulette' | 'blackjack' | 'crash';
  provider: string;
  image: string;
  rtp: number;
  isPopular: boolean;
  isNew: boolean;
}

export const gameCategories = [
  { id: 'slots', name: 'Slots', icon: '🎰', count: 245 },
  { id: 'live-casino', name: 'Live Casino', icon: '🃏', count: 89 },
  { id: 'roulette', name: 'Roulette', icon: '🎡', count: 34 },
  { id: 'blackjack', name: 'Blackjack', icon: '♠️', count: 28 },
  { id: 'crash', name: 'Crash Games', icon: '🚀', count: 15 },
];

export const providers = [
  'All Providers',
  'Pragmatic Play',
  'Evolution',
  'Spribe',
  'NetEnt',
  'Microgaming',
  'Play\'n GO',
];

export const casinoGames: CasinoGame[] = [
  { id: '1', name: 'Sweet Bonanza', category: 'slots', provider: 'Pragmatic Play', image: '', rtp: 96.51, isPopular: true, isNew: false },
  { id: '2', name: 'Gates of Olympus', category: 'slots', provider: 'Pragmatic Play', image: '', rtp: 96.50, isPopular: true, isNew: false },
  { id: '3', name: 'Starburst', category: 'slots', provider: 'NetEnt', image: '', rtp: 96.09, isPopular: true, isNew: false },
  { id: '4', name: 'Big Bass Bonanza', category: 'slots', provider: 'Pragmatic Play', image: '', rtp: 96.71, isPopular: true, isNew: false },
  { id: '5', name: 'Aviator', category: 'crash', provider: 'Spribe', image: '', rtp: 97.00, isPopular: true, isNew: false },
  { id: '6', name: 'Crash X', category: 'crash', provider: 'Spribe', image: '', rtp: 96.50, isPopular: false, isNew: true },
  { id: '7', name: 'Lightning Roulette', category: 'roulette', provider: 'Evolution', image: '', rtp: 97.30, isPopular: true, isNew: false },
  { id: '8', name: 'Speed Roulette', category: 'roulette', provider: 'Evolution', image: '', rtp: 97.30, isPopular: false, isNew: false },
  { id: '9', name: 'Live Blackjack VIP', category: 'blackjack', provider: 'Evolution', image: '', rtp: 99.50, isPopular: true, isNew: false },
  { id: '10', name: 'Speed Blackjack', category: 'blackjack', provider: 'Evolution', image: '', rtp: 99.50, isPopular: false, isNew: true },
  { id: '11', name: 'Crazy Time', category: 'live-casino', provider: 'Evolution', image: '', rtp: 96.08, isPopular: true, isNew: false },
  { id: '12', name: 'Monopoly Live', category: 'live-casino', provider: 'Evolution', image: '', rtp: 96.23, isPopular: true, isNew: false },
  { id: '13', name: 'Dream Catcher', category: 'live-casino', provider: 'Evolution', image: '', rtp: 96.58, isPopular: false, isNew: false },
  { id: '14', name: 'Mega Wheel', category: 'live-casino', provider: 'Pragmatic Play', image: '', rtp: 96.50, isPopular: false, isNew: true },
  { id: '15', name: 'Book of Dead', category: 'slots', provider: 'Play\'n GO', image: '', rtp: 96.21, isPopular: true, isNew: false },
  { id: '16', name: 'Gonzo\'s Quest', category: 'slots', provider: 'NetEnt', image: '', rtp: 95.97, isPopular: true, isNew: false },
  { id: '17', name: 'Mega Moolah', category: 'slots', provider: 'Microgaming', image: '', rtp: 94.00, isPopular: true, isNew: false },
  { id: '18', name: 'Immortal Romance', category: 'slots', provider: 'Microgaming', image: '', rtp: 96.86, isPopular: false, isNew: false },
];
