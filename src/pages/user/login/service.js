import { extend } from "umi-request";
import { BASE_URL_AUTH } from "@/utils/constant";
import { notification } from 'antd';



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
            const { response, data } = error;
            notification.error({
                message: data.data.message,
            })
            return response;
        }
    });
    return request.post('/oauth/token');
}
