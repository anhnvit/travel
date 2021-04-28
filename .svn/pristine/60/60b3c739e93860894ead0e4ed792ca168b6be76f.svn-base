import React from 'react';
import { Modal } from 'antd';
const CreateForm = props => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="Thêm mới cây trồng"
      visible={modalVisible}
      onCancel={() => onCancel()
      }
      cancelButtonProps="true"
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
