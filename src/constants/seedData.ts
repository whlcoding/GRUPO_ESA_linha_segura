import type { AuthorityContact } from '@/models/AuthorityContact';
import type { ChatConversation, ChatMessage } from '@/models/Chat';
import type { ForumComment, ForumPost } from '@/models/Forum';
import type { NotificationItem } from '@/models/NotificationItem';

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const SEED_FORUM_POSTS: ForumPost[] = [
  {
    id: 'seed-post-1',
    authorAlias: 'Anônima #48',
    title: 'Consegui pedir ajuda hoje',
    content:
      'Depois de meses juntando coragem, liguei para uma amiga e contei o que estava acontecendo. Só isso já me trouxe um alívio enorme. Se você está pensando em pedir ajuda, saiba que vale a pena.',
    createdAt: hoursAgo(3),
    likedByMe: false,
    likesCount: 12,
  },
  {
    id: 'seed-post-2',
    authorAlias: 'Anônima #12',
    title: 'Alguém mais sente medo de ser julgada?',
    content:
      'Às vezes eu sinto que ninguém vai acreditar em mim. Queria saber se outras pessoas aqui já passaram por isso e como lidaram.',
    createdAt: hoursAgo(26),
    likedByMe: false,
    likesCount: 8,
  },
];

export const SEED_FORUM_COMMENTS: ForumComment[] = [
  {
    id: 'seed-comment-1',
    postId: 'seed-post-1',
    authorAlias: 'Anônima #7',
    content: 'Que orgulho de você! Cada passo conta. 💜',
    createdAt: hoursAgo(2),
  },
  {
    id: 'seed-comment-2',
    postId: 'seed-post-2',
    authorAlias: 'Anônima #31',
    content: 'Já senti isso também. Aqui você pode falar sem medo, estamos juntas nessa.',
    createdAt: hoursAgo(20),
  },
];

export const SEED_CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'seed-chat-hotline',
    title: 'Linha de Apoio 24h',
    subtitle: 'Equipe de plantão',
    lastMessagePreview: 'Estamos aqui sempre que precisar.',
    lastMessageAt: hoursAgo(1),
    unreadCount: 1,
  },
  {
    id: 'seed-chat-psychologist',
    title: 'Psicóloga Ana',
    subtitle: 'Atendimento psicológico',
    lastMessagePreview: 'Podemos conversar quando você quiser.',
    lastMessageAt: hoursAgo(30),
    unreadCount: 0,
  },
];

export const SEED_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-msg-1',
    conversationId: 'seed-chat-hotline',
    sender: 'other',
    text: 'Olá! Este é um espaço seguro e sigiloso. Estamos aqui sempre que precisar.',
    sentAt: hoursAgo(1),
  },
  {
    id: 'seed-msg-2',
    conversationId: 'seed-chat-psychologist',
    sender: 'other',
    text: 'Oi! Fico à disposição para conversar quando você se sentir confortável.',
    sentAt: hoursAgo(30),
  },
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'seed-notification-1',
    type: 'chat',
    title: 'Nova mensagem',
    body: 'Linha de Apoio 24h respondeu sua mensagem.',
    createdAt: hoursAgo(1),
    read: false,
  },
  {
    id: 'seed-notification-2',
    type: 'forum',
    title: 'Apoio no fórum',
    body: 'Alguém comentou na sua publicação recente.',
    createdAt: hoursAgo(4),
    read: false,
  },
  {
    id: 'seed-notification-3',
    type: 'security',
    title: 'Dica de segurança',
    body: 'Lembre-se de manter seu PIN em segredo e ativar a biometria.',
    createdAt: hoursAgo(24),
    read: true,
  },
];

export const AUTHORITY_CONTACTS: AuthorityContact[] = [
  {
    id: 'authority-190',
    name: 'Polícia Militar',
    phone: '190',
    type: 'police',
    description: 'Emergência policial 24h. Acione em caso de risco imediato.',
  },
  {
    id: 'authority-180',
    name: 'Central de Atendimento à Mulher',
    phone: '180',
    type: 'hotline',
    description: 'Orientação, denúncia e acolhimento para mulheres em situação de violência.',
  },
  {
    id: 'authority-100',
    name: 'Disque Direitos Humanos',
    phone: '100',
    type: 'hotline',
    description: 'Canal para denúncias de violações de direitos humanos.',
  },
  {
    id: 'authority-defensoria',
    name: 'Defensoria Pública',
    phone: '129',
    type: 'legal',
    description: 'Assistência jurídica gratuita para medidas protetivas e processos.',
  },
  {
    id: 'authority-samu',
    name: 'SAMU',
    phone: '192',
    type: 'health',
    description: 'Atendimento médico de urgência.',
  },
];
