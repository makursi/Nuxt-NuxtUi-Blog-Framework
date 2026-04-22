<script setup lang="ts">
import type { RegisterInput } from '~/types';
import { registerSchema } from '../../schemas/auth.schema';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  guestOnly: true,
});

const { register } = useAuth();
const authStore = useAuthStore();
const router = useRouter();

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true,
  },
];

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      // TODO: Implement Google OAuth
    },
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      // TODO: Implement GitHub OAuth
    },
  },
];

type Schema = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const result = await register({
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
    confirmPassword: payload.data.confirmPassword,
  });
  
  if (result) {
    router.push('/login');
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 py-12 px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="registerSchema"
        title="Create Account"
        description="Enter your information to create a new account."
        icon="i-tabler-user-plus"
        :fields="fields"
        :providers="providers"
        :loading="authStore.loading"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <NuxtLink to="/login" class="text-primary-600 hover:text-primary-500 font-medium">
              Sign In
            </NuxtLink>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
