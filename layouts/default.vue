<template>
  <NuxtLayout name="app">
    <div class="bg-white-400 min-h-screen">
      <HeaderComponent />
      <div class="max-w-[1440px] mx-auto px-[80px]">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import HeaderComponent from '~/src/component/home/HeaderComponent.vue';
</script>

<style></style>