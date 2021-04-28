
import { message } from 'antd';
import requestApi from "@/utils/requestApiRegister";
import moment from 'moment';
import { BASE_URL_AUTH } from "@/utils/constant";
const Register = {
    RegisterUser: async (data) => {
        return requestApi('/register/user', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    ConfirmAccount: async (data) => {
        return requestApi('/register/confirm-account', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    regainOTP: async (data) => {
        return requestApi('/register/regainOTP', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    sendRequireForgetPassword: async (data) => {
        return requestApi('/password/sendRequireForgetPassword', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    verifyOTP: async (data) => {
        return requestApi('/password/verifyOTP', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    resetPass: async (data) => {
        return requestApi('/password/resetPass', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
}
export default Register