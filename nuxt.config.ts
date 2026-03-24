// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  ui: {
    theme: {
      colors: ["primary", "error"],
    },
  },
  css: ["/assets/css/main.css"],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  // 插件配置 - Nuxt 3 会自动导入 app/plugins 目录下的插件
  // 客户端插件会通过 .client.ts 后缀自动识别
});
