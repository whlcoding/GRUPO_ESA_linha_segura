import type { Ionicons } from '@expo/vector-icons';
import type { FakeAppId } from '@/models/CamouflageSettings';

export const FAKE_APPS: {
  id: FakeAppId;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  { id: 'calculator', name: 'Calculadora', icon: 'calculator', color: '#1F1F1F' },
  { id: 'notes', name: 'Notas', icon: 'document-text', color: '#F5C518' },
  { id: 'weather', name: 'Clima', icon: 'partly-sunny', color: '#3B82F6' },
];
