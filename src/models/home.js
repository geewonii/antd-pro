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
      const getHomeData = [];

      const imgPc = recv.DatasetToObjectList(0);
      const imgMobile = recv.DatasetToObjectList(1);
      const swiperImageList = [];
      [...imgPc].forEach((todo, i) => {
        const obj = { ...todo, image_Mobile: imgMobile[i].image_url };
        swiperImageList.push(obj);
      });
      getHomeData.push(swiperImageList);
      // const s = recv.DatasetToObjectList(2);
      // console.log(s);
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
