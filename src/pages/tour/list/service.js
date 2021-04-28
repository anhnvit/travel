import {Modal} from 'antd';
import requestApi from "@/utils/requestApi";
import {BASE_URL_CMS} from "@/utils/constant";

const { confirm } = Modal;

const ListTour = {
    getList: async (params) => {
      return requestApi('/search_tour', {
        method: 'POST',
        prefix: BASE_URL_CMS,
        data: params,
      });
    },
    exportToExcel: async (params) => {
      return requestApi('/tour/export', {
        method: 'POST',
        prefix: BASE_URL_CMS,
        data: params,
      });
    },
}

export default ListTour;
