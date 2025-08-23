<template>
  <div class="language-switcher">
    <Button
      v-for="lang in availableLocales"
      :key="lang"
      :label="lang === 'en' ? 'English' : 'Bahasa Indonesia'"
      :class="{ 'p-button-outlined': currentLocale !== lang }"
      size="small"
      @click="changeLocale(lang)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';

const { locale, availableLocales } = useI18n();

const currentLocale = computed(() => locale.value);

const changeLocale = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('userLocale', lang);
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}
</style>
