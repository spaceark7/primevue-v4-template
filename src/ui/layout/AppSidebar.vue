<template>
  <div class="layout-sidebar pb-2 pt-2" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="sidebar-header flex-order-0">
      <RouterLink :to="'/app'" class="app-logo text-color">
        <div class="flex justify-content-center inline">
          <div v-if="isSlim || isSlimPlus || isDrawer || isReveal" class="flexalign-items-center">
            <img src="/demo/images/logo.svg" alt="logo" class="layout-logo h-[3rem]" />
            <!-- <img :src="appGCStore.getConfigsByKeywordValue('app_logo_url')?.value
                ? appGCStore.getConfigsByKeywordValue('app_logo_url').value
                : Logo
              " alt="logo" class="layout-logo h-3rem" /> -->
          </div>

          <div v-else class="flex gap-2 align-items-center">
            <img :src="'/demo/images/logo.svg'" alt="logo" class="layout-logo h-[2rem]" />
            <span>
              <div class="font-bold text-1xl mb-1">
                <!-- {{
                  appGCStore.getConfigsByKeywordValue('app_company_name')?.value
                }} -->
              </div>
              <!-- <div class="text">
                {{ appGCStore.getConfigsByKeywordValue('app_name')?.value }}
                {{ appGCStore.getConfigsByKeywordValue('app_version')?.value }}
              </div> -->
            </span>
          </div>
        </div>
      </RouterLink>

      <span v-if="!isSlim && !isSlimPlus" class="layout-sidebar-anchor p-link z-2 mb-2" @click="anchor()" />
    </div>
    <div class="layout-menu-container flex-order-2 lg:flex-order-1">
      <AppMenu />
    </div>
    <!-- <div v-if="isHorizontal"
      class="topbar-end py-2 flex-order-1 lg:flex-order-1">
      <AppUserInfo />
    </div> -->
    <div v-if="isHorizontal && windowWidth >= EBreakPoint.NotebookLG"
      class="topbar-end py-2 flex-order-1 lg:flex-order-1">
      <AppUserInfo />
    </div>
  </div>

</template>

<script setup lang="ts">
//#region Imports
import { EBreakPoint } from '@/helpers/Enum';
import { useLayout } from '../composables/Layout';
import AppMenu from './AppMenu.vue';
import AppUserInfo from './AppUserInfo.vue';
//#endregion Imports

//#region composables
const { layoutState, isHorizontal, isSlim, isSlimPlus, isDrawer, isReveal, windowWidth } = useLayout();
//#endregion Props

//#region Datas
let timeout: any = null;
//#endregion Datas

//#region Methods
const onMouseEnter = () => {
  if (!layoutState.anchored) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    layoutState.sidebarActive = true;
  }
};

const onMouseLeave = () => {
  if (!layoutState.anchored) {
    if (!timeout) {
      timeout = setTimeout(
        () => (layoutState.sidebarActive = false),
        300,
      );
    }
  }
};

const anchor = () => {
  layoutState.anchored = !layoutState.anchored;
};
//#endregion Methods
</script>

<style scoped></style>
