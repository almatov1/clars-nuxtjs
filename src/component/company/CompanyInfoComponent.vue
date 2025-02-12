<template>
    <div class="rounded-[8px] border-[1px] border-pale-500 p-[24px] flex flex-col gap-[32px]">
        <div class="flex gap-[12px]">
            <img :src="`${STORAGE}/${company?.picture}`" width="48" class="rounded-full" />
            <div class="flex flex-col">
                <div class="text-[18px] text-black-500 uppercase text-medium">{{ company?.name }}</div>
                <div class="text-[14px] text-black-400">{{ company?.description }}</div>
            </div>
        </div>
        <div class="h-[1px] w-[100%] bg-pale-500"></div>
        <div class="flex flex-col gap-[12px]">
            <div class="text-black-500 text-medium">Адрес</div>
            <div class="text-[14px] text-black-400">{{ company?.region }}, {{ company?.address }}</div>
        </div>
        <div class="flex flex-col gap-[12px]" v-if="company.whatsapp || company.instagram">
            <div class="text-black-500 text-medium">Наши контакты</div>
            <div class="flex gap-[12px]">
                <button v-if="company.whatsapp" @click="onWhatsapp">
                    <img :src="WhatsappIcon" />
                </button>
                <button v-if="company.instagram" @click="onInsta">
                    <img :src="InstaIcon" />
                </button>
            </div>
        </div>
        <div class="flex flex-col gap-[16px]">
            <div v-if="company.telephone || company.email" class="flex gap-[16px]">
                <ButtonComponent v-if="company.email" class="w-full" placeholder="Написать" bg="bg-pale-400"
                    text="text-blue-400" component :onClick="onMail">
                    <img :src="MailIcon" width="20" />
                </ButtonComponent>
                <ButtonComponent v-if="company.telephone" class="w-full" placeholder="Позвонить" bg="bg-pale-400"
                    text="text-blue-400" component :onClick="onCall">
                    <img :src="CallIcon" class="mb-[2px]" />
                </ButtonComponent>
            </div>
            <ButtonComponent :onClick="() => null" placeholder="Записаться" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { STORAGE } from '~/src/core/config/shared';
import CallIcon from '~/src/core/assets/image/company/call.svg?inline';
import MailIcon from '~/src/core/assets/image/company/mail.svg?inline';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import WhatsappIcon from '~/src/core/assets/image/company/whatsapp.svg?inline';
import InstaIcon from '~/src/core/assets/image/company/insta.svg?inline';
import type { CompanyModel } from '~/src/module/company/model/CompanyModel';
const props = defineProps<{
    company: CompanyModel
}>();
const onCall = () => { window.location.href = `tel:${props.company?.telephone}` }
const onMail = () => { window.location.href = `mailto:${props.company?.email}` }
const onWhatsapp = () => { window.open(`https://wa.me/${props.company?.whatsapp}`, '_blank') }
const onInsta = () => { window.open(`https://instagram.com/${props.company?.instagram}`, '_blank') }
</script>

<style scoped></style>