import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const Bar = (props) => {
    const {data, title } = props;
    const options = {
        chart: {
            type: 'column',
            scrollablePlotArea: {
                minWidth: 900,
            },
            height: 445,
            style: {
                fontFamily: 'Arial',
                
            },

        },
       
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            scrollbar: {
                enabled: true
            },
            type: 'category',
            labels: {
                style: {
                    color: 'rgba(0, 0, 0, 0.65)',
                },
                rotation: -70
            },
            
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: ''
            },
            gridLineDashStyle: 'longdash',
            labels: {
                style: {
                    color: 'rgba(0, 0, 0, 0.65)'
                }
            },
       
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointPadding: 0.3,
                width: 10,
                color: '#1890ff',
                opacity: 2
            }
        },
    
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y} lịch trình</b><br/>'
        },
        series: [
            {
                data: data
            }
        ],
    };
    return (
        <div className="chart-tour">
          {title && (
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              {title}
            </span>
          )}
            <HighchartsReact highcharts={Highcharts} options={options} immutable={true}/>
        </div>
    )
}

export default Bar;