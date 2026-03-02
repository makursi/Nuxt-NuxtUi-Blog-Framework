<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 创建编辑器实例
const editor = useEditor({
  extensions: [
    StarterKit
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'prose prose-invert max-w-none'
    },
    placeholder: 'Start writing your content...'
  }
})

// 监听props变化，更新编辑器内容
watch(() => props.modelValue, (newValue) => {
  if (newValue !== editor.value?.getHTML()) {
    editor.value?.commands.setContent(newValue)
  }
}, { immediate: true })

// 工具栏按钮状态
const isActive = (type: string) => {
  return editor.value?.isActive(type) || false
}

// 执行命令
const executeCommand = (command: string, ...args: any[]) => {
  editor.value?.commands[command](...args)
}
</script>

<template>
  <div class="rich-text-editor">
    <!-- 工具栏 -->
    <div class="toolbar bg-gray-800 border-b border-gray-700 p-2 flex flex-wrap gap-1">
      <!-- 基础格式 -->
      <div class="flex items-center space-x-1 p-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleBold')"
          :class="{ 'bg-indigo-600 text-white': isActive('bold') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Bold"
        >
          <span class="font-bold">B</span>
        </button>
        <button
          @click="executeCommand('toggleItalic')"
          :class="{ 'bg-indigo-600 text-white': isActive('italic') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Italic"
        >
          <span class="italic">I</span>
        </button>
        <button
          @click="executeCommand('toggleUnderline')"
          :class="{ 'bg-indigo-600 text-white': isActive('underline') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Underline"
        >
          <span class="underline">U</span>
        </button>
        <button
          @click="executeCommand('toggleStrike')"
          :class="{ 'bg-indigo-600 text-white': isActive('strike') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Strike"
        >
          <span class="line-through">S</span>
        </button>
      </div>

      <!-- 标题 -->
      <div class="flex items-center space-x-1 p-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('setHeading', { level: 1 })"
          :class="{ 'bg-indigo-600 text-white': isActive('heading', { level: 1 }) }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="H1"
        >
          <span class="text-xl font-bold">H1</span>
        </button>
        <button
          @click="executeCommand('setHeading', { level: 2 })"
          :class="{ 'bg-indigo-600 text-white': isActive('heading', { level: 2 }) }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="H2"
        >
          <span class="text-lg font-bold">H2</span>
        </button>
        <button
          @click="executeCommand('setHeading', { level: 3 })"
          :class="{ 'bg-indigo-600 text-white': isActive('heading', { level: 3 }) }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="H3"
        >
          <span class="text-base font-bold">H3</span>
        </button>
        <button
          @click="executeCommand('setParagraph')"
          :class="{ 'bg-indigo-600 text-white': isActive('paragraph') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Paragraph"
        >
          <span>¶</span>
        </button>
      </div>

      <!-- 列表和引用 -->
      <div class="flex items-center space-x-1 p-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleBulletList')"
          :class="{ 'bg-indigo-600 text-white': isActive('bulletList') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Bullet List"
        >
          <span>•</span>
        </button>
        <button
          @click="executeCommand('toggleOrderedList')"
          :class="{ 'bg-indigo-600 text-white': isActive('orderedList') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Ordered List"
        >
          <span>1.</span>
        </button>
        <button
          @click="executeCommand('toggleBlockquote')"
          :class="{ 'bg-indigo-600 text-white': isActive('blockquote') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Blockquote"
        >
          <span>">"</span>
        </button>
      </div>

      <!-- 代码和分割线 -->
      <div class="flex items-center space-x-1 p-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleCodeBlock')"
          :class="{ 'bg-indigo-600 text-white': isActive('codeBlock') }"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Code Block"
        >
          <span>{ }</span>
        </button>
        <button
          @click="executeCommand('setHorizontalRule')"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Horizontal Rule"
        >
          <span>---</span>
        </button>
      </div>

      <!-- 历史记录 -->
      <div class="flex items-center space-x-1 p-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('undo')"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Undo"
        >
          <span>↶</span>
        </button>
        <button
          @click="executeCommand('redo')"
          class="p-2 rounded hover:bg-gray-600 transition-colors"
          title="Redo"
        >
          <span>↷</span>
        </button>
      </div>
    </div>

    <!-- 编辑器内容 -->
    <div class="editor-content">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rich-text-editor {
  width: 100%;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1f2937;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .editor-content {
    min-height: 400px;
    padding: 1.5rem;
    color: white;
    font-size: 1rem;
    line-height: 1.6;

    :deep(.ProseMirror) {
      &:focus {
        outline: none;
      }

      // 富文本内容样式
      h1, h2, h3, h4, h5, h6 {
        color: white;
        margin: 1.5rem 0 1rem 0;
        font-weight: 600;
      }

      h1 {
        font-size: 1.875rem;
        border-bottom: 2px solid #374151;
        padding-bottom: 0.5rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.25rem;
      }

      p {
        margin-bottom: 1rem;
      }

      ul, ol {
        margin: 1rem 0;
        padding-left: 1.5rem;
      }

      li {
        margin: 0.5rem 0;
      }

      blockquote {
        border-left: 4px solid #6366f1;
        padding-left: 1rem;
        margin: 1rem 0;
        color: #a0aec0;
        font-style: italic;
      }

      pre {
        background: #1a202c;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin: 1rem 0;

        code {
          background: transparent;
          padding: 0;
          color: #f3f4f6;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
      }

      a {
        color: #6366f1;
        text-decoration: underline;

        &:hover {
          color: #818cf8;
        }
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1rem 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;

        th, td {
          border: 1px solid #374151;
          padding: 0.75rem;
          text-align: left;
        }

        th {
          background: #2d3748;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: #2d3748;
        }
      }
    }
  }
}
</style>