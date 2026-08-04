import { colors } from './tokens';

export const primaryGradient = {
  colors: [colors.background.gradientStart, colors.background.gradientEnd] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export const panicGradient = {
  colors: ['#E63950', '#B91C3C'] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};
