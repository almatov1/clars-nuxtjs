<template>
    <form @submit.prevent="onInfoSave" class="flex flex-col gap-[16px]">
        <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Название</div>
            <InputComponent placeholder="Введите название" v-model.trim="info.name" required capitalize />
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Категория</div>
                <SelectComponent placeholder="Выберите категорию" v-model="category" :elements="CATEGORIES" />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Описание</div>
                <InputComponent placeholder="Введите описание" v-model.trim="info.description" required capitalize />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Регион</div>
                <SelectComponent placeholder="Выберите регион" v-model="region" :elements="REGIONS" />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Адрес</div>
                <InputComponent placeholder="Введите адрес" v-model.trim="info.address" required capitalize />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Начало рабочего времени</div>
                <SelectComponent placeholder="Выберите время" v-model="openingTime" :elements="TIMES" />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Конец рабочего времени</div>
                <SelectComponent placeholder="Выберите время" v-model="closingTime" :elements="TIMES" />
            </div>
        </div>
        <div class="flex justify-end pt-[16px]">
            <ButtonComponent class="w-[102px]" placeholder="Сохранить" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { CompanyInfoService } from '~/src/module/company/service/CompanyInfoService';
import InputComponent from '../shared/InputComponent.vue';
import SelectComponent from '../shared/SelectComponent.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { CATEGORIES, REGIONS, TIMES } from '~/src/core/config/shared';
import { useCompanyStore } from '~/src/module/company/store/company';

const company = useCompanyStore();
const category = ref<string | undefined>(company.data?.category);
const region = ref<string | undefined>(company.data?.region);
const openingTime = ref<string | undefined>(company.data?.openingTime);
const closingTime = ref<string | undefined>(company.data?.closingTime);
const info = reactive({
    name: company.data?.name ?? '',
    description: company.data?.description ?? '',
    address: company.data?.address ?? ''
});
const onInfoSave = async () => {
    if (!category.value) {
        push.error("Категория не выбрана");
        return;
    }

    if (!region.value) {
        push.error("Регион не выбран");
        return;
    }

    if (!openingTime.value) {
        push.error("Начало работы не выбрана");
        return;
    }

    if (!closingTime.value) {
        push.error("Конец работы не выбрана");
        return;
    }

    if (openingTime.value >= closingTime.value) {
        push.error("Время начала работы должно быть раньше времени окончания");
        return;
    }

    await CompanyInfoService(openingTime.value, closingTime.value, category.value, info.name, info.description, region.value, info.address);
}
</script>

<style scoped></style>