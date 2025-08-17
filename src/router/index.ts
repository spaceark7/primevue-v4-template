import AppLayout from '@/ui/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/ui/views/pages/Landing.vue')
    },
    {
    
    path: '/app',
    component: AppLayout,
    children: [
      {
        path: '/app',
        name: 'dashboard',
        meta: {
          breadcrumb: [
            { name: 'Dashboard', path: '/app' }
          ]
        },
        component: () => import('@/ui/views/Dashboard.vue')
      },
      {
        path: '/app/dashboard-ecommerce',
        name: 'dashboard-ecommerce',
        meta: {
          title: 'Ecommerce',
          breadcrumb: [
            { name: 'Dashboard', path: '/' },
            {
              name: 'Ecommerce',
              path: '/dashboard-ecommerce',
            },
          ],
          isDemo: true,
        },
        component: () =>
          import('@/ui/views/dashboards/Ecommerce.vue'),
      },
      {
        path: '/app/dashboard-banking',
        name: 'dashboard-banking',
        meta: {
          title: 'Banking',
          breadcrumb: [
            { name: 'Dashboard', path: '/' },
            {
              name: 'Banking',
              path: '/dashboard-banking',
            },
          ],
          isDemo: true,
        },
        component: () =>
          import('@/ui/views/dashboards/Banking.vue'),
      },
      {
        path: '/app/dashboard-analytics',
        name: 'dashboard-analytics',
        meta: {
          title: 'Analytics',
          breadcrumb: [
            { name: 'Dashboard', path: '/' },
            {
              name: 'Analytics',
              path: '/dashboard-analytics',
            },
          ],
          isDemo: true,
        },
        component: () =>
          import('@/ui/views/dashboards/Analytics.vue'),
      },
      {
        path: '/uikit/formlayout',
        name: 'formlayout',
        component: () => import('@/ui/views/uikit/FormLayout.vue')
      },
      {
        path: '/uikit/input',
        name: 'input',
        component: () => import('@/ui/views/uikit/InputDoc.vue')
      },
      {
        path: '/uikit/button',
        name: 'button',
        component: () => import('@/ui/views/uikit/ButtonDoc.vue')
      },
      {
        path: '/uikit/table',
        name: 'table',
        component: () => import('@/ui/views/uikit/TableDoc.vue')
      },
      {
        path: '/uikit/list',
        name: 'list',
        component: () => import('@/ui/views/uikit/ListDoc.vue')
      },
      {
        path: '/uikit/tree',
        name: 'tree',
        component: () => import('@/ui/views/uikit/TreeDoc.vue')
      },
      {
        path: '/uikit/panel',
        name: 'panel',
        component: () => import('@/ui/views/uikit/PanelsDoc.vue')
      },

      {
        path: '/uikit/overlay',
        name: 'overlay',
        component: () => import('@/ui/views/uikit/OverlayDoc.vue')
      },
      {
        path: '/uikit/media',
        name: 'media',
        component: () => import('@/ui/views/uikit/MediaDoc.vue')
      },
      {
        path: '/uikit/message',
        name: 'message',
        component: () => import('@/ui/views/uikit/MessagesDoc.vue')
      },
      {
        path: '/uikit/file',
        name: 'file',
        component: () => import('@/ui/views/uikit/FileDoc.vue')
      },
      {
        path: '/uikit/menu',
        name: 'menu',
        component: () => import('@/ui/views/uikit/MenuDoc.vue')
      },
      {
        path: '/uikit/charts',
        name: 'charts',
        component: () => import('@/ui/views/uikit/ChartDoc.vue')
      },
      {
        path: '/uikit/misc',
        name: 'misc',
        component: () => import('@/ui/views/uikit/MiscDoc.vue')
      },
      {
        path: '/uikit/timeline',
        name: 'timeline',
        component: () => import('@/ui/views/uikit/TimelineDoc.vue')
      },
      {
        path: '/pages/empty',
        name: 'empty',
        component: () => import('@/ui/views/pages/Empty.vue')
      },
      {
        path: '/pages/crud',
        name: 'crud',
        component: () => import('@/ui/views/pages/Crud.vue')
      },
      {
        path: '/documentation',
        name: 'documentation',
        component: () => import('@/ui/views/pages/Documentation.vue')
      }
    ]
  },
    
    {
      path: '/pages/notfound',
      name: 'notfound',
      component: () => import('@/ui/views/pages/NotFound.vue')
    },

    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/ui/views/pages/auth/Login.vue')
    },
    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('@/ui/views/pages/auth/Access.vue')
    },
    {
      path: '/auth/error',
      name: 'error',
      component: () => import('@/ui/views/pages/auth/Error.vue')
    }],
})

export default router
