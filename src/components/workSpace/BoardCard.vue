<script setup>
import { ref, reactive, defineProps, watchEffect } from 'vue'
import ShareModal from './ShareModal.vue'
import BaseButton from '../BaseButton.vue';
import { useWorkSpaceData } from '@/stores/workSpace';
import { storeToRefs } from 'pinia';



    const workSpaceData = useWorkSpaceData()
    // console.log('workSpaceData', workSpaceData)
    const { boardsData, boardData, boardId } = storeToRefs(workSpaceData)
    const { archiveBoard } = useWorkSpaceData()
    const isOpenShareModal = ref(false)

    watchEffect(() => {
        boardData.value = props.boardData.value
        console.log('boardData', boardData.value)
    })

    const pinBoard = () => {
        console.log('pinBoard')
    }

    const shareBoard = (id) => {
        
        console.log('shareBoard data')
        boardsData.value.forEach(board => {
            if(board.id === id) {
                boardId.value = id
                boardData.value = board
                isOpenShareModal.value = true
            }
        })
    }

</script>



<template>

    <div class="w-[306px] h-[400px] relative rounded-xl px-4 mb-12"
    :class="[isArchive? 'bg-neutral-5': 'bg-white']">
        <div class="w-full flex justify-between relative">
            <h5 class="text-2xl text-black pt-4 mb-3">{{ props.boardData.title }}</h5>
            <div class="flex items-center gap-3 relative">
                <img class="w-6 h-6 cursor-pointer" @click="pinBoard" src="@/assets/icons/red-star.svg" alt="">
                <img class="w-6 h-6 cursor-pointer" @click="shareBoard(props.boardData.id)" src="@/assets/icons/dots.svg" alt="">
                <ShareModal v-if="props.boardData.id === boardId" v-model:is-open-share-modal="isOpenShareModal"/>
            </div>

        </div>
        <div class="mb-6">
            <p class="text-black truncate">{{ props.boardData.description }}</p>
        </div>

        <div class="w-full"
            :class="[isArchive? 'h-[212px]': 'h-[calc(100%-62px-26px-24px)]']">
            <!-- <div class="w-full h-[calc(100%-72px)]"> -->
                <div class="h-full pb-8 overflow-y-auto">
                    <div class="text-black font-medium p-3 mb-3 mr-3 rounded-lg last:mb-0"
                        :class="[isArchive? 'bg-white': 'bg-lightgray-1']"
                        v-for="card in props.boardData.cards" :key="card.name">
                        {{ card.name }}
                    </div>
                <!-- </div> -->
            </div>
            <div v-if="isArchive" class="w-full pt-3">
                <BaseButton class="w-full py-3 bg-lightgray-1 border-2 border-neutral-5">
                    <p class="text-secondary-4">恢復</p>
                    <img class="w-6 h-6" src="@/assets/icons/recover.svg" alt="">
                </BaseButton>
            </div>
        </div>
    </div>
</template>