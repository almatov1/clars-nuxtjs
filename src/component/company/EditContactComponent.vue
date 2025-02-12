<template>
    <form @submit.prevent="onContactSave" class="flex flex-col gap-[16px]">
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Номер телефона</div>
                <InputComponent placeholder="Введите номер телефона" v-model.trim="contact.telephone" required
                    telephone />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Эл. почта</div>
                <InputComponent placeholder="Введите адрес эл. почты" v-model.trim="contact.email" required
                    type="email" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">WhatsApp</div>
                <InputComponent placeholder="Введите номер WhatsApp" v-model.trim="contact.whatsapp" required
                    telephone />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Instagram</div>
                <InputComponent placeholder="Введите логин Instagram" v-model.trim="contact.instagram" required />
            </div>
        </div>
        <div class="flex justify-end pt-[16px]">
            <ButtonComponent class="w-[102px]" placeholder="Сохранить" type="submit" />
        </div>
    </form>
</template>

<script setup lang="ts">
import InputComponent from '../shared/InputComponent.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { useCompanyStore } from '~/src/module/company/store/company';
import { CompanyContactService } from '~/src/module/company/service/CompanyContactService';
import execTelephoneMask from '~/src/core/util/telephoneMask';

const company = useCompanyStore();
const contact = reactive({
    telephone: company.data?.telephone ? execTelephoneMask(company.data.telephone) : '',
    email: company.data?.email ?? '',
    whatsapp: company.data?.whatsapp ? execTelephoneMask(company.data.whatsapp) : '',
    instagram: company.data?.instagram ?? ''
});
const onContactSave = async () => {
    await CompanyContactService(contact.telephone.replace(/\D/g, ''), contact.email, contact.whatsapp.replace(/\D/g, ''), contact.instagram);
}
</script>

<style scoped></style>