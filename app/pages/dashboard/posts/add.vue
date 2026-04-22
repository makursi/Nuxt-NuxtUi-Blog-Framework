<script setup lang="ts">
import type { PostFormInput } from '~/types';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  requiresAuth: true,
});

const router = useRouter();

const handleSubmit = async (data: PostFormInput) => {
  const { create } = usePosts();
  const result = await create(data);
  if (result) {
    router.push('/dashboard/posts');
  }
};

const handleCancel = () => {
  router.push('/dashboard/posts');
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Post</h1>

    <UCard>
      <PostForm mode="create" @submit="handleSubmit" @cancel="handleCancel" />
    </UCard>
  </div>
</template>
