<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import getUserData from '~/plugins/getUseData';

const userdata = getUserData();
 
const userInput = ref({
    user: {
    name: '',
    email: ''
    },
    token:''
})

const notGuest = ref(true);


const storedData = getUserData();

onMounted(()=>{
   if(storedData?.token){ 
        userInput.value = storedData;
        notGuest.value = false
   }
})
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Post',
  to: '/admin/create-post',
  icon: 'i-heroicons-arrow-right-on-rectangle',
  active: route.path.startsWith('/docs/getting-started')
}, {
  label: 'Dashboard',
  to: '/admin/list-of-post',
  icon: 'i-heroicons-user-plus',
  active: route.path.startsWith('/docs/components')
}])


</script>

<template>
 <UHeader toggle-side="left">
    <template #title>
      <Logo class="h-6 w-auto" />
      <h1>{{ userInput.user.name || 'My'}} Blog</h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <!-- 登录和注册按钮 -->
      <div class="flex items-center gap-2" v-if="notGuest">
        <UButton 
          to="/auth/login" 
          color="gray" 
          variant="outline" 
          size="md"
          class="rounded-full"
        >
          Sign In
        </UButton>
        <UButton 
          to="/auth/register" 
          color="primary" 
          variant="solid" 
          size="md"
          class="rounded-full"
        >
          Sign Up
        </UButton>
      </div>

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<style lang="scss" scoped>

</style>