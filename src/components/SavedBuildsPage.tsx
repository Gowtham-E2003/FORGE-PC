import { useEffect, useState } from 'react';
import { ArrowLeft, Zap, DollarSign, Gamepad2, Trash2, Loader2, FolderOpen, Calendar, Cpu } from 'lucide-react';
import { SavedBuild } from '../types';
import { GAMES } from '../data/games';
import { supabase } from '../lib/supabase';

interface SavedBuildsPageProps {
  onBack: () => void;
  onOpenBuild: (buildId: string) => void;
  onSavedBuildsChanged: () => void;
}

const TIER_BADGE_COLORS: Record<string, string> = {
  budget: 'bg-green-900/30 border-green-700/40 text-green-400',
  mid: 'bg-blue-900/30 border-blue-700/40 text-blue-400',
  high: 'bg-orange-900/30 border-orange-700/40 text-orange-400',
  ultra: 'bg-red-900/30 border-red-700/40 text-red-400',
  enthusiast: 'bg-yellow-900/30 border-yellow-700/40 text-yellow-400',
};

export default function SavedBuildsPage({ onBack, onOpenBuild, onSavedBuildsChanged }: SavedBuildsPageProps) {
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadBuilds = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from('saved_builds')
        .select('*')
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setBuilds((data ?? []) as SavedBuild[]);
    } catch {
      setError('Could not load saved builds. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuilds();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const { error: delError } = await supabase.from('saved_builds').delete().eq('id', id);
      if (delError) throw delError;
      setBuilds((prev) => prev.filter((b) => b.id !== id));
      onSavedBuildsChanged();
    } catch {
      setError('Could not delete build.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-red-950/15 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Builder
        </button>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">
            My Saved Builds
          </h1>
          <p className="text-gray-400">View, open, and manage your saved PC builds.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl border border-red-800/50 bg-red-950/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <span className="text-sm">Loading your builds...</span>
          </div>
        ) : builds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-center mb-5">
              <FolderOpen className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No saved builds yet</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              Generate a build with the wizard and hit "Save Build" to keep it here for later.
            </p>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold tracking-wider uppercase rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Build a PC
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((b) => {
              const gameNames = b.games
                .map((id) => GAMES.find((g) => g.id === id)?.name)
                .filter(Boolean);
              const tierLabel = b.tier;
              return (
                <div
                  key={b.id}
                  className="group bg-gray-900/50 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase ${TIER_BADGE_COLORS[b.tier] ?? TIER_BADGE_COLORS.mid}`}>
                      <Zap className="w-3 h-3" />
                      {b.build_label}
                    </div>
                    <button
                      onClick={() => handleDelete(b.id)}
                      disabled={deletingId === b.id}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1 -m-1 disabled:opacity-50"
                      title="Delete build"
                    >
                      {deletingId === b.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <DollarSign className="w-4 h-4 text-red-400" />
                      <span className="font-bold text-white">${b.total_cost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span className="capitalize">{tierLabel}</span>
                    </div>
                  </div>

                  {/* Games */}
                  <div className="mb-4 flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <Gamepad2 className="w-3.5 h-3.5" />
                      Optimized for
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {gameNames.length > 0 ? (
                        gameNames.slice(0, 3).map((name, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 bg-gray-800 border border-gray-700 rounded-full text-gray-300"
                          >
                            {name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-600">No games specified</span>
                      )}
                      {gameNames.length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-gray-800 border border-gray-700 rounded-full text-gray-400">
                          +{gameNames.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(b.created_at)}
                    </div>
                    <button
                      onClick={() => onOpenBuild(b.id)}
                      className="text-xs font-bold tracking-wider uppercase text-red-400 hover:text-red-300 transition-colors"
                    >
                      View Build →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
