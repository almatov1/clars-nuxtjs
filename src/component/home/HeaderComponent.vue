<template>
    <div class="mb-[24px]">
        <div class="max-w-[1440px] mx-auto px-[80px] py-[16px] flex justify-between items-center">
            <button @click="() => navigateTo(DEFAULT_ROUTE.HOME)">
                <img :src="Logotype" />
            </button>
            <div class="flex items-center gap-[16px]">
                <button class="flex items-center gap-[8px] bg-red-400 h-[32px] px-[12px] rounded-[8px]">
                    <img :src="PlusIcon" />
                    <div class="font-medium text-[16px] text-white-950">Создать бизнес</div>
                </button>
                <button
                    class="flex items-center gap-[8px] border-pale-500 border-[1px] h-[32px] px-[12px] rounded-[8px]">
                    <img :src="ListIcon" />
                    <img :src="UserIcon" />
                </button>
            </div>
        </div>
        <div class="w-full h-[1px] bg-pale-500"></div>
    </div>
</template>

<script setup lang="ts">
import Logotype from "../../core/assets/image/home/logotype.svg?inline";
import PlusIcon from "../../core/assets/image/home/plus.svg?inline";
import ListIcon from "../../core/assets/image/home/list.svg?inline";
import UserIcon from "../../core/assets/image/home/user.svg?inline";
import { DEFAULT_ROUTE } from "~/src/core/config/route";
</script>

<style scoped></style>