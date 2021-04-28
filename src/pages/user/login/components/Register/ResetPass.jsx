import { Alert, Checkbox, Form, Input, message, Button, Spin } from 'antd';
import React, { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import Password from '../../serviceApi';
import { defaultMessages } from "@/utils/messages";

const ResetPassword = props => {
    const [form] = Form.useForm();
    const { onClick: currentStep, data } = props;
    const { validateFields, getFieldValue } = form;
    const [loading, setLoading] = useState(false);
    const resetPassword = async () => {
        await validateFields();
        setLoading(true);
        const dataPassword = await getFieldValue();
        let param = {
            "password": dataPassword.password,
            "userName": data
        }
        let format = /[ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]/;
        if (format.test(dataPassword.password.toLocaleUpperCase())) {
            setTimeout(()=> {setLoading(false)}, 1000);
            message.error("Mật khẩu gồm 6-32 ký tự không chứa dấu cách và tiếng việt có dấu!");
        } else {
            Password.resetPass(param).then((response) => {
                if (response.statusCode == 200) {
                    setLoading(false);
                    message.success(response.data.message);
                    currentStep('login', '');
                } else {
                    setTimeout(()=> {setLoading(false)}, 1000);
                    message.error(response.data.message);
                }
            })
        }
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
        <div style={{ marginTop: '67px' }}>
            <Form
                className="confirm-pass"
                form={form}
                validateMessages={defaultMessages}
            >
                <p>Đổi mật khẩu cho tài khoản {data}</p>
                <div className="main___2rucS" style={{ marginTop: '36px' }}>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                max: 32,
                                min: 6,
                                message: "Mật khẩu từ 6 đến 32 ký tự"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Mật khẩu mới" prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Nhập lại mật khẩu không khớp');
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu" prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ padding: '0 32px', marginTop: '29px', height: '40px', fontSize: '16px' }} onClick={() => resetPassword()}>Cập nhật</Button>
                </div>
            </Form>
        </div>
        </Spin>
    );
}
export default ResetPassword;