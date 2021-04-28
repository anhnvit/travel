import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import logo from '../assets/logo.svg';

const TourDetailLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  
  return (
    <ProLayout
        //route={routes}
        logo={logo}
        locale="vi-VN"
        formatMessage={formatMessage}
        
        breadcrumbRender={(routers = []) => [
            {
                path: '/',
                breadcrumbName: formatMessage({
                    id: 'menu.home',
                }),
            },
            ...routers,
        ]}
       
        {...props}
    >
        {children}
    </ProLayout>
  );
};

export default connect(({ settings }) => ({ ...settings }))(TourDetailLayout);
