import { Alert, Checkbox, Form, Input, message, Button, Spin } from 'antd';
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
            "userName": data.userName
        }
        Register.ConfirmAccount(param).then((response) => {
            if (response.statusCode == 200) {
                setLoading(false);
                currentStep('login', '');
                message.success(response.data.message);
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
            "fullName": data.fullName,
            "email": data.email,
            "userName": data.userName
        }
        Register.regainOTP(param).then((response) => {
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
        <div  style={{marginTop: '67px'}}>
            <Form
                className="success-regis"
                form={form}
            >
                <p>Để hoàn tất đăng ký. Quý khách vui lòng nhập mã xác thực đã gửi tới <br/> {data.email} để xác thực</p>
                <div className="main___2rucS" style={{marginTop: '36px'}}>
                <Form.Item
                    name="otp"
                    width="90%"
                    rules={[
                        {
                            required: true,
                            message: "Mã xác thực không được để trống"
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập mã" width="80%"/>
                </Form.Item>
                <div style={{margin: '31px 0 29px'}}>
                    <Button type="primary" htmlType="submit" style={{padding: '0 40px', height: '40px', fontSize: '16px'}} onClick={() => confirm()}>Kích hoạt</Button>
                    </div>
                
                <Button type="link" onClick={() => getOTP()} disabled={disabledButton}>Lấy lại mã</Button>
                </div>
            </Form>
        </div>
        </Spin>
    );
}
export default Registration;