<template>
  <div class="w-full flex h-screen">
    <TheSidebar />
    <div class="w-screen flex flex-col">
      <TheHeader />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "../components/form/header/TheHeader.vue";
import TheSidebar from "../components/form/header/TheSidebar.vue";
</script>

<style scoped></style>
