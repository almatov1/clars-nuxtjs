<template>
    <div class="flex flex-col items-center gap-[16px]">
        <img :src="SuccessIcon" />
        <div class="text-[32px] font-medium text-black-500">Успешная запись!</div>
        <div class="flex gap-[12px]">
            <button @click="() => navigateTo(DEFAULT_ROUTE.HOME)"
                class="text-black-500 font-medium bg-pale-400 rounded-[8px] h-[36px] items-center justify-center px-[24px]">
                На главную
            </button>
            <button @click="() => navigateTo(ORDER_ROUTE.LIST)"
                class="text-white-950 font-medium bg-blue-400 rounded-[8px] h-[36px] items-center justify-center px-[24px]">
                Перейти в записи
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import SuccessIcon from '~/src/core/assets/image/booking/success.svg?inline';
import { DEFAULT_ROUTE, ORDER_ROUTE } from "~/src/core/config/route";
</script>

<style scoped></style>