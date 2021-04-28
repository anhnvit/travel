import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'antd';
import Select2 from 'react-select';
import Tour from './../serviceApi';
const formTemplate = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 18,
    },
};
const FormTemplate = props => {
    const {
        visibleTemplate,
        onCancel: handleVisibleTemplate,
        onSubmit: tourInfo,
        optionTour
    } = props;
    const [form] = Form.useForm();
    const { getFieldValue, validateFields, resetFields } = form;
    const onValidateForm = async () => {
        await validateFields();
        var data = await getFieldValue();
        tourInfo(data.tourId.value);
    };
    return (
        <>
            <Modal
                destroyOnClose
                title="Chọn mẫu lịch trình"
                visible={visibleTemplate}
                footer={[<Button key="cancel" onClick={() => {handleVisibleTemplate(false); resetFields()}}>Hủy</Button>,
                <Button type="primary" onClick={() => onValidateForm()}>OK</Button>]}
                onCancel={() => handleVisibleTemplate()}
            >
                <Form form={form}>
                    <Form.Item
                        {...formTemplate}
                        label="Danh sách"
                        name="tourId"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn mẫu',
                            },
                        ]}
                    >

                        <Select2
                            style={{
                                width: '100%',
                            }}
                            options={optionTour}
                            placeholder="Chọn mẫu"
                            isSearchable={true}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default FormTemplate;
