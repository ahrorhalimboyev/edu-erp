<template>
    <AppModal v-model="dialog">
      <vee-form
        :validation-schema="schema"
        @submit="send"
        :initial-values="forms"
      >
        <VInput
          type="text"
          label="Name"
          name="name"
          placeHolderProps="Name"
        ></VInput>
        <VInput
          type="number"
          label="Price"
          name="price"
          placeHolderProps="Price"
        ></VInput>
        <VInput
          type="number"
          label="Period"
          name="period"
          :placeHolderProps="Period"
          :mask="phoneMask"
        ></VInput>
        <VButton type="submit" btn_type="primary" :isLoading="loading">{{
          btn_title
        }}</VButton>
      </vee-form>
    </AppModal> 

    <AppModal v-model="dialog1">
    <VDelete v-model="dialog1" :deleteUser="deleteCourse"/>


  </AppModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import VButton from "../../../components/form/VButton.vue";
import { useCourseStore } from "../../../stores/admin/courses";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDeleteEmpty, mdiCancel } from '@mdi/js';
import VDelete from "../../../components/form/header/VDelete.vue";

const store = useCourseStore();

const dialog = ref(false);
const dialog1 = ref(false);
const loading = ref(false);
const unique_id = ref();

let forms = ref({
  name: "",
  price: "",
  period: "",
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
  name: "required|min:3|max:15",
  price: "required|min:3|max:15",
  period: "required|min:1|max:20",
}));

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.period) {
      return "Edit";
    } else {
      return "Add";
    }
  }
});

const send = async (values) => {
  loading.value = true;
  const payload = {
    name: values.name,
    price: values.price,
    period: values.period,
  };

  if (!forms.value._id) {
    await store.createAdminCourse(payload);
  } else {
    await store.updateAdminCourse(payload, forms.value._id);
  }

  loading.value = false;
};

const deleteCourse = async () => {
  await store.deleteAdminCourse(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>