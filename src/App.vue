<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderNav from './components/header/index.vue'
import viteLogo from '@/assets/images/vite.svg'
</script>

<template>
  <header-nav>
    <img :src="viteLogo" className="ml-auto" alt="Vite logo" />
  </header-nav>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
