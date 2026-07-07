import { useState } from 'react';
import { MatchCard } from '../components/betting/MatchCard';
import { BetSlip } from '../components/betting/BetSlip';
import { useBetSlip } from '../contexts/BetSlipContext';
import { sportsCategories, mockMatches } from '../data/sports';

export function SportsbookPage() {
  const [selectedSport, setSelectedSport] = useState('football');
  const { addSelection } = useBetSlip();

  const filteredMatches = mockMatches.filter(
    (match) => selectedSport === 'all' || match.sport === selectedSport
  );

  const handleBetClick = (match: typeof mockMatches[0], selection: string, odds: number) => {
    const selectionName =
      selection === '1' ? match.homeTeam.name :
      selection === '2' ? match.awayTeam.name : 'Draw';

    addSelection({
      id: `${match.id}-${selection}`,
      match: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      selection: selectionName,
      odds,
      sport: match.sport,
    });
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Sportsbook</h1>
          <p className="text-slate-400">Browse matches and place your bets</p>
        </div>

        {/* Sports Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sportsCategories.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedSport === sport.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span className="text-lg">{sport.icon}</span>
              <span className="text-sm font-medium">{sport.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                selectedSport === sport.id ? 'bg-emerald-600' : 'bg-slate-600'
              }`}>
                {sport.count}
              </span>
            </button>
          ))}
        </div>

        {/* League Filter */}
        <div className="flex items-center gap-4">
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            <option>All Leagues</option>
            <option>Premier League</option>
            <option>La Liga</option>
            <option>Serie A</option>
            <option>Bundesliga</option>
          </select>

          <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            <option>Next 24 Hours</option>
            <option>Next 7 Days</option>
            <option>All Upcoming</option>
          </select>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onBetClick={(selection, odds) => handleBetClick(match, selection, odds)}
            />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No matches available for this sport</p>
          </div>
        )}
      </div>

      {/* Bet Slip Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-20">
          <BetSlip />
        </div>
      </div>
    </div>
  );
}
