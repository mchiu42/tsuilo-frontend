<script setup>
import { ref } from 'vue'
const search = (event) => {
    console.log('search', event.target.value)
}

</script>


<template>
    <div class="relative w-full">
        <select class="appearance-none w-full px-6 py-3 rounded-full text-neutral-3">
            <option value="最近活躍" class="border border-red-500">最近活躍</option>
        </select>

        <img class="w-[24px] h-[24px] absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/arrow.svg" alt="">

    </div>
</template>
