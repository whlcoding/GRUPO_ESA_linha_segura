import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type CredentialName = 'pin' | 'password';

function keysFor(name: CredentialName) {
  return { hash: `safeline.${name}.hash`, salt: `safeline.${name}.salt` };
}

// expo-secure-store has no web implementation; fall back to AsyncStorage there.
// Only affects the `expo start --web` preview — production targets iOS/Android.
const isWeb = Platform.OS === 'web';

async function setItem(key: string, value: string) {
  if (isWeb) return AsyncStorage.setItem(key, value);
  return SecureStore.setItemAsync(key, value);
}

async function getItem(key: string) {
  if (isWeb) return AsyncStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function removeItem(key: string) {
  if (isWeb) return AsyncStorage.removeItem(key);
  return SecureStore.deleteItemAsync(key);
}

export const credentialStore = {
  async save(name: CredentialName, hash: string, salt: string) {
    const keys = keysFor(name);
    await setItem(keys.hash, hash);
    await setItem(keys.salt, salt);
  },
  async read(name: CredentialName) {
    const keys = keysFor(name);
    const [hash, salt] = await Promise.all([getItem(keys.hash), getItem(keys.salt)]);
    return hash && salt ? { hash, salt } : null;
  },
  async clear(name: CredentialName) {
    const keys = keysFor(name);
    await Promise.all([removeItem(keys.hash), removeItem(keys.salt)]);
  },
  async clearAll() {
    await Promise.all([this.clear('pin'), this.clear('password')]);
  },
};
