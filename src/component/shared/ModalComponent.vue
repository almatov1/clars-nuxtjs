<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="bg-white-400 rounded-[8px] overflow-auto w-[655px] overflow-auto max-h-[90%]"
        content-transition="vfm-fade">
        <div class="flex justify-between items-center p-[24px]">
            <div class="text-black-500 text-[20px] font-medium">
                {{ title }}
            </div>
            <button @click="$emit('on-hide')">
                <img :src="CloseIcon" />
            </button>
        </div>
        <div class="w-[100%] h-[1px] bg-pale-500"></div>
        <div class="p-[24px]">
            <slot></slot>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import CloseIcon from '~/src/core/assets/image/home/close.svg?inline'
defineProps<{
    title: String;
}>();
defineEmits<{
    (event: 'on-hide'): void;
}>();
</script>

<style scoped></style>