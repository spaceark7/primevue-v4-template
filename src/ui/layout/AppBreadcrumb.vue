<template>
  <nav class="layout-breadcrumb">
    <ol>
      <template v-for="(b, i) in breadcrumb" :key="i">
        <li class="cursor-pointer" @click="router.push({ path: b.path })">
          {{ b.name }}
        </li>
        <li
          v-if="i !== breadcrumb.length - 1"
          class="layout-breadcrumb-chevron"
        >
          /
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
//#region Imports
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//#endregion Imports

const CNAME = 'AppBreadcrumb' as const;

//#region Composables
const route = useRoute();
const router = useRouter();
//#endregion Composables

//#region Datas
const breadcrumb: any = ref(route.meta.breadcrumb || []);
//#endregion Datas

//#region Watchers
watch(
  route,
  async (newVal) => {
    await nextTick();
    console.log(`[${CNAME}]:watch:route`, newVal);
    breadcrumb.value = newVal.meta.breadcrumb;
    console.log(`[${CNAME}]:watch:route`, newVal.meta.breadcrumb);
  },
  {
    immediate: true,
  },
);
//#endregion Watchers
</script>

<style scoped></style>
