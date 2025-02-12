<template>
    <div>
        <div class="flex items-center gap-[12px] pb-[16px]">
            <button @click="$router.back()">
                <img :src="BackIcon" />
            </button>
            <div class="text-[32px] font-medium">{{ title }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackIcon from '~/src/core/assets/image/company/back.svg?inline';
defineProps<{
    title: string
}>();
</script>

<style scoped></style>