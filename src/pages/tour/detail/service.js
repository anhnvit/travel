import { extend } from "umi-request";
import {Modal } from 'antd';
import requestApi from "@/utils/requestApi";
import {BASE_URL_CMS} from "@/utils/constant";
const { confirm } = Modal;


const TourInfo = {
    getTourById: async (params) => {
        return requestApi('/tour_detail', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: params,
        });
    },

    getTourPublic: async (params) => {
        const request = extend({
            prefix: BASE_URL_CMS,
            data: params,
        });
        return request.post('/public_tour_detail');
    },
    feedbackContent: async(params) => {
        return requestApi('/feedback', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: params,
        });
    },
    
    processData(data){
        let tourInfo = {
            tourCode:data.tourCode,
            tourName:data.tourName,
            customerName:data.customerName,
            fromDate:data.fromDate,
            toDate:data.toDate,
            fromPoint:data.fromPoint,
            toPoint:data.toPoint, 
            fromTime:data.fromTime, 
            toTime:data.toTime, 
        }
        return [tourInfo]
    }
}
export default TourInfo

