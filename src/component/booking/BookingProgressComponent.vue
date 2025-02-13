<template>
    <div class="flex justify-between items-center">
        <div class="flex flex-col items-center gap-[10px]">
            <div class="rounded-full h-[40px] w-[40px] flex items-center justify-center bg-blue-400">
                <img :src="MasterIcon" />
            </div>
            <div class="w-[115px] text-center">Выберите специалиста</div>
        </div>
        <div class="border-[1px] w-[100%] border-blue-400 mb-[55px]"></div>
        <div class="flex flex-col items-center gap-[10px]">
            <div
                :class="['rounded-full h-[40px] w-[40px] flex items-center justify-center', stage !== stages[0] ? 'bg-blue-400' : 'bg-pale-500']">
                <img :src="DateIcon" />
            </div>
            <div class="w-[115px] text-center">Выберите дату и времяа</div>
        </div>
        <div :class="['border-[1px] w-[100%] mb-[55px]', stage === stages[0] ? 'border-pale-500' : 'border-blue-500']">
        </div>
        <div class="flex flex-col items-center gap-[10px]">
            <div
                :class="['rounded-full h-[40px] w-[40px] flex items-center justify-center', stage === stages[2] ? 'bg-blue-400' : 'bg-pale-500']">
                <img :src="ConfirmIcon" />
            </div>
            <div class="w-[115px] text-center">Введите данные</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MasterIcon from '~/src/core/assets/image/booking/master.svg?inline';
import DateIcon from '~/src/core/assets/image/booking/date.svg?inline';
import ConfirmIcon from '~/src/core/assets/image/booking/confirm.svg?inline';
defineProps<{
    stages: string[];
    stage: string;
}>();
</script>

<style scoped></style>