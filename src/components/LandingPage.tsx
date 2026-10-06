import { WizardState } from '../types';
import BuildWizard from './BuildWizard';
import { Cpu, Zap, Shield, BarChart2 } from 'lucide-react';

interface LandingPageProps {
  onBuild: (state: WizardState) => void;
  onViewBuilds: () => void;
}

const FEATURES = [
  {
    icon: Cpu,
    title: 'Expert Curation',
    desc: 'Every component hand-picked by PC veterans for maximum compatibility and performance.',
  },
  {
    icon: BarChart2,
    title: 'Real FPS Estimates',
    desc: 'Benchmark-backed FPS data for your exact games at every quality setting.',
  },
  {
    icon: Shield,
    title: 'Fully Compatible',
    desc: 'Zero guesswork — every build is verified for socket, TDP, and power compatibility.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Your optimized build appears in seconds. No accounts, no waiting.',
  },
];

export default function LandingPage({ onBuild, onViewBuilds }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-950/20 rounded-full blur-[80px]" />
          <div className="absolute top-20 right-10 w-48 h-48 bg-orange-950/20 rounded-full blur-[60px]" />

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-950/40 border border-red-800/40 rounded-full text-xs font-bold text-red-400 tracking-widest uppercase mb-6">
            <Zap className="w-3 h-3" />
            AI-Powered PC Building
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="block text-white">Build the PC</span>
            <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              You Deserve
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
            Select your games and budget. We handle the rest — delivering a perfectly matched,
            performance-optimized build with real FPS benchmarks.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-12">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              10,000+ builds generated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              Updated weekly
            </span>
          </div>
        </div>

        {/* Build Wizard */}
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <BuildWizard onBuild={onBuild} />
          <div className="text-center mt-4">
            <button
              onClick={onViewBuilds}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors tracking-wide"
            >
              View My Saved Builds →
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll to learn more</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Why <span className="text-red-500">ForgePC</span>?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We cut through the noise so you spend less time researching and more time gaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group bg-gray-900/40 border border-gray-800 hover:border-red-800/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-950/20"
              >
                <div className="w-10 h-10 rounded-lg bg-red-600/15 border border-red-600/20 flex items-center justify-center mb-4 group-hover:bg-red-600/25 transition-colors">
                  <f.icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-bold text-white mb-2 tracking-wide">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-900 bg-gray-950/40 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5', label: 'Budget Tiers' },
            { value: '10+', label: 'Game Profiles' },
            { value: '30+', label: 'Curated Parts' },
            { value: '100%', label: 'Compatible Builds' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-red-500 mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-gray-700 text-sm">
        <p>© 2026 ForgePC. All rights reserved. Prices subject to change.</p>
      </footer>
    </div>
  );
}
