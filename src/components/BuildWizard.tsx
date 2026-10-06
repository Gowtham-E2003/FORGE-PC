import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Gamepad2, DollarSign, Zap, CheckCircle2 } from 'lucide-react';
import { GAMES, BUDGET_OPTIONS } from '../data/games';
import { WizardState } from '../types';

interface BuildWizardProps {
  onBuild: (state: WizardState) => void;
}

export default function BuildWizard({ onBuild }: BuildWizardProps) {
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [gameDropOpen, setGameDropOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setGameDropOpen(false);
      }
    };
    if (gameDropOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [gameDropOpen]);

  const toggleGame = (id: string) => {
    setSelectedGames((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const canBuild = selectedGames.length > 0 && budget > 0 && !generating;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      onBuild({ selectedGames, budget });
      setGenerating(false);
    }, 600);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900/80 to-black/90 border border-red-900/40 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-red-950/30 max-w-2xl w-full mx-auto">
      {/* Accent line top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center border border-red-600/30">
          <Zap className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-wide uppercase">Build Wizard</h2>
          <p className="text-xs text-gray-500 tracking-widest">Configure your perfect rig</p>
        </div>
      </div>

      {/* Step 1: Select Games */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">
          <Gamepad2 className="w-4 h-4 text-red-500" />
          Target Games
        </label>

        {/* Custom multi-select dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setGameDropOpen((o) => !o)}
            className="w-full bg-black/60 border border-gray-700 hover:border-red-600/60 rounded-xl px-4 py-3.5 text-left flex items-center justify-between transition-all group"
          >
            <span className={selectedGames.length > 0 ? 'text-white text-sm font-medium' : 'text-gray-500 text-sm'}>
              {selectedGames.length > 0
                ? `${selectedGames.length} game${selectedGames.length > 1 ? 's' : ''} selected`
                : 'Select games to optimize for...'}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${gameDropOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {gameDropOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden z-20 shadow-2xl">
              <div className="max-h-72 overflow-y-auto">
                {GAMES.map((game) => {
                  const selected = selectedGames.includes(game.id);
                  return (
                    <button
                      key={game.id}
                      onClick={() => toggleGame(game.id)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800/80 transition-colors text-left ${
                        selected ? 'bg-red-950/40' : ''
                      }`}
                    >
                      <img
                        src={game.coverImage}
                        alt={game.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-700"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{game.name}</div>
                        <div className="text-xs text-gray-500">{game.genre}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold tracking-wide ${
                            game.demandLevel === 'extreme'
                              ? 'bg-red-900/60 text-red-400'
                              : game.demandLevel === 'high'
                              ? 'bg-orange-900/60 text-orange-400'
                              : game.demandLevel === 'medium'
                              ? 'bg-yellow-900/60 text-yellow-400'
                              : 'bg-green-900/60 text-green-400'
                          }`}
                        >
                          {game.demandLevel.toUpperCase()}
                        </span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected game chips */}
        {selectedGames.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedGames.map((id) => {
              const game = GAMES.find((g) => g.id === id);
              return game ? (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-900/30 border border-red-700/40 rounded-full text-xs font-medium text-red-300"
                >
                  {game.name}
                  <button
                    onClick={() => toggleGame(id)}
                    className="text-red-400 hover:text-red-200 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Step 2: Budget */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">
          <DollarSign className="w-4 h-4 text-red-500" />
          Total Budget
        </label>
        <div className="relative">
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full bg-black/60 border border-gray-700 hover:border-red-600/60 rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer transition-all focus:outline-none focus:border-red-600/60 text-white"
            style={{ WebkitAppearance: 'none' }}
          >
            <option value={0} disabled className="bg-gray-900">
              Select your budget...
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* CTA */}
      <button
        disabled={!canBuild}
        onClick={handleGenerate}
        className={`w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden group ${
          canBuild
            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-800/50 hover:-translate-y-0.5'
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        {canBuild && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        )}
        <span className="relative flex items-center justify-center gap-2">
          {generating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate My Build
            </>
          )}
        </span>
      </button>
    </div>
  );
}
