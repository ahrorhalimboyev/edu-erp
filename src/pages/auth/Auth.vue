<template>
  <section
    class="w-full h-screen bg-[#E7EDF0] flex items-center justify-center"
  >
    <div class="w-[80%] flex items-center justify-center">
      <div class="w-[60%] flex justify-center flex-col items-center">
        <h1 class="text-global1 font-bold text-[44px]">O'quv Markazga</h1>
        <p class="text-global1 font-normal text-[32px]">Xush Kelibsiz!</p>
        <vee-form
          :validation-schema="schema"
          class="w-[90%] mt-[70px] flex flex-col gap-[30px]"
          @submit="send"
        >
          <div class="w-full">
            <VInput
              type="text"
              label="Phone number"
              name="phone_number"
              mask="(+998)-##-###-##"
              placeHolder="Enter your number"
            />
          </div>
          <div class="w-full flex justify-between items-center">
            <VPasswordInput
              type="password"
              label="Password"
              name="password"
              placeHolder="Enter your password"
            ></VPasswordInput>
          </div>
          <VButton type="submit" btn_type="primary" :isLoading="loading">{{
            btn_title
          }}</VButton>
        </vee-form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import VInput from "../../components/form/VInput.vue";
import VPasswordInput from "../../components/form/VPassword.vue";
import VButton from "../../components/form/VButton.vue";

const store = useAuthStore();

const schema = computed(() => {
  return {
    password: "required|min:3|max:15",
    phone_number: "required|min:3|max:20",
  };
});

const loading = ref(false);
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    return "Kirish";
  }
});

const send = async (values) => {
  loading.value = true;
  let a = values.phone_number.split("");
  let b = a.filter((item) => !isNaN(+item));

  let c = "+" + b.join("");
  console.log(c);
  let payload = {
    phone: c,
    password: values.password,
  };
  await store.authLogin(payload);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
