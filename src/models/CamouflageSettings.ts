export type FakeAppId = 'calculator' | 'notes' | 'weather';

export type CamouflageSettings = {
  enabled: boolean;
  selectedFakeAppId: FakeAppId;
};
