import { creditData } from '../services/api';

export default {
  namespace: 'previous',

  state: {
    list: undefined,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(creditData, payload);
      yield put({
        type: 'creditList',
        payload: res,
      });
    },
  },

  reducers: {
    creditList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
