<template>
  <div class="p-[20px]">
    <VButton btn_type="edit" @click="active=!active">change</VButton>
  <div v-if="active">
    <checkStudents ref="modal_value"/>
    <div class="w-full flex items-center justify-between gap-5">
      <div class="w-full">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="All Lessons">
        <div class="w-full flex gap-2 flex-wrap">
          <div  v-for="(item, index) in store?.group_lessons"
          :key="index">
          <el-popover
                placement="top-start"
                :title="FormatDate(item.date) + ' ' + `Lesson: #${item?.number}` "
                :width="200"
                trigger="click"
                transition="100 linear"
                :content="item?.description"
              >
                <template #reference>
                  <div
                    class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 flex items-center justify-center"
                    :class="
                      item.pass
                        ? 'text-[grey] bg-global1'
                        : 'bg-[#ccc] text-[#fff] border-none'
                    "
                  >
                    {{ FormatDateAttendance(item.date) }}
                  </div>
                </template>
              </el-popover>
        </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
      <VButton btn_type="primary" @click="openModal">
        <svg-icon type="mdi" :path="mdiMenu"></svg-icon>
      </VButton>
    </div>
    <div class="demo-collapse">
      <el-collapse>
        <el-collapse-item
          :title="item.student.first_name + ' ' + item.student.last_name"
          :name="item._id"
          v-for="(item, index) in store?.teacher_students"
          :key="index"
        >
          <div class="w-full flex gap-2 flex-wrap">
            <div v-for="(item2, index2) in item.attendance" :key="index2">
              <el-popover
                placement="top-start"
                :title="FormatDate(item2.date)"
                :width="200"
                trigger="click"
                transition="100 linear"
                :content="item2?.comment"
              >
                <template #reference>
                  <div
                    class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 flex items-center justify-center"
                    :class="
                      item2.participated
                        ? 'text-global1 '
                        : 'bg-[crimson] text-[#fff] border-none'
                    "
                  >
                    {{ FormatDateAttendance(item2.date) }}
                  </div>
                </template>
              </el-popover>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <div v-else>
    <h1>video yuklash</h1>
    <input type="file" @change="handleChange($event)">
    <VButton btn_type="create" @click="save">dars qo'shish</VButton>
  </div>

  </div>
</template>

<script setup>
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { onMounted, ref } from "vue";
const store = useTeacherSingleGroupStore();
import { useRoute } from "vue-router";
import VButton from "../../components/form/VButton.vue";
import { FormatDateAttendance,FormatDate } from "../../hooks/FormatDate";
import checkStudents from "../../pages/teacher/checkStudent.vue"
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenu } from '@mdi/js';
  
const route = useRoute();
const active=ref(false)
const modal_value=ref()
const input_file=ref()
const params = ref({
  page: 1,
  limit: 10,
  per_page: null,
});


const openModal=async()=>{
  let date= FormatDate(new Date())
  await store.getTeacherSingleLesson(route.params.id,date)
  modal_value.value.openModal()
}

const save=((e)=>{
  console.log(e.target.files[0]);
})

const handleChange=(e)=>{
  console.log(e.target.files[0]);
}
onMounted(async () => {
  // await store.getTeacherSingleLesson(route.params.id);
  store.getAllStudentsAttendance(route.params.id, params.value);
  store.getAllGroupLessons(route.params.id);
});
</script>

<style lang="scss" scoped>
.el-collapse-item {
  color: #12486b;
  padding: 10px;
  border: 1px solid #12486b;
  margin: 5px 0px;
}

.el-collapse-item {
  .title{
    color: green;
  }
}

</style>