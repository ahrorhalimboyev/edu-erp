<template>
    <div>
        <h1>Teacher Groups</h1>
        <app-table :headers="headers" :body="store?.teacher_groups">
            <template #body_start_date="{item}">
                <span>{{FormatDate(item?.start_date)}}</span>
            </template>

      <template #body_end_date="{ item }">
        <span>{{ FormatDate(item?.end_date) }}</span>
      </template>>  

      <template #body_name="{item}">
        <router-link :to="`/teacher_single_group/${item._id}`">{{item.name}}</router-link>

      </template>

        </app-table>
    </div>
</template>

<script setup>
import { onMounted,ref } from "vue";
import {useTeacherGroupStore} from "../../stores/teacher/groups"
import {useAuthStore} from "../../stores/auth"
import AppTable from "../../components/ui/app-table.vue"
import {FormatDate} from "../../hooks/FormatDate"

const store=useTeacherGroupStore()
const store2=useAuthStore()


const headers=ref([
    {title:"Group name",value:"name"},
    {title:"Status",value:"status"},
    {title:"Student count",value:"student_count"},
    {title:"Start date",value:"start_date"},
    {title:"End date",value:"end_date"},
    {title:"Action",value:"action"},
])


onMounted(async()=>{
    await store2.getProfile();
    store.getTeacherGroups(store2?.user._id)
})

</script>

<style lang="scss" scoped>

</style>