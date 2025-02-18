<template>
    <div class="mt-[48px]">
        <div
            class="max-w-[1440px] mx-auto h-[56px] px-[80px] flex items-center justify-between border-t-[1px] border-pale-500">
            <div class="flex items-center gap-[32px]">
                <div class="flex items-center gap-[12px]">
                    <a v-for="(item, index) in icons" :key="index" :href="item.href" target="_blank">
                        <img :src="item.icon" />
                    </a>
                </div>
                <div>© 2025 Clars, Inc. Все права защищены</div>
            </div>
            <div class="flex items-center gap-[16px] text-black-400">
                <NuxtLink :to="DEFAULT_ROUTE.HOME">Конфиденциальность</NuxtLink>
                <div>/</div>
                <NuxtLink :to="DEFAULT_ROUTE.HOME">Условия</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InstaIcon from '~/src/core/assets/image/footer/insta.svg?inline';
import FacebookIcon from '~/src/core/assets/image/footer/facebook.svg?inline';
import VKIcon from '~/src/core/assets/image/footer/vk.svg?inline';
import { DEFAULT_ROUTE } from '~/src/core/config/route';
const icons = [
    { icon: InstaIcon, href: "https://instagram.com" },
    { icon: FacebookIcon, href: "https://facebook.com" },
    { icon: VKIcon, href: "https://vk.com" }
];
</script>

<style scoped></style>