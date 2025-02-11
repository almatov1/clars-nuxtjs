<template>
  <NuxtLayout name="app">
    <div class="bg-pale-400 flex items-center justify-center min-h-screen h-full">
      <div class="w-[438px] px-[24px] py-[32px] bg-white-400 rounded-[8px] flex flex-col items-center">
        <img :src="Logotype" width="56" />
        <div class="pt-[16px] pb-[36px] text-[20px] font-medium text-black-500">
          Добро пожаловать
        </div>
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Logotype from "../src/core/assets/image/auth/logotype.svg?inline";
</script>

<style></style>