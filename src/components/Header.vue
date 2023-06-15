<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();

const { user } = storeToRefs(userStore);
const isNotification = ref(false);
</script>

<template>
  <div class="w-full bg-white py-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
    <div class="max-w-[1296px] px-4 mx-auto flex justify-between items-center">
      <router-link
        to="/workspaces"
        class="w-[122px] h-[49px] indent-[101%] overflow-hidden whitespace-nowrap bg-[url('@/assets/images/truilo-logo.png')]"
      >
        truilo-logo
      </router-link>
      <div class="relative flex justify-center items-center gap-4">
        <img
          class="w-[24px] h-[24px] cursor-pointer"
          src="@/assets/icons/bell.svg"
          alt="bell"
        />
        <img
          v-show="isNotification"
          class="w-4 h-4 cursor-pointer absolute top-[12px] left-[14px]"
          src="@/assets/icons/red-circle.svg"
          alt="red-circle"
        />
        <img
          class="w-6 h-6 cursor-pointer"
          src="@/assets/icons/setting.svg"
          alt="setting"
        />
        <span
          class="flex justify-center items-center gap-4"
          @click="router.push({ path: '/profile' })"
        >
          <img
            v-if="user.photo"
            class="w-[44px] h-[44px] cursor-pointer rounded-full"
            :src="user.photo"
            alt="user-photo"
          />
          <img
            v-else
            class="w-[44px] h-[44px] cursor-pointer"
            src="@/assets/images/photo.png"
            alt="default-photo"
          />
          <h2 class="text-xl min-w-[80px] font-medium cursor-pointer">
            {{ user.name || "USERNAME" }}
          </h2>
        </span>
      </div>
    </div>
  </div>
</template>
