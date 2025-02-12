<template>
  <div>
    <div class="text-[32px] font-medium pb-[16px]">Личный кабинет</div>
    <div class="grid grid-cols-[411px_auto] gap-[16px] items-start">
      <div class="rounded-[8px] border-pale-500 border-[1px] flex flex-col items-center py-[16px]">
        <img :src="user.data?.picture ? `${STORAGE}/${user.data.picture}` : UserIcon" width="128"
          class="rounded-full" />
        <div class="absolute pt-[112px]">
          <FileInputComponent :accept="'image/*'" @fileChange="onPictureChange">
            <img :src="EditIcon" />
          </FileInputComponent>
        </div>
        <div class="text-[20px] font-medium pt-[24px] text-black-500">Аскар Нурлан</div>
      </div>
      <form @submit.prevent="onDataSave"
        class="rounded-[8px] border-pale-500 border-[1px] p-[16px] flex flex-col gap-[16px]">
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Имя</div>
            <InputComponent placeholder="Введите имя" v-model.trim="fields.forename" required capitalize />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Фамилия</div>
            <InputComponent placeholder="Введите фамилию" v-model.trim="fields.surname" required capitalize />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Телефон</div>
            <InputComponent placeholder="Введите телефон" v-model.trim="fields.telephone" telephone required />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Email</div>
            <InputComponent placeholder="Введите адрес эл. почты" v-model.trim="fields.email" required type="email" />
          </div>
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Пол</div>
          <div class="flex gap-[8px]">
            <button v-for="(item, index) in genders" :key="index" type="button" @click="gender = item"
              :class="['px-[24px] h-[36px] rounded-[8px]', gender === item ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="flex justify-end pt-[16px]">
          <ButtonComponent class="w-[102px]" placeholder="Сохранить" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from "~/src/component/shared/ButtonComponent.vue";
import UserIcon from "../../src/core/assets/image/profile/user.svg?inline";
import EditIcon from "../../src/core/assets/image/profile/edit.svg?inline";
import InputComponent from "~/src/component/shared/InputComponent.vue";
import FileInputComponent from "~/src/component/shared/FileInputComponent.vue";
import { PatchDataService } from "~/src/module/user/service/PatchDataService";
import { useUserStore } from "~/src/module/user/store/user";
import { PatchPictureService } from "~/src/module/user/service/PatchPictureService";
import { STORAGE } from "~/src/core/config/shared"
definePageMeta({
  layout: 'default',
  middleware: ['private']
})
const user = useUserStore();

// PICTURE
const onPictureChange = async (files: FileList) => {
  await PatchPictureService(files[0]);
};

// DATA
const fields = reactive({
  email: user.data?.email ?? '',
  telephone: user.data?.telephone ?? '',
  forename: user.data?.forename ?? '',
  surname: user.data?.surname ?? ''
});
const genders = ['Муж', 'Жен'];
const gender = ref(user.data?.gender ?? genders[0]);
const onDataSave = async () => {
  await PatchDataService(fields.email, fields.telephone.replace(/\D/g, ''), fields.forename, fields.surname, gender.value);
}
</script>

<style></style>