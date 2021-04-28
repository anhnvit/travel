import {Col, Row, Timeline,} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import * as Common from '@/utils/common';
import ListCard from './components/ListCard';
import PanelItem from './components/PanelItem';
import TourInfo from './service';
import './index.css';
import {animateScroll as scroll, Element,} from "react-scroll";
import {connect, Redirect} from 'umi';
// const TourHeader = React.lazy(() => import('./components/TourHeader'));
import TourHeader from './components/TourHeader';
import {isMobile} from 'react-device-detect';


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
        status:null,
        linkPublic: ""
}
const TourDetail = (props) => {
  
  const listTime = [];
  // const link = window.location.href;
  const tourCode = props.match.params.tourId;
  const [tourId, setTourId] = useState({tourId: tourCode});
  const [infoTour, setInfoTour] = useState(initialTour);
  const [data, setData] = useState([]);
  const [checkExit, setCheckExit] = useState(true);
  const [keyId, setKeyId] = useState("");
  const { collapsed } = props;
  useEffect( () => {
    TourInfo.getTourById(tourId).then((response) => {
      if(response.statusCode === 200 && response.data !== null){
        const [tourInfo] = TourInfo.processData(response.data);
        setInfoTour({...tourInfo,status:response.data.status, linkPublic:response.data.linkPublic});
        setData(response.data.locationOfTheTours);
      }
      if(response.data === null) setCheckExit(false);
    });
  },[tourCode])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  })
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
  const handleScroll = (event) => {
    var header = document.getElementsByClassName("ant-pro-page-container-warp");
    if(header.length <= 0) return;
    ////var sticky = header[0].offsetTop;
    if (window.pageYOffset > 0) {
        header[0].classList.add("sticky");
    } else {
        header[0].classList.remove("sticky");
    }
    if (!collapsed) {
        header[0].classList.add("uncollapsed");
    } else {
        header[0].classList.remove("uncollapsed");
    }
  }
  const handleActive = (id) => {
    setKeyId(id);
  }
  return (
    <div className="tourDetail">
    <PageHeaderWrapper style={{ backgroundColor:"white"}} title={false}
      extraContent={
        <TourHeader
          data={infoTour}
          tourId={tourCode}

          />
      }
    >
      <ListCard data={data} onChange={handleActive}/>
  
        <Row style={{paddingTop: '16px'}} className="row-note">
          <div className="title-detail">
            <Col span={6} sm={12} xs={12}><h5><strong>CHI TIẾT LỊCH TRÌNH</strong></h5></Col>
          </div>
          <div className="note-detail">
            <Col xxl ={18} xl ={16} sm={24} xs={24} className="note-col">
              <div sm={24} xs={24} className="note green">Thời tiết thuận lợi</div>
              <div sm={24} xs={24} className="note red">Thời tiết nguy hiểm</div>
              <div sm={24} xs={24} className="note yellow">Thời tiết cảnh báo</div>
            </Col>
          </div>
        </Row>
        {(!isMobile) && <Timeline>
      {data.map((tour, index) => (
        <Timeline.Item className={`${Common.getClassTour(tour.statusTour)}`} key={index}>
            {tour.locationOfTheTourWeatherInfoDtos.map( (item, key) => {
                let isExitTime = checkTime(tour.date, item.time);
                  return <Element name={`${item.locationId}`}   className={`${isExitTime ? 'element' : ''}`}  key={key.toString()}>
                        <PanelItem
                        item={item}
                        date={tour.date}
                        key={key}
                        isExitTime={isExitTime}
                        keyId={keyId}
                        />
                    </Element>
            })}
        </Timeline.Item>
        ))}
      </Timeline>}
      
    </PageHeaderWrapper>

    </div>);

};

export default connect(({ global }) => ({
  collapsed: global.collapsed,
}))(TourDetail);
