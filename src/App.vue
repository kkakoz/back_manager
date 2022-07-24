<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue"
import { isMobileTerminal } from "./utils/flexible"

let mobile = isMobileTerminal
console.log(import.meta.env.VITE_BASE_API)
</script>

<template>
  {{ mobile }}
  <div class="bg-slate-800 rounded-xl p-8 md:flex md:p-0">
    <img
      class="w-24 h-24 rounded-full mx-auto md:w-48 md:h-auto md:rounded-none"
      src="./assets/vue.svg"
      alt="Vue logo"
    />
    <div class="pt-6 text-center space-y-4 md:p-8 md:text-left">
      <p class="text-lg font-medium text-zinc-100">
        这是一个文档 tailwindcss 卡片区域
      </p>
      <div class="font-medium">
        <div class="text-sky-400">LGD_Sunday</div>
        <div class="text-slate-500">LGD_Sunday</div>
      </div>
    </div>
    <div class="flex"></div>
  </div>
</template>
