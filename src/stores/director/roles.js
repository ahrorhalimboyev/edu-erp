import { defineStore } from "pinia";
import directorRoles from "../../api/director/directorRoles";

export const useRolesStore = defineStore({
  id: "roles",
  state: () => ({
    roles: [],
  }),
  actions: {
    async getRoles() {
      try {
        let res = await directorRoles.getRoles();
        this.roles = res.roles;
      } catch (err) {
        console.log(err);
      }
    },
    async createRole(payload) {
      try {
        await directorRoles.createRole(payload);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    // async updateAdminRoom(payload, roomsId) {
    //   try {
    //     await adminRoom.updateAdminRoom(payload, roomsId);
    //     location.reload();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // async deleteAdminRoom(roomsId) {
    //   try {
    //     await adminRoom.deleteAdminRoom(roomsId);
    //     location.reload();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
  },
});
