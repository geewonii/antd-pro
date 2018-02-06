import { homeData } from '../services/api';

export default {
  namespace: 'home',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const data = yield call(homeData);
      yield put({
        type: 'homeIndexList',
        payload: Array.isArray(data) ? data : [],
      });
    },
  },

  reducers: {
    homeIndexList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
