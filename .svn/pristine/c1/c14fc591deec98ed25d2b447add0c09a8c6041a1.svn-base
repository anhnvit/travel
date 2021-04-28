import {Button, Checkbox} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import ProTable from '@ant-design/pro-table';
import Search from './components/Search';
import ListTour from './service';
import {PageHeaderWrapper, RouteContext} from '@ant-design/pro-layout';
import {Link} from 'react-router-dom';
import * as Constant from '@/utils/constant';
import {BASE_URL_CDN} from '@/utils/constant';
import * as Common from '@/utils/common';
import moment from 'moment';
import '../list/style-list.css';

const initialParam = {
  keyword: "",
  fromDate: moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY'),
  toDate: moment().add(1,'month').endOf('month').format('DD/MM/YYYY'),
  locationName: '',
  listStatus: [0]
};
const TableList = () => {
  const search = (localStorage.getItem('param') !== "" || localStorage.getItem('param') === "undefined") ? JSON.parse(localStorage.getItem('param')) : initialParam;
  const [filter, setFilter] = useState(search);
  const [checkedAll, setCheckedAll] = useState(search.listStatus.some(item => item === 0));
  const [listTour, setListTour] = useState([]);
  const [totalHappening, setTotalHappening] = useState(0)
  const [totalUpcoming, setTotalUpcoming] = useState(0)
  const [totalEnd, setTotalEnd] = useState(0)
  const [totalNoteworthy, setTotalNoteworthy] = useState(0)
  const [loading, setLoading] = useState(true)
  const actionRef = useRef();

  useEffect(() => {
    ListTour.getList(filter).then((response) => {
        if (response.statusCode === 200) {
            setListTour(response.data.tourList);
            makeData(response);
            setLoading(false);
      }
    });
  }, [filter]);
  
  const makeData = (response) => {
    setTotalHappening(response.data.totalHappenning);
    setTotalUpcoming(response.data.totalUpcoming);
    setTotalEnd(response.data.totalEnd);
    setTotalNoteworthy(response.data.totalNoteworthy)
  };
  
  const exportExcel = (idTour) => {
    ListTour.exportToExcel({"tourId": idTour}).then((response) => {
      if (response.statusCode === 200) {
        window.open(BASE_URL_CDN + response.data);
      }
    });
  }
  
  const action = (
    <RouteContext.Consumer>
      {() => {
        return (
            <Link to="/tour/create"><Button type="primary">Tạo lịch trình</Button></Link>
        );
      }}
    </RouteContext.Consumer>
  );
  const columns = [
    {
      title: '',
      dataIndex: '',
      fixed: 'left',
      hideInSearch: false,
            render: (_, record) => (
        <>
          {<div key={record.id} style={{ width: "12px", height: "100%", position: 'absolute', top: '0', backgroundColor: `${Common.getColorWeather(record.statusColorWeather, record.statusTour)}` }}></div>}
        </>
      )
    },
    {
      title: 'Mã tour',
      dataIndex: 'tourCode',
      key:"tourCode",
      width: '190px',
      fixed: 'left',
      sorter: true,
      render: (_, record) => (
        <>
            <Link to={`/tour/detail/${record.tourId}`} className='line-clamp'>{record.tourCode} </Link>
        </>
      ),
      // sorter: (a, b) => { return a.tourCode.localeCompare(b.tourCode)},
      sorter: (a, b) => Common.compareByAlpha(a.tourCode,b.tourCode),
    },
    {
      title: 'Tên tour',
      dataIndex: 'tourName',
      sorter: true,
      hideInSearch: true,
      render: (_, record) => (
        <>
          <div  className='line-clamp'>
              {record.tourName}
          </div>
        </>
      ),
      sorter: (a, b) => Common.compareByAlpha(a.tourName,b.tourName),
    },
    {
      title: 'Tên đoàn',
      dataIndex: 'customerName',
      hideInSearch: true,
      render: (_, record) => (
        <>
                    <div  className='line-clamp' style={{marginLeft: '-9px'}}>
                       {record.customerName}
                    </div>
        </>
      ),
    },
    {
      title: 'Thời gian diễn ra',
      dataIndex: 'departureDate',
      // sorter: true,
      hideInSearch: true,
      width: '192px',
      render: (_,record) => <span>{record.departureDate} - {record.endDate}</span>,
      sorter: (a, b) => { 
        return a.departureDate.localeCompare(b.departureDate)
      }
    },
    {
        title: 'Trạng thái',
        dataIndex: 'statusTour',
        width: '150px',
        sorter: false,
        hideInSearch: true,
        valueEnum: {
          1: {
            text: "Đang diễn ra",
            status: 'Processing',
          },
          2: {
            text: "Sắp diễn ra",
            status: 'Warning',
          },
          3: {
            text: <span style={{
              color: '#d9e0e8'
            }}>Kết thúc</span>,
            status: 'Default',
          },
        },
      },
    {
      title: 'Thao tác',
      width: '160px',
      dataIndex: '',
      hideInSearch: true,
      render: (_, record) => (
        <>
          <p style={{marginLeft: '-9px'}}>
              {record.statusTour !== Constant.STATUS_TOUR_END && (
                  <Link to={`/tour/edit/${record.tourId}`}>Sửa </Link>
              )}
                {record.statusTour === Constant.STATUS_TOUR_END && (
                  <a type="link" disabled>Sửa</a>
              )}
              <span style={{color: "#909090", padding: '0 8px 0 5px'}}>|</span>
            <a onClick={() => exportExcel(record.tourId)}>Xuất báo cáo</a>
              {/*<Link to={() => exportExcel(record.tourId)}>Xuất báo cáo</Link>*/}
          </p>
        </>
      ),
    },
  ];
  const options = [
    // { label: `Tất cả (${totalUpcoming + totalHappening + totalEnd})`, value: 0 },
    { label: `Đang diễn ra (${totalHappening})`, value: Constant.STATUS_TOUR_HAPPENING },
    { label: `Sắp diễn ra (${totalUpcoming})`, value: Constant.STATUS_TOUR_UPCOMING },
    { label: `Kết thúc (${totalEnd})`, value: Constant.STATUS_TOUR_END },
    { label: `Cần lưu ý (${totalNoteworthy})`, value: Constant.STATUS_TOUR_NOTEWORTHY },
  ];
  
  const onChange = (checkedValues) => {
    setLoading(true);
    // let status = checkedValues.includes(0) ? [0] : checkedValues;
    if (checkedValues.length > 0) {
      setCheckedAll(false);
    } else {
      setCheckedAll(true);
    }
    setFilter({ ...filter, listStatus: checkedValues });
    let param = { ...filter, listStatus: checkedValues };
    localStorage.setItem('param',JSON.stringify(param));
  }
  const onChangeAll = (e) => {
    setCheckedAll(e.target.checked);
    let checkedValues = filter.listStatus;
    if (e.target.checked) {
      checkedValues.push(0);
    } else if (checkedValues.indexOf(0) != -1) {
      checkedValues.splice(checkedValues.indexOf(0), 1);
    }
    setFilter({ ...filter, listStatus: checkedValues });
    let param = { ...filter, listStatus: checkedValues };
    localStorage.setItem('param',JSON.stringify(param));
  }
  return (
    <>
      <div id='list-tour'>
        <PageHeaderWrapper
          extra={action}
        >
          <Search
              onSubmit={async (param) => {
                setFilter(param);
                setLoading(true);
                localStorage.setItem('param',JSON.stringify(param));
              }}
              search={filter}
            />
              <ProTable 
                scroll={{ x: 1200}}
                className="list-table"
                headerTitle={
                    <div key="tag">
                                <span style={{ paddingRight: '23px'}}>Danh sách</span>
                      <Checkbox checked={checkedAll} onChange={onChangeAll} style={{marginRight: '8px'}}>{`Tất cả (${totalUpcoming + totalHappening + totalEnd})`}</Checkbox>
                      <Checkbox.Group 
                        options={options} 
                        // defaultValue={['']} 
                        onChange={onChange}
                         value={filter && filter.listStatus}
                        />
                    </div>
                }
                actionRef={actionRef}
                rowKey="tourId"
                toolBarRender={() => [

                ]}
                dataSource={listTour}
                columns={columns}
                search={false}
                options={{
                  fullScreen: false,
                  reload: false,
                  density: false,
                  setting: false,
              }}
              loading={loading}
              pagination={{
                defaultPageSize: 10,
                showTotal: (total, range) => (
                  <div>{`${range[0]}-${range[1]} / ${total}`}</div>
                ),
              }}
            />
        </PageHeaderWrapper>
      </div>
    </>
  );
};

export default TableList;
