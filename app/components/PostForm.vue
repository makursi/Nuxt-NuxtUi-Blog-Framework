<script setup lang="ts">
import type { Post, PostFormInput } from '~/types';
import { postFormSchema } from '../../schemas/post.schema';

const props = defineProps<{
  mode: 'create' | 'edit';
  post?: Post;
}>();

const emit = defineEmits<{
  submit: [data: PostFormInput];
  cancel: [];
}>();

const form = reactive<PostFormInput>({
  title: props.mode === 'edit' && props.post ? props.post.title : '',
  post_content: props.mode === 'edit' && props.post ? props.post.post_content : '',
});

const errors = reactive<Record<string, string>>({});

const validate = (): boolean => {
  const result = postFormSchema.safeParse(form);
  
  if (!result.success) {
    result.error.errors.forEach(err => {
      if (err.path[0]) {
        errors[err.path[0] as string] = err.message;
      }
    });
    return false;
  }
  
  // Clear errors
  Object.keys(errors).forEach(key => delete errors[key]);
  return true;
};

const onSubmit = () => {
  if (validate()) {
    emit('submit', {
      title: form.title,
      post_content: form.post_content,
    });
  }
};

const onCancel = () => {
  emit('cancel');
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Title -->
    <UFormField label="Title" name="title" required :error="errors.title">
      <UInput
        v-model="form.title"
        placeholder="Enter post title"
        size="lg"
      />
    </UFormField>

    <!-- Content -->
    <UFormField label="Content" name="post_content" required :error="errors.post_content">
      <RichTextEditor v-model="form.post_content" />
    </UFormField>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <UButton type="submit" color="primary" size="lg">
        {{ mode === 'create' ? 'Create Post' : 'Update Post' }}
      </UButton>
      <UButton type="button" color="gray" variant="ghost" size="lg" @click="onCancel">
        Cancel
      </UButton>
    </div>
  </form>
</template>
