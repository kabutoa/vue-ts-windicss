<template>
  <header class="bg-gray-800 p-4">
    <nav class="flex space-x-4 items-center">
      <RouterLink to="/" class="text-white hover:text-teal-300">Home</RouterLink>
      <button
        @click="navigateToAbout"
        class="text-white bg-teal-500 hover:bg-teal-600 font-semibold px-4 py-2 rounded"
      >
        About
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const navigateToAbout = () => {
  router.push('/about')
}
</script>
