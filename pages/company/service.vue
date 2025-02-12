<template>
  <div>
    <div class="flex items-center justify-between">
      <BlockHeaderComponent title="Услуги" />
      <button @click="() => {
        selectedService = null;
        vfm.open(modalController);
      }" class="px-[24px] h-[36px] rounded-[8px] bg-green-400 text-white-950">
        Добавить услугу
      </button>
    </div>
    <div class="grid grid-cols-3 gap-[24px]">
      <div v-for="(item, index) in company.data?.services" :key="index"
        class="rounded-[8px] border-[1px] border-pale-500 p-[12px]">
        <div class="flex items-center justify-between pb-[24px]">
          <div class="flex gap-[4px]">
            <div class="text-black-500">Услуга</div>
            <div class="font-medium uppercase text-black-500">{{ item.name }}</div>
          </div>
          <button @click="() => onDelete(item.id)"><img :src="DeleteServiceIcon"></button>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-black-500">Цена</div>
          <div class="flex-1 border-dashed border-b border-black-400 mx-[8px]"></div>
          <div class="text-black-400">{{ execPriceMask(item.price.toString()) }}</div>
        </div>
        <div class="flex justify-between items-center pt-[8px]">
          <div class="text-black-500">Специалистов</div>
          <div class="flex-1 border-dashed border-b border-black-400 mx-[8px]"></div>
          <div class="text-black-400">
            {{ company.data?.masterServices.filter(el => el.serviceId === item.id).length }}
          </div>
        </div>
        <ButtonComponent class="mt-[16px]" :onClick="() => {
          selectedService = item;
          vfm.open(modalController);
        }" placeholder="Изменить" bg="bg-pale-400" text="text-blue-400" />
      </div>
    </div>

    <ModalComponent :modal-id="modalController" @on-hide="() => vfm.close(modalController)"
      :title="selectedService ? 'Редактировать услугу' : 'Добавить услугу'">
      <form @submit.prevent="onSave" class="flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Название услуги</div>
          <InputComponent placeholder="Введите название" v-model.trim="fields.name" required capitalize />
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Цена</div>
          <InputComponent placeholder="Введите цену" v-model.trim="fields.price" required currency />
        </div>
        <div class="flex justify-end">
          <ButtonComponent class="w-[102px]" :placeholder="selectedService ? 'Сохранить' : 'Добавить'" type="submit" />
        </div>
      </form>
    </ModalComponent>
  </div>
</template>

<script lang="ts" setup>
import { useVfm } from 'vue-final-modal';
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import InputComponent from '~/src/component/shared/InputComponent.vue';
import ModalComponent from '~/src/component/shared/ModalComponent.vue';
import type { ServiceModel } from '~/src/module/company/model/CompanyModel';
import { AddServiceService } from '~/src/module/service/service/AddServiceService';
import { UpdateServiceService } from '~/src/module/service/service/UpdateServiceService';
import { DeleteServiceService } from '~/src/module/service/service/DeleteServiceService';
import DeleteServiceIcon from '~/src/core/assets/image/company/service-delete.svg?inline';
import { useCompanyStore } from '~/src/module/company/store/company';
import execPriceMask from '~/src/core/util/priceMask';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const company = useCompanyStore();

// DATA
const selectedService = ref<ServiceModel | null>(null);
const fields = reactive({
  name: '',
  price: ''
});
watch(() => selectedService.value, (service) => {
  fields.name = service?.name ?? '';
  fields.price = service?.price ? execPriceMask(service?.price.toString(), false) : '';
});
const onSave = async () => {
  if (selectedService.value) {
    await UpdateServiceService(selectedService.value.id, fields.name, Number(fields.price.replace(/\D/g, '')));
    vfm.close(modalController);
    return;
  }

  await AddServiceService(fields.name, Number(fields.price.replace(/\D/g, '')));
  vfm.close(modalController);
}
const onDelete = async (id: number) => { await DeleteServiceService(id) }

// WINDOW
const vfm = useVfm();
const modalController = Symbol('serviceModal');
</script>

<style></style>