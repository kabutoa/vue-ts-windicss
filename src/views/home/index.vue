<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">Home Page</h1>
    <button
      @click="onSendRequest"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Send Request
    </button>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/api/request'

const onSendRequest = async () => {
  const info = await request({
    url: '/info',
    data: {
      id: 1
    }
  })
  console.log(info)
}
</script>
<style scoped></style>
