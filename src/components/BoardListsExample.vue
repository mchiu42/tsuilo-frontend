<script setup>
import { ref } from 'vue'
import { useCardsStore } from '@/stores/cards'
import CardModal from '@/components/CardModal.vue'

const { getCards, postCard, deleteCard } = useCardsStore();
const cards = ref([]);
const listId = ref("");
const inputCardTitle = ref("");
const getCardsData = async () => {
  const data = await getCards();
  cards.value = [...data];
}
const postCardData = async (event) => {
  const card = {
    title: event.target.value,
    list: listId.value
  }
  await postCard(card);
  await getCardsData();
  inputCardTitle.value = "";
}
const deleteCardData = async (id) => {
  await deleteCard(id);
  await getCardsData();
}
getCardsData();
</script>
<template>
  <ul class="flex flex-col border border-secondary-1 rounded p-3">
    <li>
      <input type="text" v-model="inputCardTitle" placeholder="增加卡片" @keydown.enter="postCardData" class="pl-1 mb-3"/>
    </li>
    <li v-for="card in cards" :key="card._id" class="flex justify-center border border-secondary-2 rounded mb-3">
      <CardModal :cardData="card" />
      <input type="button" value="Delete" class="cursor-pointer border ml-3" @click="deleteCardData(card._id)"/>
    </li>
  </ul>
</template>
<style>

</style>
