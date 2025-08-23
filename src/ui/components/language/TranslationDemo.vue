<template>
  <div class="card">
    <h2 class="text-2xl mb-4">{{ t('dashboard.welcome', { name: userName }) }}</h2>

    <div class="mb-4">
      <h3 class="text-lg mb-2">{{ t('common.internationalization') }}</h3>
    </div>

    <div class="mb-4">
      <h3 class="text-lg mb-2">{{ t('plurals.item', itemCount) }}</h3>
      <div class="flex gap-2">
        <Button icon="pi pi-minus" @click="decrementItems" :disabled="itemCount <= 0" />
        <span class="p-2">{{ itemCount }}</span>
        <Button icon="pi pi-plus" @click="incrementItems" />
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-lg mb-2">{{ t('plurals.message', messageCount) }}</h3>
      <div class="flex gap-2">
        <Button icon="pi pi-minus" @click="decrementMessages" :disabled="messageCount <= 0" />
        <span class="p-2">{{ messageCount }}</span>
        <Button icon="pi pi-plus" @click="incrementMessages" />
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-lg mb-2">{{ t('dateTime.today') }}</h3>
      <p>{{ $d(new Date(), 'long') }}</p>
      <p>{{ $d(new Date(), 'short') }}</p>
      <p>{{ $d(new Date(), 'time') }}</p>
    </div>

    <div class="mb-4">
      <h3 class="text-lg mb-2">{{ t('common.currency') }}</h3>
      <p>{{ $n(1000, 'currency') }}</p>
      <p>{{ $n(0.75, 'percent') }}</p>
      <p>{{ $n(1234.567, 'decimal') }}</p>
    </div>

    <div class="flex justify-center mt-6">
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/ui/components/language/LanguageSwitcher.vue';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, d, n } = useI18n();

const userName = ref('John');
const itemCount = ref(2);
const messageCount = ref(5);

const incrementItems = () => itemCount.value++;
const decrementItems = () => itemCount.value--;
const incrementMessages = () => messageCount.value++;
const decrementMessages = () => messageCount.value--;
</script>

<style scoped>

</style>
