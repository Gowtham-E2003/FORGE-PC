import { Game } from '../types';

export const GAMES: Game[] = [
  {
    id: 'cyberpunk2077',
    name: 'Cyberpunk 2077',
    genre: 'RPG / Open World',
    coverImage: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    demandLevel: 'extreme',
  },
  {
    id: 'elden_ring',
    name: 'Elden Ring',
    genre: 'Action RPG',
    coverImage: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
    demandLevel: 'high',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    genre: 'Tactical Shooter',
    coverImage: 'https://images.pexels.com/photos/7862496/pexels-photo-7862496.jpeg',
    demandLevel: 'low',
  },
  {
    id: 'warzone',
    name: 'Call of Duty: Warzone',
    genre: 'Battle Royale',
    coverImage: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    demandLevel: 'high',
  },
  {
    id: 'hogwarts_legacy',
    name: 'Hogwarts Legacy',
    genre: 'Action RPG',
    coverImage: 'https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg',
    demandLevel: 'extreme',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    genre: 'Battle Royale',
    coverImage: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg',
    demandLevel: 'medium',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    genre: 'Sandbox',
    coverImage: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    demandLevel: 'low',
  },
  {
    id: 'starfield',
    name: 'Starfield',
    genre: 'RPG / Space',
    coverImage: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
    demandLevel: 'extreme',
  },
  {
    id: 'apex_legends',
    name: 'Apex Legends',
    genre: 'Battle Royale',
    coverImage: 'https://images.pexels.com/photos/3945686/pexels-photo-3945686.jpeg',
    demandLevel: 'medium',
  },
  {
    id: 'baldurs_gate3',
    name: "Baldur's Gate 3",
    genre: 'RPG',
    coverImage: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
    demandLevel: 'high',
  },
];

export const BUDGET_OPTIONS = [
  { label: '$500 – Entry Level', value: 500 },
  { label: '$750 – Budget Gaming', value: 750 },
  { label: '$1,000 – Mid-Range', value: 1000 },
  { label: '$1,500 – High Performance', value: 1500 },
  { label: '$2,000 – Ultra Gaming', value: 2000 },
  { label: '$2,500 – Enthusiast', value: 2500 },
  { label: '$3,000+ – No Limits', value: 3000 },
];
