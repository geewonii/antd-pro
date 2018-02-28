import { homeData } from '../services/api';
import Packet from '../utils/Packet';

export default {
  namespace: 'home',

  state: {
    list: [],
  },

  effects: {
    *homeInfoFetch(_, { call, put }) {
      const recv = new Packet();
      const res = yield call(homeData, recv);
      recv.ReadFrom(res);

      const swiperImageList = [];
      [...recv.DatasetToObjectList(0)].forEach((todo, i) => {
        const obj = {
          ...todo,
          image_Mobile: recv.DatasetToObjectList(1)[i].image_url,
        };
        swiperImageList.push(obj);
      });

      const ItemNoticeList = {
        operate: recv.DatasetToObjectList(8)[0],
      };
      console.log(recv);
      // export data
      const getHomeData = [
        swiperImageList,
        ItemNoticeList,
      ];
      // console.log(getHomeData);

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
