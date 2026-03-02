<script setup lang="ts">
import { ref, watch } from 'vue'
import { navigateTo, showError } from 'nuxt/app'
import slugify from 'slugify'
import MyEditor from '~/components/post/MyEditor.vue';
import useMyToast from '~/composable/useMyToast';
const myToast = useMyToast()
const postInput = ref({
   title:'',
   post_content:'',
   slug:''
})

// 监听标题变化，自动生成slug
watch(()=>postInput.value.title, (newTitle) => {
  if (newTitle && !postInput.value.slug) {
    postInput.value.slug = slugify(newTitle, { lower: true, strict: true })
  }
})
definePageMeta({
  layout: 'admin'
});
const config = useRuntimeConfig()
const loading = ref(false)

/**
 * 创建新文章
 * @returns {Promise<void>}
 * @description 发送POST请求创建新文章，成功后跳转到仪表盘
 */
const createPost = async ()=>{
  try {
    loading.value = true;
    const userData = JSON.parse(localStorage.getItem("userdata") || '{}')
    const res = await $fetch(config.public?.API_BASE_URL + "/posts/createpost", {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${userData?.token}`,
      },
      method: "POST",
      body: postInput.value
    });

    myToast.success('Post created successfully!');
    await navigateTo('/admin/dashboard');
  } catch (error) {
    loading.value = false;
    if (error?.response?.status === 401) {
      showError(error.response?._data?.message);
      await navigateTo('/admin/create-post');
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-900 text-white">
      <main class="container mx-auto px-6 py-8 max-w-4xl">
        <div class="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <!-- 页面标题 -->
          <div class="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
            <h1 class="text-2xl font-bold">Create New Post</h1>
            <p class="text-sm text-white/80">Write and publish your content</p>
          </div>
          
          <!-- 表单内容 -->
          <div class="p-6 space-y-6">
            <!-- 标题输入 -->
            <div class="space-y-2">
              <UFormField label="Post Title">
                <UInput 
                  placeholder="Enter your post title" 
                  v-model="postInput.title" 
                  class="bg-gray-700 border-gray-600 text-white"
                  :class="{ 'ring-2 ring-purple-500': postInput.title }"
                />
              </UFormField>
              
              <!-- Slug 显示 -->
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-400">Slug:</span>
                <span class="text-sm font-mono bg-gray-700 px-3 py-1 rounded">{{ postInput.slug || 'Will be generated automatically' }}</span>
              </div>
            </div>
            
            <!-- 编辑器区域 -->
            <div class="space-y-2">
              <UFormField label="Content">
                <ClientOnly>
                  <div class="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">
                    <MyEditor v-model="postInput.post_content" />
                  </div>
                </ClientOnly>
              </UFormField>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-700">
              <UButton 
                variant="secondary" 
                class="bg-gray-700 hover:bg-gray-600"
                @click="navigateTo('/admin/dashboard')"
              >
                Cancel
              </UButton>
              <UButton 
                @click="createPost" 
                :loading="loading"
                class="bg-purple-600 hover:bg-purple-700"
              >
                {{ loading ? 'Publishing...' : 'Publish Post' }}
              </UButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
/* 编辑器样式增强 */
:deep(.tiptap-editor) {
  min-height: 400px;
  padding: 1rem;
  background: #1f2937;
  border: none;
  
  /* Tiptap 工具栏样式 */
  :deep(.tiptap) {
    color: white;
    
    &:focus {
      outline: none;
    }
    
    /* 段落样式 */
    p {
      margin: 0 0 1rem 0;
      line-height: 1.6;
    }
    
    /* 标题样式 */
    h1, h2, h3, h4, h5, h6 {
      color: white;
      margin: 1.5rem 0 1rem 0;
      font-weight: 600;
    }
    
    h1 {
      font-size: 1.875rem;
      border-bottom: 2px solid #4b5563;
      padding-bottom: 0.5rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    /* 列表样式 */
    ul, ol {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    
    li {
      margin: 0.5rem 0;
    }
    
    /* 链接样式 */
    a {
      color: #8b5cf6;
      text-decoration: underline;
      
      &:hover {
        color: #a78bfa;
      }
    }
    
    /* 代码块样式 */
    pre {
      background: #111827;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1rem 0;
      
      code {
        background: transparent;
        padding: 0;
        color: #f3f4f6;
      }
    }
    
    /* 引用样式 */
    blockquote {
      border-left: 4px solid #8b5cf6;
      padding-left: 1rem;
      margin: 1rem 0;
      color: #d1d5db;
      font-style: italic;
    }
  }
}
</style>