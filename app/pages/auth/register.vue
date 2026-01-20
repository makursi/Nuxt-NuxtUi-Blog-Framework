<script setup lang="ts">
  import useMyToast from '~/composable/useMyToast'

  const myToast = useMyToast()
  
  function showToast(){
  myToast.success('successful!','made a success! ')     
  }

const layout = 'auth'

const registerInput = ref({
  email: '',
  password: '',
  name:''
})
const config = useRuntimeConfig()
const createUser = async ()=>{
try {
  const res = await $fetch(config.public?.API_BASE_URL+'/register', {
    headers:{ 
      Accept:'application/json',
      "content-type":'application/json'
    },
    method: 'POST',
    body: JSON.stringify(registerInput.value)
  })
  console.log(res);
} catch (error) {
     const errmsg = error.message
    
      myToast.error('Error',errmsg)
   }
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
        <UButton label="sign up" class="m-2 py-2" @click="createUser">
          <NuxtLink to="/auth/register">sign up a account</NuxtLink>
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