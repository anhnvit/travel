import { Alert, Checkbox, Form, Input, Modal, Button, message, Spin } from 'antd';
import React, { useState } from 'react';
import LoginFrom from '../Login';
import Register from './../../serviceApi';
import { defaultValidateMessages } from "@/utils/messages";

const formItemLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const { TextArea } = Input;

const Registration = props => {
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const { onClick: step } = props
    const [form] = Form.useForm();
    const { validateFields, getFieldValue } = form;
    const getNote = () => {
        setVisible(true);
    }
    const register = async () => {
        await validateFields();
        setLoading(true);
        const dataRegister = await getFieldValue();
        let format = /[ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ ]/;
        if (format.test(dataRegister.password.toLocaleUpperCase())) {
            setLoading(false);
            message.error("Mật khẩu gồm 6-32 ký tự không chứa dấu cách và tiếng việt có dấu!");
        } else {
            let status = true;
            dataRegister.msisdn = `84${dataRegister.phone}`;
            if (dataRegister.phone.length == 10) {
                if (dataRegister.phone.substr(0, 1) == 0) {
                    dataRegister.msisdn = `84${dataRegister.phone.slice(1)}`;
                } else {
                    status = false;
                    setTimeout(() => { setLoading(false) }, 1000);
                    message.error("Số điện thoại không đúng định dạng");
                }
            }
            if (status) {
                Register.RegisterUser(dataRegister).then((response) => {
                    if (response.statusCode == 200) {
                        setLoading(false);
                        step('confirm', dataRegister);
                    } else {
                        setTimeout(() => { setLoading(false) }, 1000);
                        message.error(response.data.message);
                    }
                })
            }
        }
    }
    const flagNote = async (e) => {
        setDisabled(!e.target.checked);
        setChecked(e.target.checked);
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
        <div className="register">
            <Form
                className="form-register"
                form={form}
                {...formItemLayout}
                validateMessages={defaultValidateMessages}
            >
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                        {
                            max: 255,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Họ và tên đầy đủ"/>
                </Form.Item>
                <Form.Item
                    label="Tên đăng nhập"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            max: 255,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            max: 255,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Điện thoại"
                    rules={[
                        {
                            required: true,
                            max: 10,
                            min: 9
                        },
                    ]}
                >
                    <Input type="text" addonBefore="+84" style={{ width: '100%' }} placeholder="Nhập số điện thoại"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            min: 6,
                            max: 32,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Mật khẩu"/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu"
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Mật khẩu không khớp');
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Nhập lại mật khẩu"/>
                </Form.Item>
                <Form.Item
                    label="Tên doanh nghiệp"
                    name="companyName"
                    rules={[
                        {
                            max: 255,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Tên doanh nghiệp" />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ liên hệ"
                    name="address"
                    rules={[
                        {
                            max: 255,
                        },
                    ]}
                >
                    <TextArea type="text" placeholder="Nhập địa chỉ liên hệ" />
                </Form.Item>
                <div name="remember" style={{ textAlign: 'center' }}>
                    <Checkbox onClick={flagNote} checked={checked} style={{position: 'relative', left: '5%'}} className="checkbox"></Checkbox>
                    <p style={{float: 'right'}} className="confirm">Tôi đồng ý và chấp thuận các <a onClick={() => getNote()}>điều khoản sử dụng & chính sách bảo mật</a> của Tripio</p>
                    <Button size="large" type="primary" htmlType="submit" onClick={() => register()} className="btn-register" disabled={disabled}>Đăng ký</Button>
                </div>
            </Form>
            <Modal
                title='Điều khoản sử dụng & chính sách bảo mật'
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={() => {setVisible(false), setChecked(true); setDisabled(false)}}>
                        Đồng ý
                    </Button>,
                ]}
            >
                <p style={{textAlign: 'justify'}}>1. Về tài khoản sử dụng: Khi đăng ký tài khoản, Quý khách hàng phải cung cấp đầy đủ và chính xác thông tin, đây là những thông tin bắt buộc liên quan tới việc hỗ trợ Quý khách trong quá trình sử dụng dịch vụ tại Tripio. Tên đăng nhập và mật khẩu được sử dụng để đăng nhập vào website và các dịch vụ trong hệ thống của Tripio. Quý khách có trách nhiệm bảo mật thông tin. Tripio sẽ không chịu trách nhiệm về mọi tổn thất phát sinh.</p>
                <p style={{textAlign: 'justify'}}>2. Mọi hành vi đăng nhập trái phép cũng như gây thiệt hại cho hệ thống máy chủ của Tripio đều trái pháp luật.</p>
                <p style={{textAlign: 'justify'}}>3. Khi phát hiện những vi phạm như vi phạm bản quyền, hoặc những lỗi vi phạm quy định khác, Tripio có quyền sử dụng những thông tin Quý khách cung cấp khi đăng ký tài khoản để chuyển cho Cơ quan chức năng giải quyết theo quy định của pháp luật.</p>
                <p style={{textAlign: 'justify'}}>4. Tripio có thể thay đổi, bổ sung hoặc sửa chữa thỏa thuận này và sẽ thông báo trước trên Website hoặc các kênh truyền thông chính thức khác của Tripio.</p>
            </Modal>
        </div>
        </Spin>
    );
}
export default Registration;