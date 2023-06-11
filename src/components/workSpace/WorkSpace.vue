<script setup>
import { reactive, ref } from 'vue'
import NoData from './NoData.vue'
import BaseButton from '../BaseButton.vue';
import ShareModal from './ShareModal.vue'
import { useWorkSpaceData } from '@/stores/workSpace';
import { storeToRefs } from 'pinia';
import checkPinnedStar from '@/assets/icons/red-star.svg'
import notPinnedStar from '@/assets/icons/gray-star.svg'


const workSpaceData = useWorkSpaceData()
const { workSpaces,pinBoardsData, boardId } = storeToRefs(workSpaceData)
const isOpenShareModal = ref(false)

console.log('workSpaces', workSpaces.value)

const isNew = ref(false)
const addBoard = () => {
    isNew.value = true
}
const closeNewModal = () => {
    isNew.value = false

}

const myBoardId = ref(0)
const myOwnerId = ref('')


const pinBoard = (pinStatus,ownerId,boardId) => {
    const board = findBoardById(ownerId, boardId)
    if (!board) return
    // 根據運算子的相依性及優先序，這段的執行的順序是 1.pinStatus === 'notPinned' 的結果，2.賦予給 board.isPinned
    // 這樣賦值的方式省去了 if...else 的判斷是，原始的結構為 if (pinStatus === 'notPinned') {board.isPinned = true}
    board.isPinned = pinStatus === 'notPinned'
    if (pinStatus === 'notPinned') {
        pinBoardsData.value.push(board)
    } else if (pinStatus === 'checkPinned') {
        const index = pinBoardsData.value.findIndex(pinBoard => pinBoard.id === board.id)
        if (index !== -1) {
                pinBoardsData.value.splice(index, 1)
            }
        }
    }
    // workSpaces.value.forEach(workSpace => {
    //     const boards = workSpace.boards
    //     boards.forEach((board, idx) => {
    //         if(workSpace.ownerId === ownerId && board.id === boardId) {
    //             const boardData = board
    //             boardData.owner = workSpace.owner
    //             if (pinStatus === 'notPinned') {
    //                 boardData.isPinned = true
    //                 pinBoardsData.value.push(boardData)
    //             }

    //             if (pinStatus === 'checkPinned') {
    //                 boardData.isPinned = false
    //                 const index = pinBoardsData.value.findIndex(pinBoard => pinBoard.id === board.id)
    //                 if (index !== -1) {
    //                     pinBoardsData.value.splice(index, 1)
    //                 }
    //             }
    //         }
    //     })
    // })
// }

const shareBoard = (boardId, ownerId) => {
    const board = findBoardById(ownerId, boardId)
    if (board) {
        myBoardId.value = boardId
        myOwnerId.value = ownerId
        isOpenShareModal.value = true
    }
    // workSpaces.value.forEach(workSpace => {
    //     // console.log('WorkSpace', workSpace)
    //     const boards = workSpace.boards
    //     boards.forEach(board => {
    //         if (workSpace.ownerId === ownerId && board.id === boardId) {
    //             myBoardId.value = boardId
    //             myOwnerId.value = ownerId
    //             isOpenShareModal.value = true
    //         }
    //     })
    // })
}

const findBoardById = (ownerId, boardId) => {
    // console.log('findBoardById ownerId', ownerId)
    // console.log('findBoardById boardId', boardId)

    for(const workSpace of workSpaces.value) {
        if (workSpace.ownerId === ownerId) {
            const board = workSpace.boards.find(board => board.id === boardId)
            if (board) {
                return board
            }
        }
    }
    return null
}

const checkAdd = () => {
    console.log('checkAdd')
}

const cancelAdd = () => {
    console.log('cancelAdd')

}

</script>

<template>
    <div class="relative" v-for="workSpace in workSpaces" :key="workSpace.owner">
        <div class="relative w-full bg-white p-6 rounded-xl flex justify-between items-center mb-6">
            <p class="text-black text-2xl"> {{workSpace.owner}} 工作區</p>
            <BaseButton @click="addBoard" class="absolute top-1/2 -translate-y-1/2 right-6 border-2 border-primary-1 gap-2 px-4 py-3">
                <p class="text-black">新增看板</p>
                <img class="w-5 h-5" src="@/assets/icons/plus-black.svg" alt="">
            </BaseButton>
        </div>
        <div class="w-full relative flex items-center gap-3">        
            <div v-if="isNew" class="w-[320px] absolute -top-4 right-0 bg-white p-4 rounded-lg">
                <div class="flex justify-between">
                    <p class="mb-3 text-black">新增看板</p>
                    <BaseButton type="button" @click="closeNewModal">
                        <img class="w-5 h-5" src="@/assets/icons/close.svg" alt="">
                    </BaseButton>
                </div>
                <input type="text" placeholder="請輸入看板名稱" class="w-full py-2 px-3 mb-4 rounded-full bg-neutral-5">
                <div class="flex flex-row-reverse justify-between items-end mb-2">
                    <button type="button" @click="checkAdd" class="border border-secondary-4 px-3 py-1 rounded-full">確定新增</button>
                    <button type="button" @click="cancelAdd" class="border border-primary-1 px-6 py-1 rounded-full">取消</button>
                </div>
            </div>
            <div v-for="board in workSpace.boards" :key="board.id" class="w-[306px] h-[400px] relative rounded-xl px-4 mb-12"
                :class="[board.isArchive? 'bg-neutral-5': 'bg-white']">
            <div class="w-full flex justify-between relative">
                <h5 class="text-2xl text-black pt-4 mb-3">{{ board.title }}</h5>
                <div class="flex items-center gap-3 relative">
                    <img 
                        class="w-6 h-6 cursor-pointer" 
                        @click="pinBoard(board.isPinned? 'checkPinned' : 'notPinned', workSpace.ownerId, board.id)"
                        :src="board.isPinned? checkPinnedStar: notPinnedStar"
                        alt=""
                    >

                    <img class="w-6 h-6 cursor-pointer" @click="shareBoard(board.id, workSpace.ownerId)" src="@/assets/icons/dots.svg" alt="">
                    <ShareModal v-if="(board.id === myBoardId) && (workSpace.ownerId === myOwnerId)" :board="board" v-model:is-open-share-modal="isOpenShareModal"/>
                </div>
    
            </div>
            <div class="mb-6">
                <p class="text-black truncate">{{ board.description }}</p>
            </div>
    
            <div class="w-full"
                :class="[board.isArchive? 'h-[212px]': 'h-[calc(100%-62px-26px-24px)]']">
                <div class="h-full pb-8 overflow-y-auto">
                    <div class="text-black font-medium p-3 mb-3 mr-3 rounded-lg last:mb-0"
                        :class="[board.isArchive? 'bg-white': 'bg-lightgray-1']"
                        v-for="card in board.cards" :key="card.name">
                        {{ card.name }}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- <div v-else>
            <NoData />
        </div> -->
    </div>
</template>