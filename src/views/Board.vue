<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import { useBoardStore } from "/src/store";

const $baordStore = useBoardStore();
const listsInfo = computed(() => $baordStore.listsInfo);
// export default {
//   components: {
//     draggable,
//   },
//   data() {
//     return {
//       list: [
//         { id: 1, name: "Item 1" },
//         { id: 2, name: "Item 2" },
//         { id: 3, name: "Item 3" },
//       ],
//     };
//   },
// };
</script>

<template>
  <div class="h-screen w-[1280px] px-10 bg-x-light-gradient overflow-x-scroll">
    <div>header</div>
    <div class="py-4">
      <div class="flex my-4">
        <div class="flex items-center basis-1/2">
          <p class="pr-2">專案標題</p>
          <i-ic:outline-star-outline />
        </div>
        <!-- 右側工具區 -->
        <div class="basis-1/2 flex space-x-2">
          <member-list></member-list>
          <button class="btn btn-outline-secondary">新增圖表</button>
          <button class="btn btn-outline-secondary">篩選</button>
          <button class="btn btn-outline-secondary">分享</button>
          <button class="btn btn-outline-secondary">權限設定</button>
        </div>
      </div>

      <div class="flex space-x-4">
        <list
          v-for="list in listsInfo"
          :key="list.id"
          :cardsInfo="list.cards"
          class="flex-shrink-0"
        />
      </div>
    </div>

    <!-- <draggable v-model="list">
        <div v-for="item in list" :key="item.id">
          {{ item.name }}
        </div>
      </draggable> -->

    <!-- <draggable
      v-model="list"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </draggable> -->
  </div>
</template>
