<template>
  <div class="w-full text-center">
    <form @submit.prevent="onAuth">
      <InputComponent class="mb-[12px]" placeholder="Email" :icon="EmailIcon" type="email" required
        v-model.trim="fields.email" />
      <InputComponent class="mb-[12px]" placeholder="Пароль" :icon="LockIcon" :type="passwordHide ? 'password' : 'text'"
        note required v-model.trim="fields.password">
        <button type="button" :onClick="() => passwordHide = !passwordHide">
          <img :src="passwordHide ? EyeShowIcon : EyeHideIcon" />
        </button>
      </InputComponent>
      <TextButtonComponent class="pb-[32px]" placeholder="Забыли пароль?"
        :onClick="() => navigateTo(ACCOUNT_ROUTE.RECOVERY)" />
      <ButtonComponent type="submit" class="pb-[12px]" placeholder="Войти" />
      <ButtonComponent type="button" placeholder="Зарегистрироваться" bg="bg-white-400" text="bg-black-500"
        borderColor="border-pale-500" :onClick="() => navigateTo(ACCOUNT_ROUTE.REGISTRATION)" />
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

definePageMeta({
  layout: 'auth',
  // middleware: ['public']
})
const passwordHide = ref(true);
const fields = reactive({
  email: '',
  password: ''
});
const onAuth = async () => {

}
</script>

<style></style>