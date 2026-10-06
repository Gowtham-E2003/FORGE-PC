import { ShoppingCart, Cpu, Monitor, CircuitBoard, MemoryStick, HardDrive, Zap, ExternalLink } from 'lucide-react';
import { ComponentSpec } from '../types';

interface ComponentCardProps {
  component: ComponentSpec;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  CPU: Cpu,
  GPU: Monitor,
  Motherboard: CircuitBoard,
  RAM: MemoryStick,
  Storage: HardDrive,
  PSU: Zap,
};

const CATEGORY_COLORS: Record<string, string> = {
  CPU: 'text-red-400 bg-red-900/20 border-red-800/30',
  GPU: 'text-orange-400 bg-orange-900/20 border-orange-800/30',
  Motherboard: 'text-blue-400 bg-blue-900/20 border-blue-800/30',
  RAM: 'text-green-400 bg-green-900/20 border-green-800/30',
  Storage: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/30',
  PSU: 'text-gray-400 bg-gray-800/40 border-gray-700/30',
};

function getBuyLink(component: ComponentSpec): string {
  const query = encodeURIComponent(`${component.brand} ${component.name}`);
  return `https://www.amazon.com/s?k=${query}`;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const Icon = CATEGORY_ICONS[component.category] ?? Cpu;
  const colorClass = CATEGORY_COLORS[component.category] ?? 'text-gray-400 bg-gray-800/40 border-gray-700/30';
  const buyLink = component.buyLink ?? getBuyLink(component);

  return (
    <div className="group bg-gray-900/50 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colorClass}`}>
            <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">
              {component.category}
            </div>
            <div className="text-xs text-gray-600">{component.brand}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-black text-white">${component.price.toLocaleString()}</div>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base font-bold text-white mb-3 leading-tight">
        {component.name}
      </h3>

      {/* Specs */}
      <ul className="flex-1 space-y-1.5 mb-5">
        {component.specs.map((spec) => (
          <li key={spec} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full bg-red-500/60 flex-shrink-0" />
            {spec}
          </li>
        ))}
      </ul>

      {/* Buy Button */}
      <a
        href={buyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 bg-gray-800 hover:bg-red-600 border border-gray-700 hover:border-red-500 rounded-xl text-xs font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
      >
        <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
        Buy Now
        <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
      </a>
    </div>
  );
}
