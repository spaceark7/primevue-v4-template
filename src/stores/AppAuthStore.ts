import type { AuthEntity } from "@/core/auth/AuthEntity";
import { APP_CONFIG } from "@/helpers/Config";
import { secureStorage } from "@/helpers/SecureLS";
import type { PartialBy } from "@/types/Type";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";




const storageKey = APP_CONFIG.STORAGE_KEY + "_AuthStore";
export const useAppAuthStore = defineStore('AppAuthStore', () => {
  const state = useStorage<PartialBy<AuthEntity, 'accessToken'>>(
    storageKey,
    null,
    secureStorage,
    {
      serializer: {
        read: (v: any) => {
          let returnV: any = null;
          if (v) {
            try {
              returnV = JSON.parse(v);
            } catch (e) {
              console.error('[AppADStore] AppADState', 'read:error', e);
              returnV = secureStorage.getItem(storageKey);
              returnV = JSON.parse(returnV);
            }
          }
          return returnV;
        },
        write: (v: any) => {
          return JSON.stringify(v);
        },
      },
      listenToStorageChanges: false,
      mergeDefaults: true,
    },
  );

  //#region Computes
  const getState = computed(() => {
    return state.value;
  });
  //#endregion Computes

  //#region Actions
  const setState = async (newState: Partial<AuthEntity>) => {
    state.value = { ...state.value, ...newState };
    return true
  };

  const resetState = () => {
    state.value = null;
    return true;
  };

  //* Custom
  const getSecureState = () => {
    let secureState;

    const appADState = secureStorage.getItem(storageKey);
    if (appADState) {
      secureState = JSON.parse(appADState) as AuthEntity;
    }

    console.log('[AppADStore] getSecureState:', secureState);
    return secureState;
  };

  //* Auth Helper
  const isAuthenticated = () => {
    let v = false;

    const secureState = getSecureState();
    if (secureState) {
      v = secureState?.accessToken ? true : false;
    }

    console.log('[AppADStore] isAuthenticated:', v);
    return v;
  };

  const logout = async () => {
    const currentState = getState.value;

    if (isAuthenticated()) {
      delete currentState?.accessToken;
      // const { AzureLogout } = useAzureOauth();
      // await AzureLogout();
    }

    state.value = {
      ...currentState,
    };

    secureStorage.clear('session');

    console.log('[AppADStore] logout:', state.value);
  };

  return {
    getState,
    setState,
    resetState,
    isAuthenticated,
    logout,
  };
})
