<template>
  <div>
    <div class="text-[32px] font-medium pb-[16px]">Мой кабинет</div>
    <div class="grid grid-cols-4 gap-[16px]">
      <NuxtLink v-for="(item, index) in items" :key="index" :to="item.href"
        class="rounded-[8px] border-pale-500 border-[1px] p-[16px] flex items-center">
        <img v-if="item.icon" :src="`${STORAGE}/${company.data?.picture}`" width="40" class="rounded-full mr-[12px]" />
        <div class="flex flex-col items-start">
          <div class="text-[18px] font-medium text-black-500">{{ item.title }}</div>
          <div class="text-[14px] font-normal text-black-400">{{ item.value }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCompanyStore } from '~/src/module/company/store/company';
import { STORAGE } from "~/src/core/config/shared"
import { COMPANY_ROUTE } from '~/src/core/config/route';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
const company = useCompanyStore();
const items = [
  { title: company.data?.name, value: company.data?.description, icon: true, href: COMPANY_ROUTE.DATA },
  { title: "Записи", value: 'Текущие / История', icon: false, href: COMPANY_ROUTE.ORDER },
  { title: "Статистика", value: 'Статистика бизнеса', icon: false, href: COMPANY_ROUTE.STATISTICS },
  { title: "Услуги", value: `Доступно: ${company.data?.services.length}`, icon: false, href: COMPANY_ROUTE.SERVICE },
  { title: "Специалисты", value: `Доступно: ${company.data?.masters.length}`, icon: false, href: COMPANY_ROUTE.MASTER },
  { title: "Сертификат", value: 'Подарите сертификат клиенту', icon: false, href: COMPANY_ROUTE.CERTIFICATE }
];
</script>

<style></style>