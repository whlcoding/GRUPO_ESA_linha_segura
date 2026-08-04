export type AuthorityContactType = 'police' | 'hotline' | 'legal' | 'health';

export type AuthorityContact = {
  id: string;
  name: string;
  phone: string;
  type: AuthorityContactType;
  description: string;
};

export type AuthorityMessageLog = {
  id: string;
  authorityContactId: string;
  message: string;
  sentAt: string;
};
