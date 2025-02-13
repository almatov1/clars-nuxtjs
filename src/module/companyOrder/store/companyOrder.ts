import { defineStore } from 'pinia'
import type { OrderState } from '../../order/model/OrderModel';
import { useCompanyOrderSearchStore } from './companyOrderSearch';
import { GetCompanyOrderService } from '../service/GetCompanyOrderService';

export const useCompanyOrderStore = defineStore('companyOrder', {
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
      const search = useCompanyOrderSearchStore();
      const orders = await GetCompanyOrderService(search.data ?? {});
      this.meta = orders.meta;

      if (nextPage && this.data) { this.data.push(...orders.data); }
      else { this.data = orders.data }
    }
  }
})