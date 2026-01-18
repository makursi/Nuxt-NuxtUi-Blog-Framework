# 个人技术博客

这是一个使用 Nuxt 3 和 Nuxt UI 构建的现代化个人技术博客项目。

## 项目特点

- 🚀 **现代化架构**: 基于 Nuxt 3 和 Vue 3 构建
- 🎨 **美观界面**: 使用 Nuxt UI 组件库打造专业外观
- 📱 **响应式设计**: 完美适配各种屏幕尺寸
- ⚡ **高性能**: 服务端渲染(SSR)，优化SEO和加载速度
- 🔧 **易于维护**: 清晰的代码结构和组件化设计

## 主要功能

- 首页展示特色文章和最新文章
- 文章分类浏览
- 优雅的文章详情页
- 订阅功能
- 响应式布局

## 技术栈

- [Nuxt 3](https://nuxt.com/) - Vue 框架
- [Nuxt UI](https://ui.nuxt.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 安装和运行

### 先决条件

- Node.js 16.10 或更高版本

### 安装步骤

1. 克隆项目：
```bash
git clone <repository-url>
cd nuxt-blog
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 在浏览器中访问 `http://localhost:3000`

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
app/
├── assets/
│   └── css/
│       └── main.css
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue         # 首页
│   ├── about.vue         # 关于页面
│   └── posts/
│       ├── index.vue     # 文章列表页
│       └── [id].vue      # 文章详情页
└── app.vue
```

## 自定义配置

### 修改首页内容

编辑 `app/pages/index.vue` 文件来自定义首页内容。

### 添加新文章

在相应的组件中添加新的文章数据即可。

## 部署

此项目可以部署到任何支持 Node.js 的平台，如 Vercel、Netlify、或传统服务器。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT