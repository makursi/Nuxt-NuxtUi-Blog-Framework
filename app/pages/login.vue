<script setup lang="ts">
import type { LoginInput } from '~/types';
import { loginSchema } from '../../schemas/auth.schema';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  guestOnly: true,
});

const { login } = useAuth();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const fields: AuthFormField[] = [
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
  email: string;
  password: string;
};

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const result = await login({
    email: payload.data.email,
    password: payload.data.password,
  });
  
  if (result) {
    const redirect = route.query.redirect as string;
    router.push(redirect || '/dashboard');
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 py-12 px-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="loginSchema"
        title="Welcome Back"
        description="Enter your credentials to access your account."
        icon="i-tabler-user"
        :fields="fields"
        :providers="providers"
        :loading="authStore.loading"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary-600 hover:text-primary-500 font-medium">
              Sign Up
            </NuxtLink>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
