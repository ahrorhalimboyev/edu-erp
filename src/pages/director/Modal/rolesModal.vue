<template>
  <div>
    <AppModal v-model="dialog">
      <vee-form
        :validation-schema="schema"
        @submit="send"
        :initial-values="forms"
      >
        <VInput
          type="text"
          label="Role Name"
          name="name"
          placeHolder="Role Name"
        ></VInput>

        <VTextarea
          name="description"
          label="Description"
          placeHolderProps="Description"
        ></VTextarea>

        <div class="flex justify-center mt-[30px]">
          <VButton type="submit" btn_type="primary" :isLoading="loading">{{
            btn_title
          }}</VButton>
        </div>
      </vee-form>
    </AppModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VButton from "../../../components/form/VButton.vue";
// import VSelect from "../../../components/form/header/VSelect.vue";
import VInput from "../../../components/form/VInput.vue";
import VTextarea from "../../../components/form/header/VTextarea.vue";
import { useRolesStore } from "../../../stores/director/roles";

const store = useRolesStore();
const dialog = ref(false);
const loading = ref(false);

let forms = ref({
  name: "",
  description: "",
});

const schema = computed(() => {
  return {
    name: "required|min:3|max:15",
    description: "required|min:3|max:50",
  };
});

const openModal = () => {
  dialog.value = true;
};

const send = async (values) => {
  await store.createRole(values);
  console.log(values);
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value._id) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
