import { QuestionCircleFilled } from '@ant-design/icons';
import React from 'react';
import * as Constant from '@/utils/constant'

const IconWeather = ( {type, weather}) => {
    const folder = type === Constant.TIME_EVENING ? "icons-night" : "icons-bright";
    if(weather !== null){
        return (
            <img className="card-img" src={`/${folder}/${weather}.png`} />
        );
    }
    return <QuestionCircleFilled style={{color: "#CCCCCC", display: "flex", justifyContent: "center", marginTop: "24px", fontSize: "20px"}}/>
    
}

export default IconWeather;