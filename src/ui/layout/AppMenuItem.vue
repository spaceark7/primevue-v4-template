<template>
  <li ref="menuItemRef" :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <!-- Root -->
    <div v-if="root && !item.isHidden" class="layout-menuitem-root-text">
      <RouterLink v-if="item.to && !item.items && !item.isHidden" @click="itemClick($event, item)"
        :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to"
        :target="item.linkTarget" @mouseenter="onMouseEnter" v-tooltip.hover="(isSlim || isSlimPlus) && root && !isActiveMenu ? item.label : null
          ">
        <i :class="item.icon" class="layout-menuitem-icon" />
        <span class="layout-menuitem-text ml-2" v-tooltip="item.label !== item.label
          ? item.label
          : null
          ">
          <!-- {{ limitCharStr(item.label, limitText) }} -->
          {{ item.label }}
          <Badge class="ml-2" v-if="item.badge" :value="item.badge" />
        </span>
        <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items" />
      </RouterLink>

      <div v-else>
        <a v-if="(item.url || !item.items) && !item.isHidden" :href="item.url" @click="itemClick($event, item)"
          :class="item.class" :target="item.linkTarget" tabindex="0" @mouseenter="onMouseEnter"
          v-tooltip.hover="isSlim && root && !isActiveMenu ? item.label : null">
          <i :class="item.icon" class="layout-menuitem-icon" />
          <span class="layout-menuitem-text" v-tooltip="item.label !== item.label
            ? item.label
            : null
            ">
            <!-- {{ limitCharStr(item.label, limitText) }} -->
            <!-- {{ limitCharStr(item.label, limitText) }} -->
            {{ item.label }}
            <Badge class="ml-2" v-if="item.badge" :value="item.badge" />
          </span>
          <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items" />
        </a>
        <span class="layout-menuitem-text" v-tooltip="item.label !== item.label
          ? item.label
          : null
          ">
          {{ item.label }}
          <Badge class="ml-2" v-if="item.badge" :value="item.badge" />
        </span>
      </div>
    </div>

    <!-- Parent/URL -->
    <a v-if="(!item.to || item.items) && !item.isHidden" :href="item.url" @click="itemClick($event, item)"
      :class="item.class" :target="item.linkTarget" tabindex="0" @mouseenter="onMouseEnter"
      v-tooltip.hover="isSlim && root && !isActiveMenu ? item.label : null">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text" v-tooltip="item.label !== item.label ? item.label : null
        ">
        {{ item.label }}
        <Badge class="ml-2" v-if="item.badge" :value="item.badge" />
      </span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items" />
    </a>

    <!-- Link Internal -->
    <RouterLink v-if="item.to && !item.items && !item.isHidden" @click="itemClick($event, item)"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to"
      :target="item.linkTarget" @mouseenter="onMouseEnter" v-tooltip.hover="(isSlim || isSlimPlus) && root && !isActiveMenu ? item.label : null
        ">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text" v-tooltip="item.label !== item.label ? item.label : null
        ">
        {{ item.label }}
        <Badge class="ml-2" v-if="item.badge" :value="item.badge" />
      </span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items" />
    </RouterLink>

    <!-- Others Menu -->
    <ul ref="subMenuRef" :class="{ 'layout-root-submenulist': root,
      'top-[4rem]!': isHorizontal
     }" v-if="item.items && !item.isHidden"
      :id="item?.label ? `${getLabelString(item.label).replace(/\s/g, '_')}_${props.index}` : `menu-${props.index}`">
      <AppMenuItem v-for="(child, i) in item.items" :key="getLabelString(child?.label) || i" 
        :index="i" 
        :id="getLabelString(item.label).replace(/\s/g, '_')"
        :item="child" 
        :parentItemKey="itemKey" 
        :parentId="getLabelString(item.label).replace(/\s/g, '_')" 
        :root="false" />
    </ul>
  </li>
  
</template>
<script setup lang="ts">
import { useLayout } from '@/ui/composables/Layout'
import type { MenuItem } from 'primevue/menuitem'
import { nextTick, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as DomHandler from '@primeuix/utils/dom';

const props = withDefaults(defineProps<{
  item: MenuItem
  index: number
  root: boolean,
  parentItemKey?: string | null
  parentId?: string | null;

}>(), {
  index: 0,
  root: true,
  parentItemKey: null,
})

//#region Composables
const route = useRoute()
const { layoutState, layoutConfig, setActiveMenuItem, toggleMenu,
  isHorizontal,
  isSlim,
  isSlimPlus,
  isNotebookToDesktopMode,
} = useLayout()
//#endregion Composables


//#region Datas
const isActiveMenu = ref(false);
const itemKey = ref();
const subMenuRef = ref();
const menuItemRef = ref();
const limitText = ref(30);
//#endregion Datas

onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? props.parentItemKey + '-' + props.index
    : String(props.index)

  const activeItem = layoutState.activeMenuItem

  isActiveMenu.value =
    activeItem === itemKey.value || (activeItem ? activeItem.startsWith(itemKey.value + '-') : false);
})


//#region Watcher
watch(
  () => isActiveMenu.value,
  () => {
    const rootIndex = props.root
      ? props.index
      : parseInt(`${props.parentItemKey}`[0], 10);
    //* adjust -1
    // const overlay = document.querySelectorAll('.layout-root-submenulist')[
    //   rootIndex
    // ];
    console.log(`isActiveMenu:${props.item.label}_${props.index}`);
    const overlay = document.querySelector(
      `#${getLabelString(props.item.label).replace(/\s/g, '_')}_${props.index}`,
    );

    console.log('isActiveMenu:overlay', overlay);

    const target = document.querySelectorAll('.layout-root-menuitem')[
      rootIndex
    ];

    if (
      (isSlim.value || isSlimPlus.value || isHorizontal.value) &&
      isNotebookToDesktopMode
    ) {
      // console.log('rootIndex', rootIndex);
      nextTick(() => {
        calculatePosition(overlay, target);
      });
    }
  },
);

watch(
  () => layoutState.activeMenuItem,
  (newVal) => {
    if (newVal)
      isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-')
  },
)

watch(
  () => layoutConfig.menuMode,
  () => {
    isActiveMenu.value = false;
  },
);

watch(
  () => layoutState.overlaySubmenuActive,
  (newValue) => {
    if (!newValue) {
      isActiveMenu.value = false;
    }
  },
);

watch(
  () => route.path,
  (newPath) => {
    if (
      !(isSlim.value || isSlimPlus.value || isHorizontal.value) &&
      props.item.to &&
      props.item.to === newPath
    ) {
      setActiveMenuItem(itemKey);
    } else if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
      isActiveMenu.value = false;
    }
  },
);
//#endregion Watcher

const calculatePosition = (overlay: any, target: any) => {
  if (overlay) {
    // console.log('calculatePosition');
    const { left, top } = target.getBoundingClientRect();
    const { width: vWidth, height: vHeight } = DomHandler.getViewport();
    const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
    const scrollbarWidth = DomHandler.calculateScrollbarWidth();
    // reset
    overlay.style.top = overlay.style.left = '';
    if (isHorizontal.value) {
      const width = left + oWidth + scrollbarWidth;
      // console.log(
      //   `calculatePosition: ${left}px : ${left - (width - vWidth)}px`,
      //   vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`
      // );
      // overlay.style.left = `${left}px`;
      overlay.style.left =
        vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`;
      // overlay.style.top = overlay.style.top + `${top}px`;
    } else if (isSlim.value || isSlimPlus.value) {
      const height = top + oHeight;
      overlay.style.top =
        vHeight < height ? `${top + 10 - (height - vHeight)}px` : `${top + 10}px`;
    }
  }
};

function getLabelString(label?: string | ((...args: any) => string)): string {
  if (typeof label === 'string') return label;
  if (typeof label === 'function') return label();
  return '';
}

function itemClick(event: Event, item: MenuItem) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if (
    (item.to || item.url) &&
    (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)
  ) {
    toggleMenu()
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  if (item.items) {
    // console.log(
    //   'itemClick:items',
    //   props.root,
    //   itemKey.value,
    //   isHorizontal.value
    // );
    // console.log(`itemClick: 4 - ${routeContainer}`);
    if (
      (props.root) &&
      isActiveMenu.value &&
      (isSlim.value || isSlimPlus.value || isHorizontal.value)
    ) {
      // console.log(`itemClick: 4.1 - ${routeContainer}`);
      layoutState.overlaySubmenuActive = false;
      layoutState.menuHoverActive = false;
      return;
    }

    setActiveMenuItem(isActiveMenu.value ? props.parentItemKey : itemKey);

    if (
      (props.root) &&
      !isActiveMenu.value &&
      (isSlim.value || isSlimPlus.value || isHorizontal.value)
    ) {
      // console.log(`itemClick: 4.2 - ${routeContainer}`);
      layoutState.overlaySubmenuActive = true;
      layoutState.menuHoverActive = true;
      isActiveMenu.value = true;
      removeAllTooltips();
    }
  } else {
    if (!isNotebookToDesktopMode) {
      // console.log(`itemClick: 4.3 - ${routeContainer}`);
      //console.log('itemClick:mobile', isActiveMenu.value);
      layoutState.staticMenuMobileActive =
        !layoutState.staticMenuMobileActive;
    }

    if (isSlim.value || isSlimPlus.value || isHorizontal.value) {
      // console.log(`itemClick: 4.4 - ${routeContainer}`);
      //console.log('itemClick:slim', isActiveMenu.value);
      layoutState.overlaySubmenuActive = false;
      layoutState.menuHoverActive = false;

      return;
    }

    setActiveMenuItem(itemKey);
  }

  
}

function checkActiveRoute(item: MenuItem) {
  return route.path === item.to
}

const onMouseEnter = () => {
  if (
    props.root &&
    (isSlim.value || isSlimPlus.value || isHorizontal.value) &&
    isNotebookToDesktopMode
  ) {
    if (!isActiveMenu.value && layoutState.menuHoverActive) {
      setActiveMenuItem(itemKey);
    }
  }
};

const removeAllTooltips = () => {
  const tooltips = document.querySelectorAll('.p-tooltip');
  tooltips.forEach((tooltip) => {
    tooltip.remove();
  });
};


</script>



<style lang="scss" scoped></style>
