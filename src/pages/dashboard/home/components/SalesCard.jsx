import { Card, Col, Row, Table } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import React from 'react';
import {Link} from 'react-router-dom';
// import { Bar } from './Charts';
import Bar from './Charts/Bar/index2';
import styles from '../style.less';
import * as Common from '@/utils/common';
const columns = [
    {
      title: '',
      dataIndex: '',
      hideInSearch: false,
            render: (_, record) => (
        <>
          {<div key={record.id} style={{ width: "5px", height: "80%", transform: 'translateY(15%)', position: 'absolute', top: '0', left: '0', backgroundColor: `${Common.getColorWeather(record.statusColorWeather, record.statusTour)}` }}></div>}
        </>
      )
    },
    {
      title: '',
      dataIndex: 'tourCode',
      key:"tourCode",
      render: (_, record) => (
        <>
            <Link to={`/tour/detail/${record.tourId}`} className='line-clamp'>{record.tourCode} </Link>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'tourName',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <div  className='line-clamp'>
              {record.tourName}
          </div>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'date',
      hideInSearch: true,
      className: 'date'
    },
    {
        title: '',
        dataIndex: '',
        fixed: 'right',
        hideInSearch: false,
              render: (_, record) => (
          <>
            {<Link to={`/tour/detail/${record.tourId}`}><RightOutlined /></Link>}
          </>
        )
      },
  ];
const SalesCard = ({
    dataTour,
    loading,
    tourNote,
    countTour
}) => (
    <Card
        loading={loading}
        bordered={false}
        bodyStyle={{
            padding: 0,
        }}
    >
        <div className={styles.salesCard}>
            <Row className={styles.salesBar}>
                <Col xl={15} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                        <Bar
                            height={500}
                            // title={
                            //     <FormattedMessage
                            //         id="dashboardandanalysis.analysis.sales-trend"
                            //         defaultMessage="Sales Trend"
                            //     />
                            // }
                            title='Lịch trình đã tạo trong tháng'
                            data={dataTour}
                            tickCount={dataTour.length > 20 ? 15 : dataTour.length}
                        />
                    </div>
                </Col>
                <Col xl={9} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                        <span className={styles.rankingTitle}>Lịch trình đã tạo
                            {/* <FormattedMessage
                                id="dashboardandanalysis.analysis.sales-ranking"
                                defaultMessage="Sales Ranking"
                            /> */}
                        </span>
                        <Row className={styles.rankingList} >
                            <Col span={12}>
                                <span style={{color: 'rgba(0, 0, 0, 0.65)' }}>Danh sách lịch trình</span>
                            </Col>
                            <Col span={12} style={{textAlign: "right", color: "rgba(0, 0, 0, 0.65)"}} className='date-tour'>Ngày khởi hành</Col>
                        </Row>
                        <Table className='table-tour' columns={columns} dataSource={tourNote} pagination={false} rowKey="tourId"/>
                        { countTour > 10 && 
                        <div style={{textAlign: 'right'}}>
                            <Link to={`/tour/list`} >Xem thêm </Link>
                        </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    </Card>
);

export default SalesCard;
