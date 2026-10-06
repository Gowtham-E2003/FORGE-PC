import { ArrowLeft, Save, Share2, Zap, TrendingUp, DollarSign, Check, AlertCircle, Trash2 } from 'lucide-react';
import { BuildRecommendation, WizardState } from '../types';
import { GAMES } from '../data/games';
import ComponentCard from './ComponentCard';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

interface ResultsPageProps {
  build: BuildRecommendation;
  wizardState: WizardState;
  savedBuildId?: string | null;
  onBack: () => void;
  onSavedBuildsChanged: () => void;
}

const CATEGORY_ORDER = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU'] as const;

const TIER_BADGE_COLORS: Record<string, string> = {
  budget: 'bg-green-900/30 border-green-700/40 text-green-400',
  mid: 'bg-blue-900/30 border-blue-700/40 text-blue-400',
  high: 'bg-orange-900/30 border-orange-700/40 text-orange-400',
  ultra: 'bg-red-900/30 border-red-700/40 text-red-400',
  enthusiast: 'bg-yellow-900/30 border-yellow-700/40 text-yellow-400',
};

export default function ResultsPage({ build, wizardState, savedBuildId, onBack, onSavedBuildsChanged }: ResultsPageProps) {
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(savedBuildId ?? null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const selectedGames = wizardState.selectedGames
    .map((id) => GAMES.find((g) => g.id === id))
    .filter(Boolean);

  const sorted = CATEGORY_ORDER.map((cat) =>
    build.components.find((c) => c.category === cat)
  ).filter(Boolean);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const { data, error } = await supabase
        .from('saved_builds')
        .insert({
          build_label: build.buildLabel,
          tier: build.tier,
          total_cost: build.totalCost,
          games: wizardState.selectedGames,
          budget: wizardState.budget,
          components: build.components.map((c) => c.id),
        })
        .select('id')
        .single();
      if (error) throw error;
      if (data) {
        setSavedId(data.id);
        onSavedBuildsChanged();
      }
    } catch {
      setSaveError('Could not save build. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (!savedId) {
      setSaveError('Save the build first to share it.');
      return;
    }
    const url = `${window.location.origin}/?build=${savedId}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      setSaveError('Could not copy link to clipboard.');
    }
  };

  const handleDelete = async () => {
    if (!savedId) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from('saved_builds').delete().eq('id', savedId);
      if (error) throw error;
      setSavedId(null);
      onSavedBuildsChanged();
    } catch {
      setSaveError('Could not delete build.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
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
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Wizard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase mb-3 ${TIER_BADGE_COLORS[build.tier]}`}>
              <Zap className="w-3 h-3" />
              {build.buildLabel}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">
              Your Perfect Build
            </h1>
            <p className="text-gray-400">{build.tagline}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {savedId ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-600/50 text-green-400 bg-green-900/20 text-sm font-bold tracking-wider uppercase">
                <Check className="w-4 h-4" />
                Saved
              </div>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white text-sm font-bold tracking-wider uppercase transition-all bg-gray-900/60 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Build'}
              </button>
            )}
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold tracking-wider uppercase transition-all ${
                shareCopied
                  ? 'border-green-600/50 text-green-400 bg-green-900/20'
                  : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white bg-gray-900/60'
              }`}
            >
              {shareCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              {shareCopied ? 'Link Copied!' : 'Share'}
            </button>
            {savedId && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-red-600/50 hover:text-red-400 text-sm font-bold tracking-wider uppercase transition-all bg-gray-900/60 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>

        {/* Error banner */}
        {saveError && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl border border-red-800/50 bg-red-950/30 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {saveError}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500 tracking-widest uppercase mb-0.5">Estimated Total</div>
              <div className="text-2xl font-black text-white">${build.totalCost.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-600/15 border border-orange-600/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500 tracking-widest uppercase mb-0.5">Performance Tier</div>
              <div className="text-2xl font-black text-white capitalize">{build.tier}</div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-500 tracking-widest uppercase mb-0.5">Components</div>
              <div className="text-2xl font-black text-white">{build.components.length} Parts</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Components */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-black text-white tracking-wide uppercase mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-500 rounded-full inline-block" />
              Recommended Components
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sorted.map((component) =>
                component ? <ComponentCard key={component.id} component={component} /> : null
              )}
            </div>
          </div>

          {/* FPS Metrics */}
          <div>
            <h2 className="text-lg font-black text-white tracking-wide uppercase mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
              FPS Estimates
            </h2>
            <div className="space-y-4">
              {selectedGames.map((game) => {
                if (!game) return null;
                const fps = build.fpsMetrics[game.id];
                if (!fps) return null;

                return (
                  <div
                    key={game.id}
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={game.coverImage}
                          alt={game.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-700 flex-shrink-0"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{game.name}</div>
                          <div className="text-xs text-gray-500">{game.genre}</div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-gray-800 border border-gray-700 rounded-full text-gray-400 font-bold">
                        {fps.resolution}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {(
                        [
                          { label: 'Low', value: fps.low, color: 'bg-green-500' },
                          { label: 'Medium', value: fps.medium, color: 'bg-yellow-500' },
                          { label: 'High', value: fps.high, color: 'bg-orange-500' },
                          { label: 'Ultra', value: fps.ultra, color: 'bg-red-500' },
                        ] as const
                      ).map(({ label, value, color }) => {
                        const maxFps = fps.low;
                        const pct = Math.round((value / maxFps) * 100);
                        return (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">{label}</span>
                              <span className="font-bold text-white">{value} fps</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${color} rounded-full transition-all`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {selectedGames.length === 0 && (
                <div className="text-center text-gray-600 text-sm py-8">
                  No games selected
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-700 mt-4 leading-relaxed">
              * FPS estimates are based on real-world benchmarks and may vary depending on system
              configuration, drivers, and in-game settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
