<template>
    <div class="relative">
        <img v-if="icon" :src="icon" class="absolute top-[7px] left-[12px]" />
        <select v-model="internalModel"
            :class="[height ? `h-[${height}px]` : 'h-[48px]', 'focus:ring-0 focus:outline-none border-0 rounded-[8px] w-full text-[16px] font-normal truncate appearance-none', text ? text : !internalModel ? 'text-black-400' : 'text-black-500', bg ?? 'bg-pale-400', border ? `border-[1px] ${border}` : '', px ? `px-[${px}px] pr-[36px]` : 'px-[16px] pr-[40px]', icon && 'pl-[36px]']">
            <option :value="undefined">
                {{ placeholder }}
            </option>
            <option v-for="(item, index) in elements" :key="index" :value="item">
                {{ isMaster ? `${item.forename} ${item.surname}` : item }}
            </option>
        </select>
        <ArrowDownIcon
            :class="['absolute -translate-y-1/2', height === 36 ? 'top-[16.5px]' : 'top-[22px]', px ? `right-[12px]` : 'right-[16px]']"
            :stroke="text ? MAIN_COLOR.BLUE : !internalModel ? MAIN_COLOR.LIGHT_BLACK : MAIN_COLOR.DARK_BLACK" />
    </div>
</template>

<script setup lang="ts">
import ArrowDownIcon from '~/src/core/assets/image/home/arrow-down.svg?component';
import { MAIN_COLOR } from '~/src/core/config/template';
const props = defineProps<{
    modelValue?: any;
    elements: any[];
    placeholder?: string;
    bg?: string;
    text?: string;
    border?: string;
    icon?: string;
    height?: number;
    px?: number;
    isMaster?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
const internalModel = ref(props.modelValue ?? undefined);

watch(internalModel, (newValue) => {
    emit('update:modelValue', newValue);
});
watch(() => props.modelValue, (newInit) => {
    internalModel.value = newInit;
});
</script>

<style scoped></style>