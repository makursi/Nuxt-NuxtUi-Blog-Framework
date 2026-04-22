<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  requiresAuth: true,
});

const postsStore = usePostsStore();
const posts = computed(() => postsStore.posts);

const deleteTargetId = ref<string | null>(null);
const showDeleteModal = ref(false);

onMounted(async () => {
  const { getAll } = usePosts();
  await getAll();
});

const openDeleteModal = (postId: string) => {
  deleteTargetId.value = postId;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteTargetId.value = null;
  showDeleteModal.value = false;
};

const handleDelete = async () => {
  if (!deleteTargetId.value) return;
  
  const { deletePost } = usePosts();
  const result = await deletePost(deleteTargetId.value);
  if (result) {
    closeDeleteModal();
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h1>
      <NuxtLink to="/dashboard/posts/add">
        <UButton color="primary" icon="i-tabler-plus">
          New Post
        </UButton>
      </NuxtLink>
    </div>

    <!-- Posts List -->
    <div v-if="posts && posts.length > 0" class="space-y-4">
      <UCard v-for="post in posts" :key="post._id">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ post.title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ formatDate(post.createdAt) }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <NuxtLink :to="`/dashboard/posts/${post._id}/edit`">
              <UButton color="gray" variant="ghost" icon="i-tabler-edit">
                Edit
              </UButton>
            </NuxtLink>
            <UButton
              color="error"
              variant="ghost"
              icon="i-tabler-trash"
              @click="openDeleteModal(post._id)"
            >
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400 text-lg mb-4">
        You haven't created any posts yet.
      </p>
      <NuxtLink to="/dashboard/posts/add">
        <UButton color="primary">
          Create Your First Post
        </UButton>
      </NuxtLink>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="showDeleteModal">
      <template #content>
        <UCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirm Delete
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div class="flex justify-end gap-4">
            <UButton color="gray" variant="ghost" @click="closeDeleteModal">
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
