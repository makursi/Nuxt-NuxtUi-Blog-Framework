export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login', {
      query: { redirect: to.fullPath }
    });
  }

  // Redirect logged in users away from guest-only pages
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return navigateTo('/dashboard');
  }
});
