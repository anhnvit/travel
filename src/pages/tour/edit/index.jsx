import React, { useState, useEffect } from 'react';
import { Card, Steps, Row, Col, Spin } from 'antd';
import { connect } from 'umi';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import MapMarker from './components/Map';
import styles from './style.less';
import Tour from './serviceApi';
import moment from 'moment';
import './style-edit.css'

const { Step } = Steps;
const StepForm = (props) => {
    const [latLng, setLatlng] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepComponent, setStepComponent] = useState([]);
    const [dataTour, setDataTour] = useState({});
    const [status, setStatus] = useState(true);
    const tourId = props.match.params.tourId;
    const key = `${tourId}${props.current}${status}`;
    const [loading, setLoading] = useState(false);
    const { dispatch } = props;
    const getCurrentStepAndComponent = (current, data) => {
        switch (current) {
            case 'confirm':
                return {
                    step: 1,
                    component: <Step2 />,
                };
            case 'info':
            default:
                return {
                    step: 0,
                    component: <Step1 onClick={(latLng) => {
                        setLatlng(latLng);
                    }} dataTour={data}
                        flagTemplate={false} />,
                };
        }
    };
    if (status) {
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
    }
    useEffect(() => {
        if (status) {
            setStatus(false);
        } else {
            setLoading(true);
            Tour.EditTour({ "tourId": tourId }).then((response) => {
                let objNew = response.data;
                if (!objNew.frontDate) {
                    if (objNew.frontDate === 0) {
                        objNew.frontDate = "0"
                    } else {
                        objNew.frontDate = ""
                    }
                }
                objNew.tourId = tourId;
                let locationOfTheTours = [];
                response.data && response.data.locationOfTheTours.map((itemLocation) => {
                    if (itemLocation.type == 1) {
                        objNew.fromLocationId = itemLocation.id,
                            objNew.fromDate = moment(itemLocation.date);
                        objNew.fromPoint = itemLocation.locationInfo;
                        objNew.fromTime = itemLocation.time;
                        objNew.statusTourFrom = (itemLocation.statusTour == 1 || itemLocation.statusTour == 3) ? true : false;
                    }
                    if (itemLocation.type == 2) {
                        objNew.toLocationId = itemLocation.id,
                            objNew.toDate = moment(itemLocation.date);
                        objNew.toPoint = itemLocation.locationInfo;
                        objNew.toTime = itemLocation.time;
                        objNew.statusTourTo = (itemLocation.statusTour == 1 || itemLocation.statusTour == 3) ? true : false;
                    }
                    if (itemLocation.type == 3) {
                        locationOfTheTours.push({
                            locationId: itemLocation.id,
                            date: moment(itemLocation.date),
                            locationInfo: itemLocation.locationInfo,
                            notifyDateTime: itemLocation.notifyTime && moment(itemLocation.notifyTime, 'YYYY-MM-DD HH:mm:ss'),
                            notifyTime: itemLocation.notifyTime && moment(itemLocation.notifyTime, 'YYYY-MM-DD HH:mm:ss'),
                            notifyDate: itemLocation.notifyTime && moment(itemLocation.notifyTime, 'YYYY-MM-DD HH:mm:ss'),
                            time: itemLocation.time,
                            statusTour: (itemLocation.statusTour == 1 || itemLocation.statusTour == 3) ? true : false,
                        })
                    }
                })
                objNew.LocationOfTheTour = locationOfTheTours;
                setDataTour(objNew);
                const { step, component } = getCurrentStepAndComponent(props.current, objNew);
                setCurrentStep(step);
                setStepComponent(component);
                setLoading(false);
            });
        }
    }, [key]);

    return ((

        <div id='edit-tour'>
            <Spin tip="Loading..." spinning={loading} >
                <Card bordered={true}>
                    <Row>
                        <Col className="map">
                            <Steps current={currentStep} className={styles.steps}
                                style={{
                                    paddingLeft: '24px',
                                }}>
                                <Step title="Chỉnh sửa lịch trình" />
                                <Step title="Xác nhận thông tin" />
                            </Steps>
                            <div style={{
                                minWidth: '220px',
                                // minHeight: '700px',
                                width: '100%',
                                // height: '700px',
                                background: '#f0f2f5',
                                // padding: '24px 0px 24px 24px',
                            }}>
                                <MapMarker
                                    latLng={latLng}
                                />
                            </div>
                        </Col>
                        <Col className="form">
                            {stepComponent}
                        </Col>
                    </Row>
                </Card>
            </Spin>
        </div>)
    );
};

export default connect(({ formAndstepFormEdit }) => ({
    current: formAndstepFormEdit.current
}))(StepForm);
