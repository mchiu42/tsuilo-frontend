<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const username = ref("");
const loading = ref(false);

const submitProfileForm = async () => {
  if (username.value === "") {
    alert("請輸入使用者名稱");
    return;
  }
  loading.value = true;
  await userStore.updateProfile({
    name: username.value,
  });
  alert("修改完成");
  loading.value = false;
};

const setProfileForm = () => {
  username.value = user.value.name;
};

onMounted(() => {
  setProfileForm();
});
</script>
<template>
  <div class="bg-gray-200 min-h-screen">
    <div class="container mx-auto pt-8">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/3">
          <div class="bg-white rounded-lg p-4">
            <ul class="rounded-lg px-4 py-2 divide-y divide-gray-300">
              <li
                class="flex items-center py-2 hover:shadow-lg select-none cursor-pointer"
              >
                <p class="ml-2 text-gray-600">個人資訊</p>
              </li>
              <li
                class="flex items-center py-2 hover:shadow-lg select-none cursor-pointer"
              >
                <p class="ml-2 text-gray-600">帳號管理</p>
              </li>
              <li
                class="flex items-center py-2 hover:shadow-lg select-none cursor-pointer"
              >
                <p class="ml-2 text-gray-600">團隊管理</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="md:w-2/3 mt-4 md:mt-0 md:pl-6">
          <div class="flex flex-col md:flex-row bg-white rounded-lg p-4">
            <div class="md:w-1/2">
              <div class="flex items-center mb-3">
                <h2 class="text-xl font-semibold">使用者資訊編輯</h2>
              </div>
              <form @submit.stop.prevent="submitProfileForm">
                <div class="mb-3">
                  <label class="text-lg" for="username">使用者名稱</label>
                  <input
                    for="username"
                    type="text"
                    id="username"
                    autocomplete="off"
                    v-model="username"
                    class="form-control border border-black rounded-md block py-1 px-2"
                  />
                </div>
                <button class="btn btn-secondary rounded-md">
                  <div
                    v-if="loading"
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span
                      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span
                    >
                  </div>
                  <div v-else>儲存</div>
                </button>
              </form>
            </div>
            <!-- <div class="md:w-1/2">
              <img
                class="w-48 h-48 object-cover rounded-full mx-auto"
                src="https://placehold.co/600x400.jpg"
              />
              <div class="flex items-center justify-center mt-4">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  編輯
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
