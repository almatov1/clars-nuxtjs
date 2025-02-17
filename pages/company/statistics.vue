<template>
  <div>
    <BlockHeaderComponent title="Статистика" />
    <div class="flex flex-col gap-[16px]">
      <div class="grid grid-cols-2 gap-[16px]">
        <div v-for="(item, index) in finance" :key="index"
          class="rounded-[8px] border-[1px] border-pale-500 p-[12px] flex justify-between">
          <div class="flex items-center gap-[12px]">
            <img :src="item.icon" width="48" />
            <div class="text-black-500">{{ item.label }}</div>
          </div>
          <div :class="['text-[32px] font-medium', item.text]">{{ item.value }}</div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-[16px]">
        <div v-for="(item, index) in count" :key="index" class="rounded-[8px] border-[1px] border-pale-500 p-[12px]">
          <div class="text-black-500">{{ item.label }}</div>
          <div class="text-black-500 text-[32px] font-medium">{{ item.value }}</div>
        </div>
      </div>
      <ClientOnly>
        <div class="rounded-[8px] border-[1px] border-pale-500 p-[12px] flex flex-col gap-[24px]">
          <div class="text-black-500">Записи</div>
          <VueApexCharts type="line" height="350" :options="chartOptions" :series="series"
            class="w-[calc(100%_-_20px)]" />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
import { useStatisticsStore } from '~/src/module/company/store/statistics';
import ProfitIcon from '~/src/core/assets/image/statistics/profit.svg?inline';
import LossIcon from '~/src/core/assets/image/statistics/loss.svg?inline';
import execPriceMask from '~/src/core/util/priceMask';
import { useCompanyStore } from '~/src/module/company/store/company';
import VueApexCharts from "vue3-apexcharts";
import { MAIN_COLOR } from '~/src/core/config/template';

// DEFINE
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const company = useCompanyStore();
const statistics = useStatisticsStore();

// DATA
const finance = [
  { icon: ProfitIcon, label: 'Заработано', value: execPriceMask((statistics.data?.profit ?? 0).toString()), text: 'text-blue-400' },
  { icon: LossIcon, label: 'Отменено', value: execPriceMask((statistics.data?.loss ?? 0).toString()), text: 'text-red-400' }
];
const count = [
  { label: 'Количество клиентов', value: statistics.data?.clients ?? 0 },
  { label: 'Количество специалистов', value: company.data?.masters.length },
  { label: 'Количество услуг', value: company.data?.services.length }
];

// CHART
const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const chartData = computed(() => statistics.data?.chart ?? []);
const chartOptions = computed(() => ({
  chart: {
    type: "line",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: MAIN_COLOR.PALE
  },
  stroke: { width: 2 },
  xaxis: {
    categories: months,
    labels: { style: { colors: MAIN_COLOR.LIGHT_BLACK, fontSize: "14px" } },
    axisborder: { show: false },
    axisticks: { show: false }
  },
  grid: { show: false },
  yaxis: {
    labels: { style: { colors: MAIN_COLOR.LIGHT_BLACK, fontSize: "14px" } },
    axisborder: { show: false }
  },
  colors: [MAIN_COLOR.BLUE]
}));

const series = computed(() => [
  {
    name: "Записи",
    data: months.map((_, index) => chartData.value.find(d => d.month === index + 1)?.count || 0)
  }
]);
</script>

<style>
.apexcharts-canvas {
  border-radius: 8px;
  overflow: hidden;
}
</style>