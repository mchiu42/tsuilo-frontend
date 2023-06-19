<script setup>
import { ref, watch } from "vue";
import { NIcon, NDatePicker } from "naive-ui";
const props = defineProps({
  dateRange: {
    type: Array,
    required: true,
  },
  disable: {
    type: Boolean,
  },
  isLoading: {
    type: Boolean,
  }
});
import { MdCalendar } from "@vicons/ionicons4";
import { DateTime } from "luxon";
import IconSpin from "@/components/IconSpin.vue";

const emits = defineEmits(["update"]);
const dateRange = ref(props.dateRange);
const disable = ref(props.disable);
const disablePreviousDate = (ts) => {
  const today = DateTime.local().startOf('day');
  const selectedDate = DateTime.fromMillis(ts);
  return selectedDate < today;
}
watch(
  () => dateRange.value,
  () => {
    emits("update", dateRange.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardDatePicker" class="mr-4">
      <n-icon v-if="!props.isLoading" size="20" :component="MdCalendar" class="text-gray-500 block" />
      <IconSpin v-else />
    </label>
    <div class="w-full">
      <n-date-picker v-model:value="dateRange" type="daterange" :is-date-disabled="disablePreviousDate" :disabled="disable" />
    </div>
  </div>
</template>
<style></style>
