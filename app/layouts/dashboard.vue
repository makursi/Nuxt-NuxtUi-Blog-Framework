<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Header />
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 min-h-[calc(100vh-64px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <nav class="p-4 space-y-2">
          <NuxtLink 
            to="/dashboard" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/posts" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
          >
            My Posts
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/posts/add" 
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
          >
            Create Post
          </NuxtLink>
        </nav>
      </aside>
      
      <!-- Main content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
