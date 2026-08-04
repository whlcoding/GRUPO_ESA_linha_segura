export type EmergencyAlertStatus = 'sent' | 'cancelled';

export type EmergencyAlert = {
  id: string;
  triggeredAt: string;
  cancelledAt: string | null;
  status: EmergencyAlertStatus;
};
