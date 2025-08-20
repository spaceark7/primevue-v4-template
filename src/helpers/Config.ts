const APP = {
  STORAGE_KEY: import.meta.env.VITE_APP_NAME || 'my_app',
  API_URL: import.meta.env.VITE_APP_API_URL || 'https://api.example.com',
  // Add other app-wide constants here
}

export const APP_CONFIG = APP;
