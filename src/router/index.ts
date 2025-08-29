import { useAppAuthStore } from '@/stores/AppAuthStore';
import AppLayout from '@/ui/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const CNAME = 'router';
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Primevue v4';


//#region Methods
function isAuthenticated() {
  //* appAuthStore
  return useAppAuthStore().isAuthenticated();
}

function getDocumentTitle(title?: string): string {
  let documentTitle = APP_NAME;
  if (title) {
    //title = title.replace('Page', '');
    //title = capitalCaseStr(title) + ' Page';
    title = title.trim();
    documentTitle = `${title} | ${documentTitle}`;
  }


  return documentTitle;
}

function setDocumentTitle(title?: string) {
  if (title) {
    document.title = getDocumentTitle(title);
  }
}
//#endregion Methods
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
      meta: {
        requiresAuth: true
      },
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
          path: '/app/translations',
          name: 'translations',
          meta: {
            title: 'Translations',
            breadcrumb: [
              { name: 'Dashboard', path: '/' },
              {
                name: 'Translations',
                path: '/app/translations',
              },
            ],
          },
          component: () =>
            import('@/ui/views/i18n/I18nDemo.vue'),
        },
        //#region UI Kit
        {
          path: '/uikit/formlayout',
          name: 'formlayout',
          component: () => import('@/ui/views/uikit/FormLayout.vue')
        },
        {
          path: '/app/uikit/example',
          name: 'example',
          component: () => import('@/ui/views/uikit/Example.vue')
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
        //#endregion UI Kit
        //#region Pages
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
        },
        //#endregion Pages
        //#region E-Commerce
        {
          path: '/app/ecommerce/product-overview',
          name: 'product-overview',
          meta: {
            title: 'Product Overview',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Product Overview',
                path: '/app/ecommerce/product-overview',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import(
              '@/ui/views/e-commerce/ProductOverview.vue'
            ),
        },
        {
          path: '/app/ecommerce/product-list',
          name: 'product-list',
          meta: {
            title: 'Product List',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Product List',
                path: '/app/ecommerce/product-list',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/ProductList.vue'),
        },
        {
          path: '/app/ecommerce/new-product',
          name: 'new-product',
          meta: {
            title: 'New Product',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'New Product',
                path: '/app/ecommerce/new-product',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/NewProduct.vue'),
        },
        {
          path: '/app/ecommerce/shopping-cart',
          name: 'shopping-cart',
          meta: {
            title: 'Shopping Cart',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Shopping Cart',
                path: '/app/ecommerce/shopping-cart',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/ShoppingCart.vue'),
        },
        {
          path: '/app/ecommerce/checkout-form',
          name: 'checkout-form',
          meta: {
            title: 'Checkout Form',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Checkout Form',
                path: '/app/ecommerce/checkout-form',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/CheckoutForm.vue'),
        },
        {
          path: '/app/ecommerce/order-history',
          name: 'order-history',
          meta: {
            title: 'Order History',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Order History',
                path: '/app/ecommerce/order-history',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/OrderHistory.vue'),
        },
        {
          path: '/app/ecommerce/order-summary',
          name: 'order-summary',
          meta: {
            title: 'Order Summary',
            breadcrumb: [
              { name: 'E-Commerce' },
              {
                name: 'Order Summary',
                path: '/app/ecommerce/order-summary',
              },
            ],
            isDemo: true,
          },
          component: () =>
            import('@/ui/views/e-commerce/OrderSummary.vue'),
        },
        //#endregion E-Commerce
      ]
    },
    {
      path: '/pages/notfound',
      name: 'notfound',
      component: () => import('@/ui/views/error-pages/NotFound.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/ui/views/auth/Login.vue')
    },
    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('@/ui/views/error-pages/AccessDenied.vue')
    },
    {
      path: '/auth/error',
      name: 'error',
      component: () => import('@/ui/views/error-pages/Unknown.vue')
    },

    //#region Error Pages
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () =>
        import('@/ui/views/error-pages/NotFound.vue'),
      meta: {
        title: '404',
      },
      // beforeEnter: (to, from, next) => {
      //   console.log(`[${CNAME}]:beforeEnter:NotFound:`, to.fullPath);
      //   if (isAuthenticated()) {
      //     next();
      //   } else {
      //     next('/error/access-denied');
      //   }
      // },
    },
    {
      path: '/error/access-denied',
      name: 'access-denied',
      component: () =>
        import('@/ui/views/error-pages/AccessDenied.vue'),
      meta: {
        title: 'Access Denied',
      },
    },
    {
      path: '/error/unknown',
      name: 'unknown',
      component: () =>
        import('@/ui/views/error-pages/Unknown.vue'),
      meta: {
        title: 'Someting Went Wrong',
      },
    },
    //#endregion Error Pages

  ],
})


router.beforeEach((to, from, next) => {
  console.log(`[${CNAME}]:router.beforeEach:`, to);

  let toName;
  if (!to.name) {
    next('/error/unknown');
  } else {
    toName = to.name.toString();
  }

  //* Start the route progress bar.
  const el = document.querySelector('#progressbar-page');
  el?.setAttribute('class', '');
  el?.setAttribute(
    'class',
    'p-progressbar p-component p-progressbar-indeterminate',
  );

  //* Set Document Title
  setDocumentTitle(to.meta.title);

  console.log(
    `[${CNAME}]:router.beforeEach:requiresAuth:`,
    to.meta.requiresAuth,
  );
  if (to.meta.requiresAuth && toName) {
    //console.log('router.beforeEach.isAuthenticated:', isAuthenticated());

    if (!isAuthenticated()) {
      console.log(`[${CNAME}]:router.beforeEach:UnAuthenticated:`, to.fullPath);
      next('/auth/login?redirect=' + to.fullPath);
    } else {
      const adState = useAppAuthStore().getState;
      // let menu = findMenuByKeyValue(adState.sysMenuAcls, 'name', toName);
      // console.log(`[${CNAME}]:router.beforeEach:menu:`, menu);
      // //* Check the parent first
      // if (!menu) {
      //   const parentPath = to.matched[to.matched.length - 2]?.path;
      //   const sName = toName?.split(RNS) || [];
      //   const parentAction = sName[sName.length - 1];

      //   const parentMenu = findMenuByKeyValue(
      //     adState.sysMenuAcls,
      //     'path',
      //     parentPath,
      //   );

      //   if (parentMenu && parentMenu.aclActions?.includes(parentAction)) {
      //     menu = cloneDeep(parentMenu);
      //     menu.aclActions = [];
      //   }

      //   console.log(
      //     `[${CNAME}]:router.beforeEach:menu:`,
      //     parentAction,
      //     parentPath,
      //     parentMenu,
      //     to,
      //   );
      // }

      // if (menu) {
      //* Set DocumentTitle
      // const menuDescription = getMenuDescription(menu);
      const menuDescription = to.meta.title || toName;
      setDocumentTitle(menuDescription);
      to.meta.title = menuDescription;

      //* Set Breadcrumb
      // const breadCrumb = getBreadcrumb(adState.sysMenuAcls, menu.name) ?? [];
      // console.log(
      //   `[${CNAME}]:router.beforeEach:breadCrumb:`,
      //   menuDescription,
      //   `${toName} -- ${JSON.stringify(breadCrumb)}`,
      // );
      // if (breadCrumb.length) {
      //   to.meta.breadcrumb = breadCrumb;
      // }

      //* Set ActionsAcl
      // to.meta.actionsAcl = menu?.aclActions || [];

      next();
      // }
      //  else {
      //   if (to.meta.isDemo) {
      //     next();
      //   } else {
      //     next('/error/access-denied');
      //   }
      // }
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  const el = document.querySelector('#progressbar-page');

  setTimeout(() => {
    el?.setAttribute('class', '');
  }, 1000);
});

export default router
