import { stringify } from 'qs';
import request from '../utils/request';

export async function homeData(params) {
  return request('/api/v1/homes/post/query_home_info', {
    method: 'POST',
    body: params || {},
  });
}
export async function creditListFetch(params) {
  return request('/api/v1/credits/post/query_credit_list', {
    method: 'POST',
    body: params || {},
  });
}

export async function homeStaticData() {
  return request('https://api.phonelee.com/static/phonelee_home.json');
}

export async function globalFooterFunc() {
  return request('https://api.phonelee.com/static/phonelee_footer.json');
}

export async function creditData(params) {
  return request(`/api/credit?${stringify(params)}`);
}

/*
  ***********************
*/

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
