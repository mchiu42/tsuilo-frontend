<script setup>
import { NSpin, NIcon } from "naive-ui";
import { DataSaverOffRound } from "@vicons/material";
</script>
<template>
   <n-spin size="20">
    <template #icon>
      <n-icon size="20" :component="DataSaverOffRound" class="text-gray-400">
      </n-icon>
    </template>
  </n-spin>
</template>
<style>

</style>
