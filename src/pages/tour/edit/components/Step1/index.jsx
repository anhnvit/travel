import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Form, Button, Divider, Input, Select, Collapse, DatePicker, TimePicker, Tooltip, Checkbox, Row, Col, Modal, message } from 'antd';
import { CloseCircleFilled, PlusCircleFilled, BellFilled, InfoCircleOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import styles from './index.less';
import Locations from './locations';
import Template from './../Template';
import * as Common from './../../../common';
import { Link, Route } from 'react-router-dom';
import Tour from './../../serviceApi';

const { Option } = Select;
const { Panel } = Collapse;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

const Step1 = (props) => {
    const listPanel = ['info', 'location', 'notify'];
    const [checkedList, setCheckedList] = useState(props.dataTour.notifyChanel ? props.dataTour.notifyChanel : "");
    const [optionsSelected, setOptionsSelected] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleTemplate, setVisibleTemplate] = useState(false);
    const [isTemplate, setIsTemplate] = useState(false);
    const [dataTour, setDataTour] = useState(Object.keys(props.data).length > 0 ? props.data : props.dataTour);
    const [dayNotify, setDayNotify] = useState(Common.dayNotify);
    const [listTimeTo, setListTimeTo] = useState(Common.listTime);
    const [listTimeFrom, setListTimeFrom] = useState(Common.listTime);
    const [listTime, setListTime] = useState(Common.listTime);
    const [notifyChanel, setNotifyChanel] = useState(Common.notifyChanel);
    const [optsTime, setOptsTime] = useState(Common.optsTime);
    const [removeLocationId, setRemoveLocationId] = useState([]);
    const [nameLocation, setNameLocation] = useState('');
    const [locationIndex, setLocationIndex] = useState('');
    const [dataLocationTour, setDataLocationTour] = useState([]);
    const [dateFrom, setDateFrom] = useState(Common.preDay);
    const [dateTo, setDateTo] = useState(Common.preDay);
    const [dateNotify, setDateNotify] = useState(Common.preDay);
    const [hourTotal, setHourtotal] = useState("");
    const [typeTime, setTypeTime] = useState("");
    const [locationOfTheTours, setLocationOfTheTours] = useState([]);
    const [flagNotify, setFlagNotify] = useState((props.data.notifyChanel && Object.keys(props.data.notifyChanel).length > 0) ? true : false);
    const [optionTour, setOptionTour] = useState([]);
    const {
        dispatch,
        onClick: getLatLng,
        onchang: getTemplateId,
        flagTemplate,
        // dataTour,
    } = props;
    const [form] = Form.useForm();
    const { validateFields, getFieldValue, resetFields, setFieldsValue } = form;
    const onValidateForm = async () => {
        onFinish();
        const values = await validateFields();
        Tour.CheckExistTour({
            "tourId": values.tourId,
            "tourCode": values.tourCode,
            "tourName": values.tourName,
            "customerName": values.customerName,
        }).then((response) => {
            if (response.statusCode === 200) {
                values.removeLocationId = removeLocationId;
                if (dispatch) {
                    dispatch({
                        type: 'formAndstepFormEdit/saveStepFormData',
                        payload: values,
                    });
                    dispatch({
                        type: 'formAndstepFormEdit/saveCurrentStep',
                        payload: 'confirm',
                    });
                }
            } else {
                message.error(response.message);
            }
        })
    };
    const onFinish = () => {
        if (dispatch) {
            dispatch({
                type: 'formAndstepFormEdit/saveStepFormData',
                payload: {},
            });
            dispatch({
                type: 'formAndstepFormEdit/saveCurrentStep',
                payload: 'info',
            });
        }
    };
    // không chọn ngày nhỏ hơn dateFrom
    const disabledDateFrom = current => {
        return current && current < moment(dateFrom);
    }    // Không chọn ngày lớn hơn dateNotify
    const disabledDateNotify = current => {
        return current && current > moment(dateNotify);
    }
    const disabledHours = () => {
        const hours = Common.range(0, 24);
        hours.splice(0, hourTotal);
        return hours;
    }
    // Get thông tin data điểm thăm quan
    useEffect(() => {
        resetFields();
        getFromPoint(true);
        setFieldsValue(Object.keys(props.data).length > 0 ? props.data : props.dataTour);
        if (Object.keys(props.data).length == 0) {
            if (dataTour.notifyChanel && dataTour.notifyChanel.length == 0) {
                setFlagNotify(false);
            }
            setDateFrom(dataTour.fromDate ? dataTour.fromDate : Common.preDay);
            listLatLng();
            setOptionsSelected(dataTour.notifyTime ? dataTour.notifyTime : (isTemplate ? [] : ["07:00", "18:00"]));
            setRemoveLocationId(dataTour.LocationOfTheTour ? dataTour.LocationOfTheTour : []);
            setLocationOfTheTours(dataTour.LocationOfTheTour ? dataTour.LocationOfTheTour : []);
            setFieldsValue({ LocationOfTheTour: props.dataTour.LocationOfTheTour ? props.dataTour.LocationOfTheTour : [{}, {}] });
            if (Object.keys(props.dataTour).length == 0) {
                setFlagNotify(true);
                setFieldsValue({
                    notifyChanel: ["0", "1"],
                    notifyTime: ["07:00", "18:00"],
                    frontDate: ""
                });
            }
        } else {
            if (props.data.notifyChanel && props.data.notifyChanel.length == 0) {
                setFlagNotify(false);
            }
            setFieldsValue({ notifyTime: props.data.notifyTime })
            setFieldsValue({ notifyChanel: props.data.notifyChanel })
            setFieldsValue({ frontDate: `${props.data.frontDate}` })
            setLocationOfTheTours(props.data.LocationOfTheTour ? props.data.LocationOfTheTour : []);
            setFieldsValue({ LocationOfTheTour: props.data.LocationOfTheTour && props.data.LocationOfTheTour });
        }
        getTemplateList();
    }, [props.dataTour]);
    const getTemplateList = () => {
        Tour.TemplateList().then((response) => {
            let listTour = [];
            if (response.statusCode == 200) {
                response.data.map((itemTour) => {
                    listTour.push({
                        value: itemTour.tourId,
                        label: itemTour.tourName
                    })
                })
                setOptionTour(listTour);
            } else {
                message.error(response.message);
            }
        });
    }
    const hourDefaut = {
        "0": 12,
        "1": 19,
        "2": 23
    };
    // Xét thời gian nhận thông báo trước ? ngày
    const getFromPoint = async (flag) => {
        let data = await getFieldValue();
        if (data.fromDate) {
            resetDateTime(data, true);
            getFromTime();
            setDateFrom(data.fromDate);
            if (!flag) {
                resetFields(['toTime', 'toDate', 'fromTime']);
                setFieldsValue({ 'toTime': null, 'toDate' : '', 'fromTime' : null });
            }
            let listDay = [];
            let countDay = data.fromDate.diff(moment(), 'days');
            if (moment(data.fromDate).format("YYYYMMDD") == moment().format('YYYYMMDD')) {
                setListTimeFrom(Common.listTimeCurrent);
            } else {
                setListTimeFrom(Common.listTime);
            }
            if (countDay < 7 && !data.statusTourFrom) {
                let listTime = [];
                listDay.push("0");
                for (let i = 1; i <= countDay; i++) {
                    listDay.push(i);
                    listTime.push(<Option key={i} value={i}>{`Trước ${i} ngày`}</Option>);
                }
                listTime.push(<Option key="0" value="0">Từ ngày khởi hành</Option>);
                setDayNotify(listTime);
                setFieldsValue({ 'frontDate': '' });
                if (listDay.some(item => item === data.frontDate)) {
                    setFieldsValue({ 'frontDate': data.frontDate });
                }
            } else {
                setDayNotify(Common.dayNotify)
            }
        }
    }
    // reset time khi chọn ngày/buổi khởi hành
    const resetDateTime = (data, flag) => {
        let dataLocationOfTheTour = data.LocationOfTheTour;
        let hour = `${moment(data.fromDate).format("YYYYMMDD")}${hourDefaut[data.fromTime]}`;
        for (let i = 0; i < dataLocationOfTheTour.length; i++) {
            if (hour > `${moment(dataLocationOfTheTour[i].date).format("YYYYMMDD")}${hourDefaut[dataLocationOfTheTour[i].time]}`) {
                if (flag) {
                    dataLocationOfTheTour[i].date = '';
                }
                dataLocationOfTheTour[i].time = null;
            }
        }
    }
    // Chọn buổi khởi hành
    const getFromTime = async () => {
        let data = await getFieldValue();
        resetDateTime(data, false);
        if (data.fromDate && data.fromTime !== "" && moment(data.fromDate).format("DD/MM/YYYY") == moment(data.toDate).format("DD/MM/YYYY")) {
            resetFields(['toTime']);
            setListTimeTo(Common.getFromTime(data.fromTime));
        } else {
            setListTimeTo(Common.listTime);
        }
    }
    // validate điểm thăm quan thì chọn nhập thời gian nhận thông báo
    const checkLocation = async (key) => {
        resetFields(['nameLocation']);
        resetFields(['notifyTimeLoction']);
        setLocationIndex('');
        await validateFields([
            ['LocationOfTheTour', key, 'locationInfo'],
            ['LocationOfTheTour', key, 'date'],
            ['LocationOfTheTour', key, 'time']
        ]);
        setVisible(true)
        let name = await getFieldValue();
        setTypeTime(name.LocationOfTheTour[key].time);
        setHourtotal("");
        setDateNotify(moment(name.LocationOfTheTour[key].date).endOf('day'));
        setHourtotal(Common.getHourNotify(name.LocationOfTheTour[key].time));
        let notifyDate = moment(name.LocationOfTheTour[key].date).endOf('day');
        let notifyTime = '';
        if (name.LocationOfTheTour[key].notifyTime && name.LocationOfTheTour[key].notifyDate) {
            notifyDate = name.LocationOfTheTour[key].notifyDate;
            notifyTime = name.LocationOfTheTour[key].notifyTime;
        }
        setFieldsValue({ nameLocation: name.LocationOfTheTour[key].locationInfo.address });
        setFieldsValue({ notifyDateLoction: notifyDate });
        setFieldsValue({ notifyTimeLoction: notifyTime });
        setLocationIndex(key);
    }
    // Xét lại giờ khi chọn ngày
    const onChangeDateNotify = (date, dateString) => {
        if (date < moment(dateNotify) && moment(dateNotify).format("DD/MM/YYYY") != dateString) {
            setHourtotal(24);
        }
        if (moment(dateNotify).format("DD/MM/YYYY") == dateString) {
            setHourtotal(Common.getHourNotify(typeTime));
        }
    }
    // get Lat-lng để vẽ biểu đồ
    const listLatLng = () => {
        let listData = getFieldValue();
        let latLng = [];
        if (listData.LocationOfTheTour) {
            listData.LocationOfTheTour && listData.LocationOfTheTour.map((itemLocation) => {
                itemLocation && itemLocation.locationInfo && latLng.push({ lat: itemLocation.locationInfo.lat, lng: itemLocation.locationInfo.lng });
            })
        }
        listData.toPoint &&
            latLng.push({ lat: listData.toPoint.lat, lng: listData.toPoint.lng });
        getLatLng(latLng);
    }

    // Giờ nhận thông báo
    const handleChangeTime = value => {
        setOptionsSelected(value);
    };
    // Chọn nhận thông báo qua SMS
    const onGroupChange = (e) => {
        if (e.target.checked) {
            Modal.info({
                title: 'Vui lòng liên hệ với sale để được hỗ trợ',
                onOk() { },
            });
        }
    }
    // Kiểm tra thời gian nhận dự báo cho điểm thăm quan
    const handleUpdateData = async () => {
        await validateFields(['notifyTimeLoction', 'notifyDateLoction']);
        let data = getFieldValue();
        let LocationOfTheTour = data.LocationOfTheTour;
        LocationOfTheTour[locationIndex].notifyTime = data.notifyTimeLoction;
        LocationOfTheTour[locationIndex].notifyDate = data.notifyDateLoction;
        LocationOfTheTour[locationIndex].notifyDateTime = true;
        setLocationOfTheTours(LocationOfTheTour);
        setFieldsValue({ LocationOfTheTour: LocationOfTheTour });
        setLocationOfTheTours(LocationOfTheTour);
        setVisible(false);
    }
    // reset thời gian nhận notify location
    const resetNotifyDateLoction = async () => {
        let data = getFieldValue();
        let LocationOfTheTour = data.LocationOfTheTour;
        LocationOfTheTour[locationIndex].notifyTime = '';
        LocationOfTheTour[locationIndex].notifyDateTime = false;
        setFieldsValue({ LocationOfTheTour: LocationOfTheTour });
        setFieldsValue({ notifyDateLoction: '' });
        setFieldsValue({ notifyTimeLoction: '' });
        setLocationOfTheTours(LocationOfTheTour);
        setVisible(false);
    }
    const getTemplate = () => {
        if (optionTour.length > 0) {
            setVisibleTemplate(true);
            setIsTemplate(true);
        } else {
            Modal.info({
                title: 'Chưa có mẫu lịch trình.',
                onOk() {
                    setVisibleTemplate(false)
                },
            })
        }
    }
    // validate khi chọn hạng mục nhận thông báo qua
    const onChangeNotify = () => {
        let listData = getFieldValue();
        if (Object.keys(listData.notifyChanel).length > 0) {
            setFlagNotify(true);
        } else {
            setFlagNotify(false);
        }
    }
    return (
        <>
            {optionTour.length > 0 &&
                <Template
                    onSubmit={async (value) => {
                        getTemplateId(value);
                        setVisibleTemplate(false);
                        setFieldsValue({
                            notifyChanel: [],
                        });
                        setFlagNotify(false);
                    }}
                    onCancel={() => setVisibleTemplate(false)}
                    visibleTemplate={visibleTemplate}
                    optionTour={optionTour}
                />
            }
            <div className={styles.styleButton}
                style={{
                    paddingRight: '24px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                <Link to="/tour/list">
                    <Button className={styles.marginLeft} onClick={onFinish}>Hủy</Button>
                </Link>
                {flagTemplate &&
                    <Button type="primary" ghost className={styles.marginLeft} onClick={getTemplate}>Chọn mẫu</Button>
                }
                <Button type="primary" className={styles.marginLeft} onClick={onValidateForm}>Tiếp</Button>
            </div>
            <div style={{
                width: '100%',
                background: '#f0f2f5',
            }}>
                <div style={{
                    background: '#f0f2f5',
                }}
                    className='form-tour'>
                    <Form
                        form={form}
                        layout="horizontal"
                        className={styles.stepForm}
                        initialValues={dataTour}
                    >
                        <Form.Item name="tourId" hidden>
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item name="isTemplate" hidden>
                            <Input type="text" />
                        </Form.Item>
                        <Collapse defaultActiveKey={listPanel}>
                            <Panel header="Thông tin tour" key="info" forceRender={true}
                                style={{
                                    fontSize: '10px',
                                }}>
                                <div style={{
                                    padding: '16px 10px 45px 25px'
                                }}>
                                    <Row gutter={24}>
                                        <Input.Group compact key="tourCode" className="info-tour">
                                            <Col xxl={12} xl={12} xs={24} sm={24} style={{
                                                width: '100%'
                                            }}>
                                                <Form.Item
                                                    label="Mã tour"
                                                    name="tourCode"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Mã tour không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Nhập mã Tour"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={12} xl={12} xs={24} sm={24} style={{
                                                width: '100%'
                                            }}>
                                                <Form.Item
                                                    label="Tên tour"
                                                    name="tourName"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên tour không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Nhập tên Tour"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Input.Group>
                                        <Input.Group compact className="info-tour">
                                            <Col xxl={24} xl={24} xs={24} sm={24} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                    label="Tên đoàn/khách"
                                                    name="customerName"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Tên đoàn/khách không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="Nhập tên đoàn/khách"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Input.Group>
                                        <Input.Group compact className="info-tour">

                                            <Form.Item style={{ display: 'none' }}
                                                hidden={true}
                                                name="fromLocationId" >
                                                <Input hidden />
                                            </Form.Item>
                                            <Form.Item style={{ display: 'none' }}
                                                hidden
                                                name={"statusTourFrom"}
                                            >
                                                <Input hidden />
                                            </Form.Item>
                                            <Col xl={10} xxl={10} xs={24} sm={24} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                    label="Điểm khởi hành"
                                                    name="fromPoint"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Điểm khởi hành không chính xác',
                                                        },
                                                    ]}
                                                >
                                                    <Locations style={{
                                                        width: '100%'
                                                    }} onChange={(latLng) => { }} placeholder="Nhập điểm khởi hành"
                                                        disabledFlag={dataTour.statusTourFrom && dataTour.statusTourFrom}
                                                    />
                                                    {/* <Locations1 />  */}
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={7} xl={7} xs={12} sm={12} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                  
                                                    label="Ngày"
                                                    name="fromDate"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ngày không được để trống',
                                                        },
                                                    ]}
                                                    readOnly
                                                >
                                                    <DatePicker
                                                        placeholder="Chọn ngày"
                                                        disabled={dataTour.statusTourFrom && dataTour.statusTourFrom}
                                                        inputReadOnly={true} format="DD/MM/YYYY" style={{ width: '100%' }} disabledDate={Common.disabledDate} onChange={() => { getFromPoint(false); }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={7} xl={7} xs={12} sm={12} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                    label="Thời gian"
                                                    name="fromTime"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Thời gian không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Select onChange={() => getFromTime()} disabled={dataTour.statusTourFrom && dataTour.statusTourFrom} placeholder="Chọn buổi">
                                                        {listTimeFrom.map(item => (
                                                            <Option key={item.key} value={item.key}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Input.Group>
                                        <Input.Group compact className="info-tour">
                                            <Form.Item style={{ display: 'none' }}
                                                hidden={true}
                                                name="toLocationId" >
                                                <Input hidden />
                                            </Form.Item>
                                            <Form.Item style={{ display: 'none' }}
                                                hidden
                                                name={"statusTourTo"}
                                            >
                                                <Input hidden />
                                            </Form.Item>
                                            <Col xxl={10} xl={10} xs={24} sm={24} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                    label="Điểm đến"
                                                    name="toPoint"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Điểm đến không chính xác',
                                                        },
                                                    ]}
                                                >
                                                    <Locations style={{
                                                        width: '100%'
                                                    }} onChange={(latLng) => {
                                                        listLatLng();
                                                    }} placeholder="Nhập điểm đến"
                                                        disabledFlag={dataTour.statusTourTo && dataTour.statusTourTo} />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={7} xl={7} xs={12} sm={12} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                 
                                                    label="Ngày"
                                                    name="toDate"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ngày không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker
                                                       placeholder="Chọn ngày"
                                                        disabled={dataTour.statusTourTo && dataTour.statusTourTo}
                                                        allowClear={true} format="DD/MM/YYYY" style={{ width: '100%' }} disabledDate={disabledDateFrom} onChange={() => { getFromTime(); }} inputReadOnly={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={7} xl={7} xs={12} sm={12} style={{
                                                width: '100%',
                                            }}>
                                                <Form.Item
                                                    label="Thời gian"
                                                    name="toTime"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Thời gian không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: '100%' }} disabled={dataTour.statusTourTo && dataTour.statusTourTo} placeholder="Chọn buổi">
                                                        {listTimeTo.map(item => (
                                                            <Option key={item.key} value={item.key}>
                                                                {item.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Input.Group>
                                    </Row>
                                </div>
                            </Panel>
                            <Panel header="Điểm thăm quan" key="location" className='location-to'
                                style={{
                                    fontSize: '10px',
                                }}>
                                <div style={{
                                    padding: '16px 10px 23px 25px'
                                }}>
                                    <Form.List name="LocationOfTheTour" style={{ width: '100%'}}>
                                        {(fields, { add, remove }) => {
                                            return (
                                                <>
                                                    {fields.map((field, index) => (

                                                        <Row gutter={24} key={`LocationRow${index}`}>
                                                            <Input.Group key={`LocationEdit${field.key}`} align="start" compact style={{ width: '100%', display: 'flex'  }} >
                                                                <div style={{ float: 'left' }}>
                                                                    <Col xxl={1} xl={2} sm={2} xs={1} style={{
                                                                        width: '100%',
                                                                        paddingRight: '12px'
                                                                    }}>
                                                                        {((locationOfTheTours[index] && !locationOfTheTours[index].statusTour) || !locationOfTheTours[index]) ?
                                                                            <CloseCircleFilled style={{ width: '5%', verticalAlign: '-webkit-baseline-middle', color: '#f5222d', }} onClick={() => {
                                                                                remove(field.name);
                                                                                listLatLng();
                                                                            }} />
                                                                            :
                                                                            <CloseCircleFilled style={{ width: '5%', verticalAlign: '-webkit-baseline-middle', color: '#d9d9d9' }} />
                                                                        }
                                                                    </Col>
                                                                </div>
                                                                <div className='location' style={{ display: 'flex', width: '100%' }}>
                                                                    <Col xxl={9} xl={9} sm={7} xs={24}  style={{
                                                                        width: '100%',
                                                                        padding: '0'
                                                                    }}>
                                                                        <Form.Item style={{ display: 'none' }}
                                                                            hidden
                                                                            name={[index, "locationId"]}
                                                                            fieldKey={[field.fieldKey, "locationId"]}
                                                                        >
                                                                            <Input hidden />
                                                                        </Form.Item>
                                                                        <Form.Item style={{ display: 'none' }}
                                                                            hidden
                                                                            name={[index, "statusTour"]}
                                                                            fieldKey={[field.fieldKey, "statusTour"]}
                                                                        >
                                                                            <Input hidden />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            label=""
                                                                            name={[index, "locationInfo"]}
                                                                            rules={[{ required: true, message: 'Hạng mục không được để trống' }]}
                                                                            fieldKey={[field.fieldKey, "locationInfo"]}
                                                                        >
                                                                            <Locations style={{
                                                                                width: '100%'
                                                                            }} onChange={(latLng) => {
                                                                                listLatLng();
                                                                            }}
                                                                                placeholder="Nhập điểm thăm quan"
                                                                                disabledFlag={locationOfTheTours[index] && locationOfTheTours[index].statusTour} />
                                                                        </Form.Item>
                                                                    </Col>     
                                                                    <Col xxl={8} xl={8} sm={8} xs={24}  style={{
                                                                        paddingRight: '0'
                                                                    }}>
                                                                        <Form.Item
                                                                            
                                                                            label=""
                                                                            name={[index, "date"]}
                                                                            fieldKey={[field.fieldKey, "date"]}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Thời gian không được để trống',
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <DatePicker placeholder="Chọn ngày"
                                                                            disabled={locationOfTheTours[index] && locationOfTheTours[index].statusTour} format="DD/MM/YYYY" style={{ width: '100%' }} disabledDate={disabledDateFrom} />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xxl={7} xl={7} sm={8} xs={24} style={{
                                                                        paddingRight: '0' 
                                                                    }}>
                                                                        <Form.Item
                                                                            label=""
                                                                            name={[index, "time"]}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: 'Hạng mục không được để trống',
                                                                                },
                                                                            ]}
                                                                            fieldKey={[field.fieldKey, "time"]}
                                                                        >
                                                                            <Select disabled={locationOfTheTours[index] && locationOfTheTours[index].statusTour} placeholder="Chọn buổi">
                                                                                {listTime.map(item => (
                                                                                    <Option key={item.key} value={item.key}>
                                                                                        {item.name}
                                                                                    </Option>
                                                                                ))}
                                                                            </Select>
                                                                        </Form.Item>
                                                                    </Col>
                                                                    </div>
                                                                    <div>
                                                                    <Col xxl={1} xl={1} sm={1} xs={1} style={{
                                                                        paddingRight: '0'
                                                                    }}>
                                                                        {((locationOfTheTours[index] && !locationOfTheTours[index].statusTour) || !locationOfTheTours[index]) &&
                                                                            <Tooltip placement="top" title="Cài đặt thời gian nhận dự báo cho địa điểm">
                                                                                <BellFilled className={(locationOfTheTours[index] && locationOfTheTours[index].notifyDateTime) && styles.messageFilled}
                                                                                    style={{ width: '5%', verticalAlign: '-webkit-baseline-middle', color: '#bfbfbf' }} onClick={() => checkLocation(field.name)} />
                                                                            </Tooltip>
                                                                        }
                                                                    </Col>
                                                                    </div>
                                                               
                                                            </Input.Group>
                                                        </Row>
                                                    ))}
                                                    <Form.Item style={{
                                                        marginTop: '11px',
                                                        paddingBottom: '0'
                                                    }}>
                                                        <Button
                                                            style={{ color: '#5bd171', border: '1px solid #5bd171', width: 'auto', textAlign: 'center', }}
                                                            onClick={() => {
                                                                add();
                                                            }}
                                                            block
                                                            shape="round"
                                                        >
                                                            <PlusCircleFilled /> Thêm điểm
                                                    </Button>
                                                    </Form.Item>
                                                </>
                                            );
                                        }}
                                    </Form.List>
                                    <Modal
                                        destroyOnClose
                                        title="Thời gian nhận thông báo"
                                        visible={visible}
                                        footer={[<Button onClick={() => { resetNotifyDateLoction() }}>Hủy</Button>,
                                        <Button type="primary" onClick={() => handleUpdateData()}>
                                            Cập nhật
                                                            </Button>]}
                                        onCancel={() => { setVisible(); }}
                                        key="modelSetting"
                                    >
                                        <Row gutter={24}>
                                        <Col xxl={7} xl={7} sm={24} xs={24} className="label-modal">
                                               <label >Điểm đến:</label>
                                            </Col>
                                            <Col xxl={17} xl={17} sm={24} xs={24} style={{width: '100%'}}>
                                                <Form.Item
                                                    name="nameLocation"
                                                    initialValue={nameLocation}>
                                                    <Input disabled />
                                                </Form.Item>
                                                <Form.Item
                                                    name="locationIndex"
                                                    hidden
                                                    initialValue={locationIndex}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={7} xl={7} sm={24} xs={24} className="label-modal">
                                               <label ><span style={{color: 'red'}}>*</span>Thời gian nhận:</label>
                                            </Col>
                                            <Col xxl={9} xl={9} sm={12} xs={12}>
                                                <Form.Item
                                                    name="notifyDateLoction"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Ngày không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker style={{ width: '100%' }}
                                                        format="DD/MM/YYYY"
                                                        onChange={onChangeDateNotify}
                                                        disabledDate={disabledDateNotify}
                                                        placeholder="00/00/0000" />
                                                </Form.Item>
                                            </Col>
                                            <Col xxl={8} xl={8} sm={12} xs={12} style={{ paddingLeft: '0' }}>
                                                <Form.Item
                                                    name="notifyTimeLoction"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Giờ không được để trống',
                                                        },
                                                    ]}
                                                >
                                                    <TimePicker style={{ width: '100%' }}
                                                        format="HH:mm"
                                                        disabledHours={disabledHours}
                                                        placeholder="00:00" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Modal>
                                </div>
                            </Panel>
                            <Panel header="Cài đặt thông báo" key="notify" style={{
                                fontSize: '10px',
                            }}>
                                <div style={{
                                    padding: '21px 25px 120px 25px'
                                }}>
                                    <Row gutter={24}>
                                        <Col xxl={6} xl={9} md={24} sm={24} xs={24} style={{
                                            fontSize: '14px',
                                            lineHeight: '2.2',
                                        }}>Nhận thông báo qua</Col>
                                        <Col xl={13} xxl={10} md={24} sm={24} xs={24} style={{
                                            paddingRight: '0',
                                        }}>
                                            <Form.Item name="notifyChanel">
                                                <Checkbox.Group onChange={onChangeNotify}>
                                                    {notifyChanel.map(item => (
                                                        <Checkbox value={item.value} key={item.value} name="notifyChanel" onChange={item.value == "2" ? onGroupChange : ""}>{item.label}</Checkbox>
                                                    ))}
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col span={2} sm={2} xs={2} style={{
                                            paddingLeft: '0'
                                        }}>
                                          <InfoCircleOutlined style={{
                                                fontSize: '12px',
                                                color: '#d9d9d9',
                                                marginLeft: '0',
                                                marginTop: '10px',
                                            }} />
                                        </Col> */}
                                    </Row>
                                    <Row gutter={24}>
                                        <Col xxl={5} xl={7} sm={24} xs={24} style={{
                                            fontSize: '14px',
                                            lineHeight: '2.2',
                                            paddingRight: '0'
                                        }}>
                                            <Row>
                                                Thời gian nhận
                                            <InfoCircleOutlined style={{ marginTop: '6px', marginLeft: '7px', color: '#d9d9d9', fontSize: '12px', }} />
                                            </Row>
                                        </Col>
                                        <Col xxl={8} xl={7} sm={11} xs={11} style={{
                                            padding: '0',

                                        }}>
                                            <Form.Item name="frontDate"
                                                rules={[
                                                    {
                                                        required: flagNotify,
                                                        message: 'Ngày nhận không được để trống',
                                                    },
                                                ]}>
                                                <Select style={{ width: '100%' }}
                                                    disabled={dataTour.statusTourFrom && dataTour.statusTourFrom}
                                                >
                                                    <Option value="" >Chọn thời gian nhận</Option>
                                                    {dayNotify}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xl={10} sm={13} xs={13} xxl={10}
                                            className="time"
                                            style={{
                                                paddingLeft: '16px'
                                            }}>
                                            <Form.Item
                                                name="notifyTime"
                                                rules={[
                                                    {
                                                        required: flagNotify,
                                                        message: 'Thời gian nhận không được để trống',
                                                    },
                                                ]}>
                                                <Select
                                                    mode="multiple"
                                                    maxTagPlaceholder={2}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn giờ nhận"
                                                    onChange={handleChangeTime}
                                                >
                                                    {optsTime.map(item => (
                                                        <Option
                                                            disabled={optionsSelected && optionsSelected.length > 1 && !optionsSelected.includes(item)}
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default connect(({ formAndstepFormEdit }) => ({
    data: formAndstepFormEdit.step,
}))(Step1);
