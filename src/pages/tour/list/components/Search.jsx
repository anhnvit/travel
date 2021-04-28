import { Form, Row, Col, Button, Input, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import moment from 'moment';

const FormItem = Form.Item;

const Search = props => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        search
    } = props;
    const getFields = () => {
        const count = expand ? 3 : 2;
        const children = [
            <Col xxl={9} xl={7} xs={24} md={12} sm={12} order={1} key={1}>
                    <FormItem
                        name="keyword"
                        label="Từ khóa"
                        // initialValue=""
                        initialValue={search.keyword}
                        // value={search.keyword}
                    >
                    <Input  type="text" placeholder="Mã tour, Tên tour, Tên đoàn, Điểm khởi hành, Điểm đến ..."></Input>    
                    </FormItem>
                </Col>,
                <Col xxl={9} xl={9} xs={24} md={12} sm={12} order={2} key={2} style={{paddingLeft: '15px'}} className="time"> 
                <span style={{
                    paddingRight: '16px',
                    float: 'left',
                    transform: 'translateY(25%)',
                }}
                className="time-place">Thời gian diễn ra</span>
                <div className="date-time" style={{
                    display: 'flex'
                    
                }}>
                    <FormItem
                        name="fromDate"
                        // initialValue={moment().subtract(1, 'months').startOf('month')}
                        initialValue={search.fromDate !== null ? moment(search.fromDate,"DD/MM/YYYY") : null}
                    >
                    <DatePicker  inputReadOnly={true} placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
                    </FormItem>
                    <FormItem
                        name="toDate"
                        style={{ marginLeft: '8px' }}
                        // initialValue={moment().add(1,'month').endOf('month')}
                        initialValue={search.toDate !== null ? moment(search.toDate,"DD/MM/YYYY") : null}
                    >
                    <DatePicker inputReadOnly={true} placeholder="DD/MM/YYYY" format="DD/MM/YYYY"  />
                    </FormItem>
                    </div>
                </Col>,
                
                <Col xxl={9} xl={9} xs={24} md={12} sm={12} order={3} key={5} >
                    <FormItem
                        name="locationName"
                        label="Điểm tham quan"
                        initialValue={search.locationName}
                    >
                    <Input type="text" placeholder="Nhập điểm tham quan"></Input>    
                    </FormItem>
                </Col>
        ]
        const filter = [];
        for (let i = 0; i < count; i++) {
            filter.push(
              children[i],
            );
          }
        const button = <Col xxl={6} xl={6} xs={24} md={24} sm={8} order={3} key={4} gutter={[8,16]} className={`button-filter ${expand ? 'expand' : 'collapse'}`} style={{ textAlign: 'right'}}>
                        <Button
                            style={{ 
                                margin: '0 7px', 
                                marginRight: '16px',
                                padding: '0px 26px'
                 
                            }}
                            onClick={() => {
                                form.setFieldsValue({
                                    keyword:"",
                                    locationName:"",
                                    fromDate: moment().subtract(1, 'months').startOf('month'),
                                    toDate: moment().add(1,'month').endOf('month')
                                });
                                // setReset(!reset);
                                // form.resetFields();
                            }}
                        >
                            Đặt lại
                        </Button>
                        <Button 
                            type="primary" 
                            onClick={handleSearch}
                            style={{
                                marginRight: '16px',
                                padding: '0px 26px' 
                            }}
                            >
                            Tìm kiếm
                            
                        </Button>
                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                            setExpand(!expand);
                            }}
                        >
                         {expand ? "Thu gọn" : "Mở rộng"} {expand ? <UpOutlined /> : <DownOutlined />} 
                        </a>
                    </Col>  
                    filter.push(button);
        return filter;
    };
    const handleSearch = async () => {
        const fieldsValue = await form.validateFields();
        fieldsValue.fromDate = fieldsValue.fromDate !== null ?  moment(fieldsValue.fromDate).format('DD/MM/YYYY') : null;
        fieldsValue.toDate = fieldsValue.toDate !== null ? moment(fieldsValue.toDate).format('DD/MM/YYYY') : null;
        fieldsValue.listStatus = [0];
        handleUpdate(fieldsValue);
        return 
    };

    return (
        <>
            
            <div id="components-form-demo-advanced-search">
                <Form
                    form={form}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                    style={{ 
                        marginBottom: '12px'
                    }}
                >
                    <Row style={{ 
                        backgroundColor: 'white',
                        padding: '20px 16px',
                    }} >{getFields()}
                        
                    </Row>
                    
                </Form>
            </div>
        </>
    );
};

export default Search;