import { defineStore } from 'pinia';
import type { GetOrderState } from '../../order/model/GetOrderModel';

export const useCompanyOrderSearchStore = defineStore('companyOrderSearch', {
  state: (): GetOrderState => ({
    data: null
  }),
  actions: {
    setPage(page: number | undefined) {
      if (!this.data) { this.data = { page } }
      else { this.data.page = page }
    },
    setStatus(status: string | undefined) {
      if (!this.data) { this.data = { status } }
      else { this.data.status = status }
    },
    setMasterId(masterId: number | undefined) {
      if (!this.data) { this.data = { masterId } }
      else { this.data.masterId = masterId }
    },
    reset() { this.data = null }
  }
})
