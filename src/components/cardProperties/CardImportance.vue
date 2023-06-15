<script setup>
import { ref, watch } from "vue";
import { NIcon, NSelect } from "naive-ui";
import IconSpin from "@/components/IconSpin.vue";

const props = defineProps({
  importance: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  }
});
import { IosAlert } from "@vicons/ionicons4";
const emits = defineEmits(["update"]);
const importance = ref(props.importance);
// 重要性選項
const importanceOptions = [
  {
    label: "高",
    value: "高",
  },
  {
    label: "中",
    value: "中",
  },
  {
    label: "低",
    value: "低",
  },
];
watch(
  () => importance.value,
  () => {
    emits("update", importance.value);
  }
);
</script>
<template>
  <div class="flex items-center">
    <label for="cardImportance" class="mr-4">
      <n-icon v-if="!props.isLoading" size="20" :component="IosAlert" class="text-gray-500 block" />
      <IconSpin v-else />
    </label>
    <n-select
      id="cardImportance"
      v-model:value="importance"
      :options="importanceOptions"
    />
  </div>
</template>
<style></style>
