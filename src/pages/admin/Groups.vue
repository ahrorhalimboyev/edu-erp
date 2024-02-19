<template>
  <div>
    <div class="flex justify-center font-bold text-xl text-global1">
    <p>Groups</p>
  </div>
    <groupModal ref="modal_value" />
    <VButton @click="openModal" btn_type="primary"
      >Create group</VButton
    >
    <AppTable :headers="headers" :body="store?.groups">
      <template #body_days="{ item }">
        <div v-if="item.days" class="flex gap-2">
          <span>Mon</span>
          <span>Wen</span>
          <span>Fr</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>
      </template>
      <template #body_start_date="{ item }">
        <span>{{ formatDate(item?.start_date) }}</span>
      </template>
      <template #body_end_date="{ item }">
        <span>{{ formatDate(item?.end_date) }}</span>
      </template>
      <template #body_start_time="{ item }">
        <span>{{ formatTime(item?.start_time) }}</span>
      </template>
      <template #body_end_time="{ item }">
        <span>{{ formatTime(item?.end_time) }}</span>
      </template>
      <template #body_course="{ item }">
        <span>{{ item?.course?.name }}</span>
      </template>
      <template #body_room="{ item }">
        <span>{{ item?.room?.name }}</span>
      </template>
      <template #body_action="{ item }">
        <VActions
          :item="item"
          :modal_value="modal_value"
          path="/single_group"
        />
      </template>
      
    </AppTable>           

    <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="store.getAdminGroups(params)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGroupStore } from "../../stores/admin/groups";
import { useCourseStore } from "../../stores/admin/courses";
import AppTable from "../../components/ui/app-table.vue";
import VButton from "../../components/form/VButton.vue";
import groupModal from "./Modals/groupsModal.vue";
import moment from "moment";
import VActions from "../../components/form/header/VAction.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
const store = useGroupStore();
const store2 = useCourseStore();

const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});

const formatDate = (data) => {
  return moment(data).format("YYYY-MM-DD");
};

const formatTime = (time) => {
  let hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let minute = `${time % 60}`.padStart(2, 0);
  let result = `${hour}:${minute}`;
  return result;
};
const modal_value = ref('');

const headers = ref([
  { title: "Group name", value: "name" },
  { title: "Course name", value: "course" },
  { title: "Start date", value: "start_date" },
  { title: "End date", value: "end_date" },
  { title: "Days", value: "days" },
  { title: "Start time", value: "start_time" },
  { title: "End time", value: "end_time" },
  { title: "Status", value: "status" },
  { title: "Room", value: "room" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
  store2.getAdminCourses(params.value);
};

onMounted(() => {
  store.getAdminGroups(params.value);
});
</script>

<style lang="scss" scoped></style>