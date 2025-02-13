<template>
  <div>
    <div class="flex gap-[6px] pb-[24px]">
      <div class="text-black-400">Главная / {{ company?.category }} / </div>
      <div class="text-black-500 uppercase">{{ company?.name }}</div>
    </div>
    <div class="grid grid-cols-[1fr_1fr] gap-[24px] items-start">
      <div class="flex flex-col gap-[32px]">
        <CompanyIntroComponent :company="company!" />
        <CompanyBlockComponent :company="company!" />
      </div>
      <CompanyInfoComponent :company="company!" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DEFAULT_ROUTE } from '~/src/core/config/route';
import type { CompanyModel } from '~/src/module/company/model/CompanyModel';
import { GetCompanyService } from '~/src/module/catalog/service/GetCompanyService';
import CompanyInfoComponent from '~/src/component/company/CompanyInfoComponent.vue';
import CompanyIntroComponent from '~/src/component/company/CompanyIntroComponent.vue';
import CompanyBlockComponent from '~/src/component/company/CompanyBlockComponent.vue';
definePageMeta({
  layout: 'default',
})
const router = useRoute();
const companyId = router.params.id;
if (!companyId) await navigateTo(DEFAULT_ROUTE.HOME);
const company: CompanyModel | undefined = await GetCompanyService(Number(companyId)) as any;
if (!company) await navigateTo(DEFAULT_ROUTE.HOME);
</script>

<style></style>