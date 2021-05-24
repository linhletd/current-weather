import store from 'store';

export function isLoggedIn() {
  return !!store.get('loggedIn');
}

export function login(data) {
  store.set('loggedIn', true);
  store.set('user', data);
}

export function logout() {
  store.set('loggedIn', false);
  store.set('user', null);
  store.set('permission', null);
  store.set('role', null);
  store.set('info', null);
}

export function getToken() {
  if (!isLoggedIn()) {
    return '';
  } else {
    return store.get('user').accessToken;
  }
}

export function getRefreshToken() {
  if (!isLoggedIn()) {
    return '';
  } else {
    return store.get('user').refreshToken;
  }
}

export function storePermission(data) {
  store.set('permission', data);
}

export function getPermission() {
  if (!isLoggedIn()) {
    return [];
  } else {
    return store.get('permission') || [];
  }
}
export function getRole() {
  if (!isLoggedIn()) {
    return [];
  } else {
    return store.get('role') || [];
  }
}
export function storeInfo(data) {
  store.set('info', data);
}

export function getInfo() {
  if (!isLoggedIn()) {
    return {};
  } else {
    return { ...store.get('info'), userId: store.get('user').userId };
  }
}
export function getUser() {
  return { ...store.get('user') };
}
