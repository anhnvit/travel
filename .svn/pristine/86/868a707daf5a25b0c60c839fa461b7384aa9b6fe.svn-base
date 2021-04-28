
import React, { useEffect, Suspense, useState, Spin } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import PageLoading from './components/PageLoading';
import Tour from './serviceApi';
import moment from 'moment';
import { message } from 'antd';
import './style-dashboard.css';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));

const Dashboard = () => {
    const initialParam = {
        keyword: "",
        fromDate: moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY'),
        toDate: moment().add(1, 'month').endOf('month').format('DD/MM/YYYY'),
        locationName: '',
        listStatus: [0]
    };
    localStorage.setItem('param', JSON.stringify(initialParam));

    const [dataTour, setDataTour] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visitData, setVisitData] = useState([]);
    const [tourNote, setTourNote] = useState([]);
    useEffect(() => {
        setLoading(true);
        Tour.ReportTour([]).then((response) => {
            if (response.statusCode == 200) {
                setLoading(false);
                let dataChart = [];
                response.data.locationOfTheTourForDateDtos.map((itemLocation) => {
                    dataChart.push({
                        name: moment(itemLocation.date).format("DD/MM"),
                        y: itemLocation.totalLocation,
                    })
                })
                setDataTour(dataChart);
                setVisitData(response.data.statusTour);
                setTourNote(response.data.tourNoteWorthyDtos);
            } else {
                setLoading(false);
                message.error("Lỗi")
            }
        })
    }, []);
    return (
        <div id='dashboard'>
            <GridContent>
                <React.Fragment>
                    <Suspense fallback={<PageLoading />}>
                        <IntroduceRow loading={loading} visitData={visitData} />
                    </Suspense>
                    <Suspense fallback={null}>
                        <SalesCard
                            countTour={tourNote.length}
                            dataTour={dataTour}
                            tourNote={tourNote.slice(0, 10)}
                            loading={loading}
                        />
                    </Suspense>
                </React.Fragment>
            </GridContent>
        </div>
    );
}

export default Dashboard;
