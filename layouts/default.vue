<template>
  <NuxtLayout name="app">
    <div class="bg-white-400 min-h-screen flex flex-col">
      <div class="flex-grow">
        <HeaderComponent />
        <div class="max-w-[1440px] mx-auto px-[80px]">
          <NuxtPage />
        </div>
      </div>
      <FooterComponent />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import FooterComponent from '~/src/component/home/FooterComponent.vue';
import HeaderComponent from '~/src/component/home/HeaderComponent.vue';
</script>

<style></style>