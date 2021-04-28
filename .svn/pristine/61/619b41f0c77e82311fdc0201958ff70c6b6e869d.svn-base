
import { message } from 'antd';
import requestApi from "@/utils/requestApi";
import moment from 'moment';
import { BASE_URL_CMS } from "@/utils/constant";
const Tour = {
    CreateTour: async (data, isTemplate) => {
        let listLocation = [];
        let createTour = [];
        listLocation.push({
            date: moment(data.fromDate).format("DD/MM/YYYY"),
            locationName: data.fromPoint.address,
            time: data.fromTime,
            latitude: data.fromPoint.lat,
            longitude: data.fromPoint.lng,
            type: 1
        })
        listLocation.push({
            date: moment(data.toDate).format("DD/MM/YYYY"),
            locationName: data.toPoint.address,
            time: data.toTime,
            latitude: data.toPoint.lat,
            longitude: data.toPoint.lng,
            type: 2
        })
        data.LocationOfTheTour && data.LocationOfTheTour.map((itemLocation) => {
            listLocation.push({
                date: moment(itemLocation.date).format("DD/MM/YYYY"),
                locationName: itemLocation.locationInfo.address,
                time: itemLocation.time,
                latitude: itemLocation.locationInfo.lat,
                longitude: itemLocation.locationInfo.lng,
                notifyTime: itemLocation.notifyTime ? `${moment(itemLocation.notifyTime).format("HH:mm")} ${moment(itemLocation.notifyDate).format("DD/MM/YYYY")} `  : '',
                type: 3
            })
        })
        createTour.push({
            tourCode: data.tourCode,
            tourName: data.tourName,
            customerName: data.customerName,
            notifyChanel: data.notifyChanel,
            notifyTime: data.notifyTime,
            frontDate: data.frontDate,
            isTemplate: isTemplate ? 1 : 0,
            locationOfTheTours: listLocation
        })
        return requestApi('/create_tour', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: createTour[0],
        });
    },
    UpdateTour: async (data, isTemplate, removeLocationId) => {
        let listLocation = [];
        let updateTour = [];
        listLocation.push({
            locationId: data.fromLocationId,
            date: moment(data.fromDate).format("DD/MM/YYYY"),
            locationName: data.fromPoint.address,
            time: data.fromTime,
            latitude: data.fromPoint.lat,
            longitude: data.fromPoint.lng,
            type: 1
        })
        listLocation.push({
            locationId: data.toLocationId,
            date: moment(data.toDate).format("DD/MM/YYYY"),
            locationName: data.toPoint.address,
            time: data.toTime,
            latitude: data.toPoint.lat,
            longitude: data.toPoint.lng,
            type: 2
        })
        data.LocationOfTheTour && data.LocationOfTheTour.map((itemLocation) => {
            listLocation.push({
                locationId: itemLocation.locationId,
                date: moment(itemLocation.date).format("DD/MM/YYYY"),
                locationName: itemLocation.locationInfo.address,
                time: itemLocation.time,
                latitude: itemLocation.locationInfo.lat,
                longitude: itemLocation.locationInfo.lng,
                notifyTime: itemLocation.notifyTime ? `${moment(itemLocation.notifyTime).format("HH:mm")} ${moment(itemLocation.notifyDate).format("DD/MM/YYYY")} `  : '',
                type: 3
            })
        })
        removeLocationId && removeLocationId.map((itemRemove) => {
            if (!listLocation.some(item => item.locationId === itemRemove.locationId)) {
                listLocation.push({
                    locationId: itemRemove.locationId,
                    status: 1
                })
            }
        })
        updateTour.push({
            tourId: data.tourId,
            tourCode: data.tourCode,
            tourName: data.tourName,
            customerName: data.customerName,
            notifyChanel: data.notifyChanel,
            notifyTime: data.notifyTime,
            frontDate: data.frontDate,
            isTemplate: isTemplate ? 1 : 0,
            locationOfTheTours: listLocation
        })
        return requestApi('/update_tour', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: updateTour[0],
        });
    },
    TemplateList: async () => {
        return requestApi('/template_list', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: '',
        });
    },
    TemplateDetail: async (param) => {
        return requestApi('/template_detail', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: param,
        });
    },
    CheckExistTour: async (param) => {
        return requestApi('/check_exist_tour', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: param,
        });
    },
    EditTour: async (param) => {
        return requestApi('/info_tour_edit', {
            method: 'POST',
            prefix: BASE_URL_CMS,
            data: param,
        });
    },
}
export default Tour