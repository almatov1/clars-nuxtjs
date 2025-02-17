<template>
    <div class="flex flex-col gap-[12px]">
        <div class="text-black-500">Фото</div>
        <FileInputComponent :accept="'image/*'" @fileChange="onAdd">
            <div
                class="h-[150px] w-full bg-pale-400 rounded-[8px] border-[1px] border-pale-500 border-dashed flex flex-col items-center justify-center">
                <img :src="ImageIcon" />
                <div class="text-black-500 w-[273px] text-center">Выберите изображения для загрузки (PNG, JPG)</div>
            </div>
        </FileInputComponent>
        <div v-if="company.data?.works.length ?? 0 > 0" class="flex flex-wrap gap-[8px]">
            <div v-for="(item, index) in company.data?.works" :key="index" class="relative w-[72px] h-[72px]">
                <div :style="{ backgroundImage: `url(${STORAGE}/${item.picture})` }"
                    class="w-[72px] h-[72px] rounded-[8px] bg-cover bg-center">
                </div>
                <button @click="() => onDelete(item.id)" class="absolute top-0 right-0 p-[4px]">
                    <img :src="DeleteIcon" width="16" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageIcon from '~/src/core/assets/image/company/image.svg?inline';
import FileInputComponent from '../shared/FileInputComponent.vue';
import { AddWorkService } from '~/src/module/company/service/AddWorkService';
import { DeleteWorkService } from '~/src/module/company/service/DeleteWorkService';
import { useCompanyStore } from '~/src/module/company/store/company';
import { STORAGE } from "~/src/core/config/shared";
import DeleteIcon from '~/src/core/assets/image/company/delete.svg?inline';
const company = useCompanyStore();

const onAdd = async (files: FileList) => {
    await AddWorkService(files[0]);
}
const onDelete = async (id: number) => {
    await DeleteWorkService(id);
}
</script>

<style scoped></style>