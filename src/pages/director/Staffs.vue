<template>
  <div>
    <h1>Staffs</h1>
    <staffsModal ref="modal_value" />
    <VButton btn_type="primary" @click="openModal">Create</VButton>
    <app-table :headers="headers" :body="store?.staffs">
      <template>
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
    </app-table>
    <app-pagination :params="params" :change-params="getStaffs"></app-pagination>
  </div>
</template>

<script setup>
import AppTable from "../../components/ui/app-table.vue";
import { onMounted, ref } from "vue";
import { useStaffsStore } from "../../stores/director/staffs";
import VActions from "../../components/form//header/VAction.vue";
import VButton from "../../components/form/VButton.vue";
import staffsModal from "./Modal/staffsModal.vue";
import appPagination from "../../components/ui/app-pagination.vue";

const store = useStaffsStore();
const modal_value = ref("");
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});

const openModal = () => {
  modal_value.value.openModal();
};

const headers = ref([
  { title: "First name", value: "first_name" },
  { title: "Last name", value: "last_name" },
  { title: "Phone number", value: "phone" },
  { title: "Role", value: "role" },
  { title: "Start date", value: "start_date" },
  { title: "Actions", value: "action" },
]);

const getStaffs = () =>{
  store.getStaffs(params.value);

}

onMounted(() => {
  store.getStaffs(params.value);
});
</script>

<style lang="scss" scoped></style>
