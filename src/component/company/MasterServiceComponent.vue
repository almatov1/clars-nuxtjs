<template>
    <ModalComponent :modal-id="props.controller" @on-hide="props.onHide" title="Добавить услугу">
        <div class="flex flex-col gap-[24px]">
            <div class="flex flex-wrap gap-[8px]">
                <button v-for="(item, index) in company.data?.services" :key="index"
                    @click="() => toggleService(item.id)"
                    :class="['px-[24px] h-[36px] rounded-[8px]', serviceIds.includes(item.id) ? 'bg-blue-400 text-white-950' : 'text-black-500 border-pale-500 border-[1px]']">
                    {{ item.name }}
                </button>
            </div>
            <div class="flex justify-end">
                <ButtonComponent class="w-[102px]" placeholder="Сохранить"
                    :onClick="() => onMasterServicesSave(serviceIds)" />
            </div>
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '../shared/ModalComponent.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { useCompanyStore } from '~/src/module/company/store/company';
const props = defineProps<{
    controller: any;
    onHide: () => void;
    onMasterServicesSave: (serviceIds: number[]) => void;
}>();
const company = useCompanyStore();
const serviceIds = ref<number[]>([]);
const toggleService = (id: number) => {
    const index = serviceIds.value.indexOf(id);
    if (index !== -1) serviceIds.value.splice(index, 1);
    else serviceIds.value.push(id);
}
</script>

<style scoped></style>