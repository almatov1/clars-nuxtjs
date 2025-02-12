<template>
  <div>
    <BlockHeaderComponent title="Личный кабинет" />
    <div class="grid grid-cols-[411px_auto] gap-[16px] items-start">
      <div class="rounded-[8px] border-pale-500 border-[1px] flex flex-col items-center py-[16px]">
        <img :src="company.data?.picture ? `${STORAGE}/${company.data.picture}` : UserIcon" width="128"
          class="rounded-full" />
        <div class="absolute pt-[112px]">
          <FileInputComponent :accept="'image/*'" @fileChange="onPictureChange">
            <img :src="EditIcon" />
          </FileInputComponent>
        </div>
        <div class="text-[20px] font-medium pt-[24px] text-black-500">{{ company.data?.name }}</div>
        <div class="text-[16px] font-normal text-black-400">{{ company.data?.description }}</div>
      </div>
      <div class="rounded-[8px] border-pale-500 border-[1px] p-[16px]">
        <div class="pb-[32px] flex gap-[8px]">
          <button v-for="(item, index) in tabs" :key="index" type="button" @click="tab = item"
            :class="['px-[24px] h-[36px] rounded-[8px]', tab === item ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
            {{ item }}
          </button>
        </div>
        <EditInfoComponent v-if="tab === tabs[0]" />
        <EditContactComponent v-else-if="tab === tabs[1]" />
        <EditIntroComponent v-else-if="tab === tabs[2]" />
        <EditWorkComponent v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import FileInputComponent from '~/src/component/shared/FileInputComponent.vue';
import { STORAGE } from "~/src/core/config/shared"
import { useCompanyStore } from '~/src/module/company/store/company';
import UserIcon from "../../src/core/assets/image/profile/user.svg?inline";
import EditIcon from "../../src/core/assets/image/profile/edit.svg?inline";
import { CompanyPictureService } from '~/src/module/company/service/CompanyPictureService';
import EditInfoComponent from '~/src/component/company/EditInfoComponent.vue';
import EditContactComponent from '~/src/component/company/EditContactComponent.vue';
import EditIntroComponent from '~/src/component/company/EditIntroComponent.vue';
import EditWorkComponent from '~/src/component/company/EditWorkComponent.vue';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const company = useCompanyStore();

// TAB
const tabs = ['Инфо', 'Контакты', 'Интро', 'Работы'];
const tab = ref(tabs[0]);

// PICTURE
const onPictureChange = async (files: FileList) => {
  await CompanyPictureService(files[0]);
};
</script>

<style></style>