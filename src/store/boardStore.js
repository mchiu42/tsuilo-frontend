import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineStore('boardStore', () => {
  const $router = useRouter();
  const $route = useRoute();


  return {
  };
});