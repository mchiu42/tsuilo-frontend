import axios from "@/utils/axios";
import { defineStore } from "pinia";

export const useCardsStore = defineStore('cards', () => {
  const getCards = async () => {
    const data = await axios.get("/cards");
    return data;
  }
  const getCard = async (cardId) => {
    const data = await axios.get(`/cards/${cardId}`);
    return data;
  }
  const postCard = async (cardData) => {
    const data = await axios.post(`/cards/`, cardData);
    return data;
  }
  const deleteCard = async (cardId) => {
    const data = await axios.delete(`/cards/${cardId}`);
    return data;
  }
  return {
    getCard, getCards, postCard, deleteCard
  }
})
