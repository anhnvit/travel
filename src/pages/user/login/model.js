import {history} from 'umi';
import {message} from 'antd';
import {parse} from 'qs';
import {accountLogin} from './service';
import requestApi from "@/utils/requestApi";

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority, token) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('authority', JSON.stringify(proAuthority)); // hard code
  localStorage.setItem('token', token); // hard code
  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}
const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      // Login successfully
      if (response.access_token) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        message.success('Đăng nhập thành công！');
        requestApi.extendOptions({headers: {'Authorization': "Bearer " + response.access_token},});
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    /**getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },*/
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority, payload.access_token);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
