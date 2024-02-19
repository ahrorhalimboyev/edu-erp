<template>
   <!-- <AppTable :headers="headers" :body="store?.courses"> -->
      
      <!-- <template #body_action="{ item }"> -->
      
        <div class="flex justify-center space-x-4">
          <button class="border border-global1 bg-global1 text-white px-4 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300" @click="openEditModal(item)">
            <svg-icon class="mt-[3px]" type="mdi" :path="mdiDrawPen"></svg-icon>
          </button>
  
          <button class="border border-[red] bg-[red] text-white px-2 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300"  @click="openDeleteModal(item._id)">
            <svg-icon @click="openDeleteModal(item._id)" type="mdi" :path="mdiDeleteEmpty"></svg-icon>
            <!-- Delete -->
          </button>
          <button v-if="path" class="border border-[white] bg-white text-global1 px-2 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300"  @click="openDeleteModal(item._id)">
            <svg-icon type="mdi" :path="mdiAccountEye" @click="openSingleUser"></svg-icon>
            <!-- Delete -->
          </button>
        </div>
      <!-- </template> -->
    <!-- </AppTable> -->
  </template>
  
  <script setup>
  import {mdiDrawPen,mdiDeleteEmpty,mdiAccountEye} from "@mdi/js"
  import SvgIcon from '@jamescoyle/vue-icon'; 
  import {useRouter} from 'vue-router'

  const router = useRouter()


  const props=defineProps({
      item:{
          type:Object
      },
      modal_value:{
          type:String
      },
      path:{
        type:String
      }
  })
  
  const openEditModal=()=>{
      props.modal_value.openModal(props.item)
  }
  
  const openDeleteModal=()=>{
      props.modal_value.openDeleteModal(props.item._id)
  }
  
  const openSingleUser=()=>{
    router.push(`${props.path}/${props.item._id}`)
  }

  
  </script>
  
  <style lang="scss" scoped>
  
  </style>