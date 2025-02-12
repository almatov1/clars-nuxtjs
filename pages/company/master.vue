<template>
  <div>
    <div class="flex items-center justify-between">
      <BlockHeaderComponent title="Специалисты" />
      <button @click="() => {
        selectedMaster = null;
        vfm.open(modalController);
      }" class="px-[24px] h-[36px] rounded-[8px] bg-green-400 text-white-950">
        Добавить специалиста
      </button>
    </div>
    <div class="grid grid-cols-4 gap-[24px]">
      <button v-for="(item, index) in company.data?.masters" :key="index" @click="() => {
        selectedMaster = item;
        vfm.open(modalController);
      }" class="rounded-[8px] border-pale-500 border-[1px] p-[14px] flex items-center gap-[12px]">
        <img :src="`${STORAGE}/${item.picture}`" width="48" class="rounded-full" />
        <div class="flex flex-col items-start">
          <div class="text-[16px] font-medium text-black-500">{{ item.forename }} {{ item.surname }}</div>
          <div class="text-[14px] font-normal text-black-400">{{ item.profession }}</div>
        </div>
      </button>
    </div>

    <ModalComponent :modal-id="modalController" @on-hide="() => vfm.close(modalController)"
      :title="selectedMaster ? 'Редактировать специалиста' : 'Добавить специалиста'">
      <form @submit.prevent="onSave" class="flex flex-col gap-[24px]">
        <div class="flex items-center gap-[12px]">
          <div class="relative w-[72px]">
            <img :src="selectedMaster
              ? `${STORAGE}/${selectedMaster.picture}`
              : picture
                ? getPictureUrl(picture)
                : UserIcon" width="72" class="rounded-full" />
            <div class="absolute bottom-0 right-0">
              <FileInputComponent v-if="selectedMaster" :accept="'image/*'" @fileChange="onPictureChange">
                <img :src="EditIcon" />
              </FileInputComponent>
              <FileInputComponent v-else :accept="'image/*'" @fileChange="onPictureLoad">
                <img :src="EditIcon" />
              </FileInputComponent>
            </div>
          </div>
          <div class="flex flex-col items-start">
            <div class="text-black-500 font-medium">
              {{ selectedMaster ? `${selectedMaster.forename} ${selectedMaster.surname}` : 'Не указано' }}
            </div>
            <div class="text-black-400">
              {{ selectedMaster?.profession ?? 'не указано' }}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Имя</div>
          <InputComponent placeholder="Введите имя" v-model.trim="fields.forename" required capitalize />
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Фамилия</div>
          <InputComponent placeholder="Введите фамилию" v-model.trim="fields.surname" required capitalize />
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Профессия</div>
          <InputComponent placeholder="Введите профессию" v-model.trim="fields.profession" required capitalize />
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Телефон</div>
          <InputComponent placeholder="Введите номер телефона" v-model.trim="fields.telephone" required telephone />
        </div>
        <div class="flex flex-col gap-[12px]">
          <div class="text-black-500">Пол</div>
          <div class="flex gap-[8px]">
            <button v-for="(item, index) in GENDERS" :key="index" type="button" @click="gender = item"
              :class="['px-[24px] h-[36px] rounded-[8px]', gender === item ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="flex justify-end gap-[12px]">
          <ButtonComponent v-if="selectedMaster" class="w-[102px]" placeholder="Удалить" type="button"
            :onClick="() => onDelete(selectedMaster?.id!)" bg="bg-red-400" />
          <ButtonComponent class="w-[102px]" :placeholder="selectedMaster ? 'Сохранить' : 'Добавить'" type="submit" />
        </div>
      </form>
    </ModalComponent>
  </div>
</template>

<script lang="ts" setup>
import { useVfm } from 'vue-final-modal';
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import type { MasterModel } from '~/src/module/company/model/CompanyModel';
import { useCompanyStore } from '~/src/module/company/store/company';
import { GENDERS, STORAGE } from "~/src/core/config/shared"
import execTelephoneMask from '~/src/core/util/telephoneMask';
import { MasterPictureService } from '~/src/module/master/service/MasterPictureService';
import { CreateMasterService } from '~/src/module/master/service/CreateMasterService';
import { MasterDataService } from '~/src/module/master/service/MasterDataService';
import { DeleteMasterService } from '~/src/module/master/service/DeleteMasterService';
import ModalComponent from '~/src/component/shared/ModalComponent.vue';
import InputComponent from '~/src/component/shared/InputComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import UserIcon from "../../src/core/assets/image/profile/user.svg?inline";
import EditIcon from "../../src/core/assets/image/profile/edit.svg?inline";
import FileInputComponent from '~/src/component/shared/FileInputComponent.vue';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const company = useCompanyStore();

// DATA
const selectedMaster = ref<MasterModel | null>(null);
const gender = ref(GENDERS[0]);
const fields = reactive({
  forename: '',
  surname: '',
  profession: '',
  telephone: ''
});
watch(() => selectedMaster.value, (master) => {
  gender.value = master?.gender ?? GENDERS[0];
  fields.forename = master?.forename ?? '';
  fields.surname = master?.surname ?? '';
  fields.profession = master?.profession ?? '';
  fields.telephone = master?.telephone ? execTelephoneMask(master.telephone) : '';
});
const onSave = async () => {
  if (selectedMaster.value) {
    await MasterDataService(selectedMaster.value.id, fields.forename, fields.surname, fields.profession, fields.telephone, gender.value);
    vfm.close(modalController);
    return;
  }

  if (!picture.value) {
    push.error("Не выбрана фотография");
    return;
  }

  await CreateMasterService(fields.forename, fields.surname, fields.profession, fields.telephone, gender.value, picture.value);
  vfm.close(modalController);
}

// PICTURE
const picture = ref<File | null>(null);
const getPictureUrl = (file: File) => URL.createObjectURL(file);
const onPictureLoad = (files: FileList) => { picture.value = files[0] };
const onPictureChange = async (files: FileList) => {
  if (selectedMaster.value) {
    await MasterPictureService(selectedMaster.value.id, files[0]);
    selectedMaster.value = company.data?.masters.find(item => item.id === selectedMaster.value?.id)!;
  }
};

// DELETE
const onDelete = async (id: number) => {
  await DeleteMasterService(id);
  vfm.close(modalController);
}

// WINDOW
const vfm = useVfm();
const modalController = Symbol('masterModal');
</script>

<style></style>