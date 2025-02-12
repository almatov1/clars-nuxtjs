import { defineStore } from 'pinia'
import type { CompanyModel, CompanyState } from '../model/CompanyModel';
export const useCompanyStore = defineStore('company', {
    state: (): CompanyState => ({
        data: null,
    }),
    actions: {
        set(value: CompanyModel) {
            this.data = value;
        },
        reset() {
            this.data = null;
        }
    }
})
