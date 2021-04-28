import { extend } from "umi-request";
import { BASE_URL_AUTH } from "@/utils/constant";
import { notification } from 'antd';

const codeMessage = {
    200: 'Thành công',
    201: 'Thêm mới hoặc cập nhập thành công',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: 'Xóa thành công',
    400: 'Bad Request',
    401: 'Unauthorized',
    // 403: 'Forbidden',
    404: 'Not Found',
    406: 'Not Acceptable',
    410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Time-out',
};


export async function accountLogin(params) {
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key]);
    }
    formData.append("grant_type", "password");
    const request = extend({
        prefix: BASE_URL_AUTH,
        timeout: 1000,
        headers: {
            "Authorization": "Basic YWdyaS1lY29zeXN0ZW06MTIzNDU2YUE="
        },
        data: formData,
        errorHandler: function (error) {
            const { response } = error;
            const { status, url } = response;
            notification.error({
                message: `Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.`,
            })
        }
    });
    
    return request.post('/oauth/token');
}
