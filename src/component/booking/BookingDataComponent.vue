<template>
    <div class="flex flex-col gap-[16px]">
        <div class="text-black-500 font-medium text-[32px]">3. Введите данные</div>
        <div class="flex gap-[16px]">
            <div class="flex flex-col gap-[12px] w-full">
                <div class="text-black-500">Имя</div>
                <InputComponent class="mb-[12px]" v-model="fields.name" placeholder="Введите имя" disabled />
            </div>
            <div v-if="fields.telehone.length > 0" class="flex flex-col gap-[12px] w-full">
                <div class="text-black-500">Телефон</div>
                <InputComponent class="mb-[12px]" v-model="fields.telehone" placeholder="Введите номер телефона"
                    disabled />
            </div>
        </div>
        <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Комментарий</div>
            <TextareaComponent class="mb-[12px]" placeholder="Оставьте свои комментарий" required
                v-model.trim="fields.note" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/src/module/user/store/user';
import InputComponent from '../shared/InputComponent.vue';
import TextareaComponent from '../shared/TextareaComponent.vue';
import { useBookingStore } from '~/src/module/booking/store/booking';
import execTelephoneMask from '~/src/core/util/telephoneMask';
const booking = useBookingStore();
const user = useUserStore();
const fields = reactive({
    name: user.data?.forename ?? '',
    telehone: user.data?.telephone ? execTelephoneMask(user.data.telephone) : '',
    note: ''
});
watch(() => fields.note, (note) => { booking.setNote(note) });
</script>

<style scoped></style>