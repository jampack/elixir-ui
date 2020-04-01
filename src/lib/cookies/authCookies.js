export function setAuthCookie(token, refreshToken, tokenExpiresIn, sessionOnly = false) {
  const date = new Date();
  // Minus one minute in case token is set in last moments
  date.setSeconds(date.getSeconds() + tokenExpiresIn - 60);
  if (!sessionOnly) {
    window.$cookies.set('access_token', token, 0);
    window.$cookies.set('refresh_token', refreshToken, 0);
    window.$cookies.set('token_valid_till', date.getTime(), 0);
    window.$cookies.set('token_session_only', true, 0);
  } else {
    window.$cookies.remove('token_session_only');
    window.$cookies.set('access_token', token, '1d');
    window.$cookies.set('refresh_token', refreshToken, date);
    window.$cookies.set('token_valid_till', date.getTime(), date);
  }
}

export function tokenExist() {
  return window.$cookies.isKey('access_token');
}

export function refreshTokenExist() {
  return window.$cookies.isKey('refresh_token');
}

export function tokenSessionOnly() {
  return window.$cookies.isKey('token_session_only');
}

export function isTokenValid() {
  if (window.$cookies.isKey('token_valid_till') && tokenExist() && refreshTokenExist()) {
    const ttl = window.$cookies.get('token_valid_till');
    const currentTime = new Date().getTime();
    if (currentTime < ttl) {
      return true;
    }
  }
  return false;
}

export function getToken() {
  if (window.$cookies.isKey('access_token')) {
    return window.$cookies.get('access_token');
  }
  return null;
}

export function getRefreshToken() {
  if (window.$cookies.isKey('refresh_token')) {
    return window.$cookies.get('refresh_token');
  }
  return null;
}

export function unsetToken() {
  window.$cookies.remove('access_token');
}

export function unsetAuthCookie() {
  window.$cookies.remove('access_token');
  window.$cookies.remove('refresh_token');
  window.$cookies.remove('token_valid_till');
  window.$cookies.remove('token_session_only');
}
