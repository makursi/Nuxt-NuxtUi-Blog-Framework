<script setup lang="ts">
import type { Post } from '~/types';

const props = defineProps<{
  post: Post;
  showActions?: boolean;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const excerpt = computed(() => {
  const text = props.post.post_content.replace(/<[^>]*>/g, '');
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
});
</script>

<template>
  <UCard class="hover:shadow-lg transition-shadow">
    <template #header>
      <NuxtLink :to="`/${post.user}/${post.slug}`">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600">
          {{ post.title }}
        </h2>
      </NuxtLink>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {{ formatDate(post.createdAt) }}
      </p>
    </template>

    <p class="text-gray-600 dark:text-gray-300">
      {{ excerpt }}
    </p>

    <template #footer>
      <div class="flex items-center justify-between">
        <NuxtLink :to="`/${post.user}/${post.slug}`">
          <UButton color="primary" variant="ghost">
            Read More
          </UButton>
        </NuxtLink>

        <div v-if="showActions" class="flex items-center gap-2">
          <NuxtLink :to="`/dashboard/posts/${post._id}/edit`">
            <UButton color="gray" variant="ghost" icon="i-tabler-edit">
              Edit
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </template>
  </UCard>
</template>
