<template>
    <div class="flex justify-center">
        <div class="w-[168px]">
            <ButtonComponent placeholder="Посмотреть еще" :onClick="onLoadMore" bg="bg-pale-400" text="text-blue-400" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';

// DEFINE
defineProps<{
    onLoadMore: () => void;
}>();
</script>

<style scoped></style>