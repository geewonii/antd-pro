import { homeStaticData, homeData, creditListData } from '../services/api';
import Packet from '../utils/Packet';

export default {
  namespace: 'home',

  state: {
    list: null,
  },

  effects: {
    *homeInfoFetch(_, { call, put }) {
      const staticData = yield call(homeStaticData);
      const res = yield call(homeData, new Packet());
      const recv = new Packet();
      recv.ReadFrom(res);

      const swiperImageList = [];
      const swiperPc = recv.DatasetToObjectList(0) || null;
      const swiperMobile = recv.DatasetToObjectList(1) || null;
      if (swiperPc && swiperMobile) {
        [...swiperPc].forEach((todo, i) => {
          const obj = {
            ...todo,
            image_Mobile: swiperMobile[i].image_url,
          };
          swiperImageList.push(obj);
        });
      }

      const noticeData = {
        notice: recv.DatasetToObjectList(2)[0] || null,
        publicity: recv.DatasetToObjectList(3)[0] || null,
      };

      const res1 = yield call(creditListData, new Packet());
      const recv1 = new Packet();
      recv1.ReadFrom(res1);
      const creditData = recv1.DatasetToObjectList(0) || null;

      // export data
      const getHomeData = {
        ...staticData,
        swiperImageList,
        noticeData,
        creditData,
      };

      yield put({
        type: 'homeIndexList',
        payload: getHomeData,
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
