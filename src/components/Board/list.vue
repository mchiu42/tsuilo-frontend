<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  cardsInfo: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="border w-[280px] p-2 rounded-md bg-white cursor-pointer hover:border-gray-300 hover:border-2 hover:shadow-md"
  >
    <div class="flex justify-between">
      <p>標題</p>
      <i-material-symbols:more-horiz />
    </div>

    <div
      v-for="(card, idx) in cardsInfo"
      :key="card.id"
      class="rounded-md bg-gray-100 my-2 px-2 py-1 hover:bg-gray-200"
    >
      <p>{{ idx }}. {{ card.name }}</p>
    </div>
  </div>
</template>
