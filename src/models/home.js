import { homeIndexCarouselList, queryFakeList } from '../services/api';

export default {
  namespace: 'home',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resCarousel = yield call(homeIndexCarouselList);
      yield put({
        type: 'homeIndexCarouselList',
        payload: Array.isArray(resCarousel) ? resCarousel : [],
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    homeIndexCarouselList(state, action) {
      return {
        ...state,
        carouselData: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
