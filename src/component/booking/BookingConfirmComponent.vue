<template>
    <div class="grid grid-cols-[250px_1fr] gap-[16px]">
        <div class="border-[1px] border-pale-500 rounded-[8px] p-[16px] flex flex-col items-center">
            <img :src="`${STORAGE}/${master?.picture}`" class="rounded-full mb-[16px]" width="96" />
            <div class="font-medium text-black-500">{{ master?.forename }} {{ master?.surname }}</div>
            <div class="text-black-400 text-[14px]">{{ master?.profession }}</div>
        </div>
        <div class="border-[1px] border-pale-500 rounded-[8px] p-[16px] flex flex-col gap-[10px]">
            <div v-for="(item, index) in info" :key="index" class="flex justify-between items-center">
                <div class="text-black-500">{{ item.label }}</div>
                <div class="w-full border-b-[1px] border-black-400 border-dashed mx-[8px]"></div>
                <div class="text-black-400 flex-shrink-0">{{ item.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { STORAGE } from "~/src/core/config/shared";
import execPriceMask from "~/src/core/util/priceMask";
import { useBookingStore } from "~/src/module/booking/store/booking";
const booking = useBookingStore();
const master = booking.data?.company?.masters.find(item => item.id === booking.data?.masterId);
const service = booking.data?.company?.services.find(item => item.id === booking.data?.serviceId);
const info = [
    { label: "Услуга", value: service?.name },
    {
        label: "Начало", value: `${booking.data?.time}, ${booking.data?.date!.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
        })}`
    },
    { label: "Длительность", value: "1 час" },
    { label: "Цена", value: execPriceMask((service?.price ?? 0).toString()) },
    { label: "Адрес", value: booking.data?.company?.address }
];
</script>

<style scoped></style>
