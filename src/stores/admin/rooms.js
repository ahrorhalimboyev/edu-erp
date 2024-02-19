import { defineStore } from "pinia";
import adminRoom from "../../api/admin/adminRooms";

export const useRoomStore = defineStore({
  id: "rooms",
  state: () => ({
    rooms: [],
  }),
  actions: {
    async getAdminRooms(params) {
      try {
        let res = await adminRoom.getAdminRooms(params);
        this.rooms = res.rooms;
        params.last_page = Math.ceil(res.count / params.limit);
      } catch (err) {
        console.log(err);
      }
    },

    async createAdminRoom(payload) {
      try {
        await adminRoom.createAdminRoom(payload);
      } catch (err) {
        console.log(err);
        Notification("Created successfully","success")
        setTimeout(()=>{
          location.reload();
        },5000)

      }
    },

    async updateAdminRoom(payload, roomsId) {
      try {
        await adminRoom.updateAdminRoom(payload, roomsId);
      } catch (err) {
        console.error(err);
        Notification("Updated successfully","info")
        setTimeout(()=>{
          location.reload();
        },5000)

      }
    },

    async deleteAdminRoom(id) {
      try {
        await adminRoom.deleteAdminRoom(id);
      } catch (err) {
        console.error(err);
        Notification("Deleted successfully","warning")
        setTimeout(()=>{
          location.reload();
        },5000)

      }
    },
  },
});