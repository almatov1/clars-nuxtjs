<template>
    <div class="grid grid-cols-2 gap-[16px]">
        <ButtonComponent :onClick="() => $router.back()" placeholder="Назад" bg="bg-pale-400" text="text-blue-400" />
        <ButtonComponent :onClick="onNext" placeholder="Далее" />
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/src/module/booking/store/booking';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { ORDER_ROUTE } from '~/src/core/config/route';
const props = defineProps<{
    stages: string[];
    stage: string;
    endStage: string;
}>();
const booking = useBookingStore();
const onNext = () => {
    switch (props.stage) {
        case props.stages[0]:
            if (!booking.data?.masterId) {
                push.error("Выберите специалиста")
                return;
            }

            navigateTo(`${ORDER_ROUTE.BOOKING}?stage=${props.stages[1]}`)
            return;
        case props.stages[1]:
            if (!booking.data?.date || !booking.data.time) {
                push.error("Выберите время записи")
                return;
            }

            navigateTo(`${ORDER_ROUTE.BOOKING}?stage=${props.stages[2]}`)
            return;
        default:
            navigateTo(`${ORDER_ROUTE.BOOKING}?stage=${props.endStage}`)
            return;
    }
}
</script>

<style scoped></style>