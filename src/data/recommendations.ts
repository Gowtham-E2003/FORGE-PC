import { BudgetTier, BuildRecommendation, FPSMetric, Game } from '../types';
import { COMPONENTS } from './components';
import { GAMES } from './games';

function getTier(budget: number): BudgetTier {
  if (budget <= 600) return 'budget';
  if (budget <= 1000) return 'mid';
  if (budget <= 1600) return 'high';
  if (budget <= 2200) return 'ultra';
  return 'enthusiast';
}

function getTierLabel(tier: BudgetTier): { label: string; tagline: string } {
  const map: Record<BudgetTier, { label: string; tagline: string }> = {
    budget: { label: 'Entry Rig', tagline: 'Get into the game without breaking the bank' },
    mid: { label: 'Mid-Range Beast', tagline: 'Smooth 1080p & capable 1440p gaming' },
    high: { label: 'Performance Pro', tagline: 'Dominate at 1440p, capable 4K' },
    ultra: { label: 'Ultra Destroyer', tagline: 'Max settings. Every game. No compromises' },
    enthusiast: { label: 'Enthusiast Apex', tagline: 'The pinnacle of consumer gaming hardware' },
  };
  return map[tier];
}

const FPS_TABLE: Record<BudgetTier, Record<string, FPSMetric>> = {
  budget: {
    cyberpunk2077:   { resolution: '1080p', low: 72, medium: 48, high: 28, ultra: 18 },
    elden_ring:      { resolution: '1080p', low: 90, medium: 68, high: 50, ultra: 34 },
    valorant:        { resolution: '1080p', low: 280, medium: 220, high: 175, ultra: 140 },
    warzone:         { resolution: '1080p', low: 100, medium: 72, high: 55, ultra: 38 },
    hogwarts_legacy: { resolution: '1080p', low: 65, medium: 44, high: 28, ultra: 16 },
    fortnite:        { resolution: '1080p', low: 165, medium: 130, high: 95, ultra: 68 },
    minecraft:       { resolution: '1080p', low: 320, medium: 280, high: 240, ultra: 200 },
    starfield:       { resolution: '1080p', low: 58, medium: 42, high: 28, ultra: 18 },
    apex_legends:    { resolution: '1080p', low: 145, medium: 112, high: 88, ultra: 62 },
    baldurs_gate3:   { resolution: '1080p', low: 88, medium: 66, high: 48, ultra: 32 },
  },
  mid: {
    cyberpunk2077:   { resolution: '1080p', low: 138, medium: 105, high: 78, ultra: 52 },
    elden_ring:      { resolution: '1080p', low: 165, medium: 140, high: 115, ultra: 88 },
    valorant:        { resolution: '1080p', low: 480, medium: 400, high: 340, ultra: 280 },
    warzone:         { resolution: '1080p', low: 160, medium: 130, high: 105, ultra: 78 },
    hogwarts_legacy: { resolution: '1080p', low: 125, medium: 98, high: 72, ultra: 48 },
    fortnite:        { resolution: '1080p', low: 320, medium: 265, high: 215, ultra: 162 },
    minecraft:       { resolution: '1080p', low: 500, medium: 450, high: 400, ultra: 340 },
    starfield:       { resolution: '1080p', low: 112, medium: 88, high: 65, ultra: 44 },
    apex_legends:    { resolution: '1080p', low: 260, medium: 215, high: 175, ultra: 138 },
    baldurs_gate3:   { resolution: '1080p', low: 155, medium: 128, high: 98, ultra: 72 },
  },
  high: {
    cyberpunk2077:   { resolution: '1440p', low: 148, medium: 118, high: 88, ultra: 62 },
    elden_ring:      { resolution: '1440p', low: 180, medium: 165, high: 145, ultra: 118 },
    valorant:        { resolution: '1440p', low: 520, medium: 460, high: 390, ultra: 320 },
    warzone:         { resolution: '1440p', low: 175, medium: 148, high: 118, ultra: 90 },
    hogwarts_legacy: { resolution: '1440p', low: 138, medium: 110, high: 84, ultra: 58 },
    fortnite:        { resolution: '1440p', low: 340, medium: 290, high: 245, ultra: 195 },
    minecraft:       { resolution: '1440p', low: 520, medium: 480, high: 430, ultra: 380 },
    starfield:       { resolution: '1440p', low: 125, medium: 100, high: 78, ultra: 55 },
    apex_legends:    { resolution: '1440p', low: 280, medium: 240, high: 198, ultra: 158 },
    baldurs_gate3:   { resolution: '1440p', low: 168, medium: 145, high: 115, ultra: 88 },
  },
  ultra: {
    cyberpunk2077:   { resolution: '1440p', low: 188, medium: 155, high: 122, ultra: 90 },
    elden_ring:      { resolution: '1440p', low: 240, medium: 215, high: 192, ultra: 165 },
    valorant:        { resolution: '1440p', low: 600, medium: 560, high: 500, ultra: 440 },
    warzone:         { resolution: '1440p', low: 210, medium: 180, high: 150, ultra: 118 },
    hogwarts_legacy: { resolution: '1440p', low: 172, medium: 145, high: 115, ultra: 85 },
    fortnite:        { resolution: '1440p', low: 420, medium: 370, high: 320, ultra: 265 },
    minecraft:       { resolution: '1440p', low: 600, medium: 560, high: 510, ultra: 460 },
    starfield:       { resolution: '1440p', low: 158, medium: 132, high: 105, ultra: 78 },
    apex_legends:    { resolution: '1440p', low: 340, medium: 295, high: 250, ultra: 205 },
    baldurs_gate3:   { resolution: '1440p', low: 215, medium: 185, high: 155, ultra: 120 },
  },
  enthusiast: {
    cyberpunk2077:   { resolution: '4K', low: 142, medium: 118, high: 92, ultra: 68 },
    elden_ring:      { resolution: '4K', low: 240, medium: 215, high: 195, ultra: 172 },
    valorant:        { resolution: '4K', low: 600, medium: 580, high: 540, ultra: 500 },
    warzone:         { resolution: '4K', low: 185, medium: 158, high: 132, ultra: 108 },
    hogwarts_legacy: { resolution: '4K', low: 155, medium: 128, high: 102, ultra: 78 },
    fortnite:        { resolution: '4K', low: 480, medium: 430, high: 380, ultra: 320 },
    minecraft:       { resolution: '4K', low: 600, medium: 580, high: 560, ultra: 540 },
    starfield:       { resolution: '4K', low: 142, medium: 118, high: 94, ultra: 72 },
    apex_legends:    { resolution: '4K', low: 380, medium: 340, high: 295, ultra: 248 },
    baldurs_gate3:   { resolution: '4K', low: 248, medium: 218, high: 185, ultra: 150 },
  },
};

function getFallbackFPS(tier: BudgetTier): FPSMetric {
  const defaults: Record<BudgetTier, FPSMetric> = {
    budget:     { resolution: '1080p', low: 90, medium: 65, high: 45, ultra: 30 },
    mid:        { resolution: '1080p', low: 150, medium: 120, high: 90, ultra: 65 },
    high:       { resolution: '1440p', low: 160, medium: 130, high: 100, ultra: 75 },
    ultra:      { resolution: '1440p', low: 200, medium: 170, high: 140, ultra: 105 },
    enthusiast: { resolution: '4K', low: 165, medium: 138, high: 112, ultra: 85 },
  };
  return defaults[tier];
}

export function getBuildRecommendation(
  gameIds: string[],
  budget: number
): BuildRecommendation {
  const tier = getTier(budget);
  const { label, tagline } = getTierLabel(tier);

  const components = COMPONENTS.filter((c) => c.tier === tier);

  const fpsMetrics: Record<string, FPSMetric> = {};
  const selectedGames: Game[] = gameIds
    .map((id) => GAMES.find((g) => g.id === id))
    .filter(Boolean) as Game[];

  for (const game of selectedGames) {
    fpsMetrics[game.id] = FPS_TABLE[tier][game.id] ?? getFallbackFPS(tier);
  }

  const totalCost = components.reduce((sum, c) => sum + c.price, 0);

  return {
    tier,
    totalCost,
    components,
    fpsMetrics,
    buildLabel: label,
    tagline,
  };
}
