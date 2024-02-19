<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms"
    >
      <VInput
        type="text"
        label="First Name"
        name="first_name"
        placeHolderProps="First Name"
      ></VInput>
      <VInput
        type="text"
        label="Last Name"
        name="last_name"
        placeHolderProps="Last Name"
      ></VInput>
      <VInput
        type="text"
        label="Phone number"
        name="phone"
        placeHolderProps="+998 ##-###-##-##"
        :mask="phoneMask"
      ></VInput>
      <VButton type="submit" btn_type="primary" :isLoading="loading">{{
        btn_title
      }}</VButton>
    </vee-form>
  </AppModal>

  <AppModal v-model="dialog1">
    <VDelete v-model="dialog1" :deleteUser="deleteStudent"/>
    <!-- <h1 class="mb-3">Are you sure?</h1>
   <div class="flex"> 
  <button class="w-[90px] gap-1 flex mr-3 p-[5px] rounded-lg border border-2ca0a0 text-2ca0a0 border-global1 bg-global1 text-[white] hover:bg-2ca0a0" @click="dialog1 = false">
    <svg-icon @click="dialog1 = false" type="mdi" :path="mdiCancel"></svg-icon> cancel
  </button>
  <button class="w-[90px] gap-1 flex p-[5px] rounded-lg border border-c62f4d text-c62f4d border-red  bg-[red] text-[white] hover:bg-c62f4d" @click="deleteStudent">
    <svg-icon @click="openDeleteModal(item._id)" type="mdi" :path="mdiDeleteEmpty"></svg-icon> delete
  </button>
</div> -->

  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import VButton from "../../../components/form/VButton.vue";
import { useStudentStore } from "../../../stores/admin/student";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import VDelete from "../../../components/form/header/VDelete.vue";

const store = useStudentStore();

const dialog = ref(false);
const dialog1 = ref(false);
const loading = ref(false);
const unique_id = ref();


let forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  unique_id.value = id;
  dialog1.value = true;
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const schema = computed(() => ({
  first_name: "required|min:3|max:15",
  last_name: "required|min:3|max:15",
  phone: "required|min:3|max:20",
}));

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});

const send = async (values) => {
  loading.value = true;
  const payload = {
    first_name: values.first_name,
    last_name: values.last_name,
    phone: values.phone,
  };

  if (!forms.value._id) {
    await store.createStudent(payload);
  } else {
    await store.updateStudent(payload, forms.value._id);
  }

  loading.value = false;
};

const deleteStudent = async () => {
  await store.deleteStudent(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>