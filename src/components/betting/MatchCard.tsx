import { Match } from '../../data/sports';
import { Badge } from '../ui/Badge';
import { Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onBetClick: (selection: string, odds: number) => void;
  isLive?: boolean;
}

export function MatchCard({ match, onBetClick, isLive }: MatchCardProps) {
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all">
      <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {isLive ? match.minute : `${formatDate(match.startTime)} ${formatTime(match.startTime)}`}
        </span>
        <Badge variant={isLive ? 'live' : 'default'}>{isLive ? 'LIVE' : match.league}</Badge>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
              {match.homeTeam.name.charAt(0)}
            </div>
            <p className="text-sm text-white font-medium truncate">{match.homeTeam.name}</p>
          </div>

          <div className="flex-shrink-0 px-4">
            {isLive && match.score && (
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {match.score.home} - {match.score.away}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
              {match.awayTeam.name.charAt(0)}
            </div>
            <p className="text-sm text-white font-medium truncate">{match.awayTeam.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onBetClick('1', match.odds.home)}
            className="bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600 hover:border-emerald-500 rounded-lg p-2 text-center transition-all"
          >
            <span className="block text-xs text-slate-400">1</span>
            <span className="text-emerald-400 font-bold">{match.odds.home.toFixed(2)}</span>
          </button>

          {match.odds.draw > 0 && (
            <button
              onClick={() => onBetClick('X', match.odds.draw)}
              className="bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600 hover:border-emerald-500 rounded-lg p-2 text-center transition-all"
            >
              <span className="block text-xs text-slate-400">X</span>
              <span className="text-emerald-400 font-bold">{match.odds.draw.toFixed(2)}</span>
            </button>
          )}

          <button
            onClick={() => onBetClick(match.odds.draw > 0 ? '2' : '2', match.odds.away)}
            className="bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600 hover:border-emerald-500 rounded-lg p-2 text-center transition-all"
          >
            <span className="block text-xs text-slate-400">{match.odds.draw > 0 ? '2' : '2'}</span>
            <span className="text-emerald-400 font-bold">{match.odds.away.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
