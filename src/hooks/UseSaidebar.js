import { ref } from "vue";

const isOpen = ref(false);

export function UseSaidebar() {
  return isOpen;
}
