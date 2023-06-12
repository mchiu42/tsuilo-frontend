<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const formLoading = ref(false);
const emailInput = ref("");
const passwordInput = ref("");
const isEmailValid = ref(false);
const isPasswordValid = ref(false);

watch(emailInput, (email) => {
  isEmailValid.value = true;
});

const submitForm = async () => {
  formLoading.value = true;
  let token = await userStore.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });
  alert("註冊成功");
  router.push("/sign-in");
};
</script>
<template>
  <section class="flex justify-center items-center h-screen">
    <div
      class="w-80 rounded-lg mx-auto text-center border border-neutral-1 px-10 py-8"
    >
      <h2 class="text-2xl tracking-wide mb-5">註冊帳號</h2>
      <form class="py-2 px-4">
        <input
          class="border border-primary-1 rounded bg-white py-2 px-4 text-gray-700 outline-none"
          v-model="emailInput"
          type="text"
          placeholder="請輸入電子郵件"
        />
        <input
          v-model="passwordInput"
          :class="{ hidden: !isEmailValid }"
          class="border border-primary-1 rounded bg-white py-2 px-4 text-gray-700 outline-none mt-5"
          type="password"
          placeholder="請輸入密碼"
        />
        <button
          type="submit"
          class="btn btn-primary-2 mt-5 w-full"
          :class="{ hidden: !isEmailValid }"
          @click.stop.prevent="submitForm"
        >
          註冊
        </button>
      </form>
      <div :class="{ hidden: isEmailValid }">
        <div class="py-5">或者</div>
        <button class="btn btn-secondary">用 ＧitHub 繼續</button>
      </div>

      <div class="flex justify-center py-5">
        <span>已有帳號？</span>
        <RouterLink
          class="underline hover:underline hover:text-black hover:font-semibold"
          to="/sign-in"
          >立即登入
        </RouterLink>
      </div>
    </div>
  </section>
</template>
