<template>
    <div>
        <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" :maxlength="maxlength" :required="required"
            class="border-none focus:ring-0 focus:outline-none p-[12px] rounded-[8px] bg-pale-400 w-full text-[16px] font-normal placeholder-black-400 text-black-500"
            rows="5" autocapitalize="sentences">
       </textarea>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: { type: String },
        required: { type: Boolean },
        modelValue: { type: String },
        maxlength: { type: Number, default: 5000 }
    }
}
</script>

<style scoped></style>