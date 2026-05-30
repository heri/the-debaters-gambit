import {
  apiRegister,
  apiSignIn,
  apiSignOut,
  apiGetMe,
  apiCompleteDrill,
  apiGetCompletedDrills,
  apiRecordGame,
  apiGetGames,
} from '../api';

const BASE = 'http://localhost:4001';

// ── Helpers ────────────────────────────────────────────────────────────────

function mockFetch(ok, json, status) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status: status ?? (ok ? 200 : 422),
    json: jest.fn().mockResolvedValue(json),
  });
}

function mockNetworkError() {
  global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
}

afterEach(() => {
  delete global.fetch;
  jest.clearAllMocks();
});

// ── apiRegister ────────────────────────────────────────────────────────────

describe('apiRegister', () => {
  test('POSTs to /api/users/register', async () => {
    mockFetch(true, { token: 'tok', user: { id: 1, email: 'a@b.com', name: 'Alice' } });
    await apiRegister('Alice', 'a@b.com', 'pass123');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/users/register`);
    expect(opts.method).toBe('POST');
  });

  test('sends name, email, password in body', async () => {
    mockFetch(true, { token: 'tok', user: {} });
    await apiRegister('Alice', 'a@b.com', 'pass123');
    const [, opts] = global.fetch.mock.calls[0];
    expect(JSON.parse(opts.body)).toEqual({ name: 'Alice', email: 'a@b.com', password: 'pass123' });
  });

  test('sets Content-Type application/json', async () => {
    mockFetch(true, { token: 'tok', user: {} });
    await apiRegister('Alice', 'a@b.com', 'pass');
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.headers['Content-Type']).toBe('application/json');
  });

  test('returns the full response on success', async () => {
    const payload = { token: 'tok', user: { id: 1, email: 'a@b.com', name: 'Alice' } };
    mockFetch(true, payload);
    const result = await apiRegister('Alice', 'a@b.com', 'pass');
    expect(result).toEqual(payload);
  });

  test('throws with server error message on failure', async () => {
    mockFetch(false, { error: 'email already taken' });
    await expect(apiRegister('Alice', 'taken@b.com', 'pass')).rejects.toThrow('email already taken');
  });

  test('thrown error has status property', async () => {
    mockFetch(false, { error: 'unprocessable' }, 422);
    try {
      await apiRegister('A', 'a@b.com', 'p');
    } catch (e) {
      expect(e.status).toBe(422);
    }
  });
});

// ── apiSignIn ──────────────────────────────────────────────────────────────

describe('apiSignIn', () => {
  test('POSTs to /api/users/sign_in', async () => {
    mockFetch(true, { token: 'tok', user: { id: 1 } });
    await apiSignIn('a@b.com', 'pass');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/users/sign_in`);
    expect(opts.method).toBe('POST');
  });

  test('sends email and password in body', async () => {
    mockFetch(true, { token: 'tok', user: {} });
    await apiSignIn('a@b.com', 'pass');
    const [, opts] = global.fetch.mock.calls[0];
    expect(JSON.parse(opts.body)).toEqual({ email: 'a@b.com', password: 'pass' });
  });

  test('returns token and user on success', async () => {
    const payload = { token: 'tok123', user: { id: 1, name: 'Alice' } };
    mockFetch(true, payload);
    const result = await apiSignIn('a@b.com', 'pass');
    expect(result.token).toBe('tok123');
    expect(result.user.name).toBe('Alice');
  });

  test('throws on invalid credentials', async () => {
    mockFetch(false, { error: 'invalid email or password' }, 401);
    await expect(apiSignIn('bad@b.com', 'wrong')).rejects.toThrow('invalid email or password');
  });
});

// ── apiSignOut ─────────────────────────────────────────────────────────────

describe('apiSignOut', () => {
  test('sends DELETE to /api/users/sign_out', async () => {
    mockFetch(true, { ok: true });
    await apiSignOut('mytoken');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/users/sign_out`);
    expect(opts.method).toBe('DELETE');
  });

  test('sends Authorization Bearer header', async () => {
    mockFetch(true, { ok: true });
    await apiSignOut('mytoken');
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.headers['Authorization']).toBe('Bearer mytoken');
  });

  test('silently resolves on network error', async () => {
    mockNetworkError();
    await expect(apiSignOut('tok')).resolves.toBeUndefined();
  });

  test('silently resolves on server error', async () => {
    mockFetch(false, { error: 'server error' }, 500);
    await expect(apiSignOut('tok')).resolves.toBeUndefined();
  });
});

// ── apiGetMe ───────────────────────────────────────────────────────────────

describe('apiGetMe', () => {
  test('GETs /api/users/me with Authorization header', async () => {
    mockFetch(true, { user: { id: 1 } });
    await apiGetMe('mytoken');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/users/me`);
    expect(opts.method).toBe('GET');
    expect(opts.headers['Authorization']).toBe('Bearer mytoken');
  });

  test('returns the user object on success', async () => {
    const user = { id: 1, email: 'a@b.com', name: 'Alice' };
    mockFetch(true, { user });
    expect(await apiGetMe('tok')).toEqual(user);
  });

  test('returns null on 401', async () => {
    mockFetch(false, { error: 'Unauthorized' }, 401);
    expect(await apiGetMe('badtoken')).toBeNull();
  });

  test('returns null on network error', async () => {
    mockNetworkError();
    expect(await apiGetMe('tok')).toBeNull();
  });
});

// ── apiCompleteDrill ───────────────────────────────────────────────────────

describe('apiCompleteDrill', () => {
  test('POSTs to /api/drills/:id/complete', async () => {
    mockFetch(true, { ok: true });
    await apiCompleteDrill('mytoken', 'm1');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/drills/m1/complete`);
    expect(opts.method).toBe('POST');
  });

  test('sends Authorization header', async () => {
    mockFetch(true, { ok: true });
    await apiCompleteDrill('mytoken', 'm1');
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.headers['Authorization']).toBe('Bearer mytoken');
  });

  test('silently resolves on network error', async () => {
    mockNetworkError();
    await expect(apiCompleteDrill('tok', 'm1')).resolves.toBeUndefined();
  });

  test('uses the drillId in the URL path', async () => {
    mockFetch(true, { ok: true });
    await apiCompleteDrill('tok', 'gold_card_7');
    const [url] = global.fetch.mock.calls[0];
    expect(url).toContain('/api/drills/gold_card_7/complete');
  });
});

// ── apiGetCompletedDrills ──────────────────────────────────────────────────

describe('apiGetCompletedDrills', () => {
  test('GETs /api/drills with Authorization header', async () => {
    mockFetch(true, { completed: [] });
    await apiGetCompletedDrills('tok');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/drills`);
    expect(opts.headers['Authorization']).toBe('Bearer tok');
  });

  test('returns the completed array on success', async () => {
    mockFetch(true, { completed: ['m1', 'm2', 's1'] });
    expect(await apiGetCompletedDrills('tok')).toEqual(['m1', 'm2', 's1']);
  });

  test('returns empty array when completed key is absent', async () => {
    mockFetch(true, {});
    expect(await apiGetCompletedDrills('tok')).toEqual([]);
  });

  test('returns empty array on network error', async () => {
    mockNetworkError();
    expect(await apiGetCompletedDrills('tok')).toEqual([]);
  });

  test('returns empty array on server error', async () => {
    mockFetch(false, { error: 'Unauthorized' }, 401);
    expect(await apiGetCompletedDrills('tok')).toEqual([]);
  });
});

// ── apiRecordGame ──────────────────────────────────────────────────────────

describe('apiRecordGame', () => {
  const gameData = { game_type: 'vs', winner_name: 'Alice', case_title: 'Pizza debate', round_count: 2 };

  test('POSTs to /api/games', async () => {
    mockFetch(true, { game: { id: 1 } });
    await apiRecordGame('tok', gameData);
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/games`);
    expect(opts.method).toBe('POST');
  });

  test('sends game data as JSON body', async () => {
    mockFetch(true, { game: { id: 1 } });
    await apiRecordGame('tok', gameData);
    const [, opts] = global.fetch.mock.calls[0];
    expect(JSON.parse(opts.body)).toEqual(gameData);
  });

  test('sends Authorization header', async () => {
    mockFetch(true, { game: { id: 1 } });
    await apiRecordGame('mytoken', gameData);
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.headers['Authorization']).toBe('Bearer mytoken');
  });

  test('silently resolves on network error', async () => {
    mockNetworkError();
    await expect(apiRecordGame('tok', gameData)).resolves.toBeUndefined();
  });
});

// ── apiGetGames ────────────────────────────────────────────────────────────

describe('apiGetGames', () => {
  test('GETs /api/games with Authorization header', async () => {
    mockFetch(true, { games: [] });
    await apiGetGames('tok');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toBe(`${BASE}/api/games`);
    expect(opts.method).toBe('GET');
    expect(opts.headers['Authorization']).toBe('Bearer tok');
  });

  test('returns games array on success', async () => {
    const games = [{ id: 1, winner_name: 'Alice' }, { id: 2, winner_name: 'Bob' }];
    mockFetch(true, { games });
    expect(await apiGetGames('tok')).toEqual(games);
  });

  test('returns empty array when games key is absent', async () => {
    mockFetch(true, {});
    expect(await apiGetGames('tok')).toEqual([]);
  });

  test('returns empty array on network error', async () => {
    mockNetworkError();
    expect(await apiGetGames('tok')).toEqual([]);
  });

  test('returns empty array on server error', async () => {
    mockFetch(false, { error: 'Unauthorized' }, 401);
    expect(await apiGetGames('tok')).toEqual([]);
  });
});
