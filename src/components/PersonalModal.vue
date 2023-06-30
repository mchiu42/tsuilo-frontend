<script setup>
import { useRouter } from "vue-router";
import { useApp } from '@/stores/app';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';
import defaultPhoto from '@/assets/images/photo.png'
const router = useRouter();
const appData = useApp();
const userStore = useUserStore();
const { controlPersonalModal } = storeToRefs(appData)
const { user } = storeToRefs(userStore);

const goProfilePage = () => {
    controlPersonalModal.value = false
    router.push({ path: '/profile' })
}

const logOut = () => {
    controlPersonalModal.value = false
    userStore.signOut()
    router.push({ path: '/' })
}

</script>

<template>
    <transition name="fade">
        <div v-if="controlPersonalModal" class="absolute top-[85px] right-4 w-[250px] z-10 rounded-lg shadow-[4px_4px_15px_0_rgba(0,0,0,0.3)] bg-white">
            <div class="w-full">
                <div class="flex justify-center gap-2 py-6 border-b border-neutral-5">
                    <img class="w-11 h-11 rounded-full object-cover object-center"
                        :src="user.photo || defaultPhoto"
                        alt=""
                    >
                    <div>
                        <h5 class="text-lg font-medium">{{ user.name || "USERNAME" }}</h5>
                        <p class="text-sm text-neutral-3">{{ user.email || "userName@gmail.com"}}</p>
                    </div>
                </div>
                <button
                    class="w-full border-b border-neutral-5 py-4"
                    @click="goProfilePage"
                >
                    <p class="font-medium text-center">我的帳號</p>
                </button>
                <button class="w-full border-b border-neutral-5 py-4">
                    <p class="font-medium text-center">
                        查看方案
                    </p>
                </button>
                <button
                    class="w-full border-b border-neutral-5 py-4"
                    @click="logOut"
                >
                    <p class="font-medium text-center text-primary-1 ">
                        登出
                    </p>
                </button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>