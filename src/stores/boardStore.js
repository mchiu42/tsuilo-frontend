import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export const useBoardStore = defineStore('boardStore', () => {
  const $router = useRouter();
  const $route = useRoute();


  const listsInfo = ref([
    {
      id: 1,
      name: "列表一",
      cards: [
        {
          id: 1234,
          name: "卡片-待辦事項",
        },
        {
          id: 2323,
          name: "卡片-待辦事項",
        },
        {
          id: 3444,
          name: "卡片-待辦事項",
        },
        {
          id: 2222,
          name: "卡片-待辦事項",
        },
      ],
    },
    {
      id: 2,
      name: "列表二",
      cards: [],
    },
    {
      id: 3,
      name: "列表三",
      cards: [
        {
          id: 1234,
          name: "卡片-待辦事項",
        },
        {
          id: 2323,
          name: "卡片-待辦事項",
        },
      ],
    },
    {
      id: 4,
      name: "列表四",
      cards: [
        {
          id: 1234,
          name: "卡片-待辦事項",
        },
      ],
    },
  ]);

  return {
    listsInfo
  };
});
