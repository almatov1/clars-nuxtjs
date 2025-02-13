<template>
    <div class="rounded-[8px] border-[1px] border-pale-500 px-[24px] py-[16px] flex gap-[12px]">
        <img :src="`${STORAGE}/${company.picture}`" class="rounded-full" width="48" />
        <div class="flex flex-col items-start">
            <div class="text-black-500 text-[18px] font-medium">{{ company.name }}</div>
            <div class="text-black-400 text-[14px]">{{ company.description }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CompanyModel } from '~/src/module/company/model/CompanyModel';
import { STORAGE } from "~/src/core/config/shared";
defineProps<{
    company: CompanyModel
}>();
</script>

<style scoped></style>