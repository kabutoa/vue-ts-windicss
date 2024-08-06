<script setup lang="ts">
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<template>
  <div>about-manage</div>
  <div>pos: {{ x }}, {{ y }}</div>
  <RouterLink to="/about/user">go to about user</RouterLink>
</template>
