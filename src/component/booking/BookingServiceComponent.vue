<template>
    <div class="bg-pale-400 rounded-[8px] px-[16px] py-[20px]">
        <div class="flex justify-between items-start">
            <div class="flex flex-col items-start gap-[8px]">
                <div class="text-black-500 font-medium">{{ service.name }} / {{ booking.data?.certificate
                    ? execPriceMask((
                        service.price - (service.price * (booking.data.certificate.procent / 100))
                    ).toString())
                    : execPriceMask(service.price.toString())
                    }}
                </div>
                <div class="text-black-400">1 час</div>
            </div>
            <button @click="() => navigateTo(`${COMPANY_ROUTE.COMPANY}${booking.data?.company?.id}`)">
                <img :src="BackIcon" />
            </button>
        </div>
        <button v-if="certificate.data?.filter(c => c.companyId === booking.data?.company?.id)?.length ?? 0 > 0"
            @click="() => vfm.open(modalController)"
            class="mt-[16px] h-[36px] bg-blue-400 text-white-950 font-medium rounded-[8px] flex items-center justify-center px-[24px]">
            Использовать сертификат?
        </button>
        <ModalComponent :modal-id="modalController" @on-hide="() => vfm.close(modalController)"
            title="Выберите сертификат">
            <div class="flex flex-col gap-[24px]">
                <div>После выбор нужного сертификата будет применен сертификат с указанной скидкой к общей стоимости!
                    Нажмите на нужный сертификат если согласны</div>
                <div class="grid grid-cols-2 gap-[12px]">
                    <button
                        v-for="(item, index) in certificate.data?.filter(c => c.companyId === booking.data?.company?.id)"
                        :key="index" @click="() => booking.setCertificate(item)"
                        :class="['rounded-[8px] p-[16px] flex justify-between items-center', booking.data?.certificate?.id === item.id ? 'bg-blue-400 text-white-950' : 'bg-pale-400 text-black-500']">
                        <div class="font-medium">Сертификат</div>
                        <div class="text-[32px] font-bold">{{ item.procent }}%</div>
                    </button>
                </div>
                <div class="flex justify-end">
                    <ButtonComponent class="w-[102px]" placeholder="Выбрать"
                        :onClick="() => vfm.close(modalController)" />
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script setup lang="ts">
import { useVfm } from 'vue-final-modal';
import BackIcon from '~/src/core/assets/image/booking/back.svg?inline';
import { COMPANY_ROUTE } from '~/src/core/config/route';
import execPriceMask from '~/src/core/util/priceMask';
import { useCertificateStore } from '~/src/module/certificate/store/certificate';
import ModalComponent from '../shared/ModalComponent.vue';
import { useBookingStore } from '~/src/module/booking/store/booking';
import ButtonComponent from '../shared/ButtonComponent.vue';
const booking = useBookingStore();
const service = booking.data?.company?.services.find(item => item.id === booking.data?.serviceId)!;

// CERTIFICATE
const certificate = useCertificateStore();
const vfm = useVfm();
const modalController = Symbol('certificateListModal');
</script>

<style scoped></style>