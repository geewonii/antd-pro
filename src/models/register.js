// import { message } from 'antd';
import { onGetRegisterCaptcha, register } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import Packet from '../utils/Packet';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *getCaptcha({ payload }, { call, put }) {
      const send = new Packet();
      send.AddDataset();
      send.AddItem(0, 'mobile', payload.mobile);
      const response = yield call(onGetRegisterCaptcha, send);
      const recv = new Packet();
      recv.ReadFrom(response);
      yield put({
        type: 'captchaHandle',
        payload: recv,
      });
    },
    *submit({ payload }, { call, put }) {
      const send = new Packet();
      send.AddDataset();
      send.AddItem(0, 'mobile', payload.mobile);
      send.AddItem(0, 'password', payload.password);
      send.AddItem(0, 'name', payload.name);
      send.AddItem(0, 'verifyCode', payload.verifyCode);
      send.AddItem(0, 'recommendMobile', payload.recommendMobile);
      const response = yield call(register, send);
      const recv = new Packet();
      recv.ReadFrom(response);
      yield put({
        type: 'registerHandle',
        payload: recv.Code,
      });
    },
  },

  reducers: {
    captchaHandle(state, { payload }) {
      return {
        ...state,
        packet: payload,
      };
    },
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        loginStatus: payload,
      };
    },
  },
};
