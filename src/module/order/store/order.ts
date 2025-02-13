import { defineStore } from 'pinia'
import type { OrderState } from '../model/OrderModel';
import { useOrderSearchStore } from './orderSearch';
import { GetOrderService } from '../service/GetOrderService';

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    data: null,
    meta: null
  }),
  actions: {
    set(value: OrderState) {
      this.data = value.data;
      this.meta = value.meta;
    },
    cancelOrder(id: number) {
      if (!this.data) return;
      this.data = this.data.filter(item => item.id !== id);
    },
    reset() {
      this.data = null;
      this.meta = null;
    },
    async get(nextPage?: boolean) {
      const search = useOrderSearchStore();
      const orders = await GetOrderService(search.data ?? {});
      this.meta = orders.meta;

      if (nextPage && this.data) { this.data.push(...orders.data); }
      else { this.data = orders.data }
    }
  }
})