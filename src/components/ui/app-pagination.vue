<template>
    <div class="flex justify-center mt-[40px]">
      <v-pagination
        v-model="params.page"
        :pages="params.last_page"
        :range-size="1"
        active-color="#EAF5FF"
        @update:modelValue="changeParams"
      />
    </div>
  </template>
  
  <script setup>
  import VPagination from "@hennge/vue3-pagination";
  import "@hennge/vue3-pagination/dist/vue3-pagination.css";
  const props = defineProps({
    params: { type: Object },
    changeParams: { type: Function },
  });
  </script>
  
  <style lang="scss" scoped></style>