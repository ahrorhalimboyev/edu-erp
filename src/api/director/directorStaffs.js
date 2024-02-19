import axiosClient from "../apiClient";

const directorStaffs = {
  getStaffs(params) {
    const url = `director/get-staffs/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url, params);
  },
  createStaff(payload) {
    const url = "director/add-staff";
    return axiosClient.post(url, payload);
  },
  updateStaff(payload, id) {
    const url =`director/update-staff/${id}`;
    return axiosClient.put(url, payload);
  },
  deleteStaff(id) {
    const url = `director/delete-staff/${id}`;
    return axiosClient.delete(url);
  },
};

export default directorStaffs;
