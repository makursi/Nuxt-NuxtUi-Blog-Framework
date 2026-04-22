<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const isAuthError = computed(() => {
  return props.error.statusCode === 401 ||
    props.error.message?.includes('authentication') ||
    props.error.message?.includes('login');
});

const errorMessage = computed(() => {
  if (isAuthError.value) {
    return 'Your session has expired. Please login again.';
  }
  return props.error.message || 'An unexpected error occurred';
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full text-center p-8">
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {{ error.statusCode || 'Error' }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          {{ errorMessage }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          v-if="isAuthError"
          to="/login"
          color="primary"
          size="lg"
        >
          Go to Login
        </UButton>
        <UButton
          v-else
          to="/"
          color="primary"
          size="lg"
        >
          Go Home
        </UButton>
        <UButton
          color="gray"
          variant="ghost"
          size="lg"
          @click="handleError"
        >
          Try Again
        </UButton>
      </div>
    </div>
  </div>
</template>
