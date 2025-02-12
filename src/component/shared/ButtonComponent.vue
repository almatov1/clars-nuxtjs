<template>
    <div>
        <button :type="props.type ?? 'button'" @click="handleClick"
            :class="['w-full text-[16px] font-medium rounded-[8px] flex justify-center items-center', bg ?? 'bg-blue-400', text ?? 'text-white-950', borderColor ? `${borderColor} border-[1px] py-[11px]` : 'py-[12px]', padding && 'px-[16px]']">
            <div v-if="component" class="pr-[8px]">
                <slot></slot>
            </div>
            {{ props.placeholder }}
            <div v-if="icon"><img :src="icon" class="ml-[16px]"></div>
        </button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    placeholder: string
    onClick?: () => void;
    component?: boolean;
    icon?: string;
    type?: "button" | "submit" | "reset" | undefined,
    bg?: string;
    text?: string;
    borderColor?: string;
    padding?: boolean;
}>();
const handleClick = () => { if (props.onClick) props.onClick(); };
</script>

<style scoped></style>