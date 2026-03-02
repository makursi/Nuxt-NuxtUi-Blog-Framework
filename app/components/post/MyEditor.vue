<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// 本地存储编辑器内容
const content = ref(props.modelValue)

// 监听props变化，更新本地值
watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue
  }
})

// 监听本地值变化，emit事件
watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div class="tiptap-editor">
    <TiptapEditor
      v-model="content"
      :extensions="[
        'Bold',
        'Italic',
        'Underline',
        'Heading',
        'BulletList',
        'OrderedList',
        'Blockquote',
        'CodeBlock',
        'HorizontalRule',
        'History'
      ]"
      :toolbar="[
        'bold',
        'italic',
        'underline',
        'heading',
        'bulletList',
        'orderedList',
        'blockquote',
        'codeBlock',
        'horizontalRule',
        'history'
      ]"
    />
  </div>
</template>

<style lang="scss" scoped>
.tiptap-editor {
  width: 100%;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1f2937;
  
  :deep(.tiptap-editor-content) {
    min-height: 300px;
    padding: 1rem;
    color: white;
  }
  
  :deep(.tiptap-toolbar) {
    background: #1f2937;
    border-bottom: 1px solid #374151;
    padding: 0.5rem;
    
    button {
      color: white;
      
      &:hover {
        background: #374151;
      }
      
      &.is-active {
        background: #4b5563;
      }
    }
  }
}
</style>