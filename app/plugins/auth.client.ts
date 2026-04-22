export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  
  // Initialize auth state from localStorage on client side
  authStore.initAuth();
});
