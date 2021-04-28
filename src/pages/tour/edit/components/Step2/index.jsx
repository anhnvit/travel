import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Tag, Row, Col, Switch, message } from 'antd';
import { BellFilled, InfoCircleOutlined } from '@ant-design/icons';
import { connect,Redirect } from 'umi';
import styles from './index.less';
import moment from 'moment';
import Tour from './../../serviceApi';
import { Link } from 'react-router-dom';

const Step2 = (props) => {
    const Time = {
        0: 'Sáng',
        1: 'Chiều',
        2: 'Tối'
    };
    const notification = {
        0: 'Trình duyệt',
        1: 'Email',
        2: 'SMS'
    };
    const [form] = Form.useForm();
    const { data, dispatch, submitting} = props;
    const dataTour = data;
    const removeLocationId = data.removeLocationId;
    const templateFlag = (dataTour && dataTour.isTemplate == 1) ? true : false;
    const [isTemplate, setIsTemplate] = useState(templateFlag);
    const [loading, setLoading] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);
    const [statusComfirm, setStatusComfirm] = useState(false);
    const [tourId, setTourId] = useState(props.data.tourId);
    if (!dataTour) {
        return null;
    }
    const { getFieldsValue } = form;
    const onPrev = () => {
        if (dispatch) {
            const values = getFieldsValue();
            dispatch({
                type: 'formAndstepFormEdit/saveStepFormData',
                payload: dataTour,
            });
            dispatch({
                type: 'formAndstepFormEdit/saveCurrentStep',
                payload: 'info',
            });
        }
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
    const onValidateForm = async () => {
        setStatusComfirm(true);
        setLoading(true);
        if (dataTour.tourId) {
            Tour.UpdateTour(dataTour, isTemplate, removeLocationId).then((response) => {
                if (response.statusCode === 200) {
                    message.success(response.message);
                    setCheckStatus(true); 
                    onFinish();
                    setLoading(true);
                }
            });
        } else {
            Tour.CreateTour(dataTour, isTemplate).then((response) => {
                if (response.statusCode === 200) {
                    setTourId(response.data);
                    message.success(response.message);
                    setCheckStatus(true);
                    onFinish();
                    setLoading(true);
                }
            });
        }
    };
    if (checkStatus) {
        return <Redirect to={`/tour/detail/${tourId}`} />
    }
    const saveTemp = (checked) => {
        setIsTemplate(checked);
    }
    var { notifyChanel, notifyTime, frontDate, LocationOfTheTour } = dataTour;
    var fromDate = moment(dataTour.fromDate).format("DD/MM/YYYY");
    var toDate = moment(dataTour.toDate).format("DD/MM/YYYY");
    return (
        <>
        <Spin spinning={loading} size="large">
            <div
                className={styles.styleButton}
                style={{
                    paddingRight: '24px',
                    margin: '13px 0px',

                }}>
                <div className='button-confirm'>
                    Lưu mẫu <Switch className={styles.styleSwitch}
                        defaultChecked={dataTour.isTemplate == 1 ? true : false}
                        onChange={(checked) => saveTemp(checked)} />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Link to="/tour/list">
                        <Button onClick={onFinish}>Hủy</Button>
                    </Link>
                    <Button type="primary" ghost className={styles.marginLeft} onClick={onPrev}>Sửa</Button>
                    <Button type="primary" className={styles.marginLeft} onClick={onValidateForm} loading={submitting} disabled={statusComfirm}>Xác nhận</Button>
                </div>
            </div>
            <div style={{
                width: '100%',
                background: '#f0f2f5',
            }}>
                <div
                    className='confirm-tour'>
                    <div style={{
                        overflowY: 'auto',
                        background: '#ffffff',
                        height: '100%'
                    }}>
                        <div className={styles.stepsContent}
                            style={{
                                border: 'none',
                                background: '#fafafa',
                                borderRadius: '2px',
                                marginTop: '0'
                            }}
                        >
                            <Row gutter={24}>
                                <Col span={24} className='heading-title'>Thông tin chung</Col>
                                <Col xxl={10} xl={24} sm={24} xs={24} className='text-info'>
                                    Mã tour: <span>{dataTour.tourCode}</span>
                                </Col>
                                <Col xxl={10} xl={24} sm={24} xs={24} className='text-info'>
                                    Tên tour: <span>{dataTour.tourName}</span>
                                </Col>
                                <Col xxl={24} xl={24} sm={24} xs={24} className='text-info'>
                                    Tên đoàn/khách: <span>{dataTour.customerName}</span>
                                </Col>
                                <Col xxl={24} xl={24} sm={24} xs={24} className='text-info'>
                                    Điểm khởi hành: <span>{dataTour.fromPoint && ` ${dataTour.fromPoint.address} - ${Time[dataTour.fromTime]} - ${fromDate}`}</span>
                                </Col>
                                <Col xxl={24} xl={24} sm={24} xs={24} className='text-info'>
                                    Điểm đến: <span>{` ${dataTour.toPoint.address} - ${Time[dataTour.toTime]} - ${toDate}`}</span>
                                </Col>
                                <Col xxl={24} xl={24} sm={24} xs={24} className='text-info'>
                                    Nhận thông báo qua:
                               <span>
                                        {notifyChanel && notifyChanel.map((item, key) =>
                                            ` ${notification[item]} ; `
                                        )}
                                    </span>
                                </Col>
                                <Col xxl={24} xl={24} sm={24} xs={24} className='text-info'>
                                    Thời gian nhận: <InfoCircleOutlined style={{ fontSize: '12px', color: '#d9d9d9', margin: '0 10px 0 2px', }} />
                                    <span>
                                        {frontDate && (frontDate == 0 ? 'Từ ngày khởi hành , vào lúc' : `Trước ${frontDate} ngày , vào lúc`)}
                                        {notifyTime && notifyTime.map((item) =>
                                            ` ${item} ; `
                                        )}</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='point-visit'>
                            <Row gutter={24}>
                                <Col span={24} className='heading-title'>Điểm tham quan</Col>
                                {LocationOfTheTour && LocationOfTheTour.map((item, key) =>
                                    <Col span={24} className='text-info'>
                                            <div label={key + 1} key={key} className='key-tour'>{key + 1}
                                        <BellFilled className={item.notifyTime && styles.messageFilled} style={{ width: '40px' }} />
                                        <span style={{  color: '#000000d9', fontWeight: '600'}}>{item.locationInfo.address}</span><span style={{color: '#000000d9'}}>{` - ${Time[item.time]} - ${moment(item.date).format("DD/MM/YYYY")}`}</span>
                                        {item.notifyTime &&
                                            <Tag color="blue" style={{ marginLeft: '5px' }}>{`Nhận tin lúc ${moment(item.notifyTime).format("HH:mm")} ${moment(item.notifyDate).format("DD/MM/YYYY")} `}</Tag>
                                        }
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            
            </Spin>
        </>
    );
};

export default connect(({ formAndstepFormEdit, loading }) => ({
    submitting: loading.effects['formAndstepFormEdit/submitStepForm'],
    data: formAndstepFormEdit.step,
}))(Step2);
