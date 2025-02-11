<template>
    <div>
        <button :type="'button'" @click="handleClick" class="text-blue-400 font-normal text-[16px]">
            {{ props.placeholder }}
        </button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    placeholder: string
    onClick?: () => void;
}>();
const handleClick = () => { if (props.onClick) props.onClick(); };
</script>

<style scoped></style>