<template>
  <div class="w-full flex flex-col">
    <label :for="name" class="text-global1 text-[20px] font-normal">{{
      label
    }}</label>
    <div class="w-full flex justify-between items-center mt-[7px]">
      <vee-field
        :type="active ? 'text' : 'password'"
        :name="name"
        :placeholder="placeHolderProps"
        class="w-[89%] p-[20px] text-[21px] outline-none"
      ></vee-field>
      <button type="button"
        class="w[10%] bg-[white] p-[24px] rounded-e-lg"
        @click="changeType"
      >
        <i v-if="active" class="fa-solid fa-eye-slash"></i>
        <i v-else class="fa-solid fa-eye"></i>
      </button>
    </div>
    <ErrorMessage
      :name="name"
      class="text-error_color text-[20px] font-medium"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const active = ref(false);

const changeType = (e) => {
  e.preventDefault();
  active.value = !active.value;
};

const props = defineProps({
  name: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  placeHolderProps: {
    type: String,
  },
  label: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
