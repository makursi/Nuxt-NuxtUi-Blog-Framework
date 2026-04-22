// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-csurf"
  ],
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
  // CSRF protection configuration
  // https://github.com/Morgbn/nuxt-csurf
  csurf: {
    https: process.env.NODE_ENV === 'production', // Enable HTTPS in production
    cookie: {
      path: '/',
      httpOnly: true,   // Prevent JavaScript access to cookie
      sameSite: 'strict', // Strict same-site policy for CSRF protection
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production (HTTPS only)
    },
    methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'], // HTTP methods that require CSRF protection
    headerName: 'csrf-token', // Header name for CSRF token
  },
  // 插件配置 - Nuxt 3 会自动导入 app/plugins 目录下的插件
  // 客户端插件会通过 .client.ts 后缀自动识别
});