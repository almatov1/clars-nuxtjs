import { defineStore } from 'pinia';
import type { BookingState } from '../model/BookingModel';
import type { CompanyModel } from '../../company/model/CompanyModel';
import type { CertificateModel } from '../../certificate/model/CertificateModel';

export const useBookingStore = defineStore('booking', {
  state: (): BookingState => ({
    data: null
  }),
  actions: {
    setCompany(company: CompanyModel) {
      if (!this.data) { this.data = { company } }
      else { this.data.company = company }
    },
    setServiceId(serviceId: number) {
      if (!this.data) { this.data = { serviceId } }
      else { this.data.serviceId = serviceId }
    },
    setMasterId(masterId: number) {
      if (!this.data) { this.data = { masterId } }
      else { this.data.masterId = masterId }
    },
    setDate(date: Date | undefined) {
      if (!this.data) { this.data = { date } }
      else { this.data.date = date }
    },
    setTimes(times: string[] | undefined) {
      if (!this.data) { this.data = { times } }
      else { this.data.times = times }
    },
    setTime(time: string | undefined) {
      if (!this.data) { this.data = { time } }
      else { this.data.time = time }
    },
    setNote(note: string | undefined) {
      if (!this.data) { this.data = { note } }
      else { this.data.note = note }
    },
    setCertificate(certificate: CertificateModel) {
      if (!this.data) { this.data = { certificate } }
      else { this.data.certificate = certificate }
    },
    reset() { this.data = null }
  }
})
