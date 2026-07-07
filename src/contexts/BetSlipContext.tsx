import { createContext, useContext, useState, ReactNode } from 'react';

export interface BetSelection {
  id: string;
  match: string;
  selection: string;
  odds: number;
  sport?: string;
}

interface BetSlipContextType {
  selections: BetSelection[];
  stake: number;
  totalOdds: number;
  potentialWin: number;
  addSelection: (selection: BetSelection) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  setStake: (stake: number) => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export function BetSlipProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [stake, setStake] = useState<number>(0);

  const totalOdds = selections.reduce((acc, sel) => acc * sel.odds, 1);
  const potentialWin = stake * totalOdds;

  const addSelection = (selection: BetSelection) => {
    setSelections((prev) => {
      const existing = prev.find((s) => s.match === selection.match);
      if (existing) {
        return prev.map((s) => (s.match === selection.match ? selection : s));
      }
      return [...prev, selection];
    });
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  };

  const clearSelections = () => {
    setSelections([]);
    setStake(0);
  };

  return (
    <BetSlipContext.Provider
      value={{
        selections,
        stake,
        totalOdds,
        potentialWin,
        addSelection,
        removeSelection,
        clearSelections,
        setStake,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  );
}

export function useBetSlip() {
  const context = useContext(BetSlipContext);
  if (context === undefined) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return context;
}
