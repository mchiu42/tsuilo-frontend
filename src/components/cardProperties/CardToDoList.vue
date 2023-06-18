<script setup>
import { ref, watch } from "vue";
import { NInput, NCheckbox, NIcon, useNotification } from "naive-ui";
import { Delete20Regular, Edit20Regular } from "@vicons/fluent";
import { Open } from "@vicons/ionicons5";
import { MdTime, MdCheckmark } from "@vicons/ionicons4";
import CardWorkingHours from "@/components/cardProperties/CardWorkingHours.vue";
import CardDateRange from "@/components/cardProperties/CardDateRange.vue";
import axios from "@/utils/axios";
import { DateTime } from "luxon";

const apiUrl = import.meta.env.VITE_API_URL;
const props = defineProps({
  toDoList: {
    type: Array,
    required: true,
  },
  cardId : {
    type: String,
    required: true,
  }
});
const emits = defineEmits(["updateToDoList"]);
const toDoList = ref(props.toDoList);
const notification = useNotification();
const inputToDo = ref("");
const editToDo = ref({});
const submitToDo = async () => {
  if (inputToDo.value === "") return;
  const toDo = {
    title: inputToDo.value,
  };
  const data = await axios.post(`${apiUrl}/cards/${props.cardId}/toDoList`, toDo);
  notification.create({
    title: "新增待辦資訊",
    content: data,
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  inputToDo.value = "";
  emits("updateToDoList", true);
};
const editType = (toDo) => {
  editToDo.value = toDo;
}
const editData = async (toDoId) => {
  const data = await axios.patch(`${apiUrl}/cards/${props.cardId}/toDoList/${toDoId}`, editToDo.value);
  notification.create({
    title: "修改待辦資訊",
    content: data,
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  editToDo.value = {};
  emits("updateToDoList", true);
}
const editCheckBoxData = async (value, toDoId) => {
  const data = await axios.patch(`${apiUrl}/cards/${props.cardId}/toDoList/${toDoId}`, {
    isFinished: value
  });
  notification.create({
    title: "修改待辦資訊",
    content: data,
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  editToDo.value = {};
  emits("updateToDoList", true);
}
const removeToDo = async (toDoId) => {
  const data = await axios.delete(`${apiUrl}/cards/${props.cardId}/toDoList/${toDoId}`);
  notification.create({
    title: "移除待辦資訊",
    content: data,
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
  emits("updateToDoList", true);
}
const saveAsCard = (toDo) => {
  const card = {
    ...toDo
  };
  delete card._id;
  delete card.isFinished;
  createCard(card);
  removeToDo(toDo._id);
  notification.create({
    title: "待辦另存卡片",
    content: "已新增卡片",
    duration: 2000,
    closable: false,
    meta: DateTime.fromMillis(Date.now()).toFormat("yyyy/MM/dd hh:mm:ss"),
  });
}
const createCard = async (saveCardData) => {
  if (saveCardData.title.trim() === "") return;
  await axios.post(apiUrl + "/cards", saveCardData);
}
const getToDoWorkingHours = (value) => {
  editToDo.value.workingHours = value;
}
const getToDoDateRange = (value) => {
  editToDo.value.dateRange = value;
}
watch(() => props.toDoList, () => {
  toDoList.value = props.toDoList;
});
</script>
<template>
  <ul>
    <li class="flex items-center mb-4">
      <div class="w-full">
        <n-input
          size="large"
          placeholder="請輸入待辦事項"
          v-model:value="inputToDo"
          @keydown.enter="submitToDo"
          clearable
        />
      </div>
    </li>
    <li v-for="toDo in toDoList" :key="toDo._id" class="flex items-center group hover:bg-gray-100 p-2 rounded">
      <div v-if="toDo._id === editToDo._id" class="flex items-center gap-3">
        <div>
          <n-input
            placeholder="請修改待辦事項"
            v-model:value="editToDo.title"
            @keydown.enter="editData(toDo._id)"
            round
          />
        </div>
        <CardWorkingHours :workingHours="editToDo.workingHours" @update="getToDoWorkingHours" />
        <CardDateRange :dateRange="editToDo.dateRange" @update="getToDoDateRange" />
        <n-icon size="20" :component="MdCheckmark" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="editData(toDo._id)"/>
      </div>
      <div v-else class="flex w-full items-center">
        <n-checkbox v-model:checked="toDo.isFinished" @update:checked="editCheckBoxData(toDo.isFinished, toDo._id)"> {{ toDo.title }} </n-checkbox>
        <div v-if="!editToDo._id" class="hidden group-hover:flex mr-3">
          <n-icon size="20" :component="Edit20Regular" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="editType(toDo)"/>
          <n-icon size="20" :component="Delete20Regular" class="text-gray-400 cursor-pointer hover:text-gray-800 mx-3" @click="removeToDo(toDo._id)"/>
          <n-icon size="20" :component="Open" class="text-gray-400 cursor-pointer hover:text-gray-800" @click="saveAsCard(toDo)"/>
        </div>
        <div class="flex items-center ml-auto mr-3">
          <n-icon size="20" :component="MdTime" class="text-gray-500 block mr-1" />
          <span>{{ toDo.workingHours }}</span>
        </div>
        <CardDateRange :dateRange="toDo.dateRange" :disable="true" />
      </div>
    </li>
  </ul>
</template>
<style></style>
