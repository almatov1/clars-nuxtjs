<template>
  <div>
    <div class="text-[32px] font-medium pb-[16px]">Создать компанию</div>
    <div class="grid grid-cols-[411px_auto] gap-[16px] items-start">
      <div class="rounded-[8px] border-pale-500 border-[1px] flex flex-col items-center py-[16px] pb-[32px]">
        <img :src="picture ? getPictureUrl(picture) : UserIcon" width="128" class="rounded-full" />
        <div class="absolute pt-[112px]">
          <FileInputComponent :accept="'image/*'" @fileChange="onPictureChange">
            <img :src="EditIcon" />
          </FileInputComponent>
        </div>
      </div>
      <form @submit.prevent="onCreate"
        class="rounded-[8px] border-pale-500 border-[1px] p-[16px] flex flex-col gap-[16px]">
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Название</div>
          <InputComponent placeholder="Введите название" v-model.trim="fields.name" required capitalize />
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Категория</div>
            <SelectComponent placeholder="Выберите категорию" v-model="category" :elements="CATEGORIES" />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Описание</div>
            <InputComponent placeholder="Введите описание" v-model.trim="fields.description" required capitalize />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Регион</div>
            <SelectComponent placeholder="Выберите регион" v-model="region" :elements="REGIONS" />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Адрес</div>
            <InputComponent placeholder="Введите адрес" v-model.trim="fields.address" required capitalize />
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
          <ButtonComponent class="w-[102px]" placeholder="Создать" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectComponent from '~/src/component/shared/SelectComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import FileInputComponent from '~/src/component/shared/FileInputComponent.vue';
import InputComponent from '~/src/component/shared/InputComponent.vue';
import { CATEGORIES, REGIONS, TIMES } from '~/src/core/config/shared';
import UserIcon from "../../src/core/assets/image/profile/user.svg?inline";
import EditIcon from "../../src/core/assets/image/profile/edit.svg?inline";
import { CreateCompanyService } from '~/src/module/company/service/CreateCompanyService';
import { useCompanyStore } from '~/src/module/company/store/company';
import { COMPANY_ROUTE } from '~/src/core/config/route';
definePageMeta({
  layout: 'default',
  middleware: ['private']
})
const company = useCompanyStore();
if (company.data) navigateTo(COMPANY_ROUTE.CABINET);

// DATA
const picture = ref<File | null>(null);
const pictureName = ref('');
const getPictureUrl = (file: File) => URL.createObjectURL(file);
const onPictureChange = (files: FileList) => {
  picture.value = files[0];
  pictureName.value = files[0].name;
};

const category = ref<string | undefined>(undefined);
const region = ref<string | undefined>(undefined);
const openingTime = ref<string | undefined>(undefined);
const closingTime = ref<string | undefined>(undefined);
const fields = reactive({
  name: '',
  description: '',
  address: ''
});

const onCreate = async () => {
  if (!picture.value) {
    push.error("Фотография не выбрана");
    return;
  }

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

  await CreateCompanyService(openingTime.value, closingTime.value, category.value, fields.name, fields.description, region.value, fields.address, picture.value);
}
</script>

<style></style>