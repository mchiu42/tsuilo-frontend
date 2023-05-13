<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
const route = useRoute()
const extendsLayout = computed(() => route.meta.extendsLayout)
</script>

<template>
  <template v-if="extendsLayout">
    <component :is="extendsLayout">
      <RouterView />
    </component>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>