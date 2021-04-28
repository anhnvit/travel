import { Col, Collapse, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import * as Common from '@/utils/common';
import moment from 'moment';
import IconWeather from './IconWeather';
const { Panel } = Collapse;

const PanelItem = ({ item, date, isExitTime, keyId }) => {

    const [isActive, setIsActive] = useState(true);
    // const handleActive = (key) => {
    //     setKeyActive(key);
    //     setIsActive(!isActive);
    // }
    
    return (

        <Collapse
            defaultActiveKey={""}
            // activeKey={keyActive}
            accordion={true}
            expandIconPosition="right"
        >

            <Panel
                className="panel-time"
                isActive={true}
                showArrow={true}
                disabled = {item.weather === null ? true : false}
                key={item.locationId}
                header={

                    <Row span={24}>
                        <div className="col-weather" style={{ backgroundColor: `${Common.getColorWeather(item.statusColorWeather, item.statusTour)}` }}></div>
                        {isExitTime ?
                            <Col span={5} style={{ color: "#00000087", letterSpacing: "-1px" }}>
                                {Common.convertTimeIntToText(item.time)} - {Common.capitalize(moment(date).lang('vi').format('dddd'))} - {moment(date).format('DD/MM/YYYY')}
                            </Col> :
                            <Col span={5} style={{ color: "#00000087" }}> </Col>
                        }
                        <Col span={6} className="location">{item.locationName}</Col>
                        <Col span={4} style={{textAlign: "center"}}>
                            <IconWeather type={item.time} weather={item.weather} />
                            {item.airTemperatureMax !== null && <><span className="tempMax">{item.airTemperatureMax}<sup>o</sup></span> <span className="tempMin">{item.airTemperatureMin}<sup>o</sup></span></>}
                        </Col>
                        <Col span={6} style={{ color: "#00000087" }}><img style={{ marginLeft: "20px", marginRight: "10px" }} src="/icons-weather/drops.png" />{item.probabilityRain}<span style={{ marginRight: "20px" }}>%</span> {Common.getTextByIcon(item.weather)}</Col>
                    </Row>}
            >
                <Row span={24}>
                    <div className="col-weather" style={{ backgroundColor: `${Common.getColorWeather(item.statusColorWeather, item.statusTour)}` }}></div>
                    <Col span={10} offset={5}>
                        {item.warningContent !== null ?
                            <div className="box-weather" style={{ borderColor: `${Common.getColorWeather(item.statusColorWeather, item.statusTour)}`, maxHeight: "100%" }}>
                                <img className="box-img" src="/icons-bright/9.png" />
                                <p className="text-weather">
                                    {item.warningContent}
                                </p>
                            </div>
                            : <div className="box-weather">
                                <p className="text-weather">{item.recommendContent}</p>
                            </div>
                        }
                    </Col>
                    <Col span={8} className="weather-index">
                        <p> <img src="/icons-weather/UV.png" /> {item.uvIndex} {Common.getTextLevelUv(item.uvIndex) || '-'}</p>
                        <p> <img src="/icons-weather/wind.png" /> {Common.convertDirection(item.windDirection)} {item.windSpeed !== null ? item.windSpeed : '-'} km/h</p>
                        <p> <img src="/icons-weather/humidity.png" /> {item.relativeHumidity !== null ? item.relativeHumidity : '-'}%</p>
                        <p><img src="/icons-weather/wave.png" /> {item.waveHeights || '-'} m</p>
                        <p><img src="/icons-weather/sunrise.png" /> {item.sunRiseTime || '-'}</p>
                        <p><img src="/icons-weather/sunset.png" /> {item.sunSetTime || '-'}</p>
                    </Col>
                </Row>
            </Panel>

        </Collapse>
    );
}

export default PanelItem;