<script setup lang="ts">
import useMyToast from '~/composable/useMyToast'
const myToast = useMyToast()
definePageMeta({
   layout:'auth'
})
const loading = ref(false)
const registerInput = ref({
  email: '',
  password: '',
  name:''
})
const config = useRuntimeConfig()
const createUser = async ()=>{
try {
  loading.value = true
  const res = await $fetch(config.public?.API_BASE_URL+'/register', {
    headers:{ 
      Accept:'application/json',
      "content-type":'application/json'
    },
    method: 'POST',
    body: JSON.stringify(registerInput.value)
  })
  loading.value = false
  myToast.success('create account successfully!', 'Your account was created!')
} catch (error) {
  loading.value = false
  const errmsg = error.message
  myToast.error('Error',errmsg)
}
registerInput.value.email = ''
registerInput.value.password = ''
registerInput.value.name = ''
}
</script>

<template>

  <div class="w-full max-w-md mx-auto">
      <NuxtLayout :name="layout">
    <form @submit.prevent="createUser" class="space-y-4">
      <UFormField label="Name" name="name" required>
        <UInput 
          placeholder="Enter your name" 
          v-model="registerInput.name"
          class="w-full"
        />
      </UFormField>
      
      <UFormField label="Email" name="email" required>
        <UInput 
          type="email" 
          placeholder="Enter your email" 
          v-model="registerInput.email"
          class="w-full"
        />
      </UFormField>
      
      <UFormField label="Password" name="password" required>
        <UInput 
          type="password" 
          placeholder="Enter your password" 
          v-model="registerInput.password"
          class="w-full"
        />
      </UFormField>
      
      <div class="pt-4">
        <UButton 
          type="submit" 
          color="primary" 
          variant="solid" 
          size="lg" 
          class="w-full py-2"
          :loading="loading"
        >
          {{ loading ? 'Processing...' : 'Create Account' }}
        </UButton>
      </div>
    </form>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>

</style>