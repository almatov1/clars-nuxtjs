<template>
    <div class="flex flex-col gap-[24px]">
        <div class="flex gap-[8px]">
            <button v-for="(item, index) in items" :key="index" @click="() => tab = item"
                :class="['px-[24px] h-[36px] rounded-[8px]', tab === item ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
                {{ item }}
            </button>
        </div>
        <div class="text-[32px] font-medium text-black-500">{{ tab }}</div>
    </div>
</template>

<script setup lang="ts">
const items = ['Услуги', 'Мастера', 'Работы'];
const tab = ref(items[0]);
</script>

<style scoped></style>