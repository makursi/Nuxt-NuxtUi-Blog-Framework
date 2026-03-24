<script setup lang="ts">
definePageMeta({
    layout: "auth",
});

import useAuth from "~/composable/auth";
const { registerInput, isLoading, registerUser } = useAuth();

const createUser = async () => {
    await registerUser();
};
</script>

<template>
    <div class="w-full max-w-md mx-auto">
        <NuxtLayout>
            <form @submit.prevent="createUser" class="space-y-4">
                <UFormField label="Name" name="name" required>
                    <UInput
                        placeholder="Enter your name"
                        v-model="registerInput.name"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Email" name="email" required>
                    <UInput
                        type="email"
                        placeholder="Enter your email"
                        v-model="registerInput.email"
                        class="w-full"
                    />
                </UFormField>

                <UFormField label="Password" name="password" required>
                    <UInput
                        type="password"
                        placeholder="Enter your password"
                        v-model="registerInput.password"
                        class="w-full"
                    />
                </UFormField>

                <div class="pt-4">
                    <UButton
                        type="submit"
                        color="primary"
                        variant="solid"
                        size="lg"
                        class="w-full py-2"
                        :loading="isLoading"
                    >
                        {{ isLoading ? "Processing..." : "Create Account" }}
                    </UButton>
                </div>
            </form>
        </NuxtLayout>
    </div>
</template>

<style lang="scss" scoped></style>
