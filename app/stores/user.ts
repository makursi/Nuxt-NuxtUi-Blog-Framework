import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * 用户存储
 * @description 管理用户信息和认证状态
 */
export const useUserStore = defineStore("user", () => {
  // 状态
  const user = ref<any>(null);
  const token = ref<string>("");
  const isLoggedIn = computed(() => !!token.value);

  // 操作
  const setUser = (userData: any) => {
    user.value = userData;
  };

  const setToken = (tokenValue: string) => {
    token.value = tokenValue;
  };

  const clearUser = () => {
    user.value = null;
    token.value = "";
  };

  return {
    // 状态
    user,
    token,
    isLoggedIn,
    // 操作
    setUser,
    setToken,
    clearUser,
  };
});
