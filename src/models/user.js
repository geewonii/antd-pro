import { query as queryUsers, queryCurrent } from '../services/user';
import Packet from '../utils/Packet';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: null,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const send = new Packet();
      const response = yield call(queryCurrent, send);
      const recv = new Packet();
      recv.ReadFrom(response);
      if (recv.Code === 1) {
        const data = recv.DatasetToObjectList(0)[0];
        yield put({
          type: 'saveCurrentUser',
          payload: data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
