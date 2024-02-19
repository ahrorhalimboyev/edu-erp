<template>
    <AppModal v-model="dialog">
      <h1 class="text-center">Check students</h1>
      <vee-form @submit="save" :validation-schema="schema" >
      <VInput
      type="text"
      placeHolderProps="Mavzuni Kiritng"
      name="title"
      >
      </VInput>
      <div
      v-for="(item, index) in store?.lessons"
      :key="index"
      class="flex items-center justify-between my-3"
      >
      <span>{{
        item?.student?.first_name + " " + item?.student?.last_name
      }}</span>
        <span
          @click="handleChange(index)"
          class="border-[1px] cursor-pointer bg-[green]"
          >{{
            store.lessons[index].participated ? "participated" : "absent"
          }}</span
        >
      </div>
      <VButton btn_type="create" type="submit" >Save</VButton>
    </vee-form>
    </AppModal>
  </template>
  
  <script setup>
  import { ref,computed, onMounted } from "vue";
  import AppModal from "../../components/ui/app-modal.vue";
  import {useTeacherSingleGroupStore} from "../../stores/teacher/single_group"
  import VButton from "../../components/form/VButton.vue";
  import VInput from "../../components/form/VInput.vue"
  const store=useTeacherSingleGroupStore()
  // const participated=ref(true)
  // const active = ref(true)

  const dialog=ref(false)
  
  const openModal=()=>{
    dialog.value=true
  }
  
  const handleChange=(index)=>{
    store.lessons[index].participated = !store.lessons[index].participated
  }
  
  const schema = computed(()=>{
    return{
      title:"required|min:3|max:15"
    }
  })

  const save=async()=>{
    let id = store.lessons[0].lesson
    await store.updateTeacherSingleLesson(store.lessons)
    store.updateTeacherLessonAttendance(id,value.title)
  }
  
  
  defineExpose({openModal})
  </script>
  
  <style lang="scss" scoped></style>
  