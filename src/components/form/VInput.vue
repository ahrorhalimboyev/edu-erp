<template>
  <div class="w-full flex flex-col">
    <label :for="name" class="text-global1 text-[20px] font-normal">{{
      label
    }}</label>
    <vee-field
      v-if="mask"
      v-mask="'(+998)-##-###-##-##'"
      placeholder="(+998)-##-###-##-##"
      :type="type"
      :name="name"
      mask="mask"
      :placeholder="placeHolderProps"
      class="p-[20px] text-[21px] outline-none"
    ></vee-field>
    <vee-field
      v-else
      :type="type"
      :name="name"
      :placeholder="placeHolderProps"
      class="p-[20px] text-[21px] outline-none"
    ></vee-field>
    <ErrorMessage
      :name="name"
      class="text-error_color text-[20px] font-medium"
    />
  </div>
</template>

<script setup>
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
  mask: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
