import { defineStore } from "pinia";
import directorStaffs from "../../api/director/directorStaffs";

export const useStaffsStore = defineStore({
  id: "staffs",
  state: () => ({
    staffs: [],
  }),
  actions: {
    async getStaffs(params) {
      try {
        let res = await directorStaffs.getStaffs(params);
        this.staffs = res.staffs;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },
    async createStaff(payload) {
      try {
        await directorStaffs.createStaff(payload);
      } catch (err) {
        console.log(err);
      }
    },
    async updateStaff(payload, id) {
      try {
        await directorStaffs.updateStaff(payload, id);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteStaff(id) {
      try {
        await directorStaffs.deleteStaff(id);
      } catch (err) {
        console.log("Error in deleting staff");
      }
    },
  },
});
