import { defineStore } from 'pinia'
import type { CertificateModel, CertificateState } from '../model/CertificateModel';

export const useCertificateStore = defineStore('certificate', {
  state: (): CertificateState => ({
    data: null,
  }),
  actions: {
    set(value: CertificateModel[]) {
      this.data = value;
    },
    reset() {
      this.data = null;
    }
  }
})