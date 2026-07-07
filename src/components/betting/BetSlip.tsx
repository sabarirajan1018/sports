import { useState } from 'react';
import { Trash2, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { useAuth } from '../../contexts/AuthContext';

export function BetSlip() {
  const { selections, stake, totalOdds, potentialWin, setStake, removeSelection, clearSelections } = useBetSlip();
  const { user, updateUser } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickStakes = [10, 25, 50, 100, 500];

  const handlePlaceBet = () => {
    setError(null);

    if (!stake || stake <= 0) {
      setError('Please enter a valid stake');
      return;
    }

    if (stake > (user?.balance || 0)) {
      setError('Insufficient balance');
      return;
    }

    if (selections.length === 0) {
      setError('Please add at least one selection');
      return;
    }

    setShowConfirm(true);
  };

  const confirmBet = () => {
    if (user) {
      updateUser({ balance: user.balance - stake });
    }
    clearSelections();
    setShowConfirm(false);
  };

  if (selections.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Bet Slip</h3>
        <div className="text-center py-8">
          <p className="text-slate-400 text-sm">Your bet slip is empty</p>
          <p className="text-slate-500 text-xs mt-1">Click on odds to add selections</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Bet Slip</h3>
          <button
            onClick={clearSelections}
            className="text-slate-400 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {selections.map((selection) => (
            <div key={selection.id} className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 truncate">{selection.match}</p>
                  <p className="text-sm text-white font-medium">{selection.selection}</p>
                </div>
                <button
                  onClick={() => removeSelection(selection.id)}
                  className="text-slate-400 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Odds</span>
                <span className="text-emerald-400 font-bold">{selection.odds.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 space-y-4 border-t border-slate-700">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Stake Amount</label>
            <Input
              type="number"
              value={stake || ''}
              onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
              placeholder="Enter stake"
              className="text-right"
            />
            <div className="flex gap-2 mt-2">
              {quickStakes.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStake(amount)}
                  className="flex-1 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Odds</span>
              <span className="text-white font-medium">{totalOdds.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Potential Win</span>
              <span className="text-emerald-400 font-bold text-lg">${potentialWin.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button fullWidth size="lg" onClick={handlePlaceBet}>
            Place Bet
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Balance: ${user?.balance.toFixed(2)}
          </p>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Bet">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Demo Bet Placed!</h3>
          <p className="text-slate-400 mb-4">
            This is a demo platform. Your bet of ${stake.toFixed(2)} has been simulated.
          </p>
          <div className="bg-slate-700/50 rounded-lg p-4 text-left mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Stake</span>
              <span className="text-white">${stake.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Total Odds</span>
              <span className="text-white">{totalOdds.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Potential Win</span>
              <span className="text-emerald-400 font-bold">${potentialWin.toFixed(2)}</span>
            </div>
          </div>
          <Button fullWidth onClick={confirmBet}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}
