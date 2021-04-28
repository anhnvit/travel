
import { message } from 'antd';
import requestApi from "@/utils/requestApi";
import { BASE_URL_CMS } from "@/utils/constant";

const Crops = {
    deleteCrops: async (record) => {
        const param = {
            "cropsId": record.cropsId
        };
        return requestApi('/cropsManager/delete-crops', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: param,
        });
    },
    CreateCrops: async (values, fileList) => {
        const hide = message.loading('Thêm');
        let formData = new FormData();
        const data = [];
        if (fileList.length > 0) {
            formData.append("image", fileList[0].originFileObj);
        }
        Object.entries(values).map(([key, value]) => {
            formData.append(key, value);
        });
        return requestApi('/cropsManager/create-crops', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: formData,
        });
    },
    UpdateCrops: async (values, fileList) => {
        const hide = message.loading('Sửa');
        let formData = new FormData();
        if (fileList.length > 0) {
            formData.append("image", fileList[0].originFileObj);
        }
        Object.entries(values).map(([key, value]) => {
            if (key != 'urlImage' || value != null) {
                formData.append(key, value);
            }
        });
        return requestApi('/cropsManager/update-crops', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: formData,
        });
    },
    getListCrops: async (params) => {
        return requestApi('/cropsManager/search-crops', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: params,
        });
    },

}
export default Crops

