<template>
    <div v-if="availableMasters?.length ?? 0 > 0" class="flex flex-col gap-[16px]">
        <div class="text-black-500 font-medium text-[32px]">1. Выбрать специалиста</div>
        <div class="grid grid-cols-3 gap-[16px]">
            <button @click="onRandom"
                class="px-[16px] py-[14px] rounded-[8px] border-[1px] border-pale-500 flex items-center gap-[12px]">
                <img :src="isRandom ? CheckIcon : UserIcon" width="48" class="rounded-full" />
                <div class="text-black-500 font-medium">Любой мастер</div>
            </button>
            <button v-for="(item, index) in availableMasters" :key="index" @click="() => onMaster(item.masterId)"
                class="px-[16px] py-[14px] rounded-[8px] border-[1px] border-pale-500 flex items-start gap-[12px]">
                <img :src="isRandom || booking.data?.masterId !== item.masterId ? `${STORAGE}/${getMaster(item.masterId).picture}` : CheckIcon"
                    width="48" class="rounded-full" />
                <div class="flex flex-col items-start">
                    <div class="text-black-500 font-medium text-left">
                        {{ getMaster(item.masterId).forename }} {{ getMaster(item.masterId).surname }}
                    </div>
                    <div class="text-black-400 text-[14px]">{{ getMaster(item.masterId).profession }}</div>
                </div>
            </button>
        </div>
    </div>
    <div v-else>Специалисты не найдены</div>
</template>

<script setup lang="ts">
import CheckIcon from '~/src/core/assets/image/booking/check.svg?inline';
import UserIcon from "~/src/core/assets/image/profile/user.svg?inline";
import { STORAGE } from '~/src/core/config/shared';
import { useBookingStore } from '~/src/module/booking/store/booking';
const booking = useBookingStore();
const availableMasters = booking.data?.company?.masterServices.filter(item => item.serviceId === booking.data?.serviceId);
const isRandom = ref(false);
const onRandom = () => {
    isRandom.value = true;
    const randomIndex = Math.floor(Math.random() * availableMasters!.length);
    booking.setMasterId(availableMasters![randomIndex].masterId);
    booking.setTimes(undefined);
    booking.setDate(undefined);
    booking.setTime(undefined);
};
const getMaster = (masterId: number) => {
    return booking.data?.company?.masters.find(item => item.id === masterId)!;
}
const onMaster = (masterId: number) => {
    isRandom.value = false;
    booking.setMasterId(masterId);
    booking.setTimes(undefined);
    booking.setDate(undefined);
    booking.setTime(undefined);
}

// INIT
if (!booking.data?.masterId && availableMasters && availableMasters.length > 0) onRandom();
</script>

<style scoped></style>
