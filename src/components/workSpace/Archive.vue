<script setup>
import { ref, watchEffect } from 'vue'
import { useWorkSpaceData } from '@/stores/workSpace';
import { storeToRefs } from 'pinia';
import NoData from './NoData.vue'
import BaseButton from '../BaseButton.vue';

const workSpaceData = useWorkSpaceData()
const { workSpaces, archiveBoards } = storeToRefs(workSpaceData)

const workSpaceOwner = ref('')
const originIdx = ref(0)

const recoverBoard = (owner) => {
    workSpaces.value.forEach(workSpace => {
        workSpaceOwner.value = workSpace.owner
        archiveBoards.value.forEach((archiveBoard, idx) => {
            if (owner === archiveBoard.owner ) {
                archiveBoard.isArchive = false
                if (owner === workSpace.owner) {
                    console.log(workSpace)
                    // workSpace.boards.push(archiveBoard)
                    workSpace.boards.splice(idx,0 ,archiveBoard)
                    archiveBoards.value.splice(idx, 1)
                }
            }
        })
    })
}
</script>

<template>
    <div class="p-6 rounded-xl mb-6"
    :class="[archiveBoards.length > 0? 'bg-black': 'bg-neutral-5']">
        <p class="text-black text-2xl"
        :class="[archiveBoards.length > 0? 'text-white':'text-black']">
        {{archiveBoards.length > 0?'封存的看板': '封存'}}
        </p>
    </div>
    
    <div class="w-full mb-[120px]">
        <div class="w-full flex items-center gap-3" v-if="archiveBoards.length > 0">
            <div v-for="board in archiveBoards" :key="board.id" class="w-[306px] h-[400px] relative rounded-xl px-4 mb-12"
                :class="[board.isArchive? 'bg-neutral-5': 'bg-white']">
                <div class="w-full flex justify-between relative">
                    <h5 class="text-2xl text-black pt-4 mb-3">{{ board.title }}</h5>
                    <div class="flex items-center gap-3 relative">
                        <img class="w-6 h-6 cursor-pointer" @click="pinBoard" src="@/assets/icons/red-star.svg" alt="">
                        <img class="w-6 h-6 cursor-pointer" @click="shareBoard(board.id)" src="@/assets/icons/dots.svg" alt="">
                    </div>
                </div>
                <div class="mb-6">
                    <p class="text-black truncate">{{ board.description }}</p>
                </div>
    
                <div class="w-full"
                    :class="[board.isArchive ? 'h-[212px]': 'h-[calc(100%-62px-26px-24px)]']">
                        <div class="h-full pb-8 overflow-y-auto">
                            <div class="text-black font-medium p-3 mb-3 mr-3 rounded-lg last:mb-0"
                                :class="[board.isArchive? 'bg-white': 'bg-lightgray-1']"
                                v-for="card in board.cards" :key="card.name">
                                {{ card.name }}
                            </div>
                        </div>
                        <div v-if="board.isArchive" class="w-full pt-3">
                            <BaseButton @click="recoverBoard(board.owner)" class="w-full py-3 bg-lightgray-1 border-2 border-neutral-5">
                                <p class="text-secondary-4">恢復</p>
                                <img class="w-6 h-6" src="@/assets/icons/recover.svg" alt="">
                            </BaseButton>
                        </div>
                </div>
            </div>
        </div>
        <div class="w-full" v-else>
            <NoData />
        </div>
    </div>
</template>