<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
const route = useRoute()
const extendsLayout = computed(() => route.meta.extendsLayout);
import { NNotificationProvider, NMessageProvider } from 'naive-ui';
import { useApp } from '@/stores/app';
import { storeToRefs } from 'pinia';

const appData  = useApp()
const { controlPersonalModal } = storeToRefs(appData)

</script>

<template>
  <PersonalModal />
  <n-message-provider>
    <n-notification-provider>
      <template v-if="extendsLayout">
        <component :is="extendsLayout">
          <RouterView />
        </component>
      </template>
      <template v-else>
        <RouterView />
      </template>
    </n-notification-provider>
  </n-message-provider>
</template>


<style>
html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
