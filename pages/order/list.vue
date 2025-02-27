<template>
  <div class="flex flex-col gap-[16px]">
    <div class="text-[32px] font-medium text-black-500">Мои записи</div>
    <div class="flex gap-[8px]">
      <button v-for="(item, index) in statuses" :key="index" @click="() => onStatus(item.status)"
        :class="['font-medium rounded-[8px] h-[36px] items-center justify-center px-[24px]', orderSearch.data?.status === item.status ? 'bg-blue-400 text-white-950' : 'bg-pale-400 text-black-500']">
        {{ item.label }}
      </button>
    </div>
    <div class="grid grid-cols-4 gap-[24px]">
      <div v-for="(item, index) in order.data" :key="index"
        class="border-[1px] border-pale-500 rounded-[8px] p-[12px] flex flex-col gap-[16px]">
        <div class="flex items-center justify-between">
          <div class="font-medium text-black-500">ЗАПИСЬ №{{ item.id }}</div>
          <div v-if="orderSearch.data?.status === ORDER_STATUS.ACTIVE"
            class="rounded-full px-[8px] py-[4px] bg-orange-200 text-orange-400 text-[14px] font-medium">В ПРОЦЕССЕ
          </div>
          <div v-else-if="item.status === ORDER_STATUS.CANCELLED"
            class="rounded-full px-[8px] py-[4px] bg-red-200 text-red-400 text-[14px] font-medium">ОТМЕНЕН
          </div>
          <div v-else class="rounded-full px-[8px] py-[4px] bg-green-200 text-green-400 text-[14px] font-medium">ПОСЕЩЕН
          </div>
        </div>
        <div class="h-[1px] bg-pale-500"></div>
        <div class="bg-pale-400 p-[10px] rounded-[8px] flex flex-col gap-[10px]">
          <div class="flex items-center justify-between">
            <div class="text-[14px] text-black-500">Салон</div>
            <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
            <div class="text-[14px] text-black-400 flex-shrink-0 max-w-[160px]">{{ item.company.name }}</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-[14px] text-black-500">Услуга</div>
            <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
            <div class="text-[14px] text-black-400 flex-shrink-0 max-w-[160px]">{{ item.service.name }}</div>
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
            <div class="text-[14px] text-black-400 flex-shrink-0 max-w-[160px]">{{ item.master.forename }} {{
              item.master.surname }}
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-[14px] text-black-500">Адрес</div>
            <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
            <div class="text-[14px] text-black-400 flex-shrink-0 max-w-[160px]">{{ item.company.address }}</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-[14px] text-black-500">Комментарий</div>
            <div class="border-b-[1px] w-full mx-[8px] border-black-400 border-dashed"></div>
            <div class="text-[14px] text-black-400 flex-shrink-0 max-w-[160px]">{{ item.note ?? 'Нет' }}</div>
          </div>
        </div>
        <ButtonComponent v-if="orderSearch.data?.status === ORDER_STATUS.ACTIVE" :onClick="() => onCancel(item.id)"
          placeholder="Отменить заказ" bg="bg-black-400" text="text-white-950" />
      </div>
    </div>
    <LoadMoreComponent v-if="order.meta?.next" :onLoadMore="onLoadMore" />
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import LoadMoreComponent from '~/src/component/shared/LoadMoreComponent.vue';
import { ORDER_STATUS } from '~/src/core/config/shared';
import execPriceMask from '~/src/core/util/priceMask';
import { useOrderStore } from '~/src/module/order/store/order';
import { useOrderSearchStore } from '~/src/module/order/store/orderSearch';
import { CancelOrderService } from '~/src/module/order/service/CancelOrderService';

definePageMeta({
  layout: 'default',
  middleware: ['private']
})

// INIT
const order = useOrderStore();
const orderSearch = useOrderSearchStore();
if (!orderSearch.data) orderSearch.setStatus(ORDER_STATUS.ACTIVE);
if (!order.data) order.get();

// STATUS
const onStatus = (status: string) => {
  orderSearch.reset();
  orderSearch.setStatus(status);
  order.get();
}
const statuses = [
  { label: "Текущие", status: ORDER_STATUS.ACTIVE },
  { label: "История", status: ORDER_STATUS.CANCELLED }
];

// CANCEL
const onCancel = async (id: number) => { await CancelOrderService(id) }

// LOAD MORE
const onLoadMore = async () => {
  orderSearch.setPage((orderSearch.data?.page ?? 1) + 1);
  await order.get(true);
}
</script>

<style></style>