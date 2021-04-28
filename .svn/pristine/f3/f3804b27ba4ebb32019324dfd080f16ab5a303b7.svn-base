import React, { useState } from 'react';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Input, Modal, Select, Upload } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const formLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 13,
    },
};

const UpdateForm = props => {
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(props.values.urlImage);
    const [formVals, setFormVals] = useState({
        cropsName: props.values.cropsName,
        scienceName: props.values.scienceName,
        cropsGroup: props.values.cropsGroup,
        detail: props.values.detail,
        urlImage: props.values.urlImage,
        cropsId: props.values.cropsId,
    });
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;

    const handleUpdateData = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({ ...formVals, ...fieldsValue });
        handleUpdate({ ...formVals, ...fieldsValue }, fileList);
    };
    const handleOnChange = ({ fileList }) => {
        setFileList(fileList);
        setImageUrl('');
    }
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const renderContent = () => {
        return (
            <>
                <FormItem
                    name="cropsId"
                    label=""
                    hidden
                >
                    <Input placeholder="" />
                </FormItem>
                <FormItem
                    name="cropsName"
                    label="Tên cây trồng"
                    rules={[
                        {
                            required: true,
                            message: 'Tên cây trồng không được để trống！',
                        },
                    ]}
                >
                    <Input placeholder="" />
                </FormItem>
                <FormItem
                    name="scienceName"
                    label="Tên khoa học"
                >
                    <Input placeholder="" />
                </FormItem>
                <FormItem
                    name="cropsGroup"
                    label="Nhóm"
                >
                    <Input placeholder="" />
                </FormItem>
                <FormItem
                    name="detail"
                    label="Mô tả"
                >
                    <TextArea rows={4} placeholder="" />
                </FormItem>
                <FormItem
                    name="urlImage"
                    label="Ảnh"
                >
                    <Upload
                        onChange={handleOnChange}
                        fileList={fileList}
                        listType="picture-card"
                    >
                        {fileList.length == 1 ? null : (imageUrl.length != '' ? <img alt="example" style={{ width: '100%' }} src={imageUrl} /> : uploadButton)}
                    </Upload>
                </FormItem>
            </>
        );
    };

    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>Hủy</Button>
                <Button type="primary" onClick={handleUpdateData}>
                    Cập nhật
                </Button>
            </>
        );
    };

    return (
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="Sửa đổi cây trồng"
            visible={updateModalVisible}
            footer={renderFooter()}
            onCancel={() => handleUpdateModalVisible()}
        >
            <Form
                {...formLayout}
                form={form}
                initialValues={{
                    cropsId: props.values.cropsId,
                    cropsName: props.values.cropsName,
                    scienceName: props.values.scienceName,
                    cropsGroup: props.values.cropsGroup,
                    detail: props.values.detail,
                    urlImage: props.values.urlImage,
                }}
            >
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateForm;