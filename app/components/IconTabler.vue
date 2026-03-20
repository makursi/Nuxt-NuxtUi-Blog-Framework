<script setup lang="ts">
defineProps<{
  name: string
  size?: string | number
  class?: string
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <Icon
    :icon="name"
    :width="size || 24"
    :height="size || 24"
    :class="class"
    @click="$emit('click', $event)"
  />
</template>
