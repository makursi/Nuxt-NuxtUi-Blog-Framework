import { navigateTo, useRuntimeConfig } from "nuxt/app";

export default function useAuth() {
  // 封装登录和注册的api
  type loginInput = {
    email: string;
    password: string;
  };
  type registerInput = {
    name: string;
    email: string;
    password: string;
  };
  const config = useRuntimeConfig();
  const loginInput = ref<loginInput>({
    email: "",
    password: "",
  });

  const registerInput = ref<registerInput>({
    name: "",
    email: "",
    password: "",
  });

  const isLoading = ref(false);
  // 登录
  async function loginUser() {
    try {
      isLoading.value = true;
      const result = await $fetch(config.public?.API_BASE_URL + "/login", {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginInput.value),
      });
      if (result) {
        navigateTo("/");
      }

      return result;
    } catch (error) {
      isLoading.value = false;
      const err = JSON.parse(error as any);
      throw err;
    }
  }

  // 注册
  async function registerUser() {
    try {
      isLoading.value = true;
      const result = await $fetch(config.public?.API_BASE_URL + "/register", {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(registerInput.value),
      });
      if (result) {
        navigateTo("/login");
      }
      return result;
    } catch (error) {
      isLoading.value = false;
      const err = JSON.parse(error as any);
      throw err;
    }
  }
  return {
    loginInput,
    loginUser,
    registerInput,
    registerUser,
    isLoading,
  };
}
