// https://umijs.org/config/
import { Button } from 'antd';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'vi-VN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          path: '/user/register',
          component: './user/login',
        },
      ],
    },
    {
      name: 'share',
      path: '/share/tour/:key',
      // component: '../layouts/TourDetailLayout',
      component: './tour/public-tour',
      hideInMenu: true,
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              name: 'home',
              icon: 'dashboard',
              path: '/home',
              component: './dashboard/home',
            },
            {
              name: 'create',
              icon: 'form',
              path: '/tour/create',
              component: './tour/create',
            },
            // {
            //   name: 'createTemplate',
            //   icon: 'form',
            //   path: '/tour/createTemplate',
            //   component: './tour/create',
            // },
            {
              name: 'tour',
              icon: 'table',
              path: '/tour/list',
              component: './tour/list',
              routes: [
                // {
                //   name: 'detail',
                //   icon: 'smile',
                //   path: '/tour/detail/:tourId',
                //   component: './tour/detail',
                //   hideInMenu: true,
                // },
                
              ],
              
            },
            {
              name: 'detail',
              icon: 'smile',
              path: 'tour/detail/:tourId',
              component: './tour/detail',
              hideInMenu: true,
            },
            {
              name: 'edit',
              path: '/tour/edit/:tourId',
              component: './tour/edit',
              hideInMenu: true,
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              component: './account',
            },
            {
              name: 'setting',
              icon: 'setting',
              path: '/setting',
              component: './settings',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
