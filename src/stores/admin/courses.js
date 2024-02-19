import { defineStore } from "pinia";
import adminCourse from "../../api/admin/adminCourse";
import { Notification } from "../../plugins/Notification";



export const useCourseStore = defineStore({
  id: "course",
  state: () => ({
    courses: [],
  }),
  actions: {
    async getAdminCourses(params) {
      try {
        let res = await adminCourse.getAdminCourses(params);
        this.courses = res.courses;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    // async getAdminCourses(params) {
    //   try {
    //     let res = await adminCourse.getAdminCourses(params);
    //     this.courses = res.courses;
    //     params.last_page = Math.ceil(res.count / params.limit);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async createAdminCourse(payload) {
      try {
        await adminCourse.createAdminCourse(payload);
        Notification("Created successfully","success")
        setTimeout(()=>{
          location.reload();
        },5000)
        // location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async updateAdminCourse(payload, courseId) {
      try {
        await adminCourse.updateAdminCourse(payload, courseId);
        Notification("Updated successfully","info")
        setTimeout(()=>{
          location.reload();
        },5000)
        // location.reload();
      } catch (err) {
        Notification("Something wrong with update 🖋","warning")
        setTimeout(()=>{
          location.reload();
        },5000)
      }
    },
    async deleteAdminCourse(courseId) {
      try {
        await adminCourse.deleteAdminCourse(courseId);
        Notification("Deleted successfully","danger")
        setTimeout(()=>{
          location.reload();
        },5000)
      } catch (err) {
        console.log(err);
      }
    },
  },
});
