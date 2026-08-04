export const colors = {
  background: {
    gradientStart: '#241B4D',
    gradientEnd: '#6E4FB0',
  },
  surface: {
    default: '#FFFFFF',
    muted: '#F4F2FA',
    overlay: 'rgba(255,255,255,0.12)',
  },
  primary: {
    default: '#4C3A8F',
    accent: '#8B5CF6',
  },
  danger: {
    default: '#E63950',
    muted: '#FCE4E8',
  },
  success: {
    default: '#2FA36B',
    muted: '#E3F5EC',
  },
  warning: {
    default: '#D98C1C',
    muted: '#FBEBD3',
  },
  text: {
    onDark: '#FFFFFF',
    onDarkMuted: 'rgba(255,255,255,0.72)',
    primary: '#1F1B3D',
    secondary: '#6B7280',
    disabled: '#A1A1AA',
  },
  border: {
    subtle: 'rgba(255,255,255,0.16)',
    light: '#E7E4F2',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  heading1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  heading2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  heading3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
} as const;

export const shadows = {
  card: {
    shadowColor: '#1F1B3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
} as const;
