import React, { useState, useEffect } from 'react';
import { Input, Form, Upload, Button, message, Spin, Row, Col } from 'antd';
import styles from './BaseView.less';
import { connect, FormattedMessage, formatMessage } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { defaultValidateMessages } from "@/utils/messages";
import User from './../serviceApi';
import { checkPropTypes } from 'prop-types';

const InfoAccount = (props) => {
    const {
        currentUser,
        dispatch
    } = props;
    var listImage = [];
    if (currentUser) {
        listImage.push({
            uid: 0,
            url: currentUser.avatar,
        })
    }
    const { TextArea } = Input;
    const [listImg, setListImg] = useState(listImage);
    const [type, setType] = useState('text');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { validateFields, getFieldValue, setFieldsValue} = form;
    const uploadButton = (
        <div className={styles.button_view}>
            <div style={{ marginTop: 8 }}>Upload</div>
            <UploadOutlined />
        </div>
    );
    currentUser.phone = currentUser.msisdn && currentUser.msisdn.substr(2, 11);
    Object.entries(currentUser).map(([key, value]) => {
        if (value == "null") {
            currentUser[key] = '';
        }
    })
    const AvatarView = ({ avatar }) => (
        <>
            <div className={styles.avatar_title}>
                Ảnh đại diện
                {/* <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Ảnh đại diện" /> */}
            </div>
            <Upload fileList={listImg} listType="picture" onChange={changeAvatar} className="upload-list-inline" accept="image/*">
                <Button icon={<UploadOutlined />}>Thay ảnh</Button>
            </Upload>
        </>
    );
    const changeAvatar = ({fileList}) => {
        if (fileList.length > 0) {
            setFileList([fileList[fileList.length -1]]);
            setListImg([fileList[fileList.length -1]]);
        } else {
            setFileList('');
            setListImg('');
            setFieldsValue({ 'avatar': ''})
        }
    }
    const editAccount = async () => {
        await validateFields();
        setLoading(true);
        let data = await getFieldValue();
        User.UpdateUser(data, fileList).then((response) => {
            if (response.statusCode == 200) {
                setLoading(false);
                message.success(response.data.message);
                dispatch({
                    type: 'user/fetchCurrent',
                });
            } else {
                setTimeout(() => { setLoading(false) }, 1000);
                message.error(response.data.message);
            }
        })
    }
    return (
        <Spin tip="Loading..." spinning={loading} >
       
        <span style={{fontSize: '20px'}}>Thông tin tài khoản</span>
        <div style={{marginTop: '25px'}} className='change-info'>
            <Row gutter={24}>
                <Col xl={{span: 9, order: 1}} md={{span: 14, order: 1}} xs={{span: 24, order: 2}} sm={{span: 24, order: 2}} className='form-info'>
                <Form
                    form={form}
                    layout="vertical"
                    hideRequiredMark
                    validateMessages={defaultValidateMessages}
                    initialValues={currentUser}
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
                            <Input type="text" placeholder="Họ và tên đầy đủ" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input type="text" placeholder="Nhập email" disabled />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Điện thoại"
                        >
                            <Input type="text" addonBefore="+84" style={{ width: '100%' }} disabled />
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
                        <TextArea type="text" placeholder="Địa chỉ liên hệ" />
                    </Form.Item>
                </Form>
                <Button type="primary" htmlType="submit" style={{ padding: '0 16px' }} onClick={() => editAccount()}>Cập nhập thông tin</Button>
         </Col>
         <Col xl={{span: 3, order: 2, offset: 1}} md={{span: 8, order: 2, offset: 1}} xs={{ span: 24, order: 1}} sm={{ span: 24, order: 1}} style={{textAlign: 'center'}} className='avatar'>
                <AvatarView avatar={currentUser.avatar ? currentUser.avatar : ''} />
            </Col>
         </Row>

        </div>
        </Spin>
    );
}
export default connect(({ user }) => ({
    currentUser : user.currentUser ,
}))(InfoAccount);