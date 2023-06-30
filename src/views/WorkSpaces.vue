<script setup>
import { reactive, ref, onBeforeMount } from 'vue'

import { storeToRefs } from 'pinia';
import { useWorkSpaceData } from '@/stores/workSpace';
import { useUserStore } from '@/stores/user'

import Header from '@/components/Header.vue'
import SearchInput from '@/components/SearchInput.vue'
import FilterMenu from '@/components/workSpace/FilterMenu.vue'
import BaseButton from '@/components/BaseButton.vue'
import Pinned from '@/components/workSpace/Pinned.vue'
import NoData from '@/components/workSpace/NoData.vue'
import Archive from '@/components/workSpace/Archive.vue'
import Footer from '@/components/Footer.vue'
import NewBoardModal from '../components/workSpace/NewBoardModal.vue'
import ShareModal from '@/components/workSpace/ShareModal.vue'

import checkPinnedStar from '@/assets/icons/red-star.svg'
import notPinnedStar from '@/assets/icons/gray-star.svg'
import BoardListsExample from '@/components/BoardListsExample.vue'

const workSpaceData = useWorkSpaceData()
const userStore = useUserStore();
const { getWorkSpaces } = workSpaceData
const { workSpaces,pinBoardsData, boardId } = storeToRefs(workSpaceData)
const { user } = storeToRefs(userStore)
const isOpenShareModal = ref(false)
const spaceId = ref('')
const allWorkSpace = ref([])


onBeforeMount(async () => {
    try {
        allWorkSpace.value = await getWorkSpaces()
        console.log('allWorkSpace', allWorkSpace.value)
    } catch(error) {
        console.log('error', error)
    }
})

const reNewData = async () => {
    try {
        allWorkSpace.value = await getWorkSpaces()
    } catch (error) {
    }
    console.log(await getWorkSpaces())
}

const isAddWorkspace = ref(false)
const addWorkSpace = () => {
    console.log('addWorkSpace')
    isAddWorkspace.value = true
}

const isNew = ref(false)
const addBoard = (id) => {
    allWorkSpace.value.forEach(workSpace => {
        if(id === workSpace._id) {
            spaceId.value = id
            isNew.value = true
        }
    })
    
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

const findBoardById = (ownerId, boardId) => {
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
    <div class="bg-gradient-to-r from-primary-1/10 to-secondary-1/10">
        <Header />
        <div class="max-w-[1296px] px-4 mx-auto">
            <div class="relative my-12 flex justify-between items-end">
                <NewBoardModal v-model:is-add-workspace="isAddWorkspace" @get-work-spaces="reNewData"/>
                <div class="w-1/2 flex gap-6">
                    <div class="w-1/2">
                        <h6 class="text-base font-medium mb-2">篩選工作區</h6>
                        <FilterMenu />
                    </div>
                    <div class="w-1/2">
                        <h6 class="text-base font-medium mb-2">搜尋工作區</h6>
                        <SearchInput />
                    </div>
                </div>
                <BaseButton class="bg-primary-1 px-6 py-3" @click="addWorkSpace">
                    <p class="text-white">新增工作區</p>
                    <img class="fill-white w-5 h-5" src="@/assets/icons/plus.svg" alt="">
                </BaseButton>
            </div>
            <Pinned />
            <div class="relative" v-for="workSpace in allWorkSpace" :key="workSpace._id">
        <div class="relative w-full bg-white p-6 rounded-xl flex justify-between items-center mb-6">
            <p class="text-black text-2xl"> {{workSpace.spaceName}}</p>
            <BaseButton @click="addBoard(workSpace._id)" class="absolute top-1/2 -translate-y-1/2 right-6 border-2 border-primary-1 gap-2 px-4 py-3">
                <p class="text-black">新增看板</p>
                <img class="w-5 h-5" src="@/assets/icons/plus-black.svg" alt="">
            </BaseButton>
        </div>
        <div class="w-full relative flex items-center gap-3 overflow-x-auto">       
            <div
                v-if="isNew && spaceId === workSpace._id"
                class="w-[320px] absolute z-10 -top-4 right-0 bg-white p-4 rounded-lg shadow-[4px_4px_15px_rgba(0,0,0,0.05)]"
            >
                <div class="flex justify-between">
                    <p class="mb-3 text-black font-medium">新增看板</p>
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
            <template v-if="workSpace.boards">
                <div v-for="board in workSpace.boards" :key="board.id"
                    class="shrink-0 w-[306px] h-[400px] relative rounded-xl px-4 mb-12"
                    :class="[board.isArchive? 'bg-neutral-5': 'bg-white']"
                >
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
            </template>
            <NoData v-else />
        </div>
    </div>
            <Archive />
            <BoardListsExample />
        </div>
        <Footer />
    </div>
</template>
