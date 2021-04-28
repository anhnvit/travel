import React, { useState, useEffect } from 'react';
import { Card, Steps, Row, Col, Spin } from 'antd';
import { connect } from 'umi';
import Step1 from './../edit/components/Step1';
import Step2 from './../edit/components/Step2';
import MapMarker from './../edit/components/Map';
import styles from './../edit/style.less';
import Tour from './../edit/serviceApi';
import moment from 'moment';
import './../edit/style-edit.css'

const { Step } = Steps;
const StepForm = (props) => {
    const { dispatch } = props;
    const [latLng, setLatlng] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepComponent, setStepComponent] = useState([]);
    const [dataTour, setDataTour] = useState({});
    const [status, setStatus] = useState(true);
    const [tourId, setTourId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const key = `${tourId}${props.current}${isCreate}`;
    const getCurrentStepAndComponent = (current, data) => {
        switch (current) {
            case 'confirm':
                setLoading(false);
                return {
                    step: 1,
                    component: <Step2 />,
                };
            case 'info':
            default:
                setLoading(false);
                return {
                    step: 0,
                    component: <Step1 onClick={(latLng) => {
                        setLatlng(latLng);
                    }}
                        dataTour={data}
                        flagTemplate={true}
                        onchang={(templateId) => {
                            setTourId(templateId);
                        }} />,
                };
        }
    };
    if (isCreate) {
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
        setLoading(true);
        if (tourId) {
            Tour.TemplateDetail({ "tourId": tourId }).then((response) => {
                let objNew = {};
                let locationOfTheTours = [];
                objNew.tourName = response.data[0].tourName;
                response.data && response.data.map((itemLocation) => {
                    if (itemLocation.type == 1) {
                        objNew.fromPoint = itemLocation.locationInfo;
                    }
                    if (itemLocation.type == 2) {
                        objNew.toPoint = itemLocation.locationInfo;
                    }
                    if (itemLocation.type == 3) {
                        locationOfTheTours.push(itemLocation);
                    }
                })
                objNew.LocationOfTheTour = locationOfTheTours;
                setDataTour(objNew);
                const { step, component } = getCurrentStepAndComponent(props.current, objNew);
                setCurrentStep(step);
                setStepComponent(component);
            });
        } else {
            if (isCreate) {
                setIsCreate(false);
            } else {
                const { step, component } = getCurrentStepAndComponent(props.current, []);
                setCurrentStep(step);
                setStepComponent(component);
            }
        }
    }, [key]);
    

    return ((
        <Spin tip="Loading..." spinning={loading} >
            <div id='edit-tour'>
                <Card bordered={true}>
                    <Row>
                        <Col className="map">
                            <Steps current={currentStep} className={styles.steps}
                                style={{
                                    paddingLeft: '24px',
                                }}>
                                <Step title="Tạo lịch trình" />
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
            </div>
        </Spin>
    ));
};

export default connect(({ formAndstepFormEdit }) => ({
    current: formAndstepFormEdit.current
}))(StepForm);
