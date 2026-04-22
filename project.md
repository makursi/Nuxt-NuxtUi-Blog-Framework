app/
├── components/          # 纯UI组件，不写业务逻辑
│   ├── header.vue
│   ├── post-form.vue    # 只负责渲染表单，不处理请求
│   ├── rich-text-editor.vue
│   └── post-card.vue    # 文章列表卡片
├── composables/         # 封装业务逻辑，和状态解耦
│   ├── use-auth.ts      # 用户登录/注册/获取当前用户
│   └── use-posts.ts     # 文章CRUD逻辑，只做请求不存状态
├── layouts/
│   ├── default.vue      # 公共布局（未登录页）
│   └── dashboard.vue    # 后台布局（登录后页）
├── pages/
│   ├── login.vue
│   ├── register.vue
│   ├── index.vue        # 博客首页（公开文章列表）
│   ├── [userId]/[postSlug].vue  # 公开文章详情页（所有人可看）
│   └── dashboard/
│       ├── index.vue    # 用户后台首页
│       ├── posts/
│       │   ├── index.vue      # 我的文章列表
│       │   ├── add.vue        # 新建文章页
│       │   └── [postId]/
│       │       ├── index.vue  # 文章后台详情页（可选）
│       │       └── edit.vue   # 文章编辑页（核心）
│ 
└── stores/              # 全局状态，只存数据不写请求
    ├── auth.ts          # 当前登录用户状态
    └── posts.ts         # 我的文章列表状态