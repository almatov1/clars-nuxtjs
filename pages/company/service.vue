<template>
  <div>
    <BlockHeaderComponent title="Услуги" />
  </div>
</template>

<script lang="ts" setup>
import BlockHeaderComponent from '~/src/component/company/BlockHeaderComponent.vue';
definePageMeta({
  layout: 'default',
  middleware: ['private', 'company']
})
</script>

<style></style>