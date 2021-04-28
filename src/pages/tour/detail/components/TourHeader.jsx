import {DownOutlined, MessageOutlined, ShareAltOutlined, UpOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, Modal, Result, Row} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import * as Common from '@/utils/common';
import * as Constant from '@/utils/constant';
import { BASE_URL_CDN } from '@/utils/constant';
import '../index.css';
import moment from 'moment';
import TourInfo from '../service';
import ListTour from "@/pages/tour/list/service";

const { TextArea } = Input;
const TourHeader = ({ data, tourId, idSelect,isHidden }) => {

    const textAreaRef = useRef(null);
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(false);
    const [visibleShare, setVisibleShare] = useState(false);

    const handleFeedback = async () => {
        const fieldsValue = await form.validateFields();
        TourInfo.feedbackContent({"feedbackContent":fieldsValue.content, "tourId":tourId}).then((response) => {
            if(response.statusCode === 200){
                setVisible(false);
                setMessage(true);
                form.resetFields()
            }
        });
    }
    useEffect( () => {
        //window.addEventListener('scroll', handleScroll);
      },[])
    const handleCancel = (e) => {
        setVisible(false);
        setVisibleShare(false);
        setMessage(false);
    }
    const handleCopy = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    }
    const exportExcel = (idTour) => {
        ListTour.exportToExcel({ "tourId": idTour }).then((response) => {
        if (response.statusCode === 200) {
          window.open(BASE_URL_CDN + response.data);
        }
      });
    }
    
    return (
        <>
            <Row className="tour-header" id={idSelect}> 
                <div className="detail-left">
                            <Col xl={24} xxl={24} xs={24} sm={24} >
                                <div className="name-tour">
                                    <span sm={24} xs={24} md={24} xl={24} xxl={24} className="tour-header-code">{data.tourCode}</span>
                                    <span sm={24} xs={24} md={24} xl={24} xxl={24} className="tour-header-name" style={{}}>{data.tourName}
                                    <a
                                        style={{ fontSize: 10, color: "#000000", marginRight: "30px", paddingLeft: "6px" }}
                                        onClick={() => {
                                            setExpand(!expand);
                                        }}
                                    >
                                        {expand ? <UpOutlined /> : <DownOutlined />}
                                    </a>
                                    </span>
                                    
                                </div>
                                {(expand) &&
                            
                            <Col xl={24} xxl={24} xs={24} sm={24} className="tour-header-expand">
                                <div><span style={{ paddingRight: "50px" }}>Tên đoàn/khách:<strong>{data.customerName}</strong></span></div>
                                <div><span style={{ paddingRight: "50px" }}>Điểm khởi hành: <strong>{data.fromPoint} - {Common.convertTimeIntToText(data.fromTime)} - {moment(data.fromDate).format('DD/MM/YYYY')}</strong></span>
                                <span >Điểm đến: <strong>{data.toPoint} - {Common.convertTimeIntToText(data.toTime)} - {moment(data.toDate).format('DD/MM/YYYY')}</strong></span></div>
                            </Col>
                        
                             }
                             </Col>
                    
                </div>
                <div className="detail-right">
                    <Col xl={24} xxl={24} sm={24} xs={24}>
                    {!isHidden &&
                        <div style={{lineHeight: "36px", display: "inline-flex", float: 'left', marginRight: '10px'}} className="share-detail"><span style={{ color: "#1890ff", marginRight: "30px", cursor: "pointer" }} onClick={() => setVisible(!visible)}><MessageOutlined style={{ fontSize: '14px', color: '#1890ff' }} /> Phản hồi</span> 
                            <Modal
                                title="Phản hồi"
                                visible={visible}
                                onCancel={handleCancel}
                                footer={[<Button onClick={() => setVisible(false)}>Hủy</Button>,
                                <Button type="primary" onClick={() => handleFeedback()}>
                                    Gửi
                                    </Button>]}
                            >
                                <Form
                                    form={form}
                                    layout="horizontal"
                                    name="basic"
                                    initialValues={{ remember: false }}
                                >
                                    <Form.Item
                                        name="content"
                                        rules={[
                                            { required: true, message: 'Nội dung không được để trống' },
                                            {
                                                max: 500,
                                                message: "Nội dung không dài quá 500 ký tự",
                                            },
                                        ]}
                                        initialValue=""
                                        
                                    >
                                        <TextArea placeholder="Nhập nội dung" />
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal
                                visible={message}
                                onCancel={handleCancel}
                                footer={false}
                            >
                                {message && <Result 
                                    status="success"
                                    title="Gửi thành công"
                                    subTitle="Phản hồi đã được gửi tới bộ phận tiếp nhận. Cám ơn những ý kiến đóng góp chân thành của quý khách."
                                /> }
                                
                            </Modal>

                            <Modal
                                title="Chia sẻ lịch trình"
                                visible={visibleShare}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                    <Form.Item className="form-share">
                                        <Input ref={textAreaRef} readOnly={true} defaultValue={data.linkPublic} style={{float: 'left'}}/>
                                        <Button type="primary" onClick={handleCopy}>Sao chép</Button>
                                    </Form.Item>
                            </Modal>
                            <span style={{ color: "#1890ff", cursor: "pointer" }} onClick={() => setVisibleShare(!visibleShare)}><ShareAltOutlined style={{ fontSize: '16px', color: '#1890ff' }} /> Chia sẻ</span>
                        </div>
                        }
             </Col>
                {!isHidden && 
                    <Col xl={24} xxl={24} sm={24} xs={24} className="justify-content-end">
                        {data.status !== Constant.STATUS_TOUR_END &&
                            <Button type="default" style={{ marginRight: "10px" }}><Link to={`/tour/edit/${tourId}`}>Sửa lịch trình</Link></Button>
                        }
                        <Button type="primary" onClick={() => { exportExcel(tourId) }}>Xuất báo cáo</Button>
                    </Col>
                }
            
          </div>
            </Row>
        </>
   );
}
export default TourHeader
