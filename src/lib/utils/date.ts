import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function relativeTime(iso: string): string {
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ptBR });
}

export function formatDate(iso: string, pattern = "dd 'de' MMMM 'de' yyyy"): string {
  return format(new Date(iso), pattern, { locale: ptBR });
}

export function nowIso(): string {
  return new Date().toISOString();
}
