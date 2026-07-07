import { useState } from 'react';
import { Play, Star, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { CasinoGame } from '../../data/casino';

interface GameCardProps {
  game: CasinoGame;
}

const categoryColors: Record<string, string> = {
  slots: 'from-purple-500 to-pink-500',
  'live-casino': 'from-red-500 to-orange-500',
  roulette: 'from-green-500 to-emerald-500',
  blackjack: 'from-blue-500 to-cyan-500',
  crash: 'from-yellow-500 to-amber-500',
};

export function GameCard({ game }: GameCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all group">
        <div className={`h-32 bg-gradient-to-br ${categoryColors[game.category]} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-50">
              {game.category === 'slots' && '🎰'}
              {game.category === 'live-casino' && '🃏'}
              {game.category === 'roulette' && '🎡'}
              {game.category === 'blackjack' && '♠️'}
              {game.category === 'crash' && '🚀'}
            </span>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {game.isPopular && (
              <Badge variant="warning" size="sm">
                <Star className="w-3 h-3 mr-1" />
                Hot
              </Badge>
            )}
            {game.isNew && (
              <Badge variant="success" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="default" size="sm">{game.provider}</Badge>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-white font-medium text-sm mb-1 truncate">{game.name}</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400">RTP: {game.rtp}%</span>
            <Badge variant="info" size="sm">{game.category}</Badge>
          </div>
          <Button fullWidth size="sm" onClick={() => setShowModal(true)}>
            <Play className="w-4 h-4" />
            Play Demo
          </Button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={game.name} size="lg">
        <div className="aspect-video bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {game.category === 'slots' && '🎰'}
              {game.category === 'live-casino' && '🃏'}
              {game.category === 'roulette' && '🎡'}
              {game.category === 'blackjack' && '♠️'}
              {game.category === 'crash' && '🚀'}
            </div>
            <p className="text-slate-400">Demo Game Preview</p>
            <p className="text-sm text-slate-500 mt-2">
              This is a demo preview for {game.name} by {game.provider}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-400">Provider</p>
            <p className="text-white font-medium">{game.provider}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-400">RTP</p>
            <p className="text-emerald-400 font-medium">{game.rtp}%</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-400">Category</p>
            <p className="text-white font-medium capitalize">{game.category.replace('-', ' ')}</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-slate-400">Popularity</p>
            <p className="text-white font-medium">{game.isPopular ? 'Top Game' : 'Standard'}</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm text-center">
          Demo mode only - No real money involved
        </div>
      </Modal>
    </>
  );
}
