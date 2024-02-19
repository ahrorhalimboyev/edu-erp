<template>
    <div class="mb-2 block">
      <label :for="name" class="block text-lg mb-2 capitalize tracking-wide">
        {{ label }}
      </label>
      <vee-field
        as="select"
        :name="name"
        id="select"
        class="custom-select h-9 w-full px-[0.375rem] -p-5 rounded-lg border-"
      >
        <option disabled value="">Please select one</option>
        <option
          class="custom-select-option text-paragraph-default"
          v-for="(option, index) in options"
          :key="`${index}${option}`"
          :value="JSON.stringify(option)"
        >
          {{ option.name ? option.name : option }}
        </option>
      </vee-field>
      <ErrorMessage class="text-red text-sm" :name="name" />
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    //   isDisabled: {
    //     type: Boolean,
    //   },
    options: {
      type: Array,
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .custom-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  
    &-option {
      &:hover {
        background: #01a1b7 !important;
      }
    }
  
    &:hover {
      &-option {
        background: #01a1b7 !important;
      }
    }
  }
  
  .custom-select-option {
    padding: 10px;
    background-color: #fff;
  }
  </style>
  