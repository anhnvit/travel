import {Row, Space} from 'antd';
import React, {useEffect} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'
import CardItem from './CardItem';
import '../index.css'
import * as Constant from "@/utils/constant";

const ListCard = ( { data, onChange}) => {
    const handleActive = (id) => {
        onChange(id);
    }
    const refs = data.reduce((acc, value) => {
      acc[value.date] = React.createRef();
      return acc;
    }, {});

    // Scroll Into View API: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
    useEffect(() => {
      console.log(refs, "parent");
      let length = data.length;
      let isHappening = false;
      if (!refs || !length) return;
      // di chuyển xuống cuối
      refs[data[length-1].date].current.scrollIntoView({
        block: 'nearest',
      });
      data.map((item, index) => {
        // scroll đang diễn ra
        // TH ko có tour đang diễn ra check scroll đến tour sắp diễn ra
        if(item.statusTour === Constant.STATUS_TOUR_HAPPENING || (item.statusTour === Constant.STATUS_TOUR_UPCOMING && !isHappening)) {
        //if (index === 8) { //example for test
          isHappening = true;
          refs[item.date].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
          return "";
        }
      });
      // nếu không có tour đang diễn ra thì scroll về band dầu
      if (!isHappening) {
        refs[data[0].date].current.scrollIntoView({
          block: 'nearest',
        });
      }
    }, [data])
    return (
        <>
           <Row style={{ backgroundColor:'rgb(240, 242, 245)', marginRight: '-24px', marginLeft: '-24px', display: 'block'}}>
               <div className="space-align-block fixed" style={{float: 'left'}}>
                            <Space direction="vertical" >
                                <div className="box-card">
                                    <Space align="end" className="box-time" style={{ backgroundColor:"rgb(186, 195, 207)"}}>
                                        <h4 className="text-time">Sáng</h4>
                                    </Space>
                                </div>
                                <div className="box-card">
                                    <Space align="end" className="box-time"  style={{  backgroundColor:"rgb(149, 158, 171)"}}>
                                        <h4 className="text-time">Chiều</h4>
                                    </Space>
                                </div>
                                <div className="box-card">
                                    <Space align="end" className="box-time"  style={{  backgroundColor:"rgb(78, 90, 107)"}}>
                                        <h4 className="text-time">Tối</h4>
                                    </Space>
                                </div>
                                <Space align="center" className="box-time-none">
                                    <div></div>
                                </Space>
                            </Space>
                        </div>
                <ScrollContainer
                    horizontal={true}
                    hideScrollbars={true}
                    className="scroll-container"
                >
                   
                        
                        <div className="space-align-container" >
                        {data.map((item, index) => {
                            return (
                                <CardItem
                                dataTour={item.locationOfTheTourWeatherInfoDtos}
                                date={item.date}
                                statusTour={item.statusTour}
                                key={index}
                                handleActive1={handleActive}
                                forwardRef={refs[item.date]}
                                />
                            )
                        })}

                    </div>
                </ScrollContainer>
            </Row>
        </>
    );
};

export default ListCard;
