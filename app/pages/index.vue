<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePostStore } from "#imports";
import useUserData from "~/composable/useUserData";

const { getUserData } = useUserData();
const { posts } = usePostStore();
const blogPosts = ref<Post[]>([]);
const getcurrentposts = () => {
    blogPosts.value = posts.value || [];
};

definePageMeta({
    layout: "default",
});
const userInput = ref({
    name: "",
    email: "",
});

onMounted(() => {
    const userdata = getUserData();
    if (userdata?.user) {
        userInput.value = {
            name: userdata.user.name || "My",
            email: userdata.user.email || "",
        };
    }
    getcurrentposts();
});
</script>

<template>
    <!-- Hero 区域 -->
    <NuxtLayout>
        <section class="py-20 md:py-32">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h1
                        class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        {{ userInput.name }} Blog
                    </h1>
                    <p
                        class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10"
                    >
                        Love yourself ~
                    </p>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>
