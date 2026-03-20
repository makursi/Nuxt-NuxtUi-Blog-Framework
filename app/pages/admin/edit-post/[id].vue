<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { usePostStore } from "~/stores/post";
import slugify from "slugify";
import RichTextEditor from "~/components/RichTextEditor.vue";
import useMyToast from "~/composable/useMyToast";
import { navigateTo } from "nuxt/app";
import IconTabler from "~/components/IconTabler.vue";

// 页面元数据
definePageMeta({
  layout: "admin",
  title: "编辑文章",
});

const route = useRoute();
const postId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
const postStore = usePostStore();
const myToast = useMyToast();

// 本地文章数据，用于表单绑定
const localPostInput = ref({
  title: '',
  post_content: '',
  slug: '',
  excerpt: '',
  tags: [] as string[],
  status: 'draft' as 'draft' | 'published' | 'archived',
  tagsInput: ''
});

// 标记是否已加载文章数据
const isDataLoaded = ref(false);

// 从 store 获取文章数据并同步到本地
const loadPostData = async () => {
  try {
    await postStore.fetchPostById(postId);
    const post = postStore.currentPost;
    
    if (post) {
      // 将文章数据同步到本地
      localPostInput.value = {
        title: post.title || '',
        post_content: post.post_content || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        tags: post.tags || [],
        status: post.status || 'draft',
        tagsInput: ''
      };
      isDataLoaded.value = true;
    }
  } catch (error) {
    console.error("获取文章失败:", error);
    myToast.error("获取文章失败");
  }
};

// 监听文章数据变化，同步到 store 的 postInput
watch(() => localPostInput.value, (newValue) => {
  if (isDataLoaded.value) {
    postStore.postInput = { ...newValue };
  }
}, { deep: true });

// 监听标题变化以自动生成 slug
watch(
  () => localPostInput.value.title,
  (newTitle) => {
    if (newTitle && !localPostInput.value.slug) {
      localPostInput.value.slug = slugify(newTitle, { lower: true, strict: true });
    }
  },
);

// 防抖定时器
let debounceTimer: NodeJS.Timeout | null = null;

// 监听表单数据变化（带防抖）
watch(
  () => localPostInput.value,
  (newValue) => {
    // 清除之前的定时器
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // 设置新的定时器（500ms 防抖）
    debounceTimer = setTimeout(() => {
      console.log('表单数据已更改:', newValue);
      // 可以在这里添加自动保存逻辑
    }, 500);
  },
  { deep: true }
);

// 清理防抖定时器
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

// 保存文章
const savePost = async () => {
  try {
    // 验证必填字段
    if (!localPostInput.value.title.trim() || !localPostInput.value.post_content.trim()) {
      myToast.error("错误", "请填写标题和内容");
      return;
    }

    // 同步到 store
    postStore.postInput = { ...localPostInput.value };
    
    // 调用 store 的更新方法
    await postStore.updatePost(Number(postId));
    myToast.success("文章更新成功！");
    await navigateTo("/admin/list-of-post");
  } catch (error: any) {
    console.error("更新文章失败:", error);
    myToast.error("更新文章失败", error.message);
  }
};

// 添加标签
const addTag = () => {
  if (
    localPostInput.value.tagsInput?.trim() &&
    !localPostInput.value.tags.includes(localPostInput.value.tagsInput.trim())
  ) {
    localPostInput.value.tags.push(localPostInput.value.tagsInput.trim());
    localPostInput.value.tagsInput = "";
  }
};

// 移除标签
const removeTag = (tagToRemove: string) => {
  localPostInput.value.tags = localPostInput.value.tags.filter(
    (tag) => tag !== tagToRemove,
  );
};

// 页面加载时获取文章数据
onMounted(async () => {
  await loadPostData();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          编辑文章
        </h1>
      </div>

      <form @submit.prevent="savePost" class="space-y-6">
        <!-- 标题输入框 -->
        <UFormGroup label="文章标题" name="title" required class="mb-6">
          <UInput
            v-model="localPostInput.title"
            placeholder="请输入文章标题"
            size="lg"
            color="gray"
            variant="outline"
            class="mt-2"
          />
        </UFormGroup>

        <!-- 内容输入框 -->
        <UFormGroup label="文章内容" name="content" required class="mb-6">
          <ClientOnly class="mt-2">
            <RichTextEditor
              v-model="localPostInput.post_content"
              class="editor-wrapper w-full"
            />
            <template #fallback>
              <div
                class="border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[300px]"
              >
                <p class="text-center text-gray-500">加载编辑器中...</p>
              </div>
            </template>
          </ClientOnly>
        </UFormGroup>

        <!-- 标签输入框 -->
        <UFormGroup label="标签" name="tags" class="mb-6">
          <div class="mt-2">
            <div class="flex flex-wrap gap-2 mb-3">
              <UTag
                v-for="tag in localPostInput.tags"
                :key="tag"
                :label="tag"
                color="primary"
                size="sm"
                closable
                @close="removeTag(tag)"
              />
            </div>
            <div class="flex gap-2">
              <UInput
                v-model="localPostInput.tagsInput"
                placeholder="输入标签并按回车添加"
                size="sm"
                color="gray"
                variant="outline"
                @keydown.enter.prevent="addTag"
              />
              <UButton @click="addTag" color="gray" variant="outline" size="sm">
                添加
              </UButton>
            </div>
          </div>
        </UFormGroup>

        <UFormGroup label="文章状态" name="status" class="mb-6">
          <URadioGroup
            v-model="localPostInput.status"
            :options="[
              { label: '草稿', value: 'draft' },
              { label: '已发布', value: 'published' },
              { label: '已归档', value: 'archived' },
            ]"
            color="primary"
            class="mt-2"
          />
        </UFormGroup>

        <div class="pt-4 flex justify-between">
          <UButton
            :to="`/admin/list-of-post`"
            color="gray"
            variant="outline"
            size="lg"
            class="px-6 py-3"
          >
            <IconTabler name="tabler:arrow-left" class="mr-2" />
            取消
          </UButton>

          <UButton
            type="submit"
            :loading="postStore.loading.update"
            color="primary"
            size="lg"
            class="px-8 py-3"
          >
            <IconTabler name="tabler:check-circle" class="mr-2" />
            保存更改
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  min-height: 300px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;

  .dark & {
    border-color: #4b5563;
    background-color: #374151;
  }
}
</style>
