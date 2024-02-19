<template>
  <AppModal v-model="dialog">
    <h1>Group</h1>
    <input
      type="text"
      v-model="group_name"
      placeholder="Group name"
      class="border p-2"
    />
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Start a date"
        :default-value="new Date()"
        @change="handleChangeDate($event)"
      />
    </div>
    <div>
      <select @change="handleChangeDays($event)" class="m-3 border-2">
        <option value="" selected hidden>Select days</option>
        <option value="even">Even days</option>
        <option value="odd">Odd days</option>
      </select>
    </div>
    <div class="demo-range">
      <el-time-picker
        v-model="value1"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        @change="handleChangeTime($event)"
      />
    </div>

    <div v-if="store?.rooms.length">
      <select class="m-3 border-2" v-model="select_room">
        <option value="" selected hidden>Select rooms</option>
        <option
          :value="item._id"
          v-for="(item, index) in store?.rooms"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div>
      <select
        class="m-3 border-2"
        v-model="select_course"
        @change="handlechangeCourse($event)"
      >
        <option value="" selected hidden>Select course</option>
        <option
          :value="item._id"
          v-for="(item, index) in store2?.courses"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
      <select
        v-if="store?.teachers.length"
        class="m-3 border-2"
        v-model="select_teacher"
      >
        <option value="" selected hidden>Select teacher</option>
        <option
          :value="item._id"
          v-for="(item, index) in store?.teachers"
          :key="index"
        >
          {{ item.first_name }}
        </option>
      </select>
    </div>
    <VButton @click="save" btn_type="primary">Create group</VButton>
</AppModal>

<AppModal v-model="dialog2">
    <VDelete v-model="dialog2" :deleteUser="deleteGroup"/>
  </AppModal>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import moment from "moment";
import { useGroupStore } from "../../../stores/admin/groups";
import { useCourseStore } from "../../../stores/admin/courses";
import VButton from "../../../components/form/VButton.vue";
import VDelete from "../../../components/form/header/VDelete.vue";


const store = useGroupStore();
const store2 = useCourseStore();
const dialog = ref(false);
const dialog2 = ref(false);
const unique_id = ref();
const days = ref(null);
const group_name = ref("");
const select_room = ref("");
const select_course = ref("");
const select_teacher = ref("");
const start_time = ref();
const end_time = ref();
const value1 = ref([new Date(), new Date()]);
const value2 = ref("");

const handleChangeDays = (e) => {
  if (e.target.value == "even") {
    days.value = false;
  } else {
    days.value = true;
  }
};

const values = reactive({
  start_date: "",
  start_time: "",
  end_time: "",
  days: days.value,
});

const handleChangeDate = (e) => {
  values.start_date = moment(e).format("YYYY-MM-DD");
};

const handleChangeTime = async (e) => {
  let a = e[0].getHours();
  let b = e[0].getMinutes();
  let d = e[1].getHours();
  let f = e[1].getMinutes();

  start_time.value = a * 60 + b;
  end_time.value = d * 60 + f;
  let payload = {
    start_date: values.start_date,
    start_time: start_time.value,
    end_time: end_time.value,
    days: days.value,
  };
  await store.aviableAdminRooms(payload);
};

const handlechangeCourse = async (e) => {
  await store.getGroupTeacher(e.target.value);
};

let forms = ref({
  name: "",
  price: "",
});


const save = async () => {
  let result = {
    name: group_name.value,
    start_date: values.start_date,
    start_time: start_time.value,
    end_time: end_time.value,
    days: days.value,
    room: select_room.value,
    course: select_course.value,
    // teacher: select_teacher.value,
    status: true,
  };
  await store.createAdminGroup(result);
  let result2 = {
    group: store?.group_id,
    teacher: select_teacher.value,
  };
  await store.addGroupTeacher(result2);
  console.log(store?.group_id, "group_id");
};

const openModal = () => {
  dialog.value = true;
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const openDeleteModal = (id) => {
  console.log("hello");
  unique_id.value = id;
  dialog2.value = true;
};

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const deleteGroup = async () => {
  await store.deleteAdminGroup(unique_id.value);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>