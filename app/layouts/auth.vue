<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const isLoginPage = route.path === "/login";
const isRegisterPage = route.path === "/register";
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
        <!-- 装饰元素 -->
        <div class="absolute inset-0 overflow-hidden z-0">
            <div
                class="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl dark:bg-primary/5"
            ></div>
            <div
                class="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl dark:bg-secondary/5"
            ></div>
        </div>

        <div class="relative z-10 w-full max-w-md">
            <!-- 卡片容器 -->
            <UCard
                class="overflow-hidden shadow-xl border-0 transform transition-all duration-300 hover:shadow-2xl"
            >
                <!-- 卡片头部 -->
                <div
                    class="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white"
                >
                    <div class="flex items-center justify-center mb-2">
                        <IconTabler
                            name="tabler:shield-check"
                            class="w-8 h-8"
                        />
                    </div>
                    <h1 class="text-2xl font-bold text-center">
                        {{
                            isLoginPage ? "Welcome Back" : "Create Your Account"
                        }}
                    </h1>
                </div>
                <div class="mt-4 text-center">
                    <NuxtLink
                        to="/"
                        class="text-primary-400 dark:text-primary-400 font-medium hover:underline transition-colors text-center"
                    >
                        Home
                    </NuxtLink>
                </div>

                <!-- 卡片内容 -->
                <div class="p-6">
                    <!-- 登录/注册表单内容 -->
                    <slot></slot>

                    <!-- 分割线 -->
                    <div class="relative my-6">
                        <div class="absolute inset-0 flex items-center">
                            <div
                                class="w-full border-t border-gray-200 dark:border-gray-700"
                            ></div>
                        </div>
                        <div class="relative flex justify-center">
                            <span
                                class="px-3 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400"
                            ></span>
                        </div>
                    </div>
                </div>

                <!-- 卡片底部 -->
                <div
                    class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700"
                >
                    <p
                        class="text-center text-sm text-gray-600 dark:text-gray-400"
                    >
                        {{
                            isLoginPage
                                ? "Don't have an account?"
                                : "Already have an account?"
                        }}
                        <NuxtLink
                            :to="isLoginPage ? '/register' : '/login'"
                            class="text-primary-600 dark:text-primary-400 font-medium hover:underline transition-colors"
                        >
                            {{ isLoginPage ? "Sign Up" : "Sign In" }}
                        </NuxtLink>
                    </p>
                </div>
            </UCard>
        </div>
    </div>
</template>
