<script setup lang="ts">
import BestSellingWidget from '@/ui/components/dashboard/BestSellingWidget.vue';
import NotificationsWidget from '@/ui/components/dashboard/NotificationsWidget.vue';
import RecentSalesWidget from '@/ui/components/dashboard/RecentSalesWidget.vue';
import RevenueStreamWidget from '@/ui/components/dashboard/RevenueStreamWidget.vue';
import StatsWidget from '@/ui/components/dashboard/StatsWidget.vue';
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <StatsWidget />
    <div class="col-span-12 xl:col-span-6">
      <RecentSalesWidget />
      <BestSellingWidget />
    </div>
    <div class="col-span-12 xl:col-span-6">
      <RevenueStreamWidget />
      <NotificationsWidget />
    </div>
  </div>
</template>
