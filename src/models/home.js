import { homeData } from '../services/api';
import Packet from '../utils/Packet';

export default {
  namespace: 'home',

  state: {
    list: [],
  },

  effects: {
    *homeInfoFetch(_, { call, put }) {
      const send = new Packet();
      const res = yield call(homeData, send);

      const recv = new Packet();
      recv.ReadFrom(res);
      const swiperImageList = [];
      const imgPc = recv.DatasetToObjectList(0);
      const imgMobile = recv.DatasetToObjectList(1);
      [...imgPc].forEach((todo, i) => {
        const obj = { ...todo, image_Mobile: imgMobile[i].image_url };
        swiperImageList.push(obj);
      });
      const ItemNoticeList = [
        recv.DatasetToObjectList(2)[0],
      ];

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
