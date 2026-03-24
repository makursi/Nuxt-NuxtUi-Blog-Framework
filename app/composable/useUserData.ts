import { useUserStore } from "~/stores/user";

const useUserData = () => {
  const userStore = useUserStore();

  //初始化用户数据:从localstorage 加载到 store
  const initializeUserData = (): void => {
    try {
      const userData = localStorage.getItem("userdata");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        userStore.setUser(parsedUserData?.user);
        userStore.setToken(parsedUserData?.token);
      }
    } catch (error) {
      console.error("Error initializing user data:", error);
    }
  };

  //从客户端本地获取数据
  const getUserData = (): { user?: any; token?: string } => {
    return {
      user: userStore.user,
      token: userStore.token,
    };
  };

  //向客户端本地进行本地存储
  const saveUserData = (userData: { user: any; token: string }): void => {
    try {
      localStorage.setItem("userdata", JSON.stringify(userData));
      userStore.setUser(userData.user);
      userStore.setToken(userData.token);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const clearUserData = (): void => {
    try {
      localStorage.removeItem("userdata");
      userStore.clearUser();
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };
  initializeUserData();
  return {
    getUserData,
    saveUserData,
    clearUserData,
  };
};

export default useUserData;
