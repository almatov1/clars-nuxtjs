<template>
    <div class="relative">
        <div @click="triggerFileInput" class="cursor-pointer">
            <slot></slot>
        </div>
        <input type="file" ref="fileInput" :accept="accept" :multiple="multiple" @change="handleFileChange" hidden />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IMAGE_CONFIG } from '~/src/core/config/shared';
import { push } from 'notivue';
const { t } = useI18n();

const props = defineProps({
    accept: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    maxFileSize: { type: Number, default: IMAGE_CONFIG.MAX_SIZE }
});
const emit = defineEmits(['fileChange']);

const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => { fileInput.value?.click(); };

const handleFileChange = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        for (const file of files) {
            if (file.size > props.maxFileSize) {
                push.error(t('file.error.size', { maxFileSize: IMAGE_CONFIG.MAX_SIZE_IN_TEXT }))
                return;
            }
        }
        emit('fileChange', files);
    }
};
</script>

<style scoped></style>