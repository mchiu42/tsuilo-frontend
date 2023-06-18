<script setup>
import { ref, watch } from "vue";
import { NIcon, NSelect } from "naive-ui";
const props = defineProps({
  notification: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
import {
  MdNotifications,
} from "@vicons/ionicons4";
import IconSpin from "@/components/IconSpin.vue";

const emits = defineEmits(["update"]);
const notification = ref(props.notification);
// 通知選項
const notifyOptions = [
  {
    label: "到期日前兩天通知",
    value: "到期日前兩天通知",
  },
  {
    label: "成員變更時",
    value: "成員變更時",
  },
  {
    label: "卡片開始前兩天",
    value: "卡片開始前兩天",
  },
];
watch(() => notification.value ,() => {
  emits("update", notification.value);
})
</script>
<template>
  <div class="flex items-center">
    <label for="cardNotify" class="mr-4">
      <n-icon v-if="!props.isLoading" size="20" :component="MdNotifications" class="text-gray-500 block" />
      <IconSpin v-else />
    </label>
    <n-select id="cardNotify" v-model:value="notification" :options="notifyOptions" />
  </div>
</template>
<style></style>
