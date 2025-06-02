import type { PersistStorage } from "zustand/middleware";

import { isNullish } from "radashi";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface AuthCredentials {
  accessToken: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export interface AppState {
  isAuthenticated: boolean;
  credentials?: Readonly<AuthCredentials>;
  userInfo?: Readonly<UserInfo>;
}

function createStorage<Persisted>(): PersistStorage<Persisted> {
  const delegate = createJSONStorage<Persisted>(() => localStorage)!;

  return {
    getItem: delegate.getItem,
    setItem(name, value) {
      if (isNullish(value.state)) {
        return;
      }

      delegate.setItem(name, value);
    },
    removeItem: delegate.removeItem,
  };
}

export const useAppStore = createWithEqualityFn(
  persist(
    subscribeWithSelector<AppState>(() => {
      return {
        isAuthenticated: false,
      };
    }),
    {
      name: "__APP_STORE__",
      storage: createStorage<Pick<AppState, "isAuthenticated" | "credentials">>(),
      version: 1,
      partialize(state) {
        return {
          isAuthenticated: state.isAuthenticated,
          credentials: state.credentials,
        };
      },
    },
  ),
  shallow,
);
