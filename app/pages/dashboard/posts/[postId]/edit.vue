<script setup lang="ts">
import type { PostFormInput } from '~/types';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  requiresAuth: true,
});

const route = useRoute();
const router = useRouter();
const postId = route.params.postId as string;

const post = ref<any>(null);
const error = ref<any>(null);

onMounted(async () => {
  const { getBySlug } = usePosts();
  const result = await getBySlug(postId);
  if (result) {
    post.value = result;
  } else {
    error.value = true;
  }
});

const handleSubmit = async (data: PostFormInput) => {
  if (!post.value) return;
  
  const { update } = usePosts();
  const result = await update(post.value._id, data);
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
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Post</h1>

    <UCard v-if="post">
      <PostForm
        mode="edit"
        :post="{
          _id: post._id,
          title: post.title,
          post_content: post.post_content,
          slug: post.slug,
          user: post.user,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        }"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </UCard>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
      <NuxtLink to="/dashboard/posts">
        <UButton color="primary">Back to Posts</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
