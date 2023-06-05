<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <header class="bg-white py-6">
        <div class="container mx-auto flex justify-between items-center px-20">

            <ul class="flex space-x-7">
                <li>
                    <!-- <RouterLink to="/"
                        class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-wide ">
                        催落
                    </RouterLink> -->
                    <RouterLink to="/">
                        <img src="@/assets/Logo.svg" alt="logo" class="w-20 inline-flex">
                    </RouterLink>
                </li>
                <li><a href="#" class="text-black hover:text-gray-300">功能</a></li>
                <li><a href="#" class="text-black hover:text-gray-300">方案</a></li>
                <li><a href="#" class="text-black hover:text-gray-300">適用情境</a></li>
            </ul>
            <ul class="flex space-x-2">
                <li>
                    <RouterLink class="btn btn-outline-secondary" to="/sign-in">登入</RouterLink>
                </li>
                <li>
                    <RouterLink to="/sign-up" class="btn btn-primary">免費試用</RouterLink>
                </li>
            </ul>
        </div>
    </header>
    <RouterView />
</template>