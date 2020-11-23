// https://umijs.org/config/
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
  layout: {
    name: 'KO Admin',
    locale: true,
    ...defaultSettings
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
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
      path: '/auth',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/auth/login',
          component: './auth/login',
        },
      ],
    },
    {
      path: '/data',
      name: 'data',
      icon: 'smile',
      routes: [
        {
          path: '/data/dashboard',
          name: 'dashboard',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      icon: 'smile',
      routes: [
        {
          path: '/user/user',
          name: 'user',
          component: './user/user',
        }, {
          path: '/user/permission',
          name: 'permission',
          component: './user/permission',
        }, {
          path: '/user/role',
          name: 'user',
          component: './user/role',
        }
      ]
    },
    {
      path: '/product',
      name: 'product',
      icon: 'smile',
      routes: [
        {
          path: '/product/list',
          name: 'list',
          component: './product/list',
        }, {
          path: '/product/publish',
          name: 'publish',
          redirect: '/product/publish/detail',
        },
        {
          path: '/product/publish/select-category',
          component: './product/publish/category',
          hideInMenu: true,
        },
        {
          path: '/product/publish/detail',
          component: './product/publish/detail',
          hideInMenu: true,
        }
      ]
    },
    {
      path: '/order',
      name: 'order',
      icon: 'smile',
      routes: [
        {
          path: '/order/list',
          name: 'list',
          component: './order/list',
        }, {
          path: '/order/shipment',
          name: 'shipment',
          component: './order/shipment',
        }, {
          path: '/order/return',
          name: 'return',
          component: './order/return',
        }
      ]
    },
    {
      path: '/inventory',
      name: 'inventory',
      icon: 'smile',
      routes: [
        {
          path: '/inventory/location',
          name: 'location',
          component: './Welcome',
        }, {
          path: '/inventory/warning',
          name: 'warning',
          component: './Welcome',
        }, {
          path: '/inventory/purchase',
          name: 'purchase',
          component: './Welcome',
        }, {
          path: '/inventory/replenish',
          name: 'replenish',
          component: './Welcome',
        }, {
          path: '/inventory/movement',
          name: 'movement',
          component: './Welcome',
        }, {
          path: '/inventory/check',
          name: 'check',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/member',
      name: 'member',
      icon: 'smile',
      routes: [
        {
          path: '/member/list',
          name: 'list',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/supplier',
      name: 'supplier',
      icon: 'smile',
      routes: [
        {
          path: '/supplier/list',
          name: 'list',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      icon: 'smile',
      routes: [
        {
          path: '/warehouse/list',
          name: 'list',
          component: './Welcome',
        }, {
          path: '/warehouse/default',
          name: 'default',
          component: './Welcome',
        },
      ]
    },
    {
      path: '/marketing',
      name: 'marketing',
      icon: 'smile',
      routes: [
        {
          path: '/marketing/promotion',
          name: 'promotion',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/category',
      name: 'category',
      icon: 'smile',
      routes: [
        {
          path: '/category/background',
          name: 'background',
          component: './category/background',
        }, {
          path: '/category/front-desk',
          name: 'front-desk',
          component: './Welcome',
        }, {
          path: '/category/attribute',
          name: 'attribute',
          component: './category/attribute',
        }
      ]
    },
    {
      path: '/finance',
      name: 'finance',
      icon: 'smile',
      routes: [
        {
          path: '/finance/income',
          name: 'income',
          component: './Welcome',
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      icon: 'smile',
      routes: [
        {
          path: '/shopping/media-gallery',
          name: 'media-gallery',
          component: './shopping/media-gallery',
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      icon: 'smile',
      routes: [
        {
          path: '/setting/logistics',
          name: 'logistics',
          component: './Welcome',
        }, {
          path: '/setting/address',
          name: 'address',
          component: './Welcome',
        }, {
          path: '/setting/basics',
          name: 'basics',
          component: './Welcome',
        }, {
          path: '/setting/payment',
          name: 'payment',
          component: './Welcome',
        }, {
          path: '/setting/account',
          name: 'account',
          component: './Welcome',
        }
      ]
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
