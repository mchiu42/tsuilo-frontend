<script setup>
import { ref } from "vue";
import { NIcon, NInputNumber } from "naive-ui";
import IconSpin from "@/components/IconSpin.vue";

const props = defineProps({
  workingHours: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
  }
});
import { MdTime } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const workingHours = ref(props.workingHours);
const getOnUpdate = () => {
  emits("update", workingHours.value);
}
</script>
<template>
  <div class="flex items-center">
    <label for="cardEstimatedHours" class="mr-4">
      <n-icon v-if="!props.isLoading" size="20" :component="MdTime" class="text-gray-500 block" />
      <IconSpin v-else />
    </label>
    <div class="mr-3">
      <n-input-number
        id="cardEstimatedHours"
        placeholder="0"
        class="border"
        :min="0"
        :max="1000"
        v-model:value="workingHours"
        :on-blur="getOnUpdate"
      />
    </div>
  </div>
</template>
<style></style>
