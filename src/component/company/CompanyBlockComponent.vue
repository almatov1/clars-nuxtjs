<template>
    <div class="flex flex-col gap-[24px]">
        <div class="flex gap-[8px]" id="orderTarget">
            <button v-for="(item, index) in items" :key="index" @click="() => tab = item"
                :class="['px-[24px] h-[36px] rounded-[8px]', tab === item ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
                {{ item }}
            </button>
        </div>
        <div class="text-[32px] font-medium text-black-500">{{ tab }}</div>
        <div v-if="tab === items[0]" class="flex flex-col gap-[12px]">
            <button v-for="(item, index) in company.services" :key="index" @click="() => onBooking(item.id)"
                class="px-[12px] h-[48px] border-[1px] border-pale-500 flex items-center justify-between rounded-[8px]">
                <div class="text-black-500 font-medium">
                    {{ item.name }} - {{ execPriceMask(item.price.toString()) }}
                </div>
                <img :src="ArrowRight" />
            </button>
        </div>
        <div v-else-if="tab === items[1]" class="grid grid-cols-2 gap-[12px]">
            <div v-for="(item, index) in company.masters" :key="index"
                class="p-[16px] rounded-[8px] border-[1px] border-pale-500 flex gap-[12px]">
                <img :src="`${STORAGE}/${item.picture}`" class="rounded-full" width="48" />
                <div class="flex flex-col items-start">
                    <div class="text-black-500 font-medium">{{ item.forename }} {{ item.surname }}</div>
                    <div class="text-black-400 text-[14px]">{{ item.profession }}</div>
                </div>
            </div>
        </div>
        <CompanyWorkComponent v-else :company="company" />
    </div>
</template>

<script setup lang="ts">
import type { CompanyModel } from '~/src/module/company/model/CompanyModel';
import ArrowRight from '~/src/core/assets/image/company/arrow-right.svg?inline';
import execPriceMask from '~/src/core/util/priceMask';
import { STORAGE } from "~/src/core/config/shared";
import CompanyWorkComponent from './CompanyWorkComponent.vue';
import { useBookingStore } from '~/src/module/booking/store/booking';
import { useUserStore } from '~/src/module/user/store/user';
import { ACCOUNT_ROUTE, ORDER_ROUTE } from '~/src/core/config/route';
const props = defineProps<{
    company: CompanyModel;
}>();
const items = ['Услуги', 'Мастера', 'Работы'];
const tab = ref(items[0]);

const user = useUserStore();
const booking = useBookingStore();
const onBooking = (serviceId: number) => {
    if (!user.data) {
        push.error("Вы не авторизованы");
        navigateTo(ACCOUNT_ROUTE.AUTHENTICATION);
        return;
    }

    booking.reset();
    booking.setCompany(props.company);
    booking.setServiceId(serviceId);
    navigateTo(ORDER_ROUTE.BOOKING);
}
</script>

<style scoped></style>