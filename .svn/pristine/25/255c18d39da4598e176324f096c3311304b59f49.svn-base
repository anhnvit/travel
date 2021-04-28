import { fakeSubmitFormEdit } from './service';
import moment from 'moment';
const Model = {
  namespace: 'formAndstepFormEdit',
  state: {
    current: 'info',
    step: {
    },
  },
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitFormEdit, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step.values, ...payload } };
    },
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },
  },
};
export default Model;
