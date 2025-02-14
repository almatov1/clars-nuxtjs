<template>
  <div>
    <BlockHeaderComponent title="Записи" />
    <div class="flex flex-col gap-[16px]">
      <div class="flex gap-[8px]">
        <button v-for="(item, index) in statuses" :key="index" @click="() => onStatus(item.status)"
          :class="['font-medium rounded-[8px] h-[36px] items-center justify-center px-[24px]', companyOrderSearch.data?.status === item.status ? 'bg-blue-400 text-white-950' : 'bg-pale-400 text-black-500']">
          {{ item.label }}
        </button>
      </div>
      <div class="grid grid-cols-4 gap-[24px]">
        <div v-for="(item, index) in companyOrder.data" :key="index"
          class="border-[1px] border-pale-500 rounded-[8px] p-[12px] flex flex-col gap-[16px]">
          <div class="flex items-center justify-between">
            <div class="font-medium text-black-500">ЗАПИСЬ №{{ item.id }}</div>
            <div v-if="companyOrderSearch.data?.status === ORDER_STATUS.ACTIVE"
              class="rounded-full px-[8px] py-[4px] bg-orange-200 text-orange-400 text-[14px] font-medium">В ПРОЦЕССЕ
            </div>
            <div v-else-if="item.status === ORDER_STATUS.CANCELLED"
              class="rounded-full px-[8px] py-[4px] bg-red-200 text-red-400 text-[14px] font-medium">ОТМЕНЕН
            </div>
            <div v-else class="rounded-full px-[8px] py-[4px] bg-green-200 text-green-400 text-[14px] font-medium">
              ПОСЕЩЕН
            </div>
          </div>
          <div class="h-[1px] bg-pale-500"></div>
          <div class="bg-pale-400 p-[10px] rounded-[8px] flex flex-col gap-[10px]">
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Клиент</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">
                {{ item.client.forename }}{{ item.client.surname ? ` ${item.client.surname}` : '' }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Телефон</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">
                {{ item.client.telephone ? execTelephoneMask(item.client.telephone) : 'Нет' }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Услуга</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">{{ item.service.name }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Начало</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">{{ new Date(item.date).toLocaleString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'long'
              }) }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Длительность</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">1 час</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Цена</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">{{ execPriceMask(item.price.toString()) }}</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Специалист</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">{{ item.master.forename }} {{ item.master.surname }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[14px] text-black-500">Комментарий</div>
              <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
              <div class="text-[14px] text-black-400 flex-shrink-0">{{ item.note ?? 'Нет' }}</div>
            </div>
          </div>
          <ButtonComponent v-if="companyOrderSearch.data?.status === ORDER_STATUS.ACTIVE"
            :onClick="() => onCancel(item.id)" placeholder="Отменить заказ" bg="bg-black-400" text="text-white-950" />
        </div>
      </div>
      <LoadMoreComponent v-if="companyOrder.meta?.next" :onLoadMore="onLoadMore" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import LoadMoreComponent from '~/src/component/shared/LoadMoreComponent.vue';
import { ORDER_STATUS } from '~/src/core/config/shared';
import execPriceMask from '~/src/core/util/priceMask';
import execTelephoneMask from '~/src/core/util/telephoneMask';
import { CancelCompanyOrderService } from '~/src/module/companyOrder/service/CancelCompanyOrderService';
import { useCompanyOrderStore } from '~/src/module/companyOrder/store/companyOrder';
import { useCompanyOrderSearchStore } from '~/src/module/companyOrder/store/companyOrderSearch';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})

// INIT
const companyOrder = useCompanyOrderStore();
const companyOrderSearch = useCompanyOrderSearchStore();
if (!companyOrderSearch.data) companyOrderSearch.setStatus(ORDER_STATUS.ACTIVE);
if (!companyOrder.data) companyOrder.get();

// STATUS
const onStatus = (status: string) => {
  companyOrderSearch.reset();
  companyOrderSearch.setStatus(status);
  companyOrder.get();
}
const statuses = [
  { label: "Текущие", status: ORDER_STATUS.ACTIVE },
  { label: "История", status: ORDER_STATUS.CANCELLED }
];

// CANCEL
const onCancel = async (id: number) => { await CancelCompanyOrderService(id) }

// LOAD MORE
const onLoadMore = async () => {
  companyOrderSearch.setPage((companyOrderSearch.data?.page ?? 1) + 1);
  await companyOrder.get(true);
}
</script>

<style></style>