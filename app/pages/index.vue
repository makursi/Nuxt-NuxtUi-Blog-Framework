<script setup lang="ts">
const postsStore = usePostsStore();
const authStore = useAuthStore();

// Fetch posts on client side only
onMounted(async () => {
  const { getAll } = usePosts();
  await getAll();
});

const posts = computed(() => postsStore.posts);
const postCount = computed(() => postsStore.postCount);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getExcerpt = (content: string, length: number = 120) => {
  const text = content.replace(/<[^>]*>/g, '');
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Fun gradient colors for cards
const cardGradients = [
  'from-pink-500 via-purple-500 to-indigo-500',
  'from-cyan-500 via-blue-500 to-purple-500',
  'from-orange-500 via-red-500 to-pink-500',
  'from-green-500 via-teal-500 to-cyan-500',
  'from-yellow-500 via-orange-500 to-red-500',
  'from-violet-500 via-purple-500 to-fuchsia-500',
];

const getCardGradient = (index: number) => {
  return cardGradients[index % cardGradients.length];
};

// Social links for footer
const socialLinks = [
  { name: 'Twitter', icon: 'i-simple-icons-x', url: 'https://twitter.com' },
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com' },
];

// Footer links
const footerLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Privacy', to: '/privacy' },
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 md:py-32">

      <div class="container mx-auto px-4 relative">
        <div class="max-w-5xl mx-auto">
          <!-- User Profile Card -->
          <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10 border border-white/20 dark:border-slate-700/50 mb-16">
            <div class="flex flex-col md:flex-row items-center gap-8">
              <!-- User Info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">
                  <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    {{ authStore.userName || 'My' }} Blog
                  </span>
                </h1>
                <!-- Stats -->
                <div class="flex flex-wrap items-center justify-center md:justify-start gap-6">
                  <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full">
                    <span class="i-tabler-file-text text-pink-500" />
                    <span class="font-semibold text-slate-700 dark:text-slate-300">{{ postCount }} Articles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Header -->
          <div class="flex items-center gap-4 mb-10">
            <div class="flex items-center gap-2">
              <span class="i-tabler-sparkles text-2xl text-purple-500" />
              <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Latest Articles</h2>
            </div>
            <div class="flex-1 h-px bg-gradient-to-r from-purple-200 via-pink-200 to-transparent dark:from-purple-800 dark:via-pink-800 dark:to-transparent" />
          </div>

          <!-- Posts Grid -->
          <div v-if="posts && posts.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(post, index) in posts"
              :key="post._id"
              class="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer"
            >
              <!-- Gradient accent bar -->
              <div :class="['h-2 bg-gradient-to-r', getCardGradient(index)]" />

              <NuxtLink :to="`/${post.user}/${post.slug}`" class="block p-6">
                <!-- Date badge -->
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <span class="i-tabler-calendar w-4 h-4" />
                  <span>{{ formatDate(post.createdAt) }}</span>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                  {{ post.title }}
                </h3>

                <!-- Excerpt -->
                <p class="text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                  {{ getExcerpt(post.post_content) }}
                </p>

                <!-- Read More -->
                <div class="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Read article</span>
                  <span class="i-tabler-arrow-right w-4 h-4" />
                </div>
              </NuxtLink>
            </article>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-24">
            <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-3">No articles yet</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              The blog is waiting for its first story. Be the one to write it!
            </p>
            <NuxtLink v-if="authStore.isAuthenticated" to="/dashboard/posts/add">
              <UButton color="primary" size="lg" class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600">
                Write your first post
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>


    <!-- Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
          <div class="grid gap-8 md:grid-cols-3">
            <!-- Brand -->
            <div>
              <h3 class="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                {{ authStore.userName || 'My' }} Blog
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                A creative space for sharing ideas, stories, and inspiration.
              </p>
            </div>

            <!-- Links -->
            <div>
              <h4 class="font-semibold text-slate-800 dark:text-white mb-4">Quick Links</h4>
              <ul class="space-y-2">
                <li v-for="link in footerLinks" :key="link.name">
                  <NuxtLink :to="link.to" class="text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors text-sm">
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Social -->
            <div>
              <h4 class="font-semibold text-slate-800 dark:text-white mb-4">Connect</h4>
              <div class="flex items-center gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 hover:text-white transition-all duration-300"
                  :title="social.name"
                >
                  <span :class="[social.icon, 'w-5 h-5']" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(30px, 10px) scale(1.05);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
