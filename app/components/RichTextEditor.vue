<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="tiptap-editor">
    <TiptapEditor
      v-model="innerValue"
      :extensions="[
        'Bold',
        'Italic',
        'Underline',
        'Strike',
        'Heading',
        'BulletList',
        'OrderedList',
        'Blockquote',
        'CodeBlock',
        'HorizontalRule',
        'Link',
        'Image',
        'Table',
        'History'
      ]"
      :toolbar="[
        ['bold', 'italic', 'underline', 'strike'],
        ['heading'],
        ['bulletList', 'orderedList', 'blockquote'],
        ['codeBlock', 'horizontalRule'],
        ['link', 'image'],
        ['table'],
        ['history']
      ]"
      :editor-props="{
        placeholder: 'Start writing your content...'
      }"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>