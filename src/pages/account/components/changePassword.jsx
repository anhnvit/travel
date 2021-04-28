import React, { useState } from 'react';
import { Input, Form, Button, message, Spin, Row, Col } from 'antd';
import styles from './BaseView.less';
import User from './../serviceApi';
import { defaultValidateMessages } from "@/utils/messages";

const Profile = () => {
    const [form] = Form.useForm();
    const { validateFields, getFieldValue, resetFields } = form;
    const [loading, setLoading] = useState(false);
    const changePassword = async () => {
        await validateFields();
        setLoading(true);
        let data = await getFieldValue();
        let format = /[ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]/;
        if (format.test(data.passwordNew.toLocaleUpperCase())) {
            setTimeout(() => { setLoading(false) }, 1000);
            message.error("Mật khẩu gồm 6-32 ký tự không chứa dấu cách và tiếng việt có dấu!");
        } else {
            User.UpdatePassword(data).then((response) => {
                if (response.statusCode == 200) {
                    setLoading(false);
                    message.success(response.data.message);
                } else {
                    resetFields();
                    setTimeout(() => { setLoading(false) }, 1000);
                    message.error(response.data.message);
                }
            })
        }
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
        <span style={{fontSize: '20px'}}>Cài đặt mật khẩu</span>
        <Row gutter={24}>
        <Col xl={9} md={12} sm={24} xs={24} className='acc-change'>
            <Form
                className='change-pass'
                layout="vertical"
                form={form}
                validateMessages={defaultValidateMessages}
            >
                
                <div className="main___2rucS" style={{ marginTop: '25px' }}>
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="passwordOld"
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
                        <Input.Password placeholder="Mật khẩu cũ" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="passwordNew"
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
                        <Input.Password placeholder="Mật khẩu mới" />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="confirm"
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('passwordNew') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Nhập lại mật khẩu không khớp');
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ padding: '0 16px'}} onClick={() => changePassword()}>Đổi mật khẩu</Button>
                </div>
            </Form>
        </Col>
        </Row>
        </Spin>
    );
}

export default Profile;