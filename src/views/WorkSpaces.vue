<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import SearchInput from '@/components/SearchInput.vue'
import FilterMenu from '@/components/workSpace/FilterMenu.vue'
import BaseButton from '@/components/BaseButton.vue'
import Pinned from '@/components/workSpace/Pinned.vue'
import WorkSpace from '@/components/workSpace/WorkSpace.vue'
import Archive from '@/components/workSpace/Archive.vue'
import Footer from '@/components/Footer.vue'
import NewBoardModal from '../components/workSpace/NewBoardModal.vue'
import BoardListsExample from '@/components/BoardListsExample.vue'



const isAddWorkspace = ref(false)
const addWorkSpace = () => {
    console.log('addWorkSpace')
    isAddWorkspace.value = true
}

</script>

<template>
    <div class="bg-gradient-to-r from-primary-1/10 to-secondary-1/10">
        <Header />
        <div class="max-w-[1296px] px-4 mx-auto">
            <div class="relative my-12 flex justify-between items-end">
                <NewBoardModal v-model:is-add-workspace="isAddWorkspace" />
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
            <WorkSpace />
            <Archive />
            <BoardListsExample />
        </div>
        <Footer />
    </div>
</template>
