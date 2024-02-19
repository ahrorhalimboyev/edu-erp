<template>
    <div>
        <MainLayout>
            <router-view></router-view>
        </MainLayout>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import MainLayout from "../../layout/MainLayout.vue"
</script>

<style lang="scss" scoped>

</style>