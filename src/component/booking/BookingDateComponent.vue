<template>
    <div class="flex flex-col gap-[16px]">
        <div class="text-black-500 font-medium text-[32px]">2. Выберите дату и время</div>
        <div class="grid grid-cols-[396px_1fr] gap-[24px] items-start">
            <div class="p-[24px] rounded-[8px] border-[1px] border-pale-500">
                <div class="flex justify-between items-center">
                    <button @click="prevMonth">
                        <img :src="ArrowLeft" />
                    </button>
                    <div class="text-[20px] font-medium text-black-500">
                        {{ capitalize(monthName) }} {{ currentYear }}
                    </div>
                    <button @click="nextMonth">
                        <img :src="ArrowRight" />
                    </button>
                </div>
                <div class="pt-[24px] grid grid-cols-7 gap-[16px]">
                    <div v-for="day in weekDays" :key="day" class="text-black-500 font-medium text-center">
                        {{ day }}
                    </div>
                    <div v-for="n in firstDayOffset" :key="n"></div>
                    <button v-for="day in daysInMonth" :key="day"
                        @click="() => isPastDate(formatDate(currentYear, currentMonth, day)) ? null : selectDate(formatDate(currentYear, currentMonth, day))"
                        :class="['rounded-[8px] h-[36px]', selectedDay === day
                            ? 'text-white-950 bg-blue-400'
                            : isPastDate(formatDate(currentYear, currentMonth, day))
                                ? 'bg-pale-200 text-black-200 cursor-not-allowed'
                                : 'bg-pale-400 text-black-500']"
                        :disabled="isPastDate(formatDate(currentYear, currentMonth, day))">
                        {{ day }}
                    </button>
                </div>
            </div>
            <div class="rounded-[8px] border-[1px] border-pale-500 p-[24px] flex flex-col gap-[24px]">
                <div class="text-[20px] font-medium text-black-500 text-center">Выберите время</div>
                <div v-if="booking.data?.times === undefined" class="">
                    Свободные окошки не найдены
                </div>
                <div v-else class="grid grid-cols-4 gap-[16px]">
                    <button v-for="(item, index) in booking.data.times" :key="index"
                        @click="() => booking.setTime(item)"
                        :class="['h-[36px] rounded-[8px] flex items-center justify-center', item === booking.data?.time ? 'bg-blue-400 text-white-950' : 'bg-pale-400 text-black-500']">
                        {{ item }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRight from '~/src/core/assets/image/booking/arrow-right.svg?inline';
import ArrowLeft from '~/src/core/assets/image/booking/arrow-left.svg?inline';
import { capitalize } from 'vue';
import { useBookingStore } from '~/src/module/booking/store/booking';
import { GetTimesService } from '~/src/module/booking/service/GetTimesService';

// DEFINE
const booking = useBookingStore();

// CALENDAR
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});
const firstDayOffset = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
});
const monthName = computed(() => {
    return new Date(currentYear.value, currentMonth.value).toLocaleString("ru-RU", { month: "long" });
});
const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }

    selectedDay.value = null;
    booking.setTimes(undefined);
    booking.setDate(undefined);
    booking.setTime(undefined);
};
const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }

    selectedDay.value = null;
    booking.setTimes(undefined);
    booking.setDate(undefined);
    booking.setTime(undefined);
};
const formatDate = (year: number, month: number, day: number): Date => {
    return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
};

// SELECT
const selectedDay = ref<number | null>(booking.data?.date ? booking.data.date.getDate() : null);
const isPastDate = (date: Date): boolean => {
    const now = new Date();
    const selectedDate = new Date(date);
    return selectedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())
};
const selectDate = async (date: Date) => {
    booking.setDate(date);
    const result = await GetTimesService(booking.data?.company?.id!, booking.data?.masterId!, booking.data?.date!);
    if (result) {
        booking.setTimes(result);
        selectedDay.value = date.getDate();
        booking.setTime(undefined);
    }
    else {
        booking.setTimes(undefined);
        booking.setDate(undefined);
        booking.setTime(undefined);
        selectedDay.value = null;
    }
};
</script>

<style scoped></style>