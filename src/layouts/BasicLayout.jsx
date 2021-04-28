/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect, history, Link, useIntl } from 'umi';
import { Button, Result } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import {isMobile} from 'react-device-detect';

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

/**
 * use Authorized check all menu item
 */

const menuDataRender = menuList =>
    menuList.map(item => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : undefined,
        };
        return Authorized.check(item.authority, localItem, null);
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright={false}
        links={[
            /*{
              key: 'Ant Design Pro',
              title: 'Ant Design Pro',
              href: 'https://pro.ant.design',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <GithubOutlined />,
              href: 'https://github.com/ant-design/ant-design-pro',
              blankTarget: true,
            },
            {
              key: 'Ant Design',
              title: 'Ant Design',
              href: 'https://ant.design',
              blankTarget: true,
            },*/
        ]}
    />
);

const BasicLayout = props => {
    const {
        dispatch,
        children,
        settings,
        location = {
            pathname: '/',
        },
        collapsed,
    } = props;
    /**
     * constructor
     */

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent',
            });
        }
        handleMenuCollapse(true);
    }, []);
    /**
     * init variables
     */

    const handleMenuCollapse = payload => {
        if (dispatch) {
            dispatch({
                type: 'global/changeLayoutCollapsed',
                payload,
            });
        }
        var stickyClss = document.getElementsByClassName("ant-pro-page-container-warp");
        if ((payload/* || collapsed*/) && stickyClss.length > 0) {
            stickyClss[0].classList.remove("uncollapsed");
        } else {
            if (stickyClss.length > 0)
                stickyClss[0].classList.add("uncollapsed");
        }
    }; // get children authority

    const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
        authority: undefined,
    };
    const { formatMessage } = useIntl();
    return (
        <>
            <Authorized authority={authorized.authority} noMatch={noMatch}>
                <ProLayout
                    //route={routes}
                    menuDataRender={() => menuDataRender(defaultMenus)}
                    logo={logo}
                    locale="vi-VN"
                    formatMessage={formatMessage}
                    onCollapse={handleMenuCollapse}
                    onMenuHeaderClick={() => history.push('/')}
                    menuItemRender={(menuItemProps, defaultDom) => {
                        if (menuItemProps.isUrl || !menuItemProps.path) {
                            return defaultDom;
                        }
                        return <Link  onClick={isMobile ? () => handleMenuCollapse(true) : () =>{}}  to={menuItemProps.path}>{defaultDom}</Link>;
                    }}
                    breadcrumbRender={(routers = []) => [
                        {
                            path: '/',
                            breadcrumbName: formatMessage({
                                id: 'menu.home',
                            }),
                        },
                        ...routers,
                    ]}
                    itemRender={(route, params, routes, paths) => {
                        const first = routes.indexOf(route) === 0;
                        return first ? (
                            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                        ) : (
                                <span>{route.breadcrumbName}</span>
                            );
                    }}
                    footerRender={() => defaultFooterDom}
                    menuDataRender={menuDataRender}
                    rightContentRender={() => <RightContent />}
                    {...props}
                    {...settings}
                >
                    {/*<Authorized authority={authorized.authority} noMatch={noMatch}>*/}
                    {children}
                    {/*</Authorized>*/}
                </ProLayout>
            </Authorized>
            {/*<SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />*/}
        </>
    );
};

export default connect(({ global, settings }) => ({
    collapsed: global.collapsed,
    settings,
}))(BasicLayout);
