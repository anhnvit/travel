import { Alert, Checkbox, Form, Input, message, Button, Spin } from 'antd';
import React, { useState } from 'react';
import {MailTwoTone} from '@ant-design/icons';
import Register from './../../serviceApi';
import {validateMessages} from "@/utils/messages";

const ForgetPassword = props => {
    const [form] = Form.useForm();
    const {onClick: currentStep, data} = props;
    const { validateFields, getFieldValue } = form;
    const [loading, setLoading] = useState(false);
    const backLogin = () => {
        currentStep('login', '');
    }
    const sendRequireForgetPassword = async () => {
        await validateFields();
        setLoading(true);
        const dataEmail = await getFieldValue();
        let param = {
            "email" : dataEmail.Email
        }
        Register.sendRequireForgetPassword(param).then((response) => {
            if (response) {
                if (response.statusCode == 200) {
                    setLoading(false);
                    message.success(response.data.message);
                    currentStep('verifyOTP', dataEmail)
                } else {
                    setTimeout(()=> {setLoading(false)}, 1000);
                    message.error(response.data.message);
                }       
            } else {
                setTimeout(()=> {setLoading(false)}, 1000);
                message.error("Email không tồn tại");
            }
        })
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
        <div className="forgot main___2rucS">
            <Form
                form={form}
                validateMessages={validateMessages}
            >
                <p style={{padding: '41px'}}>Quý khách muốn lấy lại mật khẩu?</p>
                <Form.Item
                    name="Email"
                    rules={[
                        {
                            required: true,
                            type: "email"
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Nhập email" prefix={<MailTwoTone className="site-form-item-icon" />}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%', marginBottom: '30px', height: '40px', fontSize: '16px'}} onClick={() => sendRequireForgetPassword()}>Gửi yêu cầu</Button>
            </Form>
            <Button type="link" onClick={() => backLogin()}>Quay lại</Button>
        </div>
        </Spin>
    );
}
export default ForgetPassword;