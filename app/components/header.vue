<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const authStore = useAuthStore();
const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => {
  const baseItems: NavigationMenuItem[] = [
    {
      label: 'Home',
      to: '/',
      icon: 'i-tabler-home',
    },
  ];
  
  // Only show Dashboard when user is logged in
  if (authStore.isAuthenticated) {
    baseItems.push({
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'i-tabler-file-text',
    });
  }
  
  return baseItems;
});

const handleLogout = async () => {
  const { logout } = useAuth();
  await logout();
};
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" class="text-xl font-bold">
        {{ authStore.userName }} Blog
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <!-- User menu when logged in -->
      <UDropdownMenu v-if="authStore.isAuthenticated" :items="[[{ label: 'Logout', icon: 'i-tabler-logout', click: handleLogout }]]">
        <UButton color="primary" variant="ghost">
          {{ authStore.userName }}
        </UButton>
      </UDropdownMenu>

      <!-- Login/Register buttons when logged out -->
      <div v-else class="flex items-center gap-2">
        <UButton to="/login" color="gray" variant="outline" size="md">
          Sign In
        </UButton>
        <UButton to="/register" color="primary" variant="solid" size="md">
          Sign Up
        </UButton>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
