import { creditData } from '../services/api';

export default {
  namespace: 'credit',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(creditData, payload);
      yield put({
        type: 'creditList',
        payload: data,
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
