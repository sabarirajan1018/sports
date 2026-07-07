import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className="flex gap-1 p-1 bg-slate-900/50 rounded-lg border border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-emerald-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              activeTab === tab.id ? 'bg-emerald-600' : 'bg-slate-700'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
