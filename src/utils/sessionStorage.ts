/**
 * Session storage utility for managing page data
 */

export const sessionStorage = {
  set: (key: string, data: unknown) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save to session: ${key}`, error);
    }
  },

  get: <T,>(key: string): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to retrieve from session: ${key}`, error);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove from session: ${key}`, error);
    }
  },

  clear: () => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Failed to clear session', error);
    }
  },
};
