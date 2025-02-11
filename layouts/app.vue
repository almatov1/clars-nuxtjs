<template>
  <div class="min-h-screen">
    <slot></slot>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { SEO } from '~/src/core/config/shared';

useSeoMeta({
  title: SEO.title,
  keywords: SEO.keywords,
  description: SEO.description,
  ogTitle: SEO.title,
  ogDescription: SEO.description,
  ogType: 'website'
})
</script>

<style>
:root {
  --nv-gap: 1rem;
  --nv-z: 9999;
}

/* Rules for mobile devices */
@media (max-width: 768px) {
  :root {
    --nv-gap: 0.5rem;
  }
}
</style>