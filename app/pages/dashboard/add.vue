<template>
  <div class="add-post-page p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Add New Post</h1>
      <p class="text-gray-500">Post form will be implemented in Task 12.3</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>
