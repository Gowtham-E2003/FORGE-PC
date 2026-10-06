export type BudgetTier = 'budget' | 'mid' | 'high' | 'ultra' | 'enthusiast';

export interface Game {
  id: string;
  name: string;
  genre: string;
  coverImage: string;
  demandLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface ComponentSpec {
  id: string;
  category: 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU';
  name: string;
  brand: string;
  price: number;
  specs: string[];
  tier: BudgetTier;
  imageUrl?: string;
  buyLink?: string;
}

export interface FPSMetric {
  resolution: '1080p' | '1440p' | '4K';
  low: number;
  medium: number;
  high: number;
  ultra: number;
}

export interface BuildRecommendation {
  tier: BudgetTier;
  totalCost: number;
  components: ComponentSpec[];
  fpsMetrics: Record<string, FPSMetric>;
  buildLabel: string;
  tagline: string;
}

export interface WizardState {
  selectedGames: string[];
  budget: number;
}

export interface SavedBuild {
  id: string;
  build_label: string;
  tier: BudgetTier;
  total_cost: number;
  games: string[];
  budget: number;
  components: string[];
  created_at: string;
}
