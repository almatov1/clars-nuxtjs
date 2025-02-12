import { defineStore } from 'pinia'
import type { CatalogState } from '../model/CatalogModel';
import { useCatalogSearchStore } from './catalogSearch';
import { GetCatalogService } from '../service/GetCatalogService';

export const useCatalogStore = defineStore('catalog', {
  state: (): CatalogState => ({
    data: null,
    meta: null
  }),
  actions: {
    set(value: CatalogState) {
      this.data = value.data;
      this.meta = value.meta;
    },
    reset() {
      this.data = null;
      this.meta = null;
    },
    async get(nextPage?: boolean) {
      const search = useCatalogSearchStore();
      const catalog = await GetCatalogService(search.data ?? {});
      this.meta = catalog.meta;

      if (nextPage && this.data) { this.data.push(...catalog.data); }
      else { this.data = catalog.data }
    }
  }
})