<template>
  <div>
    <!-- <input type="text" v-model="phone_number" class="border-2" />
    <button @click="save">save</button> -->
    <singleGroupModal ref="modal_value"/>
    <div class="w-full p-5">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="All Lessons">
        <div class="w-full flex gap-2 flex-wrap">
          <div  v-for="(item, index) in store?.single_group_lessons"
          :key="index">
          <el-popover
                placement="top-start"
                :title="FormatDate(item.date) + ' ' + `Lesson: #${item?.number}` "
                :width="200"
                trigger="click"
                :content="item?.description"
              >
                <template #reference>
                  <div
                  @click="openModal(item)"
                    class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 flex items-center justify-center"
                    :class="
                      item.pass
                        ? ' bg-global1 text-[grey]'
                        :!item.paid ?'bg-error_color text-[#fff] border-none'
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

    <div class="w-full mt-11">
      <el-collapse>
        <el-collapse-item title="Total students" name="students">
          <el-collapse-item
          :title="item.student.first_name + ' ' + item.student.last_name"
          :name="item._id"
          v-for="(item, index) in store?.single_group_students"
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
                  @click="openModal(item2)"

                    class="w-[40px] h-[40px] border-[1px] px-[5px] text-global1 flex items-center justify-center"
                    :class="
                      item2.participated
                        ? 'text-global1 bg-[#ccc]'
                        :item2.comment? 'bg-[gray] text-[#fff]': 'bg-error_color text-[#fff] border-none'
                    "
                  >
                    {{ FormatDateAttendance(item2.date) }}
                  </div>
                </template>
              </el-popover>
            </div>
          </div>
        </el-collapse-item>

        </el-collapse-item>


      </el-collapse>
    </div>

  </div>
  </div>
</template>

<script setup>
import { onMounted, ref,computed } from "vue";
import { useRoute } from "vue-router";
import VInput from "../../components/form/VInput.vue";
import { useGroupStore } from "../../stores/admin/groups";
import { FormatDateAttendance,FormatDate } from "../../hooks/FormatDate";
import singleGroupModal from "./Modals/singleGroupModal.vue"

const store = useGroupStore();
const route = useRoute();
console.log(route.params.id);
const phone_number = ref('');
const modal_value=ref('');

const openModal=(item)=>{
  if(!item.pass) modal_value.value.openModal(item)
}

// const save = async () => {
//   let payload = {
//     group: `${route.params.id}`,
//     student_phone: phone_number.value,
//   };
//   await store.createAdminStudent(payload);
// };
onMounted(async()=>{
  await store.getLessonsSingleGroup(route.params.id)
  store.getStudentsSingleGroup(route.params.id)
})
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