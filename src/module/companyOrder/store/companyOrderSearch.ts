import { defineStore } from 'pinia';
import type { GetOrderState } from '../../order/model/GetOrderModel';

export const useCompanyOrderSearchStore = defineStore('companyOrderSearch', {
  state: (): GetOrderState => ({
    data: null
  }),
  actions: {
    setPage(page: number) {
      if (!this.data) { this.data = { page } }
      else { this.data.page = page }
    },
    setStatus(status: string) {
      if (!this.data) { this.data = { status } }
      else { this.data.status = status }
    },
    reset() { this.data = null }
  }
})
