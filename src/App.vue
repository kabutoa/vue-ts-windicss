<script setup lang="ts">
import HeaderNav from './components/header/index.vue'
</script>

<template>
  <header-nav>
    <img src="./assets//images/vite.svg" className="ml-auto" alt="Vite logo" />
  </header-nav>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
