<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  requiresAuth: true,
});

const authStore = useAuthStore();
const postCount = ref(0);

onMounted(async () => {
  const { getCount } = usePosts();
  postCount.value = await getCount();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Welcome, {{ authStore.userName }}!
    </h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Stats Card -->
      <UCard>
        <div class="text-center">
          <p class="text-4xl font-bold text-primary-600">{{ postCount }}</p>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Total Posts</p>
        </div>
      </UCard>

      <!-- Quick Actions -->
      <UCard>
        <div class="space-y-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
          <NuxtLink to="/dashboard/posts/add">
            <UButton color="primary" block>
              Create New Post
            </UButton>
          </NuxtLink>
          <NuxtLink to="/dashboard/posts">
            <UButton color="gray" variant="ghost" block>
              View All Posts
            </UButton>
          </NuxtLink>
        </div>
      </UCard>
    </div>
  </div>
</template>
