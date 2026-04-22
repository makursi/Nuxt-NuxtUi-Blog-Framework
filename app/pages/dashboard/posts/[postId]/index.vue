<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  requiresAuth: true,
});

const route = useRoute();
const postId = route.params.postId as string;

const post = ref<any>(null);
const error = ref<any>(null);
const confirmDelete = ref(false);

onMounted(async () => {
  const { getBySlug } = usePosts();
  const result = await getBySlug(postId);
  if (result) {
    post.value = result;
  } else {
    error.value = true;
  }
});

const handleDelete = async () => {
  if (!post.value) return;
  
  const { deletePost } = usePosts();
  const result = await deletePost(post.value._id);
  if (result) {
    navigateTo('/dashboard/posts');
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Post Details</h1>
      <div v-if="post" class="flex gap-4">
        <NuxtLink :to="`/dashboard/posts/${postId}/edit`">
          <UButton color="primary" icon="i-tabler-edit">
            Edit
          </UButton>
        </NuxtLink>
        <UButton color="error" variant="ghost" icon="i-tabler-trash" @click="confirmDelete = true">
          Delete
        </UButton>
      </div>
    </div>

    <UCard v-if="post">
      <article>
        <header class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ post.title }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400">
            Created: {{ formatDate(post.createdAt) }}
          </p>
        </header>

        <div class="prose dark:prose-invert max-w-none" v-html="post.post_content" />
      </article>
    </UCard>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
      <NuxtLink to="/dashboard/posts">
        <UButton color="primary">Back to Posts</UButton>
      </NuxtLink>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="confirmDelete">
      <template #content>
        <UCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirm Delete
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div class="flex justify-end gap-4">
            <UButton color="gray" variant="ghost" @click="confirmDelete = false">
              Cancel
            </UButton>
            <UButton color="error" @click="handleDelete">
              Delete
            </UButton>
          </div>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
