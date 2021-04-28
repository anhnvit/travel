import moment from 'moment';
import { Select } from "antd";

const Option = Select.Option;
export function listTime() {
    return [
        {
            'key': 0,
            'name': 'Sáng'
        },
        {
            'key': 1,
            'name': 'Chiều'
        },
        {
            'key': 2,
            'name': 'Tối'
        }
    ];
}

// Thời gian nhận thông báo
export function dayNotify() {
    const notifyTime = []
    for (let i = 1; i <= 7; i++) {
        notifyTime.push(<Option key={i} value={i}>{`Trước ${i} ngày`}</Option>);
    }
    notifyTime.push(<Option key="0" value="0">Từ ngày khởi hành</Option>);
    return notifyTime;
}
export function optsTime() {
    const optsTime = [];
    for (let i = 0; i <= 23; i++) {
        if (i < 10) {
            optsTime.push(
                `0${i}:00`
            );
        } else {
            optsTime.push(
                `${i}:00`
            );
        }
    }
    return optsTime;
}
// Chọn buổi của ngày hiện tại
export function listTimeCurrent() {
    let listTime = [];
    let currentDate = moment().format('HH');
    if (currentDate < 12) {
        listTime.push(
            {
                'key': 0,
                'name': 'Sáng'
            }
        )
    }
    if (currentDate < 18) {
        listTime.push(
            {
                'key': 1,
                'name': 'Chiều'
            }
        )
    }
    listTime.push(
        {
            'key': 2,
            'name': 'Tối'
        }
    )
    return listTime;
}
export function notifyChanel() {
    return [
        {
            value: "0",
            label: 'Trình duyệt'
        },
        {
            value: "1",
            label: 'Email'
        },
        {
            value: "2",
            label: 'SMS'
        },
    ];
}
// Can not select days before today and today
export function disabledDate(current) {
    return current && current < moment().endOf('day').subtract(1, 'days');
}

// Xét giờ nhận thông báo cả điểm thăm quan
export function getHourNotify(typeTime) {
    let hourtotal = 24;
    if (typeTime === 0) {
        hourtotal = 12;
    } else if (typeTime === 1) {
        hourtotal = 18;
    }
    return hourtotal;
}
export function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
// không chọn ngày nhỏ hơn dateFrom
export function disabledDateFrom (current, dateFrom) {
    return current && current <= moment(dateFrom);
}

export function getFromTime(fromTime) {
    let listTime = [];
    if (fromTime == 0) {
        listTime.push(
            {
                'key': 0,
                'name': 'Sáng'
            }
        )
    }
    if (fromTime <= 1) {
        listTime.push(
            {
                'key': 1,
                'name': 'Chiều'
            }
        )
    }
    if (fromTime <= 2) {
        listTime.push(
            {
                'key': 2,
                'name': 'Tối'
            }
        )
    }
    return listTime;
}
export const preDay = moment().endOf('day').subtract(1, 'days');