import { type PropsWithChildren, useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import { useAuthStore } from '@/store/useAuthStore';
import { useCamouflageStore } from '@/store/useCamouflageStore';

export function AppLockProvider({ children }: PropsWithChildren) {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      const goingToBackground =
        appState.current === 'active' && /inactive|background/.test(nextState);

      if (goingToBackground) {
        const { hasAccount, lock } = useAuthStore.getState();
        if (hasAccount) lock();
        useCamouflageStore.getState().reengage();
      }

      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  return <>{children}</>;
}
