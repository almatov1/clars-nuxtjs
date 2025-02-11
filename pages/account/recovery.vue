<template>
  <div class="w-full text-center">
    <form v-if="stage === 0" @submit.prevent="onRecovery">
      <InputComponent class="mb-[12px]" placeholder="Email" :icon="EmailIcon" type="email" required
        v-model.trim="email" />
      <TextButtonComponent class="pb-[32px]" placeholder="Вспомнили пароль?"
        :onClick="() => navigateTo(ACCOUNT_ROUTE.AUTHENTICATION)" />
      <ButtonComponent type="submit" placeholder="Продолжить" />
    </form>
    <form v-else-if="stage === 1" @submit.prevent="onRecovery">
      <div class="pb-[16px] text-black-400 font-normal text-16px">
        Мы отправили СМС с кодом подтверждения на вашу почту. Пожалуйста, введите данный код ниже.
      </div>
      <InputComponent class="mb-[12px]" placeholder="Код подтверждения" required v-model.trim="otp" />
      <TextButtonComponent class="pb-[32px]" placeholder="Не пришел код?" :onClick="resendCode" />
      <ButtonComponent type="submit" placeholder="Подтвердить" />
    </form>
    <form v-else @submit.prevent="onRecovery">
      <InputComponent class="mb-[12px]" placeholder="Придумайте пароль" :icon="LockIcon"
        :type="passwordHide ? 'password' : 'text'" note required v-model.trim="fields.password">
        <button type="button" :onClick="() => passwordHide = !passwordHide">
          <img :src="passwordHide ? EyeShowIcon : EyeHideIcon" />
        </button>
      </InputComponent>
      <InputComponent class="mb-[32px]" placeholder="Повторите пароль" :icon="LockIcon"
        :type="rePasswordHide ? 'password' : 'text'" note required v-model.trim="fields.rePassword">
        <button type="button" :onClick="() => rePasswordHide = !rePasswordHide">
          <img :src="rePasswordHide ? EyeShowIcon : EyeHideIcon" />
        </button>
      </InputComponent>
      <ButtonComponent type="submit" placeholder="Изменить пароль" />
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
const stage = ref(0);
const email = ref('');

const otp = ref('');
const resendCode = () => {

}

const fields = reactive({
  password: '',
  rePassword: ''
});
const passwordHide = ref(true);
const rePasswordHide = ref(true);

const onRecovery = async () => {
  if (stage.value === 2) navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
  else stage.value++;
}
</script>

<style></style>