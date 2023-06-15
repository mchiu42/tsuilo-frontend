<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from '../BaseButton.vue';
import { useWorkSpaceData } from '@/stores/workSpace';
import { storeToRefs } from 'pinia';

const workSpaceData = useWorkSpaceData()
const { workSpaces, archiveBoards } = storeToRefs(workSpaceData)

const props = defineProps({
    isOpenShareModal: Boolean,
    boardId: Number,
    board: Object
})

console.log('props', props.board)
const emit = defineEmits(['update:isOpenShareModal'])

const closeShareModal = () => {
    emit('update:isOpenShareModal', false)
}

const archiveBoard = () => {
    workSpaces.value.forEach((workSpace, idx) => {
        const boards = workSpace.boards
        boards.forEach((board, idx) => {
            if (board.id === props.board.id) {
                const boardData = board
                boardData.owner = workSpace.owner
                boardData.isArchive = true
                console.log(boardData)

                archiveBoards.value.push(boardData)
                boards.splice(idx, 1)
                emit('update:isOpenShareModal', false)
            }
        })
        console.log('archiveBoards', archiveBoards.value)
    })
}

</script>


<template>
    <transition name="fade">
        <div v-if="props.isOpenShareModal" class="w-[306px] bg-white rounded-lg border-2 border-neutral-5 absolute top-10 left-9 z-10">
            <div class="flex justify-between border-b border-neutral-5 p-4">
                <h5 class="text-black text-xl font-medium">分享工作區</h5>
                <img class="w-6 h-6" @click="closeShareModal" src="@/assets/icons/close.svg" alt="">
            </div>
        
            <div class="px-4 pt-4">
                <div class="mb-6">
                    <h6 class="text-black font-medium mb-2">邀請</h6>
                    <div class="relative">
                        <input class="w-full bg-neutral-5 py-3 px-6 rounded-full" placeholder="請輸入電子信箱" type="text">
                        <img class="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/send.svg" alt="">
                    </div>
                </div>
                <div class="pb-6">
                    <h6 class="text-black font-medium mb-2">分享共用連結</h6>
                    <div class="relative">
                        <input class="w-full bg-neutral-5 py-3 px-6 rounded-full" placeholder="https://tl.app/workspace" type="text">
                        <img class="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/copy.svg" alt="">
                    </div>
                </div>
                <BaseButton @click="archiveBoard">封存</BaseButton>
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