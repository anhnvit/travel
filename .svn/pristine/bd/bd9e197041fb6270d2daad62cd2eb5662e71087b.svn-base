import { Row,Timeline,Col, Spin,} from 'antd';
import React, { useState, useEffect, Suspense } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as Common from '@/utils/common';
import ListCard from '../detail/components/ListCard';
import PanelItem from '../detail/components/PanelItem';
import TourInfo from '../detail/service';
import '../detail/index.css';
import {
  Element,
  animateScroll as scroll,
} from "react-scroll";
import { Redirect} from 'umi';
import {isMobile} from 'react-device-detect';
const TourHeader = React.lazy(() => import('../detail/components/TourHeader'));

const initialTour = {
        tourCode: "",
        tourName: "",
        customerName: "",
        fromDate: "",
        toDate: "",
        fromPoint: "",
        toPoint: "",
        fromTime: null,
        toTime: null,
        status:null
}
const PublicDetail = (props) => {
  const listTime = [];
  const link = window.location.href;
  const tourCode = props.match.params.key;
  const [tourId, setTourId] = useState({key: tourCode});
  const [infoTour, setInfoTour] = useState(initialTour);
  const [data, setData] = useState([]);
  const [checkExit, setCheckExit] = useState(true);
  const [keyId, setKeyId] = useState("");
  useEffect( () => {
    TourInfo.getTourPublic(tourId).then((response) => {
      if(response.statusCode === 200 && response.data !== null){
        const [tourInfo] = TourInfo.processData(response.data);
        setInfoTour({...tourInfo,status:response.data.status});
        setData(response.data.locationOfTheTours);
      }
    }).catch( err =>{
        console.log(err);
        setCheckExit(false);
    });
  },[tourCode])
  
  if(!checkExit){
    return <Redirect to="/404" />
  }
  const checkTime = (date, time) => {
    let value = `${date}-${time}`;
    if(!listTime.includes(value)){
      listTime.push(value)
      return true;
    }
    return false;
  }
  const handleActive = (id) => {
    setKeyId(id);
  }
  return (
    <div className="tourDetail share-detail">
    <PageHeaderWrapper style={{ backgroundColor:"white"}} title={false}  >
      <Suspense fallback={<Spin style={{ textAlign:"center"}}/>}>
        <TourHeader 
          data={infoTour} 
          link={link} 
          tourId={tourCode}
          isHidden={true}/>
      </Suspense>
      <ListCard data={data} onChange={handleActive}/>
  
        <Row style={{paddingTop: '16px'}}>
        <div className="title-detail">
        <Col span={6} sm={12} xs={12}><h5><strong>CHI TIẾT LỊCH TRÌNH</strong></h5></Col>
          </div>
          <div className="note-detail">
          <Col xxl ={18} xl ={16} sm={24} xs={24} className="note-col">
            <span className="note green">Thời tiết tốt</span>            
            <span className="note red">Thời tiết nguy hiểm</span>            
            <span className="note yellow">Thời tiết cảnh báo</span>
          </Col>
          </div>
        </Row>
        {(!isMobile) && <Timeline>
      {data.map((tour, index) => (
        <Timeline.Item className={`${Common.getClassTour(tour.statusTour)}`} key={index}>
            {tour.locationOfTheTourWeatherInfoDtos.map( (item, key) => {
                let isExitTime = checkTime(tour.date, item.time);
                return <Element name={`${item.locationId}`} className={`${isExitTime ? 'element' : ''}`} key={key.toString()}>
                    <PanelItem 
                    item={item} 
                    date={tour.date} 
                    key={key}
                    isExitTime={isExitTime}
                    />
                </Element>
            })}
        </Timeline.Item>
        ))}
      </Timeline>}
    </PageHeaderWrapper>
  
    </div>);
  
};

export default PublicDetail;
