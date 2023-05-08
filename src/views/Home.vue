<script setup>
import { inject } from 'vue';
import axios from '@/utils/axios';
inject('axios', axios)
axios.get('/')
    .then(res => {
        alert('api ok')
    })
    .catch(err => {
        alert('api error')
    })
</script>
<template>
    <h1>testing api</h1>
</template>