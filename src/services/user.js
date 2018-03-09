import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }

export async function accountLogin(params) {
  return request('/api/v1/users/post/login_by_mobile', {
    method: 'POST',
    body: params || {},
  });
}

export async function onGetPhoneCaptcha(params) {
  return request('/api/v1/users/post/get_login_verify_code', {
    method: 'POST',
    body: params || {},
  });
}

export async function onGetCaptcha(params) {
  return request('/api/v1/users/post/get_captcha', {
    method: 'POST',
    body: params || {},
  });
}

export async function accountLogout(params) {
  return request('/api/v1/users/post/logout', {
    method: 'POST',
    body: params || {},
  });
}

export async function getCaptcha(params) {
  return request('/api/v1/users/post/get_register_verify_code', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent(params) {
  return request('/api/v1/users/post/check_logined', {
    method: 'POST',
    body: params || {},
  });
}

export async function register(params) {
  return request('/api/v1/users/post/register', {
    method: 'POST',
    body: params || {},
  });
}

export async function onGetRegisterCaptcha(params) {
  return request('/api/v1/users/post/get_register_verify_code', {
    method: 'POST',
    body: params || {},
  });
}
