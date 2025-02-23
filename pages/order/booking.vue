<template>
  <div class="flex justify-center">
    <div v-if="booking.data && booking.data.company && booking.data.serviceId"
      class="flex flex-col gap-[16px] w-[1062px]">
      <BookingHeaderComponent :company="booking.data!.company!" />
      <div class="p-[24px] border-[1px] border-pale-500 rounded-[8px]">
        <div v-if="stages.includes(stage)" class="flex flex-col gap-[32px]">
          <BookingProgressComponent :stages="stages" :stage="stage" />
          <BookingServiceComponent v-if="[stages[0], stages[1]].includes(stage)" />
          <BookingMasterComponent v-if="stage === stages[0]" />
          <BookingDateComponent v-if="stage === stages[1]" />
          <BookingConfirmComponent v-if="stage === stages[2]" />
          <BookingDataComponent v-if="stage === stages[2]" />
          <BookingNavigationComponent :stages="stages" :stage="stage" :endStage="endStage"
            :isLast="stage === stages[2]" />
        </div>
        <div v-else class="flex flex-col gap-[32px]">
          <BookedComponent />
          <BookingConfirmComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BookingConfirmComponent from '~/src/component/booking/BookingConfirmComponent.vue';
import BookingDateComponent from '~/src/component/booking/BookingDateComponent.vue';
import BookingHeaderComponent from '~/src/component/booking/BookingHeaderComponent.vue';
import BookingMasterComponent from '~/src/component/booking/BookingMasterComponent.vue';
import BookingNavigationComponent from '~/src/component/booking/BookingNavigationComponent.vue';
import BookingProgressComponent from '~/src/component/booking/BookingProgressComponent.vue';
import BookingServiceComponent from '~/src/component/booking/BookingServiceComponent.vue';
import BookedComponent from '~/src/component/booking/BookedComponent.vue';
import { DEFAULT_ROUTE } from '~/src/core/config/route';
import { useBookingStore } from '~/src/module/booking/store/booking';
import BookingDataComponent from '~/src/component/booking/BookingDataComponent.vue';

definePageMeta({
  layout: 'default',
  middleware: ['private']
})
const booking = useBookingStore();
if (!booking.data || !booking.data.company || !booking.data.serviceId) navigateTo(DEFAULT_ROUTE.HOME);

// STAGES 
const stages = ['master', 'date', 'confirm'];
const endStage = 'booked';
const route = useRoute();
const stage = computed(() => (route.query.stage as string | undefined) ?? 'master');
</script>

<style></style>