<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <RouterView />
  <VueQueryDevtools />
  <ConfirmDialog></ConfirmDialog>
  <DynamicDialog />
</template>

<style scoped></style>
