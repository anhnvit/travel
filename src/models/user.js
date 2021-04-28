import {query as queryUsers } from '@/services/user';
import request from '@/utils/request';
import {BASE_URL_AUTH} from "@/utils/constant";

export async function queryCurrentUser() {
  return await request('/fetch/user', {
    method: 'POST',
    prefix: BASE_URL_AUTH,
    headers: {
      'Authorization': "Bearer " + localStorage.getItem('token')
    },

  });
}
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
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
      const response = yield call(queryCurrentUser);
      console.log(response);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
