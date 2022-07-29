<template>
    <div class=" h-12 w-full flex flex-row">
        <a-button type="primary" @click="addCollection">添加合集</a-button>
    </div>
</template>

<script setup>
import router from '@/router';


const addCollection = () => {
  router.push('/collections/add')
}
</script>