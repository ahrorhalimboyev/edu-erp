<template>
  <nav
    class="py-[17px] px-10 bg-global1 border-l-2 border=[#fff] flex items-center justify-between sticky w-full top-0 right-0"
  >
    <!-- search -->
    <div class="relative">
      <button class="p-[10px] bg-red lg:hidden" @click="isOpen = true">
        open sidebar
      </button>
 
    </div>
    <!-- account -->
    <div class="flex items-center cursor-pointer relative account">
      <!-- content -->
      <div
        class="w-[35px] h-[35px] rounded-full flex items-center justify-center"
      >
      <svg-icon class="text-[white]" type="mdi" :path="mdiShieldAccount"></svg-icon>
      </div>
      <p class="text-white text-xs ml-[10px] mr-[26px]">Admin</p>
      <DownIcon />
      <!-- sub_menu -->
      <div
        class="absolute right-0 w-[160px] bg-white shadow-lg rounded-lg overflow-hidden duration-200 sub_menu"
      >
        <div
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Profile
        </div>
        <div
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Settings
        </div>
        <div
        @click="logout"
          class="py-3 px-4 hover:bg-[#12486B] hover:text-white text-[#12486B] duration-200"
        >
          Exit
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UseSaidebar } from "../../../hooks/UseSaidebar";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiShieldAccount } from '@mdi/js';
import router from "../../../router/index"
const isOpen = UseSaidebar();

const logout = ()=>{
  localStorage.setItem('token',null)
  // window.location.href = '/'
  router.push('/')
  // window.location.assign('/');
}


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
.sub_menu {
  opacity: 0;
  visibility: hidden;
  top: 50px;
}
.account:hover .sub_menu {
  opacity: 1;
  visibility: visible;
  top: 36px;
}
</style>
