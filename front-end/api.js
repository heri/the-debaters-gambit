// API service — thin wrappers around fetch to the Phoenix back-end.
// All functions are fire-and-forget safe: network errors never crash the app.

const BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4001';

const apiFetch = async (path, { token, method = 'GET', body } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    const err = new Error(json.error || 'Request failed');
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
};

// ── Auth ───────────────────────────────────────────────────────────────────

export const apiRegister = (name, email, password) =>
  apiFetch('/api/users/register', {
    method: 'POST',
    body: { name, email, password },
  });

export const apiSignIn = (email, password) =>
  apiFetch('/api/users/sign_in', {
    method: 'POST',
    body: { email, password },
  });

export const apiSignOut = (token) =>
  apiFetch('/api/users/sign_out', { method: 'DELETE', token }).catch(() => {});

// Returns the user object if token is valid, null otherwise
export const apiGetMe = async (token) => {
  try {
    const data = await apiFetch('/api/users/me', { token });
    return data.user;
  } catch {
    return null;
  }
};

// ── Drills ─────────────────────────────────────────────────────────────────

export const apiCompleteDrill = (token, drillId) =>
  apiFetch(`/api/drills/${drillId}/complete`, { method: 'POST', token }).catch(() => {});

export const apiGetCompletedDrills = async (token) => {
  try {
    const data = await apiFetch('/api/drills', { token });
    return data.completed ?? [];
  } catch {
    return [];
  }
};

// ── Games ──────────────────────────────────────────────────────────────────

// gameData: { game_type, winner_name, case_title, round_count }
export const apiRecordGame = (token, gameData) =>
  apiFetch('/api/games', { method: 'POST', token, body: gameData }).catch(() => {});

export const apiGetGames = async (token) => {
  try {
    const data = await apiFetch('/api/games', { token });
    return data.games ?? [];
  } catch {
    return [];
  }
};
