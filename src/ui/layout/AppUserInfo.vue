<template>
  <ul class="topbar-menu flex list-none align-items-center mx-auto lg:my-0 lg:mr-2 lg:pr-4">
    <li class="ml-3">
      <Button text icon="pi pi-bell" @click="toggleNotifOverlay" class="p-overlay-badge" badge-class="z-10 mt-2 mr-3"
        badgeSeverity="danger" :badge="notifCounter" />
      <OverlayPanel ref="notifOverlayRef">
        <div class="flex flex-column gap-3 w-28rem">
        </div>
      </OverlayPanel>
    </li>
    <li class="ml-3">
      <div class="relative">
        <button type="button" class="p-button p-component p-button-icon-only p-button-rounded" @click="configPopover?.toggle($event)">
          <i class="pi pi-palette"></i>
        </button>
        <Popover ref="configPopover">
          <AppConfigurator />
        </Popover>
      </div>
    </li>

    <li class="topbar-profile inline-flex ml-4 align-items-center justify-content-center p-overlay-badge">
      <Button text rounded class="flex justify-content-center h-2rem w-2rem p-0" @click="toggleOverlay($event)"
        aria-haspopup="true" aria-controls="overlayMenu">
        <Avatar v-if="avatar" :image="avatar" shape="circle" size="normal">
          <img :class="'p-avatar-image'" alt="Avatar" v-lazy="avatar" />
        </Avatar>
        <Avatar v-else :label="avatar" shape="circle" style="color: #1a2551" />
      </Button>

      <Menu :model="userMenus" id="overlayMenu" popup ref="overlayRef" class="p-3 w-15rem">
        <template #start>
          <div>
            <p class="p-submenu-header m-0">
              Language
            </p>
            <div class="px-2">
              <Dropdown class="w-full" v-model="selectedLang" :options="availableLangsOptions" optionValue="value"
                optionLabel="label" @change="onChangeLang">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex align-items-center">
                    <img :alt="slotProps.value" :src="flagPlaceholder"
                      :class="`mr-2 flag flag-${slotProps.value.toLowerCase()}`" style="width: 18px" />
                    <div>{{ getSelectedLang?.label }}</div>
                  </div>
                  <span v-else> {{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <img :alt="slotProps.option.label" :src="flagPlaceholder"
                      :class="`mr-2 flag flag-${slotProps.option.value.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.option.label }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>

          <div>
            <p class="p-submenu-header m-0!">
              Color Scheme
            </p>
            <div class="px-2">
              <Dropdown class="w-full" v-model="selectedColorScheme" :options="colorSchemes" optionValue="value"
                optionLabel="label" @change="onChangeColorScheme">
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex align-items-center">
                    <span :alt="slotProps.value" :class="getSelectedColorScheme?.icon" style="width: 18px" />
                    <div>{{ slotProps.value }}</div>
                  </div>
                  <span v-else> {{ slotProps.placeholder }}</span>
                </template>
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <span :alt="slotProps.option.label" :class="slotProps.option.icon" style="width: 18px" />
                    <div>{{ slotProps.option.label }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
        </template>
      </Menu>
    </li>
  </ul>

</template>

<script setup lang="ts">
//#region Imports
// import { usePermission } from '@vueuse/core';
import flagPlaceholder from '@/assets/images/flag_placeholder.png';
import { unionTypeToArray } from '@/helpers/Type';
import { useLayout } from '@/ui/composables/Layout';
import { useToastService } from '@/ui/composables/prime';
import type { MenuItem } from 'primevue/menuitem';
import type OverlayPanel from 'primevue/overlaypanel';
import { useDialog } from 'primevue/usedialog';
import {
  computed,
  ref,
  useTemplateRef
} from 'vue';
import { useRouter } from 'vue-router';
import type { TColorScheme } from './types';
import AppConfigurator from './AppConfigurator.vue';

//#endregion Imports

//#region Composables
const toast = useToastService();
const router = useRouter();
const { currentColorScheme, changeColorScheme } = useLayout();
const dialog = useDialog();
//#endregion Composables

//#region Ploc/State
//* authPloc & authState
//#endregion Ploc/State

//#region Datas
const overlayRef = useTemplateRef('overlayRef')
const configPopover = useTemplateRef('configPopover');
const notifOverlayRef = ref<InstanceType<typeof OverlayPanel> | null>(null);
const visibleDialog = ref(false);
const avatar = ref('');
const notifCounter = ref<string>('3');

//* userMenus Refs
const userMenus = ref<MenuItem[]>([
  {
    label: 'User',
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          router.push('/profiles');
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {},
      },
    ],
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {},
  },
  {
    separator: true,
  },
  {
    class: 'p-1',
    items: [
      {
        label: 'Version 1' ,
        class: 'flex justify-content-center',
        style: 'font-size: 11px',
      },
      {
        label: 'Build 1',
        class: 'flex justify-content-center',
        style: 'font-size: 11px',
      },
    ],
  },
]);

//* Langs Refs
const selectedLang = ref('en');
const availableLangsOptions = ref(
 [{
  label: 'English',
  value: 'en',
},
{
  label: 'Spanish',
  value: 'es',
},
{
  label: 'French',
  value: 'fr',
}
]
);

//* Color Scheme
const selectedColorScheme = ref(currentColorScheme.value);
const colorSchemesArr = unionTypeToArray<TColorScheme>()(
  'auto',
  'dark',
  'light',
);
const colorSchemes = ref(
  colorSchemesArr.map((scheme: string) => ({
    label: scheme,
    value: scheme,
    icon:
      scheme != 'auto'
        ? scheme == 'dark'
          ? 'pi pi-moon'
          : 'pi pi-sun'
        : 'pi pi-desktop',
  })),
);
//#endregion Datas

//#region Computeds
const getSelectedLang = computed(() => {
  return availableLangsOptions.value.find(
    (lang: any) => lang.value === selectedLang.value,
  );
});

const getSelectedColorScheme = computed(() => {
  return colorSchemes.value.find(
    (scheme) => scheme.value === selectedColorScheme.value,
  );
});
//#endregion Computeds



//#region Methods
const onChangeLang = (e: any) => {
  //selectedLang.value = e.value;
  // setLang(e.value);

  console.log('selectedLang.value', e.value);

  window.location.reload();
};

const onChangeColorScheme = (e: any) => {
  changeColorScheme(e.value);
  selectedColorScheme.value = e.value;
};

const fnHandleLogout = async () => {

};

const fnDoLogout = async () => {
  router.push('/auth/login');
};

const toggleOverlay = (e: Event) => {
  overlayRef.value?.toggle(e);
};

const toggleNotifOverlay = async (e: Event) => {
  // await notificationsCRef.value?.fetchNotifications();
  notifOverlayRef.value?.toggle(e);
};

const openSettings = () => {
 
};

//#endregion Methods
</script>

<style scoped></style>
