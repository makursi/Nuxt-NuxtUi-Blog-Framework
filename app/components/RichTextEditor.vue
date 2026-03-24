<script setup lang="ts">
import { ref, watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const editor = useEditor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
        emit("update:modelValue", editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: "prose prose-invert max-w-none focus:outline-none",
        },
        placeholder: "Start writing your content...",
    },
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== editor.value?.getHTML()) {
            editor.value?.commands.setContent(newValue);
        }
    },
    { immediate: true },
);

const isActive = (type: string) => {
    return editor.value?.isActive(type) || false;
};

const executeCommand = (command: string, ...args: any[]) => {
    editor.value?.commands[command](...args);
};
</script>

<template>
    <div class="rich-text-editor">
        <div
            class="flex flex-wrap items-center gap-1 p-2 bg-gray-800 border-b border-gray-700"
        >
            <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                <button
                    @click="executeCommand('toggleBold')"
                    :class="[
                        isActive('bold')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Bold"
                >
                    <span class="font-bold">B</span>
                </button>
                <button
                    @click="executeCommand('toggleItalic')"
                    :class="[
                        isActive('italic')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Italic"
                >
                    <span class="italic">I</span>
                </button>
                <button
                    @click="executeCommand('toggleUnderline')"
                    :class="[
                        isActive('underline')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Underline"
                >
                    <span class="underline">U</span>
                </button>
                <button
                    @click="executeCommand('toggleStrike')"
                    :class="[
                        isActive('strike')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Strike"
                >
                    <span class="line-through">S</span>
                </button>
            </div>

            <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                <button
                    @click="executeCommand('setHeading', { level: 1 })"
                    :class="[
                        isActive('heading', { level: 1 })
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'px-2 py-1 rounded text-sm font-bold transition-colors',
                    ]"
                    title="H1"
                >
                    H1
                </button>
                <button
                    @click="executeCommand('setHeading', { level: 2 })"
                    :class="[
                        isActive('heading', { level: 2 })
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'px-2 py-1 rounded text-sm font-bold transition-colors',
                    ]"
                    title="H2"
                >
                    H2
                </button>
                <button
                    @click="executeCommand('setHeading', { level: 3 })"
                    :class="[
                        isActive('heading', { level: 3 })
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'px-2 py-1 rounded text-sm font-bold transition-colors',
                    ]"
                    title="H3"
                >
                    H3
                </button>
                <button
                    @click="executeCommand('setParagraph')"
                    :class="[
                        isActive('paragraph')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'px-2 py-1 rounded text-sm transition-colors',
                    ]"
                    title="Paragraph"
                >
                    ¶
                </button>
            </div>

            <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                <button
                    @click="executeCommand('toggleBulletList')"
                    :class="[
                        isActive('bulletList')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Bullet List"
                >
                    <span>•</span>
                </button>
                <button
                    @click="executeCommand('toggleOrderedList')"
                    :class="[
                        isActive('orderedList')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Ordered List"
                >
                    <span>1.</span>
                </button>
                <button
                    @click="executeCommand('toggleBlockquote')"
                    :class="[
                        isActive('blockquote')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Blockquote"
                >
                    <span>❝</span>
                </button>
            </div>

            <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                <button
                    @click="executeCommand('toggleCodeBlock')"
                    :class="[
                        isActive('codeBlock')
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Code Block"
                >
                    <span>{ }</span>
                </button>
                <button
                    @click="executeCommand('setHorizontalRule')"
                    :class="[
                        'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Horizontal Rule"
                >
                    <span>—</span>
                </button>
            </div>

            <div class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                <button
                    @click="executeCommand('undo')"
                    :class="[
                        'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Undo"
                >
                    <span>↩</span>
                </button>
                <button
                    @click="executeCommand('redo')"
                    :class="[
                        'hover:bg-gray-600 text-gray-300',
                        'p-1.5 rounded transition-colors',
                    ]"
                    title="Redo"
                >
                    <span>↪</span>
                </button>
            </div>
        </div>

        <div
            class="editor-content min-h-[400px] p-6 bg-gray-800 text-white text-base leading-relaxed"
        >
            <EditorContent :editor="editor" />
        </div>
    </div>
</template>
