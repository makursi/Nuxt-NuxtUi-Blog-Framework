<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const editor = useEditor({
  extensions: [StarterKit],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px]',
    },
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== editor.value?.getHTML()) {
      editor.value?.commands.setContent(newValue);
    }
  },
  { immediate: true }
);

const isActive = (type: string, attrs?: Record<string, any>) => {
  return editor.value?.isActive(type, attrs) || false;
};

const executeCommand = (command: string, ...args: any[]) => {
  editor.value?.commands[command](...args);
};
</script>

<template>
  <div class="rich-text-editor border border-gray-700 rounded-lg overflow-hidden">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-1 p-2 bg-gray-800 border-b border-gray-700">
      <!-- Text formatting -->
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleBold')"
          :class="[
            isActive('bold') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Bold"
        >
          <span class="font-bold">B</span>
        </button>
        <button
          @click="executeCommand('toggleItalic')"
          :class="[
            isActive('italic') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Italic"
        >
          <span class="italic">I</span>
        </button>
        <button
          @click="executeCommand('toggleStrike')"
          :class="[
            isActive('strike') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Strike"
        >
          <span class="line-through">S</span>
        </button>
      </div>

      <!-- Headings -->
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleHeading', { level: 1 })"
          :class="[
            isActive('heading', { level: 1 }) ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'px-2 py-1 rounded text-sm font-bold transition-colors',
          ]"
          title="H1"
        >
          H1
        </button>
        <button
          @click="executeCommand('toggleHeading', { level: 2 })"
          :class="[
            isActive('heading', { level: 2 }) ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'px-2 py-1 rounded text-sm font-bold transition-colors',
          ]"
          title="H2"
        >
          H2
        </button>
        <button
          @click="executeCommand('toggleHeading', { level: 3 })"
          :class="[
            isActive('heading', { level: 3 }) ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'px-2 py-1 rounded text-sm font-bold transition-colors',
          ]"
          title="H3"
        >
          H3
        </button>
      </div>

      <!-- Lists -->
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleBulletList')"
          :class="[
            isActive('bulletList') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Bullet List"
        >
          <span>•</span>
        </button>
        <button
          @click="executeCommand('toggleOrderedList')"
          :class="[
            isActive('orderedList') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Ordered List"
        >
          <span>1.</span>
        </button>
        <button
          @click="executeCommand('toggleBlockquote')"
          :class="[
            isActive('blockquote') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Blockquote"
        >
          <span>❝</span>
        </button>
      </div>

      <!-- Code & Misc -->
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('toggleCodeBlock')"
          :class="[
            isActive('codeBlock') ? 'bg-primary-600 text-white' : 'hover:bg-gray-600 text-gray-300',
            'p-1.5 rounded transition-colors',
          ]"
          title="Code Block"
        >
          <span>{ }</span>
        </button>
        <button
          @click="executeCommand('setHorizontalRule')"
          class="hover:bg-gray-600 text-gray-300 p-1.5 rounded transition-colors"
          title="Horizontal Rule"
        >
          <span>—</span>
        </button>
      </div>

      <!-- Undo/Redo -->
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
        <button
          @click="executeCommand('undo')"
          class="hover:bg-gray-600 text-gray-300 p-1.5 rounded transition-colors"
          title="Undo"
        >
          <span>↩</span>
        </button>
        <button
          @click="executeCommand('redo')"
          class="hover:bg-gray-600 text-gray-300 p-1.5 rounded transition-colors"
          title="Redo"
        >
          <span>↪</span>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content min-h-[400px] p-6 bg-gray-800 text-white text-base leading-relaxed">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style>
.rich-text-editor .ProseMirror {
  outline: none;
}

.rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
