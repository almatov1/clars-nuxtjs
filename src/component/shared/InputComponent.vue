<template>
    <div class="relative">
        <div v-if="icon" class="absolute inset-y-0 start-0 flex items-center ps-[16px] pointer-events-none">
            <img :src="icon" alt="input icon" />
        </div>
        <input v-model="localValue" :type="type ?? 'text'" :placeholder="placeholder" :inputmode="inputmode"
            :pattern="pattern" :minlength="minlength" :maxlength="maxlength" :disabled="disabled"
            :class="['block w-full py-[12px] px-[16px] text-[16px] font-normal placeholder-black-400 text-black-500 border-none focus:ring-0 focus:outline-none border-0 bg-pale-400 rounded-[8px]', icon ? 'ps-[44px]' : '', disabled && 'cursor-not-allowed']"
            :autocapitalize="capitalize ? 'sentences' : 'none'" :required="required" />
        <div v-if="note" class="absolute z-10 top-[12px] right-[20px]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        inputmode: { type: String },
        type: { type: String },
        icon: { type: String },
        placeholder: { type: String },
        required: { type: Boolean },
        disabled: { type: Boolean },
        modelValue: { type: String },
        capitalize: { type: Boolean },
        pattern: { type: String },
        currency: { type: Boolean },
        telephone: { type: Boolean },
        number: { type: Boolean },
        minlength: { type: Number, default: 1 },
        maxlength: { type: Number, default: 2000 },
        note: { type: Boolean }
    },
    data() {
        return {
            localValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newValue) {
            this.localValue = newValue;
        },
        localValue(newValue) {
            let processedValue = newValue;

            if (this.telephone) { processedValue = execTelephoneMask(newValue) }
            if (this.capitalize) { processedValue = execCapitalize(newValue) }
            if (this.currency) { processedValue = execPriceMask(newValue.toString(), false) }
            if (this.number) { processedValue = execNumberMask(newValue.toString()) }

            this.$emit('update:modelValue', processedValue);
            this.localValue = processedValue;
        }
    }
}
</script>

<script setup>
import { execCapitalize } from '~/src/core/util/capitalize';
import execPriceMask from '~/src/core/util/priceMask';
import execNumberMask from '~/src/core/util/numberMask';
import execTelephoneMask from '~/src/core/util/telephoneMask';
</script>