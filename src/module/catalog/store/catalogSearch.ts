import { defineStore } from 'pinia';
import type { GetCatalogState } from '../model/GetCatalogModel';

export const useCatalogSearchStore = defineStore('catalogSearch', {
  state: (): GetCatalogState => ({
    data: null
  }),
  actions: {
    setPage(page: number | undefined) {
      if (!this.data) { this.data = { page } }
      else { this.data.page = page }
    },
    setCategory(category: string | undefined) {
      if (!this.data) { this.data = { category } }
      else { this.data.category = category }
    },
    setRegion(region: string | undefined) {
      if (!this.data) { this.data = { region } }
      else { this.data.region = region }
    },
    setOrderBy(orderBy: string | undefined) {
      if (!this.data) { this.data = { orderBy } }
      else { this.data.orderBy = orderBy }
    },
    reset() { this.data = null }
  }
})
