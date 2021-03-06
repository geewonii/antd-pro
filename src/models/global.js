import { queryNotices, globalFooterFunc, creditListFetch } from '../services/api';
import Packet from '../utils/Packet';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    *globalFooterData({ payload }, { put, call }) {
      const send = new Packet();
      const res = yield call(globalFooterFunc, send);
      if (payload) {
        yield put({
          type: 'screenIsMobile',
          payload: payload.isMobile,
        });
      }
      yield put({
        type: 'globalFooter',
        payload: res,
      });
    },
    *creditList(_, { put, call }) {
      const send = new Packet();
      const res = yield call(creditListFetch, send);
      const recv = new Packet();
      recv.ReadFrom(res);
      const data = recv.DatasetToObjectList(0);
      const creditListData = [];
      [...data].forEach((todo) => {
        const { CreditMode, ...rest } = todo;
        if (CreditMode === '5') {
          creditListData.push({ ...rest });
        }
      });
      yield put({
        type: 'credit',
        payload: creditListData,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    screenIsMobile(state, { payload }) {
      return {
        ...state,
        isMobile: payload,

      };
    },
    globalFooter(state, { payload }) {
      return {
        ...state,
        globalFooterData: payload,

      };
    },
    credit(state, { payload }) {
      return {
        ...state,
        creditListData: payload,

      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
