
import requestApi from "@/utils/requestApi";
import request from '@/utils/request';
import { BASE_URL_AUTH } from "@/utils/constant";
const Tour = {
    UpdateUser: async (data, fileList) => {
        let formData = new FormData();
        Object.entries(data).map(([key, value]) => {
            if (key != 'avatar') {
                formData.append(key, value);
            }
            if (key == 'avatar') {
                formData.append('urlAvatar', value);
            }
        });
        if (fileList.length > 0) {
            formData.append('avatar', fileList[0].originFileObj);
        }
        return requestApi('/update/user', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: formData,
        });
    },
    UpdatePassword: async (data) => {
        return requestApi('/update/password', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            data: data,
        });
    },
    InfoUser: async () => {
        return await request('/fetch/user', {
            method: 'POST',
            prefix: BASE_URL_AUTH,
            headers: {
            'Authorization': "Bearer " + localStorage.getItem('token')
            },
        });
    }
}
export default Tour