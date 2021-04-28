import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, Redirect } from 'umi';
import React from 'react';
import logo from '../assets/logo-login.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
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
    currentUser = {
      avatar: '',
      name: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  const isLogin = localStorage.getItem("token");
  return isLogin ? (<Redirect to={`/home`} />) :
    (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        {<div className={styles.lang} style={{display: 'none'}}>
          <SelectLang />
        </div> }
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                {/* <span className={styles.title} style={{
                  color: '#00a9cf',
                  fontWeight: '700',

                }}>Tripio</span> */}
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
        </div>
        {/* <DefaultFooter /> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings, user }) => ({ currentUser: user.currentUser,...settings,  }))(UserLayout);
