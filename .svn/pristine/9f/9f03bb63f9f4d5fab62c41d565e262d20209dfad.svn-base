import React, { useEffect} from 'react';
import moment from 'moment';
import { Space, Card, Button, Modal} from 'antd';
import * as Common from '@/utils/common';
import * as Constant from '@/utils/constant';
import IconWeather from './IconWeather';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Link } from 'react-scroll';
import Mobile from './Mobile';
import { isMobile } from 'react-device-detect';


const CardItem = ({ dataTour, date, statusTour, handleActive1, forwardRef}) =>{
    const timeMor = dataTour.reduce((listPosition, row)=>row.time === Constant.TIME_MORNING ? [...listPosition, row]:listPosition,[]);
    const timeAfter = dataTour.reduce((listPosition, row)=>row.time === Constant.TIME_AFTERNOON ? [...listPosition, row]:listPosition,[]);
    const timeEve = dataTour.reduce((listPosition, row)=>row.time === Constant.TIME_EVENING ? [...listPosition, row]:listPosition,[]);
    const getStatusBtn = (statusTour) => {
        if(statusTour === Constant.STATUS_TOUR_END) return "default";
        if(statusTour === Constant.STATUS_TOUR_HAPPENING) return "primary";
        if(statusTour === Constant.STATUS_TOUR_UPCOMING) return "dashed";
    }
    const handleActive3 = (id) => {
        handleActive1(id)
    }
    return (
        <div className="cardItem space-align-block" ref={forwardRef} >
            <Space direction="vertical">
                <div className="box-card">
                    <Space align="start" className="timeline">
                        {timeMor.map((row, index) => {
                            return <Item handleActive2={handleActive3}  item={row} key={index} date={date}/>
                        })}
                    </Space>
                </div>
                <div className="box-card">
                    <Space align="start" className="timeline">
                        {timeAfter.map((row, index) => {
                            return <Item handleActive2={handleActive3}  item={row} key={index} date={date}/>
                        })}
                    </Space>
                </div>
                <div className="box-card">
                    <Space align="start" className="timeline">
                        {timeEve.map((row, index) => {
                                return <Item handleActive2={handleActive3} item={row} key={index} date={date}/>
                            })}
                    </Space>
                </div>
                    <Button
                        // ref={statusTour === 1 && btnRef}
                        type={`${getStatusBtn(statusTour)}`}
                        style={{ width:"100%", borderRadius:"15px"}}>
                        {Common.capitalize(moment(date).lang('vi').format('dddd'))} - {moment(date).format('DD/MM/YYYY')}
                    </Button>
            </Space>
        </div>
    );
}

export const Item = ( {item, handleActive2, date} ) => {
    const handleActive = (id) => {
        handleActive2(id)
    }

    if(item.statusTour !== Constant.STATUS_TOUR_END){
        return (
            <>
                {isMobile ? <Mobile item={item} date={date}/> : 
                    <Link
                        to={`${item.locationId}`}
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-150}
                        onClick={() => handleActive(item.locationId)}
                        
                    > 
                        <Card title={item.locationName}
                            className="card-item"
                            size="small"
                            headStyle={Common.styleHeaderCard(item.weather,item.statusColorWeather)}
                            style={{ width: 200,textAlign:"center" }}>

                            {item.weather !== null ?
                            <><IconWeather type={item.time} weather={item.weather}/> <span className="tempMax">{item.airTemperatureMax}<sup>o</sup></span><span className="tempMin">{item.airTemperatureMin}<sup>o</sup></span></> :
                            <QuestionCircleFilled style={{color: "#CCCCCC"}}/>}
                        </Card>
                    </Link>
                }
                
            </>
        )
    }
    return (
        <>
            {isMobile ? <Mobile item={item} /> : 
                <Link
                    to={`${item.locationId}`}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-150}
                    onClick={() => handleActive(item.locationId)}
                >
                    <Card title={item.locationName}
                        className="card-item"
                        size="small"
                        headStyle={{backgroundColor:"#f9fbfe"}}
                        style={{ width: 200 }}>
                    </Card>
                </Link>
            }
        </>
        )

}

export default CardItem;