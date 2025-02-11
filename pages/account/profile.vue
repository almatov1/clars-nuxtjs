<template>
  <div>
    <div class="text-[32px] font-medium pb-[16px]">Личный кабинет</div>
    <div class="grid grid-cols-[411px_auto] gap-[16px] items-start">
      <div class="w-[411px] rounded-[8px] border-pale-500 border-[1px] flex flex-col items-center py-[16px]">
        <img :src="UserIcon" width="128" />
        <button class="absolute pt-[112px]">
          <img :src="EditIcon" />
        </button>
        <div class="text-[20px] font-medium pt-[16px] text-black-500">Аскар Нурлан</div>
      </div>
      <form @submit.prevent="onDataSave"
        class="rounded-[8px] border-pale-500 border-[1px] p-[16px] flex flex-col gap-[16px]">
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Имя</div>
            <InputComponent placeholder="Введите имя" required capitalize />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Фамилия</div>
            <InputComponent placeholder="Введите фамилию" required capitalize />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Телефон</div>
            <InputComponent placeholder="Введите телефон" telephone required />
          </div>
          <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Email</div>
            <InputComponent placeholder="Введите адрес эл. почты" required type="email" />
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
import UserIcon from "../../src/core/assets/image/home/user.svg?inline";
import EditIcon from "../../src/core/assets/image/profile/edit.svg?inline";
import InputComponent from "~/src/component/shared/InputComponent.vue";

const genders = ['Муж', 'Жен'];
const gender = ref(genders[0]);
const onDataSave = () => {

}
</script>

<style></style>