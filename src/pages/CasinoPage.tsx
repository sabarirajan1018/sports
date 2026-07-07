import { useState } from 'react';
import { Gamepad2, Search, Filter } from 'lucide-react';
import { GameCard } from '../components/casino/GameCard';
import { Input } from '../components/ui/Input';
import { gameCategories, providers, casinoGames } from '../data/casino';

export function CasinoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('All Providers');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = casinoGames.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesProvider = selectedProvider === 'All Providers' || game.provider === selectedProvider;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesProvider && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Casino</h1>
          <p className="text-slate-400">Discover hundreds of exciting casino games</p>
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4" />}
            className="w-64"
          />

          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          All Games
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            selectedCategory === 'all' ? 'bg-emerald-600' : 'bg-slate-600'
          }`}>
            {casinoGames.length}
          </span>
        </button>

        {gameCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              selectedCategory === category.id ? 'bg-emerald-600' : 'bg-slate-600'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Games Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-white mb-2">Featured: Sweet Bonanza</h2>
          <p className="text-purple-100 text-sm mb-4">
            Spin the reels and win big with cascading wins up to 21,175x!
          </p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Play Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-2">Live Dealer</h2>
          <p className="text-amber-100 text-sm mb-4">
            Experience real casino action with live dealers
          </p>
          <button className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
            Enter Lobby
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {selectedCategory === 'all' ? 'All Games' : gameCategories.find(c => c.id === selectedCategory)?.name}
          <span className="text-slate-400 text-sm ml-2">({filteredGames.length} games)</span>
        </h2>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white">
            <option>Popular</option>
            <option>New</option>
            <option>RTP High to Low</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No games found matching your criteria</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedProvider('All Providers');
              setSearchQuery('');
            }}
            className="text-emerald-400 text-sm mt-2 hover:text-emerald-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
