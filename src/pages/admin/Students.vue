<template>
  <VInputHeader
   type="text"
   name="search"
   @click="handleChange($event)"
   @keydown.enter="handleChange($event)"
   
   ></VInputHeader>
  <div>
    <studentModal ref="modal_value" />
    <div class="flex justify-center font-bold text-xl text-global1">
    <p>Students</p>
  </div>
    <VButton
    type="submit"
    btn_type="primary"
    :isLoading="loading"
    @click="openModal"
    >
    create student
  </VButton>
  <AppTable :headers="headers" :body="store?.students">
     
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value"/>   

        <!-- <div class="flex justify-center space-x-4">
  <button class="border border-global1 bg-global1 text-white px-4 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300" @click="openEditModal(item)">
    <svg-icon class="mt-[3px]" type="mdi" :path="mdiDrawPen"></svg-icon>
  </button>
  
  <button class="border border-[red] bg-[red] text-white px-2 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300"  @click="openDeleteModal(item._id)">
    <svg-icon @click="openDeleteModal(item._id)" type="mdi" :path="mdiDeleteEmpty"></svg-icon>
</button>
</div> -->
    </template>
    </AppTable>
    <app-pagination :params="params" :change-params="getStudents"></app-pagination>
    <!-- <div class="flex justify-center">
  <v-pagination
    v-model="params.page"
    :pages="params.last_page"
    :range-size="1"
    active-color="#EAF5FF"
    @update:modelValue="store.getStudents(params)"
  />
</div> -->

  </div>
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
import { onMounted, ref } from "vue";
import VButton from "../../components/form/VButton.vue";
import studentModal from "../../pages/admin/Modals/studentModal.vue";
import AppTable from "../../components/ui/app-table.vue";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VAction from "../../components/form/header/VAction.vue";
import VInputHeader from '../../components/form/header/VInputHeader.vue'
import appPagination from "../../components/ui/app-pagination.vue";

const modal_value = ref('')


const loading = ref(false);
const student_modal = ref();
const store = useStudentStore();

const params =ref({
  page: 1,
  limit: 10,
  last_page: null,
});

const openModal = () => {
  modal_value.value.openModal();
};

const openEditModal = (item) => {
  student_modal.value.openModal(item);
};

const openDeleteModal = (id) => {
  student_modal.value.openDeleteModal(id)
};

const getStudents = () =>{
  store.getStudents(params.value)
}

const handleChange = async (e) =>{
  if (e.key === 'Enter'){
    if(e.target.value == ""){
      window.location.reload();
    }
    await store.getStudentsSearch(e.target.value)
  }
}

const headers = ref([
  { title: "First name", value: "first_name" },
  { title: "Last name", value: "last_name" },
  { title: "Phone number", value: "phone" },
  { title: "Action", value: "action" },
]);

onMounted(() => {
  store.getStudents(params.value);
});
</script>

<style lang="scss" scoped></style>  