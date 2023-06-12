<script setup>
const search = (event) => {
    console.log('search', event.target.value)
}
</script>


<template>
    <div class="relative w-full">
        <input
        class="w-full bg-neutral-5 py-3 pl-6 pr-[48px] rounded-full"
        type="text"
        placeholder="請輸入關鍵字"
        @keyup.enter="search"
        >
        <img class="w-[24px] h-[24px] absolute top-1/2 -translate-y-1/2 right-6" src="@/assets/icons/search.svg" alt="">

    </div>
</template>
