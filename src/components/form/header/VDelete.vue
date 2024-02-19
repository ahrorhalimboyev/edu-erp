<template>
    <h1 class="mb-3">Are you sure?</h1>
   <div class="flex"> 
  <button class="w-[90px] gap-1 flex mr-3 p-[5px] rounded-lg border border-2ca0a0 text-2ca0a0 border-global1 bg-global1 text-[white] hover:bg-2ca0a0" @click="dialog1 = false">
    <svg-icon @click="$emit('update:modelValue', false)" type="mdi" :path="mdiCancel"></svg-icon> cancel
  </button>
  <button class="w-[90px] gap-1 flex p-[5px] rounded-lg border border-c62f4d text-c62f4d border-red  bg-[red] text-[white] hover:bg-c62f4d" @click="deleteUser">
    <svg-icon @click="deleteUser" type="mdi" :path="mdiDeleteEmpty"></svg-icon> delete
  </button>
</div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteEmpty,mdiCancel } from '@mdi/js';
const props = defineProps({
    deleteUser:{
        type:Function
    },
    modelValue:{
        type:Boolean
    }
})
</script>

<style lang="scss" scoped>

</style>