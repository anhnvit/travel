import { InfoCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Image } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 29,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <Row gutter={24} className='card-tag'>
    <Col {...topColResponsiveProps}>
      <div className={styles.gridCard} style={{background: '#1890FF'}}>
        <div style={{width: '30%', transform: 'translateY(5%)'}} className="img-card">
        <Image
            preview={false}
            src="/image/01-dashboard.svg"
            width={85}
          />
        </div>
        <div style={{width: '70%', padding: '5px 0'}} className="data-card">
          <p>Đang diễn ra</p>
          <label>{visitData.totalTourHappening}</label>
        </div>
      </div>
    </Col>

    <Col {...topColResponsiveProps}>
    <div className={styles.gridCard} style={{background: ' #F39C04'}}>
        <div style={{width: '30%', transform: 'translateY(5%)'}} className="img-card">
            <Image
              preview={false}
              src="/image/02-dashboard.svg"
              width={85}
            />
        </div>
        <div style={{width: '70%', padding: '5px 0'}} className="data-card">
          <p>Sắp diễn ra</p>
          <label>{visitData.totalTourUpcoming}</label>
        </div>
      </div>
    </Col>

    <Col {...topColResponsiveProps}>
    <div className={styles.gridCard} style={{background: ' #FF4D4F'}}>
    <div style={{width: '30%', transform: 'translateY(5%)'}} className="img-card">
        <Image
            preview={false}
            src="/image/03-dashboard.svg"
            width={85}
          />
        </div>
        <div style={{width: '70%', padding: '5px 0'}} className="data-card">
        <p>Có phản hồi</p>
        <label>{visitData.totalFeedback}</label>
        </div>
      </div>
    </Col>

    <Col {...topColResponsiveProps}>
    <div className={styles.gridCard} style={{background: '#4F50AD'}}>
    <div style={{width: '30%', transform: 'translateY(5%)'}} className="img-card">
        <Image
            preview={false}
            src="/image/04-dashboard.svg"
            width={85}
          />
        </div>
        <div style={{width: '70%', padding: '5px 0'}} className="data-card">
        <p>Đã tạo</p>
        <label>{visitData.totalTour}</label>
        </div>
      </div>
    </Col>
  </Row>
);
export default IntroduceRow;
