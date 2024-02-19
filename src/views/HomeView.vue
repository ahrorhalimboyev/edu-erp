<template>
  <div>
    <h1>FORM</h1>
    <vee-form :validation-schema="schema" @submit="save">
      <!-- <vee-field type="text" name="username" class="border"></vee-field> -->
      <ErrorMessage name="username" />
      <div>
        <VInput
          type="text"
          label="Username"
          name="username"
          placeHolderProps="Username"
        ></VInput>
      </div>
      <div>
        <VInput
          type="password"
          label="Password"
          name="password"
          placeHolderProps="Password"
        ></VInput>
        <button type="submit" class="border">save</button>
      </div>
    </vee-form>
    <div v-if="authStore.roles.length > 0">
      <select v-model="selected">
        <option
          value="item"
          v-for="(item, index) in authStore.roles"
          :key="index"
        >
          {{ item }}
        </option>
      </select>
      <button @click="saveForm">save form</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import VInput from "../components/form/VInput.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const selected = ref("");
const schema = computed(() => {
  return {
    username: "required|min:6|max:12",
    password: "required|min:6|max:12",
  };
});

const save = async (values) => {
  await authStore.authLogin(values);
};

const saveForm = async () => {
  let payload = {
    current_role: selected.value,
    ...authStore.user,
  };
  await authStore.authLogin(payload);
};
</script>

<style lang="scss" scoped></style>
