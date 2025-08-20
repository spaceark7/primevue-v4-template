import SecureLS from 'secure-ls';
import { APP_CONFIG } from './Config';

function fnAppStorage() {
  const secureLS = new SecureLS();

  const clearLocal = () => {
    Object.keys(localStorage)
      .filter((x) => x.startsWith(APP_CONFIG.STORAGE_KEY))
      .forEach((x) => localStorage.removeItem(x));
  };

  const clearSession = () => {
    Object.keys(sessionStorage)
      .filter((x) => x.startsWith(APP_CONFIG.STORAGE_KEY))
      .forEach((x) => sessionStorage.removeItem(x));
  };

  return {
    setItem: (
      key: string,
      value: object | string | number | boolean | [] | null,
    ): void => {
      secureLS.set(key, value);
    },
    setItemLocalS: (key: string, value: string): void => {
      secureLS.setDataToLocalStorage(key, value);
    },
    getItem: (key: string) => {
      return secureLS.get(key);
    },
    getItemLocalS: (key: string) => {
      return secureLS.getDataFromLocalStorage(key);
    },
    removeItem: (key: string): void => {
      secureLS.remove(key);
    },
    clear: (type: 'session' | 'local' | 'all' = 'local') => {
      if (type === 'session') {
        clearSession();
      } else if (type === 'local') {
        clearLocal();
      } else {
        clearSession();
        clearLocal();
      }
    },
  };
}
export const secureStorage = fnAppStorage();
