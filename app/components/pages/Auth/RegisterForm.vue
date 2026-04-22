<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

const fields = ref<AuthFormField[]>([
  {
    name: 'Name',
    type: 'Name',
    label: 'Name'
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  }
])
</script>

<template>
  <UAuthForm
    title="Register"
    description="Enter your credentials to access your account."
    icon="i-lucide-user"
    :fields="fields"
    class="max-w-md"
  />
</template>
