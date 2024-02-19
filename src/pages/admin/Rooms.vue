<template>
    <div>
      <roomsModal ref="modal_value" />
      <div class="flex justify-center font-bold text-xl text-global1">
    <p>Rooms</p>
  </div>
      <VButton
        type="submit"
        btn_type="primary"
        :isLoading="loading"
        @click="openModal"
      >
        create rooms
      </VButton>
      <AppTable :headers="headers" :body="store?.rooms">
        <template #body_action="{ item }">
        <VAction :item="item" :modal_value="modal_value"/>   
          <!-- <div class="flex justify-center space-x-4">
            <button class="border border-global1 bg-global1 text-white px-4 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300" @click="openEditModal(item)">
              <svg-icon class="mt-[3px]" type="mdi" :path="mdiDrawPen"></svg-icon>
            </button>
            <button class="border border-[red] bg-[red] text-white px-2 py-1 rounded-md hover:bg-global2 hover:border-global2 transition-colors duration-300" @click="openDeleteModal(item._id)">
              <svg-icon @click="openDeleteModal(item._id)" type="mdi" :path="mdiDeleteEmpty"></svg-icon>
            </button>
          </div> -->
        </template>
      </AppTable>
    <app-pagination :params="params" :change-params="getRooms"></app-pagination>
      <!-- <div class="flex justify-center">
        <v-pagination
          v-model="params.page"
          :pages="params.last_page"
          :range-size="1"
          active-color="#EAF5FF"
          @update:modelValue="store.getAdminRooms(params)"
        />
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { useRoomStore } from "../../stores/admin/rooms";
  import { onMounted, ref } from "vue";
  import AppTable from "../../components/ui/app-table.vue";
  import VButton from "../../components/form/VButton.vue";
  import roomsModal from "../../pages/admin/Modals/roomsModal.vue";
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiDeleteEmpty , mdiDrawPen } from '@mdi/js';
  import VAction from "../../components/form/header/VAction.vue";
  import appPagination from "../../components/ui/app-pagination.vue";
    const modal_value = ref('')
  
  const loading = ref(false);
  const store = useRoomStore();
  const room_modal = ref();
  
  const params = ref({
    page: 1,
    limit: 10,
    last_page: null,
  });
  
  const openModal = () => {
    modal_value.value.openModal();
  };
  
  const openEditModal = (item) => {
    room_modal.value.openModal(item);
  };
  
  const openDeleteModal = (id) => {
    room_modal.value.openDeleteModal(id);
  };
  
  const getRooms = () =>{
    store.getAdminRooms(params.value)
  }

  const headers = ref([
    { title: "Name of room", value: "name" },
    { title: "Size of room", value: "size" },
    { title: "Action", value: "action" },
  ]);
  
  onMounted(() => {
    store.getAdminRooms(params.value);
  });
  </script>
  