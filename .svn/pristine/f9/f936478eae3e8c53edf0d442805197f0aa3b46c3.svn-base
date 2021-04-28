import {Form, Input, message, Button, Spin } from 'antd';
import React, { useState } from 'react';
import Register from './../../serviceApi';

const Registration = props => {
    const [form] = Form.useForm();
    const { validateFields, getFieldValue } = form;
    const {onClick: currentStep, data} = props;
    const [disabledButton, setDisabledButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const confirm = async () => {
        await validateFields();
        setLoading(true);
        const dataOTP = await getFieldValue();
        let param = {
            "otp": dataOTP.otp,
            "email": data.Email
        }
        Register.verifyOTP(param).then((response) => {
            if (response.statusCode == 200) {
                setLoading(false);
                message.success(response.data.message);
                currentStep('resetPass', response.data.userName);
            } else {
                setTimeout(()=> {setLoading(false)}, 1000);
                message.error(response.data.message);
            }
        })
    }
    const getOTP = async () => {
        setLoading(true);
        setDisabledButton(true);
        let param = {
            "email" : data.Email
        }
        Register.sendRequireForgetPassword(param).then((response) => {
            setDisabledButton(false);
            if (response.statusCode == 200) {
                setLoading(false);
                message.success(response.data.message);
            } else {
                setTimeout(()=> {setLoading(false)}, 1000);
                message.error(response.data.message);
            }
        })
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
        <div style={{marginTop: '67px'}}>
            <Form
                form={form}
            >
                <p>Để đổi mật khẩu, Quý khách vui lòng nhập mã xác thực đã gửi tới <br/> {data.Email}</p>
                <div className="main___2rucS form-OTP" style={{marginTop: '36px'}}>
                <Form.Item
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "Mã xác thực không được để trống"
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập mã" width="80%"/>
                </Form.Item>
                <div style={{margin: '31px 0 29px 0'}}>
                <Button type="primary" htmlType="submit" style={{margin: "14px 0 0", height: '40px', padding: '9px 36px'}} onClick={() => confirm()}>Xác nhận</Button>
                </div>
                <Button type="link" disabled={disabledButton} onClick={() => getOTP()}>Lấy lại mã</Button>
                </div>
            </Form>
        </div>
        </Spin>
    );
}
export default Registration; 