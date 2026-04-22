<script setup lang="ts">
const route = useRoute();
const authStore = useAuthStore();
const postsStore = usePostsStore();

const userId = route.params.userId as string;
const postSlug = route.params.postSlug as string;

const post = ref<any>(null);
const error = ref<any>(null);

onMounted(async () => {
  const { getBySlug } = usePosts();
  const result = await getBySlug(postSlug);
  if (result) {
    post.value = result;
  } else {
    error.value = true;
  }
});

const isAuthor = computed(() => {
  return authStore.user?._id === post.value?.user;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-12">
      <article v-if="post" class="max-w-3xl mx-auto">
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ post.title }}
          </h1>
          <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span>{{ formatDate(post.createdAt) }}</span>
          </div>

          <!-- Author Actions -->
          <div v-if="isAuthor" class="mt-4 flex gap-4">
            <NuxtLink :to="`/dashboard/posts/${post._id}/edit`">
              <UButton color="primary" variant="ghost" icon="i-tabler-edit">
                Edit
              </UButton>
            </NuxtLink>
          </div>
        </header>

        <!-- Content -->
        <div class="prose prose-lg dark:prose-invert max-w-none" v-html="post.post_content" />
      </article>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
        <NuxtLink to="/">
          <UButton color="primary">Go Home</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
