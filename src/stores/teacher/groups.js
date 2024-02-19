import { defineStore } from "pinia";
import teacherGroups from "../../api/teacher/teacherGroup";

export const useTeacherGroupStore = defineStore({
  id: "teacher_group",
  state: () => ({
    teacher_groups: [],
  }),
  actions: {
    async getTeacherGroups(id) {
      try {
        let res = await teacherGroups.getTeacherGroups(id);
        this.teacher_groups = res.groups;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
