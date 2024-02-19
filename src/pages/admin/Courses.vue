    <template>

  <div>
    <courseModal ref="modal_value" />
    <div class="flex justify-center font-bold text-xl text-global1">
    <p>Courses</p>
  </div>

    <VButton
      type="submit"
      btn_type="primary"
      :isLoading="loading"
      @click="openModal"
    >
      create course
    </VButton>
    <AppTable :headers="headers" :body="store?.courses">

      <template #body_action="{ item }">
      <VAction :item="item" :modal_value="modal_value"/>
    
    </template>
    
    </AppTable>
    <app-pagination :params="params" :change-params="getCourses"></app-pagination>

    <!-- <div class="flex justify-center">
      <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :range-size="1"
      active-color="#EAF5FF"
      @update:modelValue="store.getCourses(params)"
      />
    </div> -->
  </div>
</template>



<script setup>
    import { onMounted, ref } from "vue";
    import { useCourseStore } from "../../stores/admin/courses"
    import AppTable from "../../components/ui/app-table.vue";
    import VButton from "../../components/form/VButton.vue";
    import courseModal from "../../pages/admin/Modals/courseModal.vue";
    import "@hennge/vue3-pagination/dist/vue3-pagination.css";
    import appPagination from "../../components/ui/app-pagination.vue";
    import VAction from "../../components/form/header/VAction.vue";

    

    const modal_value = ref('')

    const loading = ref(false);
    const store = useCourseStore();
    const course_modal = ref();

    const params = ref({
    page: 1,
    limit:10,
    last_page: null,
    });

  
    const openModal = () => {
    modal_value.value.openModal();
    };

    const openEditModal = (item) => {
    course_modal.value.openModal(item);
    };

    const openDeleteModal = (id) => {
    course_modal.value.openDeleteModal(id)
    };

    const getCourses = () =>{
      store.getAdminCourses(params.value)
    }

    const headers = ref([
    { title: "Course name", value: "name" },
    { title: "Course price", value: "price" },
    { title: "Course period", value: "period" },
    { title: "Action", value: "action" },
    ]);


    onMounted(() => {
    store.getAdminCourses(params.value);
    });
    </script>



<style lang="scss" scoped>

</style>