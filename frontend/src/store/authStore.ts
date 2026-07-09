const ACCESS_TOKEN_KEY = 'attendance_access_token';

let accessToken: string | null =
  typeof window !== 'undefined' ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const getAccessToken = (): string | null => {
  return accessToken;
};