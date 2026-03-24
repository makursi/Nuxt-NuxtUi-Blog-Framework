<!-- layouts/default.vue -->
<script setup lang="ts">
import Header from "~/components/header.vue";
</script>

<template>
    <!-- ✅ 单一根元素 + 粘性 footer 布局 -->
    <div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
        <!-- 顶部导航栏（使用 Nuxt UI 组件） -->
        <header>
            <Header />
        </header>

        <!-- 页面内容区域（关键！） -->
        <main class="grow p-4 md:p-8">
            <slot />
        </main>
    </div>
</template>

<script lang="ts">
// 切换亮暗主题
const toggleColorMode = () => {
    const colorMode = useColorMode();
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
