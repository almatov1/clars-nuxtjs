<template>
    <div class="flex flex-col gap-[16px]">
        <div class="text-black-500 font-medium text-[32px]">3. Введите данные</div>
        <div class="grid grid-cols-2 gap-[16px]">
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Имя</div>
                <InputComponent class="mb-[12px]" placeholder="Введите имя" capitalize required />
            </div>
            <div class="flex flex-col gap-[12px]">
                <div class="text-black-500">Телефон</div>
                <InputComponent class="mb-[12px]" placeholder="Введите номер телефона" telephone required />
            </div>
        </div>
        <div class="flex flex-col gap-[12px]">
            <div class="text-black-500">Комментарий</div>
            <TextareaComponent class="mb-[12px]" placeholder="Оставьте свои комментарий" required />
        </div>
    </div>
</template>

<script setup lang="ts">
import InputComponent from '../shared/InputComponent.vue';
import TextareaComponent from '../shared/TextareaComponent.vue';
</script>

<style scoped></style>