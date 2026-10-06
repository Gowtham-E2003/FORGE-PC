import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle, Zap } from 'lucide-react';
import { BuildRecommendation, WizardState, SavedBuild } from '../types';
import { supabase } from '../lib/supabase';
import { getBuildRecommendation } from '../data/recommendations';
import ResultsPage from './ResultsPage';

interface SharedBuildPageProps {
  buildId: string;
  onBack: () => void;
  onSavedBuildsChanged: () => void;
}

export default function SharedBuildPage({ buildId, onBack, onSavedBuildsChanged }: SharedBuildPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [build, setBuild] = useState<BuildRecommendation | null>(null);
  const [wizardState, setWizardState] = useState<WizardState | null>(null);

  useEffect(() => {
    const loadBuild = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: queryError } = await supabase
          .from('saved_builds')
          .select('*')
          .eq('id', buildId)
          .maybeSingle();

        if (queryError) throw queryError;
        if (!data) {
          setError('This build could not be found. It may have been deleted.');
          return;
        }

        const saved = data as SavedBuild;
        const recommendation = getBuildRecommendation(saved.games, saved.budget);
        setBuild(recommendation);
        setWizardState({ selectedGames: saved.games, budget: saved.budget });
      } catch {
        setError('Could not load this build. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadBuild();
  }, [buildId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-4" />
        <span className="text-gray-400 text-sm">Loading build...</span>
      </div>
    );
  }

  if (error || !build || !wizardState) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Builder
          </button>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-950/30 border border-red-800/40 flex items-center justify-center mb-5">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Build Not Found</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">{error ?? 'This build may have been deleted.'}</p>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold tracking-wider uppercase rounded-xl transition-colors"
            >
              <Zap className="w-4 h-4" />
              Build a PC
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResultsPage
      build={build}
      wizardState={wizardState}
      savedBuildId={buildId}
      onBack={onBack}
      onSavedBuildsChanged={onSavedBuildsChanged}
    />
  );
}
