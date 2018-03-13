import { routerRedux } from 'dva/router';
import { onGetPhoneCaptcha, accountLogin, accountLogout } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import Packet from '../utils/Packet';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    phoneCaptchaState: undefined,
    message: undefined,
  },

  effects: {
    *getPhoneCaptcha({ payload }, { call, put }) {
      const send = new Packet();
      send.AddDataset();
      send.AddItem(0, 'mobile', payload.mobile);
      const res = yield call(onGetPhoneCaptcha, send);
      const recv = new Packet();
      recv.ReadFrom(res);
      const { Code, Message } = recv;
      const phoneCaptchaState = { Code, Message };
      yield put({
        type: 'captchaHandle',
        payload: phoneCaptchaState,
      });
    },
    *login({ payload }, { call, put }) {
      const send = new Packet();
      send.AddDataset();
      if (payload.type === 'account') {
        send.AddItem(0, 'mobile', payload.mobile);
        send.AddItem(0, 'password', payload.password);
        send.AddItem(0, 'captcha_id', payload.captchaId);
        send.AddItem(0, 'image_code', payload.image_code);
      } else {
        send.AddItem(0, 'mobile', payload.mobile);
        send.AddItem(0, 'sms_code', payload.sms_code);
      }
      const response = yield call(accountLogin, send);
      const recv = new Packet();
      recv.ReadFrom(response);
      if (recv.Code === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: recv.Code,
            // currentAuthority: 'guest',
            message: recv.Message,
          },
        });
      } else {
        if (payload.autoLogin) localStorage.setItem('ph-mobile', payload.mobile);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            currentAuthority: 'user',
            message: recv.Message,
          },
        });
        // Login successfully
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select, call }) {
      try {
        yield call(accountLogout);
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeCaptcha(state, { payload }) {
      return {
        ...state,
        captchaUrl: payload,
      };
    },
    captchaHandle(state, { payload }) {
      return {
        ...state,
        phoneCaptchaState: payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        message: payload.message,
      };
    },
  },
};
