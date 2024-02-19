<template>
  <div>
    <AppModal v-model="dialog">
      <vee-form
        :validation-schema="schema"
        @submit="send"
        :initial-values="forms"
      >
        <VSelect
          label="Select a role"
          :options="store2?.roles"
          name="role"
          @change="handleChange($event)"
        >
        </VSelect>
        <VInput
          type="text"
          label="First Name"
          name="first_name"
          placeHolder="First Name"
        ></VInput>
        <VInput
          type="text"
          label="Last Name"
          name="last_name"
          placeHolder="Last Name"
        ></VInput>
        <VInput
          type="text"
          label="Phone number"
          name="phone"
          mask="(+998)-##-###-##-##"
          placeHolder="Phone number"
        ></VInput>
        <VSelect
          label="Select a course"
          :options="store?.courses"
          name="course"
          v-if="is_active"
        >                     
        </VSelect>
        <div class="flex justify-center mt-[30px]">
          <VButton type="submit" btn_type="primary" :isLoading="loading">{{
            btn_title
          }}</VButton>
        </div>
      </vee-form>
    </AppModal>
    <!-- <AppModal v-model="dialog2">
      <VDeleteVue v-model="dialog2" :deleteUser="deleteStaff"></VDeleteVue>
    </AppModal> -->
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VButton from "../../../components/form/VButton.vue";
// import VDeleteVue from "../../../components/form/VDelete.vue";
import VSelect from "../../../components/form/header/VSelect.vue";
import VInput from "../../../components/form/VInput.vue";
import { useCourseStore } from "../../../stores/admin/courses";
import { useRolesStore } from "../../../stores/director/roles";
import { useStaffsStore } from "../../../stores/director/staffs";

const dialog = ref(false);
const store = useCourseStore();
const store2 = useRolesStore();
const store3 = useStaffsStore()
const loading = ref(false);
const is_active = ref(false);

let forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});

const schema = computed(() => ({
  first_name: "required|min:3|max:15",
  last_name: "required|min:3|max:15",
  role: "required",
  phone: "required|min:3|max:22",
}));

const handleChange = (e) => {
  let val = JSON.parse(e.target.value);
  if (val.name == "teacher") {
    is_active.value = true;
  } else {
    is_active.value = false;
  }
};

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit";
    } else {
      return "Create Staff";
    }
  }
});


const openModal = () => {
  dialog.value = true;
  store.getAdminCourses();
  store2.getRoles();
};

const send = async (values) => {
  console.log("Hello");
  let a = values.phone.split("");
  let b = a.filter((item) => !isNaN(+item));
  let c = "+" + b.join("");
  let payload = {
    ...values,
    phone:c,
    role: JSON.parse(values.role)._id,
    course: values.course ? JSON.parse(values.course)._id : "",
    
  };

  console.log("payload:", payload);
  console.log("values:", values);

    if (!forms.value._id) {
    await store3.createStaff(payload);
  } else {
    await store3.updateStaff(payload, forms.value._id);
  }
};



defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
