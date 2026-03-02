<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo, useRuntimeConfig } from 'nuxt/app'
import useMyToast from '~/composable/useMyToast'
import useUserData from '~/composable/useUserData'

definePageMeta({
  layout: 'auth' 
})

const { saveUserData } = useUserData()
const myToast = useMyToast()
const loginInput = ref({
   email:'',
   password:''
})

const loading = ref(false)

const config = useRuntimeConfig()
const loginUser = async () => {
  try {
    loading.value = true
    const res = await $fetch(config.public?.API_BASE_URL + '/login', {
      headers: {
        Accept: 'application/json',
        "content-type": 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginInput.value)
    })
    loading.value = false
    
    // 使用新的saveUserData方法保存用户数据
    saveUserData({
       token: res?.token,
       user: res?.user
    })
    
    myToast.success(' successfully!', 'Login account successfully~')
    navigateTo('/admin/dashboard')
  } catch (error) {
    loading.value = false
    const errmsg = error.message
    myToast.error('Error', errmsg)
  }
}
</script>

<template>
  <NuxtLayout :name="layout">
  <div class="w-full max-w-md mx-auto">
    <form @submit.prevent="loginUser" class="space-y-4">
      <UFormField label="Email" name="email" required>
        <UInput 
          type="email" 
          placeholder="Enter your email" 
          v-model="loginInput.email"
          class="w-full"
        />
      </UFormField>
      
      <UFormField label="Password" name="password" required>
        <UInput 
          type="password" 
          placeholder="Enter your password" 
          v-model="loginInput.password"
          class="w-full"
        />
      </UFormField>
      
      <div class="pt-4">
        <UButton 
          type="submit" 
          color="primary" 
          variant="solid" 
          size="lg" 
          class="w-full py-2 text-center"
          :loading="loading"
        >
          {{ loading ? 'Processing...' : 'Sign In' }}
        </UButton>
      </div>
    </form>
  </div>
</NuxtLayout>
</template>

<style lang="scss" scoped>

</style>