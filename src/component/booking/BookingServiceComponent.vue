<template>
    <div class="bg-pale-400 rounded-[8px] px-[16px] py-[20px] flex justify-between items-start">
        <div class="flex flex-col items-start gap-[8px]">
            <div class="text-black-500 font-medium">{{ service.name }} / {{ execPriceMask(service.price.toString()) }}
            </div>
            <div class="text-black-400">1 час</div>
        </div>
        <button @click="() => navigateTo(`${COMPANY_ROUTE.COMPANY}${booking.company?.id}`)">
            <img :src="BackIcon" />
        </button>
    </div>
</template>

<script setup lang="ts">
import BackIcon from '~/src/core/assets/image/booking/back.svg?inline';
import { COMPANY_ROUTE } from '~/src/core/config/route';
import execPriceMask from '~/src/core/util/priceMask';
import type { BookingModel } from '~/src/module/booking/model/BookingModel';
const props = defineProps<{
    booking: BookingModel
}>();
const service = props.booking.company?.services.find(item => item.id === props.booking.serviceId)!; 
</script>

<style scoped></style>