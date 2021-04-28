import { DeleteOutlined, EditOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message, Modal, Icon } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import Crops from './service';
import * as XLSX from "xlsx";

const TableList = () => {
    const { TextArea } = Input;
    const { confirm } = Modal;
    const [dataCombine, setDataCombine] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [stepFormValues, setStepFormValues] = useState({});
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');

    const actionRef = useRef();
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <PageHeaderWrapper>
            <div>
                <div style={{ marginTop: 100 }}>
                    <Button className="upload-wrap">
                        {/* <Icon type="upload" /> */}
                        <input className="file-uploader" type="file" accept=".xlsx, .xls" onChange={onImportExcel} />
                        <span className="upload-text">Upload files</span>
                    </Button>
                    <p className="upload-tip">Supports files in .xlsx, .xls format</p>
                </div>
            </div>
        </PageHeaderWrapper>
    );
};

export default TableList;
