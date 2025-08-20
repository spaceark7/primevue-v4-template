<template>
  <AppSubMenu v-if="!isHorizontal" :model="[ ...menu]" />
  <div v-else class="layout-topbar flex flex-column-reverse p-0 lg:flex lg:py-2 lg:flex-row lg:px-5" :style="{
    margin: '0px',
  }">
    <AppSubMenu :model="[...menu]" />
  </div>

</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import AppSubMenu from './AppSubMenu.vue';
import { useLayout } from '../composables/Layout';

const {
  isHorizontal
} = useLayout()

const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'UI Components',
    items: [
      { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
      { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
      { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
      { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
      { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
      { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
      { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
      { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
      { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
      { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
      { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
      { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
      { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
      { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
      { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' },
    ],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    to: '/pages',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/landing',
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/login',
          },
          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            to: '/auth/error',
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/auth/access',
          },
        ],
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/pages/crud',
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/pages/notfound',
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/pages/empty',
      },
    ],
  },
  {
    label: 'Hierarchy',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
          },
        ],
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
          },
        ],
      },
    ],
  },
  {
    label: 'Get Started',
    items: [
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-book',
        to: '/documentation',
      },
      {
        label: 'View Source',
        icon: 'pi pi-fw pi-github',
        url: 'https://github.com/primefaces/sakai-vue',
        target: '_blank',
      },
    ],
  },
])
const menu: Ref<any[]> = ref([
  {
    label: 'Dashboards',
    icon: 'pi pi-home',
    items: [
      {
        label: 'E-Commerce',
        icon: 'pi pi-fw pi-home',
        to: '/app/dashboard-ecommerce',
      },
      {
        label: 'Banking',
        icon: 'pi pi-fw pi-image',
        to: '/app/dashboard-banking',
      },
      {
        label: 'Analytics',
        icon: 'pi pi-fw pi-chart-pie',
        to: '/app/dashboard-analytics',
      },
    ],
  },
  {
    label: 'Apps',
    icon: 'pi pi-th-large',
    items: [
      {
        label: 'PERURI Demo',
        icon: 'pi pi-fw pi-th-large',
        items: [
          {
            label: 'Digital Certificate',
            icon: 'pi pi-fw pi-verified',
            to: '/apps/peruri-demo/digital-ceritificate',
          },
          {
            label: 'eSignature',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/peruri-demo/e-signature',
          },
          {
            label: 'Documents',
            icon: 'pi pi-fw pi-folder',
            to: '/apps/peruri-demo/documents',
          },
        ],
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-comment',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-image',
            to: '/apps/blog/list',
          },
          {
            label: 'Detail',
            icon: 'pi pi-fw pi-list',
            to: '/apps/blog/detail',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/blog/edit',
          },
        ],
      },
      {
        label: 'Chatbot',
        icon: 'pi pi-fw pi-comments',
        to: '/apps/chatbot',
      },
      {
        label: 'Fleet',
        icon: 'pi pi-fw pi-truck',
        to: '/apps/fleet',
      },
      {
        label: 'Digital Signature',
        icon: 'pi pi-fw pi-pencil',
        to: '/apps/digital-signature',
      },
      {
        label: 'e-KYC',
        icon: 'pi pi-fw pi-id-card',
        to: '/apps/e-kyc',
      },
      {
        label: 'Face Recognition',
        icon: 'pi pi-fw pi-camera',
        to: '/apps/face-recognition',
      },
      {
        label: 'PDF Viewer',
        icon: 'pi pi-fw pi-file-pdf',
        to: '/apps/pdf-viewer',
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-file-o',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            to: '/apps/invoice/list',
          },
          {
            label: 'Create',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/invoice/create',
          },
          {
            label: 'Detail',
            icon: 'pi pi-fw pi-list',
            to: '/apps/invoice/detail/1',
          },
        ],
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        to: '/apps/calendar',
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-comments',
        to: '/apps/chat',
      },
      {
        label: 'Files',
        icon: 'pi pi-fw pi-folder',
        to: '/apps/files',
      },
      {
        label: 'Mail',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Inbox',
            icon: 'pi pi-fw pi-inbox',
            to: '/apps/mail/inbox',
          },
          {
            label: 'Compose',
            icon: 'pi pi-fw pi-pencil',
            to: '/apps/mail/compose',
          },
          {
            label: 'Detail',
            icon: 'pi pi-fw pi-comment',
            to: '/apps/mail/detail/1000',
          },
        ],
      },
      {
        label: 'Task List',
        icon: 'pi pi-fw pi-check-square',
        to: '/apps/tasklist',
      },
    ],
  },
  {
    label: 'UI Kit',
    icon: 'pi pi-fw pi-star-fill',
    items: [
      {
        label: 'Example',
        icon: 'pi pi-fw pi-desktop',
        to: '/app/uikit/example',
      },
      {
        label: 'Form Layout',
        icon: 'pi pi-fw pi-id-card',
        to: '/app/uikit/formlayout',
      },
      {
        label: 'Dynamic Form Demo',
        icon: 'pi pi-fw pi-id-card',
        to: '/uikit/demo-dynamic-form',
      },
      {
        label: 'Dynamic Datatable',
        icon: 'pi pi-fw pi-table',
        to: '/uikit/data-table',
        badge: 'new',
      },
      {
        label: 'Input',
        icon: 'pi pi-fw pi-check-square',
        to: '/uikit/input',
      },
      {
        label: 'Float Label',
        icon: 'pi pi-fw pi-bookmark',
        to: '/uikit/floatlabel',
      },
      {
        label: 'Invalid State',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/uikit/invalidstate',
      },
      {
        label: 'Button',
        icon: 'pi pi-fw pi-box',
        to: '/uikit/button',
      },
      {
        label: 'Table',
        icon: 'pi pi-fw pi-table',
        to: '/uikit/table',
      },
      {
        label: 'Kanban Board',
        icon: 'pi pi-fw pi-map',
        to: '/uikit/kanban',
        badge: 'new',
      },
      {
        label: 'Organization Chart',
        icon: 'pi pi-fw pi-users',
        to: '/uikit/organization-chart',
        badge: 'new',
      },
      {
        label: 'Tour',
        icon: 'pi pi-fw pi-question-circle',
        to: '/uikit/tour',
        badge: 'new',
      },
      {
        label: 'List',
        icon: 'pi pi-fw pi-list',
        to: '/uikit/list',
      },
      {
        label: 'Tree',
        icon: 'pi pi-fw pi-share-alt',
        to: '/uikit/tree',
      },
      {
        label: 'Draggable Tree',
        icon: 'pi pi-fw pi-arrows-alt',
        to: '/uikit/draggable-tree',
      },
      {
        label: 'Panel',
        icon: 'pi pi-fw pi-tablet',
        to: '/uikit/panel',
      },
      {
        label: 'Overlay',
        icon: 'pi pi-fw pi-clone',
        to: '/uikit/overlay',
      },
      {
        label: 'Media',
        icon: 'pi pi-fw pi-image',
        to: '/uikit/media',
      },
      {
        label: 'Menu',
        icon: 'pi pi-fw pi-bars',
        to: '/uikit/menu',
      },
      {
        label: 'Message',
        icon: 'pi pi-fw pi-comment',
        to: '/uikit/message',
      },
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        to: '/uikit/file',
      },
      {
        label: 'Chart',
        icon: 'pi pi-fw pi-chart-bar',
        to: '/uikit/charts',
      },
      {
        label: 'Misc',
        icon: 'pi pi-fw pi-circle-off',
        to: '/uikit/misc',
      },
    ],
  },
  {
    label: 'Prime Blocks',
    icon: 'pi pi-fw pi-prime',
    items: [
      {
        label: 'Free Blocks',
        icon: 'pi pi-fw pi-eye',
        to: '/blocks',
      },
      {
        label: 'All Blocks',
        icon: 'pi pi-fw pi-globe',
        url: 'https://www.primefaces.org/primeblocks-react',
        linkTarget: '_blank',
      },
    ],
  },
  {
    label: 'Utilities',
    icon: 'pi pi-fw pi-compass',
    items: [
      {
        label: 'PrimeIcons',
        icon: 'pi pi-fw pi-prime',
        to: '/utilities/icons',
      },
      {
        label: 'Colors',
        icon: 'pi pi-fw pi-palette',
        to: '/utilities/colors',
      },
      {
        label: 'PrimeFlex',
        icon: 'pi pi-fw pi-desktop',
        url: 'https://www.primefaces.org/primeflex/',
        linkTarget: '_blank',
      },
      {
        label: 'Figma',
        icon: 'pi pi-fw pi-pencil',
        url: 'https://www.figma.com/file/zQOW0XBXdCTqODzEOqwBtt/Preview-%7C-Apollo-2022?node-id=335%3A21768&t=69qVULK1NqM8pmnE-1',
        linkTarget: '_blank',
      },
    ],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/landing',
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/signin',
          },
          {
            label: 'Login type 2',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/login3',
          },
          {
            label: 'Login type 3',
            icon: 'pi pi-fw pi-sign-in',
            to: '/auth/login4',
          },
          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            to: '/auth/error',
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/auth/access',
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-user-plus',
            to: '/auth/register',
          },
          {
            label: 'Register type 2',
            icon: 'pi pi-fw pi-user-plus',
            to: '/auth/register2',
          },
          {
            label: 'Register type 3',
            icon: 'pi pi-fw pi-user-plus',
            to: '/auth/register3',
          },
          {
            label: 'Forgot Password',
            icon: 'pi pi-fw pi-question',
            to: '/auth/forgotpassword',
          },
          {
            label: 'Forgot Password with verification and reset',
            icon: 'pi pi-fw pi-question',
            to: '/auth/forgot-password3',
          },
          {
            label: 'New Password',
            icon: 'pi pi-fw pi-cog',
            to: '/auth/newpassword',
          },
          {
            label: 'Verification',
            icon: 'pi pi-fw pi-envelope',
            to: '/auth/verification',
          },
          {
            label: 'Lock Screen',
            icon: 'pi pi-fw pi-eye-slash',
            to: '/auth/lockscreen',
          },
        ],
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/pages/crud',
      },
      {
        label: 'Timeline',
        icon: 'pi pi-fw pi-calendar',
        to: '/pages/timeline',
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-dollar',
        to: '/pages/invoice',
      },
      {
        label: 'About Us',
        icon: 'pi pi-fw pi-user',
        to: '/pages/aboutus',
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question-circle',
        to: '/pages/help',
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/pages/notfound',
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/pages/empty',
      },
      {
        label: 'FAQ',
        icon: 'pi pi-fw pi-question',
        to: '/pages/faq',
      },
      {
        label: 'Contact Us',
        icon: 'pi pi-fw pi-phone',
        to: '/pages/contact',
      },
    ],
  },
  {
    label: 'E-Commerce',
    icon: 'pi pi-fw pi-wallet',
    items: [
      {
        label: 'Product Overview',
        icon: 'pi pi-fw pi-image',
        to: '/app/ecommerce/product-overview',
      },
      {
        label: 'Product List',
        icon: 'pi pi-fw pi-list',
        to: '/app/ecommerce/product-list',
      },
      {
        label: 'New Product',
        icon: 'pi pi-fw pi-plus',
        to: '/app/ecommerce/new-product',
      },
      {
        label: 'Shopping Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        to: '/app/ecommerce/shopping-cart',
      },
      {
        label: 'Checkout Form',
        icon: 'pi pi-fw pi-check-square',
        to: '/app/ecommerce/checkout-form',
      },
      {
        label: 'Order History',
        icon: 'pi pi-fw pi-history',
        to: '/app/ecommerce/order-history',
      },
      {
        label: 'Order Summary',
        icon: 'pi pi-fw pi-file',
        to: '/app/ecommerce/order-summary',
      },
    ],
  },
  {
    label: 'User Management',
    icon: 'pi pi-fw pi-user',
    items: [
      {
        label: 'Account Setting',
        icon: 'pi pi-fw pi-user',
        to: '/account-settings',
      },
      {
        label: 'List',
        icon: 'pi pi-fw pi-list',
        to: '/profile/list',
      },
      {
        label: 'Create',
        icon: 'pi pi-fw pi-plus',
        to: '/profile/create',
      },
    ],
  },
  {
    label: 'Hierarchy',
    icon: 'pi pi-fw pi-align-left',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-align-left',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 1.1.1',
                icon: 'pi pi-fw pi-align-left',
              },
              {
                label: 'Submenu 1.1.2',
                icon: 'pi pi-fw pi-align-left',
              },
              {
                label: 'Submenu 1.1.3',
                icon: 'pi pi-fw pi-align-left',
              },
            ],
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 1.2.1',
                icon: 'pi pi-fw pi-align-left',
              },
            ],
          },
        ],
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-align-left',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 2.1.1',
                icon: 'pi pi-fw pi-align-left',
              },
              {
                label: 'Submenu 2.1.2',
                icon: 'pi pi-fw pi-align-left',
              },
            ],
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-align-left',
            items: [
              {
                label: 'Submenu 2.2.1',
                icon: 'pi pi-fw pi-align-left',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Start',
    icon: 'pi pi-fw pi-download',
    items: [
      {
        label: 'Buy Now',
        icon: 'pi pi-fw pi-shopping-cart',
        url: 'https://www.primefaces.org/store',
        linkTarget: '_blank',
      },
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-info-circle',
        to: '/documentation',
      },
    ],
  },
] );
</script>



<style lang="scss" scoped></style>
