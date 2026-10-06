import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import SavedBuildsPage from './components/SavedBuildsPage';
import SharedBuildPage from './components/SharedBuildPage';
import { BuildRecommendation, WizardState } from './types';
import { getBuildRecommendation } from './data/recommendations';
import { supabase } from './lib/supabase';

type View = 'landing' | 'results' | 'saved' | 'shared';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [build, setBuild] = useState<BuildRecommendation | null>(null);
  const [wizardState, setWizardState] = useState<WizardState | null>(null);
  const [sharedBuildId, setSharedBuildId] = useState<string | null>(null);
  const [savedBuildId, setSavedBuildId] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState(0);

  const refreshSavedCount = useCallback(async () => {
    try {
      const { count, error } = await supabase
        .from('saved_builds')
        .select('*', { count: 'exact', head: true });
      if (!error && count !== null) {
        setSavedCount(count);
      }
    } catch {
      // ignore – count is non-critical
    }
  }, []);

  useEffect(() => {
    refreshSavedCount();
    const params = new URLSearchParams(window.location.search);
    const buildId = params.get('build');
    if (buildId) {
      setSharedBuildId(buildId);
      setView('shared');
    }
  }, [refreshSavedCount]);

  const handleBuild = (state: WizardState) => {
    const recommendation = getBuildRecommendation(state.selectedGames, state.budget);
    setBuild(recommendation);
    setWizardState(state);
    setSavedBuildId(null);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (target: View) => {
    setView(target);
    if (target !== 'shared') {
      setSharedBuildId(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('build');
      window.history.replaceState({}, '', url.toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSavedBuild = (buildId: string) => {
    setSharedBuildId(buildId);
    setView('shared');
    const url = new URL(window.location.href);
    url.searchParams.set('build', buildId);
    window.history.replaceState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar
        onLogoClick={() => handleNavigate('landing')}
        onNavigate={handleNavigate}
        currentView={view}
        savedCount={savedCount}
      />
      {view === 'landing' && <LandingPage onBuild={handleBuild} onViewBuilds={() => handleNavigate('saved')} />}
      {view === 'results' && build && wizardState && (
        <ResultsPage
          build={build}
          wizardState={wizardState}
          savedBuildId={savedBuildId}
          onBack={() => handleNavigate('landing')}
          onSavedBuildsChanged={refreshSavedCount}
        />
      )}
      {view === 'saved' && (
        <SavedBuildsPage
          onBack={() => handleNavigate('landing')}
          onOpenBuild={handleOpenSavedBuild}
          onSavedBuildsChanged={refreshSavedCount}
        />
      )}
      {view === 'shared' && sharedBuildId && (
        <SharedBuildPage
          buildId={sharedBuildId}
          onBack={() => handleNavigate('landing')}
          onSavedBuildsChanged={refreshSavedCount}
        />
      )}
    </>
  );
}
