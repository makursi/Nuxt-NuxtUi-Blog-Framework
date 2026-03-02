<script setup lang="ts">
import { ref, watch } from 'vue'
import { navigateTo, showError, useRuntimeConfig } from 'nuxt/app'
import slugify from 'slugify'
import useMyToast from '~/composable/useMyToast'
import useUserData from '~/composable/useUserData'
import RichTextEditor from '~/components/RichTextEditor.vue'
// 页面元数据
definePageMeta({
  layout: 'admin',
  title: 'Create New Post'
})

// 类型定义
interface PostInput {
  title: string
  post_content: string
  slug: string
}

// 初始化 composables
const myToast = useMyToast()
const { getUserData } = useUserData()

// 表单数据
const postInput = ref<PostInput>({
  title: '',
  post_content: '',
  slug: ''
})

// 加载状态
const loading = ref(false)

// 配置
const config = useRuntimeConfig()

// 监听标题变化，自动生成slug
watch(() => postInput.value.title, (newTitle) => {
  if (newTitle && !postInput.value.slug) {
    postInput.value.slug = slugify(newTitle, { lower: true, strict: true })
  }
})

/**
 * 创建新文章
 * @returns {Promise<void>}
 * @description 发送POST请求创建新文章，成功后跳转到仪表盘
 */
const createPost = async (): Promise<void> => {
  try {
    // 验证表单
    if (!postInput.value.title.trim() || !postInput.value.post_content.trim()) {
      myToast.error('Error', 'Please fill in all required fields')
      return
    }

    loading.value = true
    
    // 获取用户数据
    const userData = getUserData()
    if (!userData.token) {
      myToast.error('Error', 'Please login first')
      await navigateTo('/auth/login')
      return
    }

    // 发送请求
    const response = await $fetch(`${config.public.API_BASE_URL}/posts/createpost`, {
      //请求头携带token
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      method: 'POST',
      body: postInput.value
    })

    myToast.success('Success', 'Post created successfully!')
    await navigateTo('/admin/dashboard')
  } catch (error: any) {
    if (error?.response?.status === 401) {
      showError(error.response?._data?.message || 'Unauthorized')
      await navigateTo('/auth/login')
    } else {
      myToast.error('Error', error?.message || 'Failed to create post')
    }
  } finally {
    loading.value = false
  }
}

/**
 * 取消创建
 * @returns {Promise<void>}
 * @description 取消创建并导航回仪表盘
 */
const handleCancel = async (): Promise<void> => {
  await navigateTo('/admin/dashboard')
}
</script>

<template>
  <NuxtLayout>
  <div class="min-h-screen bg-gray-900 text-white">
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white mb-2">Create New Post</h1>
      </div>
      
      <!-- 表单卡片 -->
      <div class="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <!-- 表单内容 -->
        <div class="p-6 space-y-6">
          <!-- 标题输入 -->
          <div class="space-y-3">
            <UFormField label="Post Title">
              <UInput 
                placeholder="Enter your post title" 
                v-model="postInput.title" 
                class="bg-gray-700 border-gray-600 text-white"
                :class="{ 'ring-2 ring-indigo-500': postInput.title }"
                size="lg"
              />
            </UFormField>
          </div>
          
          <!-- 编辑器区域 -->
          <div class="space-y-3">
            <UFormField label="Content">
              <ClientOnly>
                <RichTextEditor v-model="postInput.post_content"/>
              </ClientOnly>
            </UFormField>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-700">
            <UButton 
              variant="secondary" 
              class="bg-gray-700 hover:bg-gray-600 text-white"
              @click="handleCancel"
              size="lg"
            >
              <template #left>
                <span class="i-heroicons-arrow-left mr-2"></span>
              </template>
              Cancel
            </UButton>
            <UButton 
              @click="createPost" 
              :loading="loading"
              class="bg-indigo-600 hover:bg-indigo-700 text-white"
              size="lg"
            >
              <template #left>
                <span class="i-heroicons-paper-airplane mr-2"></span>
              </template>
              {{ loading ? 'Publishing...' : 'Publish Post' }}
            </UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
  </NuxtLayout>
</template>

<style scoped>
/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>