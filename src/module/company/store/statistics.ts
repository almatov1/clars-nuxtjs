import { defineStore } from 'pinia'
import type { StatisticsModel, StatisticsState } from '../model/StatisticsModel';

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsState => ({
    data: null,
  }),
  actions: {
    set(value: StatisticsModel | null) {
      this.data = value;
    },
    reset() {
      this.data = null;
    }
  }
})
