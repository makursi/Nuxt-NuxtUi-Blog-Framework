<script setup lang="ts">
  import useMyToast from '~/composable/useMyToast'

  const myToast = useMyToast()
  
const layout = 'auth'
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
  <div>

    <NuxtLayout :name="layout">
     <UContainer>
        <UFormField label="name" required>
          <UInput placeholder="Enter your name" v-model="registerInput.name"/>
        </UFormField>
        <UFormField label="Email" required>
          <UInput placeholder="Enter your email" v-model="registerInput.email"/>
        </UFormField>
        <UFormField label="Password" required>
          <UInput placeholder="Enter your password" v-model="registerInput.password"/>
        </UFormField>
        <UButton label="sign up" class="m-2 py-2" @click="createUser" :loading="loading">
  {{ loading?'processing~~' : 'create a account' }}
        </UButton>
        <UButton label="sign up" class="m-2 py-2">
          <NuxtLink to="/auth/login">sign in</NuxtLink>
        </UButton>
      </UContainer>
    </NuxtLayout>

  </div>
</template>

<style lang="scss" scoped>

</style>