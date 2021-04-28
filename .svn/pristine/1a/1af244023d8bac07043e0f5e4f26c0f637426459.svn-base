import { Alert, Checkbox, Form, Input, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from './style.less';
import LoginFrom from './components/Login';
import Register from './components/Register/register';
import Confirm from './components/Register/confirm';
import ResetPass from './components/Register/ResetPass';
import ForgetPassword from './components/Register/sendRequireForgetPassword';
import VerifyOTP from './components/Register/verifyOTP';
import './style-login.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const { TabPane } = Tabs;

const Login = props => {
    const { userAndlogin = {}, submitting } = props;
    const { status, type: loginType } = userAndlogin;
    const [autoLogin, setAutoLogin] = useState(false);
    const [type, setType] = useState(props.route.name == 'register' ? 'register' : 'account');
    const [current, setCurrent] = useState('login');
    const [data, setData] = useState([]);
    const [component, setComponent] = useState('');

    const handleSubmit = values => {
        const { dispatch } = props;
        dispatch({
            type: 'userAndlogin/login',
            payload: { ...values, type },
        });
    };

    const getCurrentStepAndComponent = () => {
        switch (current) {
            case 'confirm':
                return <Confirm data={data} onClick={(current, data) => { setData(data); setCurrent(current) }} />
            case 'forgetPassword':
                return <ForgetPassword data={data} onClick={(current, data) => { setData(data); setCurrent(current) }} />
            case 'verifyOTP':
                return <VerifyOTP data={data} onClick={(current, data) => { setData(data); setCurrent(current) }} />
            case 'resetPass':
                return <ResetPass data={data} onClick={(current, data) => { setData(data); setCurrent(current) }} />
        }
    };
    useEffect(() => {
        setComponent(getCurrentStepAndComponent());
    }, [current]);
    const forgetPassword = () => {
        setCurrent("forgetPassword");
    }
    return (
        <div className="log-in">
            { (current != 'login') ?
                <div className={styles.register} style={{ textAlign: 'center'}}>
                    {component}
                </div>
                : <Tabs defaultActiveKey={type} centered >
                    <TabPane tab="ĐĂNG NHẬP" key="account" className={styles.main} style={{ paddingTop: '55px'}}>
                        <LoginFrom onSubmit={handleSubmit} >
                            <UserName
                                name="username"
                                className="form-login"
                                placeholder="Tên đăng nhập hoặc email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hạng mục không được để trống!',
                                    },
                                ]}
                            />
                            <Password
                                name="password"
                                className="form-login"
                                placeholder="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hạng mục không được để trống!',
                                    },
                                ]}
                            />
                            {/* <div>
                                <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
                                    Ghi nhớ
                            </Checkbox>
                            </div> */}
                            <Submit >Đăng nhập</Submit>
                            <div style={{textAlign: 'center' }}>
                                <a  onClick={() => forgetPassword()}>
                                    Quên mật khẩu ?
                                </a>
                            </div>
                        </LoginFrom>
                    </TabPane>
                    <TabPane tab="ĐĂNG KÝ" key="register" className={styles.register}>
                        <Register onClick={(current, data) => { setData(data); setCurrent(current) }} />
                    </TabPane>
                </Tabs>
            }
        </div>
    );
};

export default connect(({ userAndlogin, loading }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
}))(Login);
