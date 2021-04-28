import React, {useState } from 'react';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Card, Col, Modal, Row } from 'antd';
import * as Common from '@/utils/common';
import * as Constant from '@/utils/constant';
import IconWeather from './IconWeather';
import moment from 'moment';

const Mobile = ( {item, date} ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
        <>
            <Card title={item.locationName}
                className="card-item"
                size="small"
                headStyle={item.statusTour !== Constant.STATUS_TOUR_END ? Common.styleHeaderCard(item.weather,item.statusColorWeather) : {backgroundColor:"#f9fbfe"}}
                style={{ width: 200,textAlign:"center" }}
                onClick={showModal}
                >
                {(item.weather !== null && item.statusTour !== Constant.STATUS_TOUR_END) ?
                <>
                    <IconWeather type={item.time} weather={item.weather}/> 
                    <span className="tempMax">{item.airTemperatureMax}<sup>o</sup></span><span className="tempMin">{item.airTemperatureMin}<sup>o</sup></span>
                </>
                  : (item.weather === null) ? <QuestionCircleFilled style={{color: "#CCCCCC"}}/> : ""
                }
                
            </Card>
            <Modal 
                className="mobile-detail"
                visible={isModalVisible} 
                onCancel={handleCancel}
                footer={null} >
                <div className="header-modal" style={{ backgroundColor: `${Common.getColorWeather(item.statusColorWeather, item.statusTour)}`}} >
                    <h3 style={{margin: '0 40px 0 40px'}} >{item.locationName}</h3>
                    <span>{Common.convertTimeIntToText(item.time)} - {Common.capitalize(moment(date).lang('vi').format('dddd'))} - {moment(date).format('DD/MM/YYYY')}</span>
                </div>
                <div style={{maxHeight: '50vh', overflowY: 'auto'}}>
                <Row style={{justifyContent: 'space-between'}}>
                    <Col xs={10} style={{textAlign: 'center'}} className="card-detail">
                        {item.weather !== null ?
                        <><IconWeather type={item.time} weather={item.weather}/> </> :
                        <QuestionCircleFilled style={{color: "#CCCCCC", position: 'relative', top: '25%', transformY:'-25%'}}/>}
                    </Col>
                    <Col xs={13} style={{lineHeight: '1.85', paddingLeft: '5px'}} className="card-detail">
                        <div className="tempMax">Nhiệt độ cao nhất:<span style={{fontSize: '20px', fontWeight: '600', paddingLeft: '5px'}}>{item.airTemperatureMax}<sup>o</sup></span></div>
                        <div className="tempMin">Nhiệt độ thấp nhất<span style={{paddingLeft: '5px'}}>{item.airTemperatureMin}<sup>o</sup></span></div>
                        <div>Độ ẩm: {item.probabilityRain}<span style={{ paddingLeft: "5px" }}>%</span> {Common.getTextByIcon(item.weather)}</div>
                    </Col>
                </Row>
                <Row className="card-detail" align="middle"  style={{ borderColor: item.warningContent !== null ? `${Common.getColorWeather(item.statusColorWeather, item.statusTour)}` :"#cdcdcd"}}>
                    <Col span={24} style={{padding: '8px'}} >
                        {item.warningContent !== null ?
                            <div className="box-weather" style={{ maxHeight: "100%", textAlign: 'center' }}>
                                <img className="box-img" src="/icons-bright/9.png" />
                                <p className="text-weather" style={{marginBottom: '0', textAlign: 'justify', padding: '0 10px'}}>
                                    {item.warningContent}
                                </p>
                            </div>
                            : <div className="box-weather">
                                <p className="text-weather" style={{marginBottom: '0', textAlign: 'justify', padding: '0 10px'}}>{item.recommendContent || 'Không có dữ liệu'}</p>
                            </div>
                        }
                    </Col>
                </Row>
                <Row className="card-detail">
                    <Col span={12} style={{padding: '10px 25px'}}>
                        <p> <img src="/icons-weather/UV.png" /> {item.uvIndex} {Common.getTextLevelUv(item.uvIndex) || '-'}</p>
                        <p> <img src="/icons-weather/wind.png" /> {Common.convertDirection(item.windDirection)} {item.windSpeed !== null ? item.windSpeed : '-'} km/h</p>
                        <p style={{marginBottom: '0'}}> <img src="/icons-weather/humidity.png" /> {item.relativeHumidity !== null ? item.relativeHumidity : '-'}%</p>
                    </Col>
                    <Col span={12} style={{padding: '10px 25px'}}>
                        <p><img src="/icons-weather/wave.png" /> {item.waveHeights || '-'} m</p>
                        <p><img src="/icons-weather/sunrise.png" /> {item.sunRiseTime || '-'}</p>
                        <p style={{marginBottom: '0'}}><img src="/icons-weather/sunset.png" /> {item.sunSetTime || '-'}</p>
                    </Col>
                </Row>
                </div>
            </Modal>
        </>
    )
    

}


export default Mobile;