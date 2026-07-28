const isNode = typeof window === 'undefined';
const storage = isNode ? null : window.localStorage;

const readParam = (name, fallback = null) => {
  if (isNode) return fallback;
  const params = new URLSearchParams(window.location.search);
  const value = params.get(name);
  if (value) {
    storage.setItem(`wasl_${name}`, value);
    return value;
  }
  return storage.getItem(`wasl_${name}`) || fallback;
};

export const appParams = {
  appId: readParam('app_id', 'wasl-local'),
  token: readParam('access_token'),
  fromUrl: readParam('from_url', isNode ? '' : window.location.href),
};
