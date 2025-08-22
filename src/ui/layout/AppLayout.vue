<template>
  <div class="layout-container" :class="containerClass">
    <AppSidebar ref="sidebarRef" />
    <div class="layout-content-wrapper">
      <AppTopbar ref="topbarRef" />
      <AppBreadcrumb v-if="!isNotebookToDesktopMode" />
      <div class="layout-content">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import AppFooter from './AppFooter.vue'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import { useLayout } from '../composables/Layout'
import AppBreadcrumb from './AppBreadcrumb.vue'

//#region Composables
const { layoutConfig, layoutState, isSidebarActive, isNotebookToDesktopMode, isSlim, isSlimPlus, isDrawer, isHorizontal, isReveal } = useLayout()
//#endregion Composables
//#region Element Ref
const outsideClickListener = ref()
const sidebarRef = ref();
const topbarRef = ref();
//#endregion Element Ref
//#region Watcher
watch(isSidebarActive, (newVal) => {
  console.log('isSidebarActive:', newVal);
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})
//#endregion Watcher
//#region Computes
const containerClass = computed(() => {
  return {
    'layout-light': layoutConfig.colorScheme === 'light',
    'layout-dark': layoutConfig.colorScheme === 'dark',
    'layout-colorscheme-menu': layoutConfig.menuTheme === 'colorScheme',
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-slim': isSlim.value,
    'layout-slim-plus': isSlimPlus.value,
    'layout-horizontal': isHorizontal.value,
    'layout-reveal': isReveal.value,
    'layout-drawer': isDrawer.value,
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'layout-sidebar-active': layoutState.sidebarActive,
    'layout-sidebar-anchored': layoutState.anchored,
  }
})
//#endregion Computes
//#region Methods
const bindOutsideClickListener = () => {
  console.log('bindOutsideClickListener');
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false
        layoutState.overlaySubmenuActive = false;
        layoutState.staticMenuMobileActive = false
        layoutState.menuHoverActive = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}

const unbindOutsideClickListener = () => {
  console.log('unbindOutsideClickListener');
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}

const isOutsideClicked = (event: Event) => {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.topbar-menubutton')

  console.log('isOutsideClicked:sidebarEl', sidebarEl);
  console.log('isOutsideClicked:topbarEl', topbarEl);
  return !(
    sidebarEl?.isSameNode(event.target as Node) ||
    sidebarEl?.contains(event.target as Node) ||
    topbarEl?.isSameNode(event.target as Node) ||
    topbarEl?.contains(event.target as Node)
  )
}
//#endregion Methods

//#region Lifecycle Hooks
onBeforeUnmount(() => {
  unbindOutsideClickListener();
});
//#endregion Lifecycle Hooks

</script>
