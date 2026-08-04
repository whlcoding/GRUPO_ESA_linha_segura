import * as LocalAuthentication from 'expo-local-authentication';

export async function isBiometricsAvailable(): Promise<boolean> {
  const [hasHardware, isEnrolled] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
  ]);
  return hasHardware && isEnrolled;
}

export async function authenticateWithBiometrics(promptMessage: string): Promise<boolean> {
  const available = await isBiometricsAvailable();
  if (!available) return false;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage,
    cancelLabel: 'Cancelar',
    disableDeviceFallback: true,
  });
  return result.success;
}
