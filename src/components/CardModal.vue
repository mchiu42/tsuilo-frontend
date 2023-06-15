<script setup>
import { ref, watch, computed } from "vue";
import { NButton, NModal, NIcon, NProgress, NInput, NColorPicker } from "naive-ui";
import {
  IosStarOutline,
  IosStar,
  MdCalendar,
  MdTime,
  MdCheckmark,
} from "@vicons/ionicons4";
import { ChecklistRound, PaletteOutlined } from "@vicons/material";
import { Edit20Regular } from "@vicons/fluent";
import { DateTime } from "luxon";
import axios from "@/utils/axios";

import CardDescription from "@/components/cardProperties/CardDescription.vue";
import CardMembers from "@/components/cardProperties/CardMembers.vue";
import CardTags from "@/components/cardProperties/CardTags.vue";
import CardNotifications from "@/components/cardProperties/CardNotifications.vue";
import CardDateRange from "@/components/cardProperties/CardDateRange.vue";
import CardWorkingHours from "@/components/cardProperties/CardWorkingHours.vue";
import CardImportance from "@/components/cardProperties/CardImportance.vue";
import CardComments from "@/components/cardProperties/CardComments.vue";
import CardToDoList from "@/components/cardProperties/CardToDoList.vue";
import QuillEditor from "@/components/QuillEditor.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const bodyStyle = ref({ width: "856px" });
const segmented = ref({
  content: "soft",
  footer: "soft",
});

const props = defineProps({
  cardData: {
    type: Object,
    require: true,
  },
});
const showModal = ref(false);
const isEditTitle = ref(false);
const isLoading = ref({
  description: false,
  members: false,
  tags: false,
  notification: false,
  dateRange: false,
  workingHours: false,
  importance: false,
});

const cardData = ref(props.cardData);
const pickerColor = ref("");

const getCardDescription = (value) => {
  cardData.value.description = value;
  isLoading.value.description = true;
};
const getCardMembers = (value) => {
  cardData.value.members = value;
  isLoading.value.members = true;
};
const getCardTags = (value) => {
  cardData.value.tags = value;
  isLoading.value.tags = true;
};
const getCardNotification = (value) => {
  cardData.value.notification = value;
  isLoading.value.notification = true;
};
const getCardDateRange = (value) => {
  cardData.value.dateRange = value;
  isLoading.value.dateRange = true;
};
const getCardWorkingHours = (value) => {
  cardData.value.workingHours = value;
  isLoading.value.workingHours = true;
};
const getCardImportance = (value) => {
  cardData.value.importance = value;
  isLoading.value.importance = true;
};
const getCardComment = async (value) => {
  if (value) {
    const data = await axios.get(`${apiUrl}/cards/${cardData.value._id}`);
    cardData.value.comments = data.comments;
  }
};
const getCardContent = async (value) => {
  cardData.value.content = JSON.stringify(value);
};
const getCardToDoList = async (value) => {
  if (value) {
    const data = await axios.get(`${apiUrl}/cards/${cardData.value._id}`);
    cardData.value.toDoList = data.toDoList;
  }
};
const toDoPercent = computed(() => {
  const filterFinished = cardData.value.toDoList.filter(
    (toDo) => toDo.isFinished === true
  );
  let percent =
    Math.round((filterFinished.length / cardData.value.toDoList.length) * 100) || 0;
  return percent;
});
const toDoListWorkingHoursCount = computed(() => {
  let count = 0;
  cardData.value.toDoList.forEach((toDo) => {
    count += toDo.workingHours;
  });
  return count;
});
const daysDiff = (startTimeStamp, endTimeStamp) => {
  const startDate = DateTime.fromMillis(startTimeStamp);
  const endDate = DateTime.fromMillis(endTimeStamp);
  const diff = endDate.diff(startDate, "days").toObject();
  const daysDiff = Math.ceil(diff.days);
  return daysDiff;
};
const isLoadingReset = () => {
  const keys = Object.keys(isLoading.value);
  keys.forEach((key) => {
    isLoading.value[key] = false;
  });
};
const submitCardData = async () => {
  await axios.patch(apiUrl + "/cards/" + cardData.value._id, cardData.value);
  isLoadingReset();
};
const showColorPicker = ref(false);
const changeHeaderColor = (name, imageUrl) => {
  const headerDOM = document.querySelector(".n-card-header");
  switch (name) {
    case "color":
      headerDOM.style.background = pickerColor.value;
      cardData.value.headerCover = pickerColor.value;
      break;
    case "image":
      headerDOM.style.backgroundImage = `url(${imageUrl})`;
      headerDOM.style.backgroundSize = "cover";
      headerDOM.style.backgroundRepeat = "no-repeat";
      headerDOM.style.backgroundPosition = "center";
      cardData.value.headerCover = imageUrl;
      break;
    default:
      headerDOM.style.background = "linear-gradient(to right, #ff006e, #00b3f0)";
      cardData.value.headerCover= "linear-gradient(to right, #ff006e, #00b3f0)";
      break;
  }
};
watch(() => pickerColor.value, () => {
  changeHeaderColor("color");
});
watch(
  () => cardData.value,
  () => {
    submitCardData();
  },
  {
    deep: true,
  }
);
watch(() => showModal.value, (value) => {
  if (value) {
    setTimeout(() => {
      const headerDOM = document.querySelector(".n-card-header");
      if (cardData.value.headerCover.includes("rgb")) {
        headerDOM.style.background = cardData.value.headerCover;
      } else if (cardData.value.headerCover.includes("http")) {
        headerDOM.style.backgroundImage = `url(${cardData.value.headerCover})`;
        headerDOM.style.backgroundSize = "cover";
        headerDOM.style.backgroundRepeat = "no-repeat";
        headerDOM.style.backgroundPosition = "center";
      }
    }, 100);
  } else {
    showColorPicker.value = false;
  }
})
</script>

<template>
  <n-button @click="showModal = true">
    {{ cardData.title }}
  </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header>
      <div class="flex gap-3" :class="showColorPicker? 'visible': 'invisible'">
        <input type="button" value="Default" class="border vis text-white px-2 rounded" @click="changeHeaderColor"/>
        <n-color-picker v-model:value="pickerColor" class="w-1/4" />
        <input type="button" value="Image" class="border vis text-white px-2 rounded" @click="changeHeaderColor('image', 'https://cdn.pixabay.com/photo/2015/08/23/09/22/banner-902589_640.jpg')"/>
      </div>
    </template>
    <!-- Card title -->
    <div class="flex justify-between mb-9">
      <h3 class="flex items-center text-2xl group">
        <template v-if="!isEditTitle">
          {{ cardData.title }}
        </template>
        <template v-else>
          <n-input
            size="small"
            @keydown.enter="isEditTitle = false"
            v-model:value="cardData.title"
            placeholder="請輸入卡片標題"
            class="mr-3"
          />
        </template>
        <span>
          <n-icon
            v-if="!isEditTitle"
            size="20"
            :component="Edit20Regular"
            class="hidden text-gray-400 cursor-pointer group-hover:block hover:text-gray-800 ml-1"
            @click="isEditTitle = true"
          />
          <n-icon
            v-else
            size="20"
            :component="MdCheckmark"
            class="text-gray-400 cursor-pointer hover:text-gray-800"
            @click="isEditTitle = false"
          />
        </span>
      </h3>
      <button class="ml-auto mr-3">
        <n-icon
          size="20"
          :component="PaletteOutlined"
          @click="showColorPicker = !showColorPicker"
          :class="showColorPicker ? 'text-red-500' : ''"
        />
      </button>
      <button @click="cardData.isPinned = !cardData.isPinned">
        <n-icon
          size="20"
          :component="cardData.isPinned ? IosStar : IosStarOutline"
          :class="cardData.isPinned ? 'text-red-500' : ''"
        />
      </button>
    </div>
    <!-- Card header Info -->
    <ul class="grid grid-cols-3 pb-6 mb-6 border-b">
      <li class="flex">
        <n-icon size="40" :component="MdCalendar" class="text-red-500 mr-5" />
        <div>
          <p class="text-xl">
            {{
              Date.now() < cardData.dateRange[0]
                ? `還有 ${daysDiff(Date.now(), cardData.dateRange[0])} 天開始`
                : `倒數 ${daysDiff(cardData.dateRange[0], cardData.dateRange[1])} 天`
            }}
          </p>
          <p class="text-sm">
            於
            {{ DateTime.fromMillis(cardData.dateRange[0]).toFormat("yyyy/MM/dd") }} 開始
          </p>
          <p class="text-sm">
            於
            {{ DateTime.fromMillis(cardData.dateRange[1]).toFormat("yyyy/MM/dd") }} 到期
          </p>
        </div>
      </li>
      <li class="flex">
        <n-icon size="40" :component="MdTime" class="text-gray-500 mr-5" />
        <div>
          <p class="text-xl">
            <span class="text-base text-grey-500 mr-2">預估總工時</span
            >{{ cardData.workingHours }} 小時
          </p>
          <p class="text-xl">
            <span class="text-base text-grey-500 mr-2">已使用工時</span
            >{{ toDoListWorkingHoursCount }} 小時
          </p>
        </div>
      </li>
      <li class="flex">
        <n-icon size="40" :component="ChecklistRound" class="text-gray-500 mr-5" />
        <div class="w-full">
          <p class="text-xl mb-3">完成率</p>
          <n-progress
            type="line"
            :percentage="toDoPercent"
            :indicator-placement="'inside'"
            processing
          />
        </div>
      </li>
    </ul>
    <!-- Card Properties -->
    <form action="" class="pb-6 mb-6 border-b">
      <ul>
        <!-- Card Description -->
        <li class="mb-5">
          <CardDescription
            :description="cardData.description"
            :isLoading="isLoading.description"
            @update="getCardDescription"
          />
        </li>
        <!-- Card Members -->
        <li class="mb-5">
          <CardMembers
            :members="cardData.members"
            :isLoading="isLoading.members"
            @update="getCardMembers"
          />
        </li>
        <!-- Card Tags -->
        <li class="mb-5">
          <CardTags :tags="cardData.tags" :isLoading="isLoading.tags" @update="getCardTags" />
        </li>
        <!-- Card Notify -->
        <li class="mb-5">
          <CardNotifications
            :notification="cardData.notification"
            :isLoading="isLoading.notification"
            @update="getCardNotification"
          />
        </li>
        <!-- Card DeadLine -->
        <li class="mb-5">
          <CardDateRange :dateRange="cardData.dateRange" :isLoading="isLoading.dateRange" @update="getCardDateRange" />
        </li>
        <!-- Card WorkingHours -->
        <li class="mb-5">
          <CardWorkingHours
            :workingHours="cardData.workingHours" :isLoading="isLoading.workingHours"
            @update="getCardWorkingHours"
          />
        </li>
        <!-- Card Importance -->
        <li class="mb-5">
          <CardImportance :importance="cardData.importance" :isLoading="isLoading.importance" @update="getCardImportance" />
        </li>
      </ul>
    </form>
    <!-- Card Comment -->
    <section class="pb-6 mb-6 border-b">
      <h4 class="text-2xl mb-9">評論</h4>
      <CardComments
        :cardId="cardData._id"
        :comments="cardData.comments"
        @updateComment="getCardComment"
      />
    </section>
    <!-- Card Content -->
    <section class="pb-6 mb-6">
      <h4 class="text-2xl">卡片內容</h4>
      <QuillEditor :cardId="cardData._id" :content="cardData.content" @update="getCardContent"/>
    </section>
    <section class="pb-6 mb-6">
      <h4 class="text-2xl">待辦清單</h4>
      <CardToDoList
        :cardId="cardData._id"
        :toDoList="cardData.toDoList"
        @updateToDoList="getCardToDoList"
      />
    </section>
    <template #footer>
      <div class="flex justify-around">
        <n-button @click="showModal = false" type="tertiary">關閉</n-button>
      </div>
    </template>
  </n-modal>
</template>
<style>
.n-card-header {
  background: linear-gradient(to right, #ff006e, #00b3f0);
}
</style>
