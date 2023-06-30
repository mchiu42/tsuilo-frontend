import { defineStore } from "pinia";
import { ref, reactive } from 'vue'

export const useApp = defineStore('appData', () => {
    const controlPersonalModal = ref(false)
    const openPersonalModal = () => {
        controlPersonalModal.value = !controlPersonalModal.value
        console.log('openPersonalModal')
    }

    return {
        controlPersonalModal,
        openPersonalModal
    }
})