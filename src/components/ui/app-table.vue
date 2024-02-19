<template> 
  <table class="w-full border-collapse p-5 text-lg h-full rounded-lg border-2 border-blue-500"> 
    <thead class="bg-global1 text-lg text-[white]"> 
      <tr> 
        <th 
          class="py-2 px-5 border blue " 
          v-for="(title, index) in headers" 
          :key="index" 
        > 
          {{ title.title }} 
        </th> 
      </tr> 
    </thead> 
    <tbody class="text-center"> 
      <tr class="even:bg-blue-100" v-for="(item, index) in body" :key="index"> 
        <td 
          class="border border-blue-800" 
          v-for="(col, ind) in headers" 
          :key="ind" 
        > 
          <slot :name="`body_${col.value}`" :item="item"> 
            {{ item[col.value] }} 
          </slot> 
        </td> 
      </tr> 
    </tbody> 
  </table> 
</template> 
 
<script setup> 
const props = defineProps({ 
  headers: Array, 
  body: Array, 
}); 
</script>