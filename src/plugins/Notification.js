import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export const Notification = (text, type) => {
  createToast(text, {
    position: "top-right",
    type: type,
    timeout: 4000,
    transition: "slide",
    hideProgressBar: true
  });
};
