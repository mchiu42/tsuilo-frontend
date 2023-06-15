<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
const props = defineProps({
    isAddWorkspace: Boolean
})

const emit = defineEmits(['update:isAddWorkspace'])
const closeModal = () => {
    emit('update:isAddWorkspace', false)
}

const checkAddSpace = () => {
    console.log('checkAddSpace')
    emit('update:isAddWorkspace', false)
}
</script>


<template>
    <transition name="fade">
        <div v-if="props.isAddWorkspace" class="absolute top-full translate-y-[8px] z-10 right-0 w-[416px] bg-white rounded-lg border-2 border-neutral-5 shadow-[4px_4px_15px_rgba(0,0,0,0.05)]">
            <!-- modal header -->
            <div class="p-4 flex justify-between items-center border border-b-neutral-5">
                <h5 class="text-xl text-black">新增工作區</h5>
                <img @click="closeModal" class="w-5 h-5 cursor-pointer" src="@/assets/icons/close.svg" alt="">
            </div>
            <!-- modal body -->
            <div class="p-4">
                <div class="mb-6">
                    <h6 class="mb-2 font-medium text-black">工作區名稱</h6>
                    <input
                    class="w-full bg-neutral-5 rounded-full px-6 py-3"
                    placeholder="輸入名稱"
                    type="text"
                    >
                </div>
                <div class="mb-6">
                    <h6 class="mb-2 font-medium text-black">工作區描述</h6>
                    <textarea class="w-full px-4 py-6 bg-neutral-5 rounded-full" placeholder="輸入描述"></textarea>
                </div>
                <div class="mb-6">
                    <h6 class="mb-2 font-medium text-black">隱私設定</h6>
                    <div class="relative">
                        <select class="w-full py-3 px-6 border border-secondary-4 rounded-full appearance-none text-neutral-3" name="" id="">
                            <option value="">私密工作區</option>
                        </select>
                        <img class="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/arrow.svg" alt="">
                    </div>
                </div>
                <div class="mb-6 relative">
                    <h6 class="mb-2 font-medium text-black">成員邀請</h6>
                    <div class="relative">
                        <input
                            class="w-full bg-neutral-5 rounded-full px-6 py-3"
                            placeholder="輸入電子信箱"
                            type="text"
                        >
                        <img class="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/send.svg" alt="">
                    </div>
                </div>
            </div>
            <!-- body footer -->
            <div class="border border-t-neutral-5 p-4 flex justify-end">
                <BaseButton @click="checkAddSpace" class="text-white bg-primary-1 px-6 py-4">
                    新增工作區
                </BaseButton>
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