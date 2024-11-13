<script setup lang="ts">
import FeatureFooter from '@/components/features/FeatureFooter.vue'
import FeatureHeader from '@/components/features/FeatureHeader.vue'
</script>
<template>
  <div class="flex flex-col h-screen">
    <FeatureHeader />
    <main class="flex-1 relative">
      <slot />
    </main>
    <FeatureFooter />
  </div>
</template>
