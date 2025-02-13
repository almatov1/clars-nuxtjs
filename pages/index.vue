<template>
  <div>
    <div class="flex flex-wrap gap-[12px]">
      <ButtonComponent v-for="(item, index) in CATEGORIES" :key="index" :onClick="() => {
        if (item === category) category = undefined;
        else category = item;
      }" :placeholder="item" padding component :bg="category === item ? 'bg-blue-400' : 'bg-pale-400'"
        :text="category === item ? 'text-white-950' : 'text-black-500'">
        <component :is="icons[index]" />
      </ButtonComponent>
    </div>
    <div class="pt-[24px] pb-[16px] text-[32px] font-medium text-black-500">{{ category ?? 'Все категории' }}</div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-[12px]">
        <SelectComponent v-model="orderBy" :elements="ORDER_BY_LIST" placeholder="Сортировать по" :height="36"
          bg="bg-pale-400" text="text-blue-400" :icon="SortIcon" :px="12" />
        <div class="mx-[12px] h-[36px] bg-pale-500 w-[1px]"></div>
        <SelectComponent v-model="region" :elements="REGIONS" placeholder="Выберите регион" :height="36"
          :border="'border-pale-500'" bg="bg-white-400" :px="12" />
        <SelectComponent v-model="category" :elements="CATEGORIES" placeholder="Категория" :height="36"
          :border="'border-pale-500'" bg="bg-white-400" :px="12" />
      </div>
      <div class="text-black-500">Всего: {{ (catalog.meta?.total ?? 0).toString() }}</div>
    </div>
    <div class="grid grid-cols-4 gap-[24px] my-[24px]">
      <button @click="() => navigateTo(`${COMPANY_ROUTE.COMPANY}${item.id}`)" v-for="(item, index) in catalog.data"
        :key="index" class="flex flex-col items-start">
        <div :style="{ backgroundImage: `url(${STORAGE}/${item.intros[0].picture})` }"
          class="w-[100%] aspect-square rounded-[8px] bg-cover bg-center"></div>
        <div class="pt-[12px] uppercase font-medium text-black-500">{{ item.name }}</div>
        <div class="text-[14px] text-black-400">{{ item.address }}</div>
      </button>
    </div>
    <LoadMoreComponent v-if="catalog.meta?.next" :onLoadMore="onLoadMore" />
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from '~/src/component/shared/ButtonComponent.vue';
import { CATEGORIES, ORDER_BY_LIST, REGIONS, STORAGE } from '~/src/core/config/shared';
import HairbrushIcon from '~/src/core/assets/image/category/hairbrush.svg?component';
import BrushIcon from '~/src/core/assets/image/category/brush.svg?component';
import { useCatalogSearchStore } from '~/src/module/catalog/store/catalogSearch';
import { useCatalogStore } from '~/src/module/catalog/store/catalog';
import SelectComponent from '~/src/component/shared/SelectComponent.vue';
import SortIcon from '~/src/core/assets/image/home/sort.svg?inline';
import { COMPANY_ROUTE } from '~/src/core/config/route';
import LoadMoreComponent from '~/src/component/shared/LoadMoreComponent.vue';
definePageMeta({
  layout: 'default'
})

// INIT
const catalog = useCatalogStore();
const catalogSearch = useCatalogSearchStore();
if (!catalog.data) {
  catalogSearch.setOrderBy(ORDER_BY_LIST[0]);
  catalog.get();
}

// DATA
const category = ref<string | undefined>(catalogSearch.data?.category);
watch(() => category.value, (value) => {
  catalogSearch.setCategory(value);
  catalog.get();
});
const region = ref<string | undefined>(catalogSearch.data?.region);
watch(() => region.value, (value) => {
  catalogSearch.setRegion(value);
  catalog.get();
});
const orderBy = ref<string | undefined>(catalogSearch.data?.orderBy);
watch(() => orderBy.value, (value) => {
  catalogSearch.setOrderBy(value);
  catalog.get();
});
const icons = [HairbrushIcon, BrushIcon, BrushIcon, BrushIcon, BrushIcon, BrushIcon, BrushIcon, BrushIcon, BrushIcon];

// LOAD MORE
const onLoadMore = async () => {
  catalogSearch.setPage((catalogSearch.data?.page ?? 1) + 1);
  await catalog.get(true);
}
</script>

<style></style>