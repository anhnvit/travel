
import requestApi from "@/utils/requestApi";
import request from '@/utils/request';
import { BASE_URL_CMS } from "@/utils/constant";
const Tour = {
    ReportTour: async (data) => {
        return requestApi('/report_tour', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: data,
        });
    },
}
export default Tour