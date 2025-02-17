<template>
  <div>
    <BlockHeaderComponent title="Сертификат" />
    <div class="grid grid-cols-3 gap-[16px]">
      <button v-for="(item, index) in procents" :key="index" @click="() => {
        selectedProcent = item.value.toString();
        vfm.open(modalController);
      }" class="rounded-[8px] p-[24px] text-white-950 flex flex-col items-start" :style="{ background: item.bg }">
        <div class="flex items-center w-full justify-between">
          <div class="text-white-200">Сертификат</div>
          <img :src="CertificateIcon" />
        </div>
        <div class="pt-[24px] text-[36px] font-bold">Скидка {{ item.value.toString() }}%</div>
        <div class="text-white-200">Базовый</div>
      </button>
    </div>
  </div>

  <ModalComponent :modal-id="modalController" @on-hide="() => vfm.close(modalController)"
    :title="`Скидка ${selectedProcent}%`">
    <form @submit.prevent="onCertificate" class="flex flex-col gap-[24px]">
      <div class="flex flex-col gap-[12px]">
        <div class="text-black-500">Номер телефона</div>
        <div>
          <InputComponent placeholder="Введите телефон получателя" v-model.trim="telephone" required telephone
            :roundedOnlyTop="recipient !== null" />
          <div v-if="recipient" class="h-[48px] bg-blue-400 text-white-950 flex items-center px-[16px] rounded-b-[8px]">
            {{ recipient.forename }}{{ recipient.surname ? ` ${recipient.surname}` : '' }}
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <ButtonComponent class="w-[102px]" placeholder="Добавить" type="submit" bg="bg-green-400" />
      </div>
    </form>
  </ModalComponent>
</template>

<script lang="ts" setup>
import { useVfm } from 'vue-final-modal';
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import InputComponent from '~/src/component/shared/InputComponent.vue';
import ModalComponent from '~/src/component/shared/ModalComponent.vue';
import CertificateIcon from '~/src/core/assets/image/company/certificate.svg?inline';
import { AddCertificateService } from '~/src/module/certificate/service/AddCertificateService';
import { ReloadCompanyService } from '~/src/module/company/service/ReloadCompanyService';
import type { UserModel } from '~/src/module/user/model/UserModel';
import { GetUserByTelephoneService } from '~/src/module/user/service/GetUserByTelephoneService';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const procents = [
  { value: 5, bg: "linear-gradient(90deg, #07C8F9 0%, #0D41E1 100%)" },
  { value: 10, bg: "linear-gradient(90deg, #FF930F 0%, #EA5459 100%)" },
  { value: 15, bg: "linear-gradient(90deg, #C621E5 0%, #7D7CF9 100%)" }
];

// MODAL
const selectedProcent = ref(procents[0].value.toString());
const telephone = ref('');
const recipient = ref<UserModel | null>(null);
const vfm = useVfm();
const modalController = Symbol('certificateModal');
const onCertificate = async () => {
  if (!recipient.value) {
    push.error('Номер телефона не найден');
    return;
  }

  const result = await AddCertificateService(telephone.value.replace(/\D/g, ''), Number(selectedProcent.value));
  if (result) {
    await ReloadCompanyService();
    push.success("Сертификат успешно отправлен");
    vfm.close(modalController);
    telephone.value = '';
    recipient.value = null;
  }
}
watch(() => telephone.value, async (elem) => {
  if (elem && elem.length === 14) {
    const result = await GetUserByTelephoneService(elem.replace(/\D/g, ''));
    if (result) recipient.value = result;
    else recipient.value = null;
    return;
  }

  recipient.value = null;
});
</script>

<style></style>