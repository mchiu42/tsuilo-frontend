<script setup>
import { ref, watchEffect } from 'vue'
import NoData from './NoData.vue'
import { useWorkSpaceData } from '@/stores/workSpace';
import { storeToRefs } from 'pinia';

const workSpaceData = useWorkSpaceData()
const { workSpaces, pinBoardsData, boardsData, boardData, boardId } = storeToRefs(workSpaceData)
// console.log('pinned', pinBoardsData.value)
const workSpaceOwner = ref('')
const removePinBoard = (owner) => {
    console.log('removePinBoard owner', owner)
    workSpaces.value.forEach(workSpace => {
        workSpaceOwner.value = workSpace.owner
        pinBoardsData.value.forEach((pinBoard, idx) => {
            if(owner === pinBoard.owner) {
                pinBoard.isPinned = false
                if (owner === workSpace.owner) {
                    pinBoardsData.value.splice(idx, 1)
                }
            }
        })
    })
}
</script>


<template>
    <div class="w-full bg-secondary-4 p-6 rounded-xl flex justify-between items-center mb-6">
        <p class="text-white text-2xl">置頂的看板</p>
        <div class="flex gap-2">
            <p class="text-white">查看更多</p>
            <img class="w-6 h-6" src="@/assets/icons/arrow-right.svg" alt="">
        </div>
    </div>
    <div>
        <div class="w-full flex items-center gap-3" v-if="pinBoardsData.length > 0">
            <div v-for="board in pinBoardsData" :key="board.id" class="w-[306px] h-[400px] bg-white relative rounded-xl px-4 mb-12 border border-secondary-4">
                <div class="w-full flex justify-between relative">
                    <h5 class="text-2xl text-black pt-4 mb-3">{{ board.title }}</h5>
                    <div class="flex items-center gap-3 relative">
                        <img class="w-6 h-6 cursor-pointer" @click="removePinBoard(board.owner)" src="@/assets/icons/red-star.svg" alt="">
                        <img class="w-6 h-6 cursor-pointer" @click="shareBoard(board.id)" src="@/assets/icons/dots.svg" alt="">
                    </div>
                </div>
                <div class="mb-6">
                    <p class="text-black truncate">{{ board.description }}</p>
                </div>
    
                <div class="w-full h-[calc(100%-62px-26px-24px)]">
                    <div class="h-full pb-8 overflow-y-auto">
                        <div class="text-black font-medium p-3 mb-3 rounded-lg last:mb-0"
                            :class="[board.isPinned? 'bg-secondary-3': 'bg-lightgray-1']"
                            v-for="card in board.cards" :key="card.name">
                            {{ card.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NoData v-else />
    </div>

</template>