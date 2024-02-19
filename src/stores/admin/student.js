import { defineStore } from "pinia";
import adminStudent from "../../api/admin/adminStudent";

export const useStudentStore = defineStore({
  id: "admin",
  state: () => ({
    students: null,
  }),
  actions: {
    async getStudents(params) {
      try {
        let res = await adminStudent.getStudents(params);
        this.students = res.students;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    async getStudentsSearch(search) {
      try {
        let res = await adminStudent.getStudentsSearch(search);
        this.students = res.student;
      } catch (err) {
        console.log(err); 
      }
    },
    async createStudent(payload) {
      try {
        await adminStudent.createStudent(payload);
      } catch (err) {
        console.log(err);
        Notification("Created successfully","success")
        setTimeout(()=>{
          location.reload();
        },5000)

      }
    },
    async updateStudent(payload , studentId) {
      try {
        await adminStudent.updateStudent(payload,studentId);
      } catch (err) {
        console.log(err);
        Notification("Updated successfully","info")
        setTimeout(()=>{
          location.reload();
        },5000)

      }
    },
    async deleteStudent(studentId) {
      try {
        await adminStudent.deleteStudent(studentId);
      } catch (err) {
        console.log(err);
        Notification("Deleted successfully","warning")
        setTimeout(()=>{
          location.reload();
        },5000)
      }
    },
  },
});
