<template>
    <div class="relative">
        <select v-model="internalModel"
            :class="['focus:ring-0 focus:outline-none border-0 rounded-[8px] px-[16px] bg-pale-400 w-full h-[48px] text-[16px] font-normal truncate appearance-none', !internalModel ? 'text-black-400' : 'text-black-500']">
            <option :value="null">
                {{ placeholder }}
            </option>
            <option v-for="(item, index) in elements" :key="index" :value="item">
                {{ item }}
            </option>
        </select>
        <div
            :class="['absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none text-[10px]', !internalModel ? 'text-black-400' : 'text-black-500']">
            ▼
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue?: any;
    elements: any[];
    placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);
const internalModel = ref(props.modelValue ?? null);

watch(internalModel, (newValue) => {
    emit('update:modelValue', newValue);
});
watch(() => props.modelValue, (newInit) => {
    internalModel.value = newInit;
});
</script>

<style scoped></style>