<template>
  <div>
    <h1>Roles</h1>
    <rolesModal ref="modal_value" />
    <VButton btn_type="primary" @click="openModal">Create</VButton>
    <app-table :headers="headers" :body="store?.roles">
      <template>
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
    </app-table>
  </div>
</template>

<script setup>
import AppTable from "../../components/ui/app-table.vue";
import { onMounted, ref } from "vue";
import { useRolesStore } from "../../stores/director/roles";
import VActions from "../../components/form/header/VAction.vue";
import VButton from "../../components/form/VButton.vue";
import rolesModal from "./Modal/rolesModal.vue";

const store = useRolesStore();
const modal_value = ref("");

const openModal = () => {
  modal_value.value.openModal();
};

const headers = ref([
  { title: "Name", value: "name" },
  { title: "Description", value: "description" },
]);

onMounted(() => {
  store.getRoles();
});
</script>

<style lang="scss" scoped></style>
