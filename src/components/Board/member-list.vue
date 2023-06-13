<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  memberList: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
    <div v-for="member in memberList" :key="member.id" class="rounded-1/2">

    </div>
</template>


