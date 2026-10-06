import { Cpu, Zap, FolderOpen, Home } from 'lucide-react';

type View = 'landing' | 'results' | 'saved' | 'shared';

interface NavbarProps {
  onLogoClick: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
  savedCount: number;
}

export default function Navbar({ onLogoClick, onNavigate, currentView, savedCount }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative">
            <Cpu className="w-7 h-7 text-red-500 group-hover:text-red-400 transition-colors" />
            <Zap className="w-3 h-3 text-orange-400 absolute -top-1 -right-1" />
          </div>
          <span className="text-xl font-black tracking-widest text-white uppercase">
            Forge<span className="text-red-500">PC</span>
          </span>
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('landing')}
            className={`text-sm font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
              currentView === 'landing' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Builder</span>
          </button>
          <button
            onClick={() => onNavigate('saved')}
            className={`text-sm font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 relative ${
              currentView === 'saved' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span className="hidden sm:inline">My Builds</span>
            {savedCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
