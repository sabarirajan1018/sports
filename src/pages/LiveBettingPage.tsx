import { useState, useEffect } from 'react';
import { MatchCard } from '../components/betting/MatchCard';
import { BetSlip } from '../components/betting/BetSlip';
import { useBetSlip } from '../contexts/BetSlipContext';
import { liveMatches } from '../data/sports';

export function LiveBettingPage() {
  const [matches, setMatches] = useState(liveMatches);
  const { addSelection } = useBetSlip();

  // Simulate live odds changes
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => ({
          ...match,
          odds: {
            home: match.odds.home + (Math.random() - 0.5) * 0.1,
            draw: match.odds.draw > 0 ? match.odds.draw + (Math.random() - 0.5) * 0.1 : 0,
            away: match.odds.away + (Math.random() - 0.5) * 0.1,
          },
          minute:
            match.sport === 'basketball'
              ? `Q${Math.floor(Math.random() * 4) + 1} ${Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
              : `${parseInt(match.minute || '0') + 1}'`,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBetClick = (match: typeof liveMatches[0], selection: string, odds: number) => {
    const selectionName =
      selection === '1' ? match.homeTeam.name :
      selection === '2' ? match.awayTeam.name : 'Draw';

    addSelection({
      id: `${match.id}-${selection}`,
      match: `[LIVE] ${match.homeTeam.name} vs ${match.awayTeam.name}`,
      selection: selectionName,
      odds,
      sport: match.sport,
    });
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              Live Betting
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h1>
            <p className="text-slate-400">Place bets on live matches with real-time odds</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Updates
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">
              {matches.length} Live Matches
            </span>
          </div>
        </div>

        {/* Sport Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium">
            All Sports
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 text-sm font-medium">
            Football
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 text-sm font-medium">
            Basketball
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 text-sm font-medium">
            Tennis
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 text-sm font-medium">
            Esports
          </button>
        </div>

        {/* Live Matches */}
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onBetClick={(selection, odds) => handleBetClick(match, selection, odds)}
              isLive
            />
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-slate-400">No live matches at the moment</p>
            <p className="text-slate-500 text-sm mt-2">Check back later or browse upcoming matches</p>
          </div>
        )}
      </div>

      {/* Bet Slip */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-20">
          <BetSlip />
        </div>
      </div>
    </div>
  );
}
