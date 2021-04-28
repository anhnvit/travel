import * as Constant from './constant';

export function getColorStatusTour(status) {
    if (status == null) return "#bcbcbc";
    if (status === Constant.STATUS_TOUR_END) return "#969696";
    if (status === Constant.STATUS_TOUR_UPCOMING) return "#eaeaea";
    if (status === Constant.STATUS_TOUR_HAPPENING) return "#1890ff";
}

export function convertTimeIntToText(intTime) {
    if (intTime === 0) return "Sáng";
    if (intTime === 1) return "Chiều";
    if (intTime === 2) return "Tối";
}

export function getColorWeather(level, status) {
    if (status === Constant.STATUS_TOUR_END) return "#d9e0e8";
    if (level === 3) return "#ff4d4f";
    if (level === 2) return "#faad14";
    if (level === 1) return "#52c41a";

}

export function convertDirection(deg) {
    let windDirection = null;
    switch (deg) {
        case 0: windDirection = "B"; break;
        case 1: windDirection = "BĐB"; break;
        case 2: windDirection = "ĐB"; break;
        case 3: windDirection = "ĐĐB"; break;
        case 4: windDirection = "Đ"; break;
        case 5: windDirection = "ĐĐN"; break;
        case 6: windDirection = "ĐN"; break;
        case 7: windDirection = "NĐN"; break;
        case 8: windDirection = "N"; break;
        case 9: windDirection = "NTN"; break;
        case 10: windDirection = "TN"; break;
        case 11: windDirection = "TTN"; break;
        case 12: windDirection = "T"; break;
        case 13: windDirection = "TTB"; break;
        case 14: windDirection = "TB"; break;
        case 15: windDirection = "BTB"; break;
        default: windDirection = null; break;
    }
    return windDirection;
}

export function getTextLevelUv(uv) {
    if (uv === null) return "";
    if (uv <= 2) return "thấp";
    if (uv <= 5) return "trung bình";
    if (uv <= 7) return "cao";
    if (uv <= 10) return "rất cao";
    if (uv >= 11) return "quá cao";

}

export function getTextByIcon(iconWeather) {
    if (iconWeather === 8) return "Mưa rào";
    if (iconWeather === 9) return "Mưa dông";
    if (iconWeather === 10) return "Mưa phùn";
    if (iconWeather === 11) return "Mưa phùn";
    if (iconWeather === 12) return "Mưa nhỏ";
    if (iconWeather === 13) return "Mưa rào";
    if (iconWeather === 14) return "Mưa to";
    if (iconWeather === 15) return "Mưa đá";
    if (iconWeather === 16) return "Mưa dông";
    if (iconWeather === 17) return "Có mưa";
    return null;
}

export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function styleHeaderCard(weather, statusColor) {
    if (weather !== null) {
        return {
            backgroundColor: getColorWeather(statusColor),
            color: "white"
        }
    }
    return {
        backgroundColor: "white",
        color: "back"
    }
}

export function getClassTour(statusTour) {

    switch (statusTour) {
        case Constant.STATUS_TOUR_HAPPENING:
            return "active";
        case Constant.STATUS_TOUR_UPCOMING:
            return "upcomming";
        default:
            return "default"
            break
    }
}

export function compareByAlpha (a, b) 
{ 
    let A = a.toUpperCase();
    let B = b.toUpperCase();
    if (A > B) { return -1; } 
    if (A < B) { return 1; } 
    return 0; 
}
