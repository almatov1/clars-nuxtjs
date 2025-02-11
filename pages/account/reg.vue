<template>
  <div class="w-full text-center">
    <form @submit.prevent="onReg">
      <InputComponent class="mb-[12px]" placeholder="Email" :icon="EmailIcon" type="email" required
        v-model.trim="fields.email" />
      <InputComponent class="mb-[12px]" placeholder="Ваше имя" capitalize required v-model.trim="fields.forename" />
      <InputComponent class="mb-[12px]" placeholder="Придумайте пароль" :icon="LockIcon"
        :type="passwordHide ? 'password' : 'text'" note required v-model.trim="fields.password">
        <button type="button" :onClick="() => passwordHide = !passwordHide">
          <img :src="passwordHide ? EyeShowIcon : EyeHideIcon" />
        </button>
      </InputComponent>
      <InputComponent class="mb-[12px]" placeholder="Повторите пароль" :icon="LockIcon"
        :type="rePasswordHide ? 'password' : 'text'" note required v-model.trim="fields.rePassword">
        <button type="button" :onClick="() => rePasswordHide = !rePasswordHide">
          <img :src="rePasswordHide ? EyeShowIcon : EyeHideIcon" />
        </button>
      </InputComponent>
      <TextButtonComponent class="pb-[32px]" placeholder="У меня есть аккаунт"
        :onClick="() => navigateTo(ACCOUNT_ROUTE.AUTHENTICATION)" />
      <ButtonComponent type="submit" placeholder="Зарегистрироваться" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputComponent from '~/src/component/shared/InputComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import TextButtonComponent from '~/src/component/shared/TextButtonComponent.vue';
import EmailIcon from "../src/core/assets/image/auth/email.svg?inline";
import LockIcon from "../src/core/assets/image/auth/lock.svg?inline";
import EyeHideIcon from "../src/core/assets/image/auth/eye-hide.svg?inline";
import EyeShowIcon from "../src/core/assets/image/auth/eye-show.svg?inline";
import { ACCOUNT_ROUTE } from '~/src/core/config/route';
import { RegService } from '~/src/module/user/service/RegService';

definePageMeta({
  layout: 'auth',
  middleware: ['public']
})
const passwordHide = ref(true);
const rePasswordHide = ref(true);
const fields = reactive({
  email: '',
  forename: '',
  password: '',
  rePassword: ''
});
const onReg = async () => {
  if (fields.password !== fields.rePassword) {
    push.error("Пароли не совпадают");
    return;
  }

  await RegService(fields.email, fields.forename, fields.password);
}
</script>

<style></style>