<template>
    <div class="absolute p-[15px]">
        <input
            :type="type"
            :name="name"
            class="text-[13px] w-[300px] rounded-[20px] h-[35px] outline-none bg-white py-3 px-[15px] absolute"
            :label="label"
            placeholder="Search ..."
            />
        <svg-icon type="mdi" :path="mdiMagnify" class="absolute w-[20px] h-[25px] left-[290px] m-1 ml-[1px] "></svg-icon>
    </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';

const props = defineProps({
  name: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
  }
});



</script>

<style lang="scss" scoped>

</style>