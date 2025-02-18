<template>
  <div>
    <div class="flex gap-[6px] pb-[24px] text-black-400">
      <button @click="$router.back()">Главная</button>
      <div>/</div>
      <button @click="$router.back()">{{ company?.category }}</button>
      <div>/</div>
      <div class="text-black-500 uppercase">{{ company?.name }}</div>
    </div>
    <div class="grid grid-cols-[1fr_411px] gap-[24px] items-start">
      <div class="flex flex-col gap-[32px]">
        <CompanyIntroComponent :company="company!" />
        <CompanyBlockComponent :company="company!" />
      </div>
      <div class=" sticky top-4">
        <CompanyInfoComponent :company="company!" />
      </div>
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