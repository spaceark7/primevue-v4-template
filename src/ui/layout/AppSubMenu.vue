<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem :item="item" root :index="i" />

      <li class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup lang="ts">
//#region Imports
import AppMenuItem from './AppMenuItem.vue';
//#endregion Imports

//#region Props
interface Props {
  model: any[] | null;
}
const props = withDefaults(defineProps<Props>(), {
  model: null,
});
//#endregion Props
</script>

<style scoped></style>
