<script setup lang="ts">
import useAuth from "~/composable/auth";
definePageMeta({
    layout: "auth",
});

const { loginInput, loginUser, isLoading } = useAuth();
</script>

<template>
    <NuxtLayout>
        <div class="w-full max-w-md mx-auto">
            <form @submit.prevent="loginUser" class="space-y-4">
                <UFormField label="Email" name="email" required>
                    <UInput
                        type="email"
                        placeholder="Enter your email"
                        v-model="loginInput.email"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Password" name="password" required>
                    <UInput
                        type="password"
                        placeholder="Enter your password"
                        v-model="loginInput.password"
                        class="w-full"
                    />
                </UFormField>

                <div class="pt-4">
                    <UButton
                        type="submit"
                        color="primary"
                        variant="solid"
                        size="lg"
                        class="w-full py-2 text-center"
                        :loading="isLoading"
                    >
                        {{ isLoading ? "Processing..." : "Sign In" }}
                    </UButton>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped></style>
