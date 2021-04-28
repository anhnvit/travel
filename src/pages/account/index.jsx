import React, { useState, Suspense } from 'react';
import { Menu, Spin } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import ChangePassword from './components/changePassword';
import styles from './style.less';
import './style-account.css';
const InfoAccount = React.lazy(() => import('./components/infoAccount'));

const Profile = () => {
    const [selectKey, setSelectKey] = useState('infoAccount')
    const renderChildren = () => {
        switch (selectKey) {
          case 'infoAccount':
            return <Suspense fallback={<Spin style={{ textAlign:"center"}}/>}>
            <InfoAccount />
          </Suspense>;
          case 'changePassword':
            return <ChangePassword />;
          default:
            break;
        }
        return null;
    };
    return (
      <div id="account">
      <GridContent>
        <div
          className={styles.main}
        >
          <div className={styles.leftMenu}>
            <Menu selectedKeys={[selectKey]} onClick={({ key }) => setSelectKey(key)}>
            <Menu.Item key="infoAccount" className='title-acc'>
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="changePassword" className='title-acc'>
                Cài đặt mật khẩu
            </Menu.Item>
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}></div>
                {renderChildren()}
          </div>
        </div>
      </GridContent>
      </div>
    );
}

export default Profile;
