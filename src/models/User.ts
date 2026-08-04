export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type AuthPersistedState = {
  profile: UserProfile | null;
  biometricsEnabled: boolean;
  lgpdConsentAcceptedAt: string | null;
  registrationCompletedAt: string | null;
};
