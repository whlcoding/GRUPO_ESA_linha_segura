export type RegisterDraft = {
  name: string;
  email: string;
  phone: string;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  RegisterStep1: undefined;
  RegisterStep2Pin: RegisterDraft;
  RegisterStep3Consent: RegisterDraft;
  SupportIntro: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  EmergencyAlert: undefined;
  DiaryList: undefined;
  DiaryEntryForm: { entryId?: string };
  ContactsList: undefined;
  AddContact: undefined;
  EditContact: { contactId: string };
  Notifications: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ForumTab: undefined;
  GuidanceTab: undefined;
  SecurityTab: undefined;
  ChatTab: undefined;
};

export type ForumStackParamList = {
  ForumList: undefined;
  ForumPostDetail: { postId: string };
  ForumNewPost: undefined;
};

export type ChatStackParamList = {
  ChatConversationsList: undefined;
  ChatConversation: { conversationId: string };
};

export type GuidanceStackParamList = {
  Guidance: undefined;
  AuthorityContactsList: undefined;
  AuthorityContactDetail: { authorityContactId: string };
  AuthorityMessageSent: { authorityContactId: string };
};

export type SecurityStackParamList = {
  SecuritySettings: undefined;
  ChangePin: undefined;
  CamouflageSettings: undefined;
  FakeAppSelector: undefined;
  FakeAppActivated: undefined;
};
