
## API 接口说明

### 基础URL

所有API接口都以 `/api` 作为前缀。

### 用户接口 (`/api`)

#### 1. 用户注册

- **URL**: `/api/register`
- **方法**: `POST`
- **认证**: 不需要
- **请求体参数**:
  ```json
  {
    "name": "用户名",
    "email": "user@example.com",
    "password": "用户密码"
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "message": "user created !",
      "user": {
        "id": "用户ID",
        "email": "user@example.com",
        "password": "用户密码哈希值",
        "name": "用户名"
      }
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "The user has been registerd!"
    }
    ```

#### 2. 用户登录

- **URL**: `/api/login`
- **方法**: `POST`
- **认证**: 不需要
- **请求体参数**:
  ```json
  {
    "email": "user@example.com",
    "password": "用户密码"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "user": {
        "name": "用户名",
        "email": "user@example.com"
      },
      "isLogged": true,
      "message": "user logged",
      "token": "JWT令牌"
    }
    ```
  - 失败 (400):
    ```json
    {
      "isLogged": false,
      "message": "email or password invalid"
    }
    ```

#### 3. 获取指定用户信息

- **URL**: `/api/getUserById/:id`
- **方法**: `GET`
- **认证**: 不需要
- **参数**: `id` - 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "_id": "用户ID",
      "name": "用户名",
      "email": "user@example.com",
      "createdAt": "创建时间",
      "updatedAt": "更新时间"
    }
    ```
  - 失败 (404):
    ```json
    {
      "messag": "用户未找到"
    }
    ```

#### 4. 获取所有用户（支持分页和筛选）

- **URL**: `/api/`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码（默认为1）
  - `limit`: 每页数量（默认为10）
  - `role`: 角色筛选（可选）
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "users": [
        {
          "_id": "用户ID",
          "name": "用户名",
          "email": "user@example.com",
          "createdAt": "创建时间"
        }
      ],
      "currentPage": 1,
      "totalPages": 1,
      "totalUsers": 1
    }
    ```

#### 5. 更新用户信息

- **URL**: `/api/updateUserById/:id`
- **方法**: `PATCH`
- **认证**: 需要JWT
- **参数**: `id` - 用户ID
- **请求体参数**:
  ```json
  {
    "name": "新用户名",
    "email": "newemail@example.com"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "用户资料更新成功",
      "user": {
        "_id": "用户ID",
        "name": "新用户名",
        "email": "newemail@example.com",
        "updatedAt": "更新时间"
      }
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "用户未找到，更新失败"
    }
    ```

#### 6. 删除用户

- **URL**: `/api/dropUserById/:id`
- **方法**: `DELETE`
- **认证**: 需要JWT
- **参数**: `id` - 用户ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "用户账户删除成功",
      "id": "用户ID"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "用户未找到,无法删除"
    }
    ```

#### 7. 检查用户登录状态

- **URL**: `/api/check/user/loggedin`
- **方法**: `GET`
- **认证**: 需要JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "success": true
    }
    ```

#### 8. 用户登出

- **URL**: `/api/logout`
- **方法**: `POST`
- **认证**: 需要JWT
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "user logged out!"
    }
    ```

### 文章接口 (`/api/posts`)

#### 1. 获取所有文章

- **URL**: `/api/posts`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "data": [
        {
          "_id": "文章ID",
          "title": "文章标题",
          "post_content": "文章内容",
          "slug": "文章slug",
          "user": "作者ID",
          "createdAt": "创建时间",
          "updatedAt": "更新时间"
        }
      ]
    }
    ```

#### 2. 获取单篇文章

- **URL**: `/api/posts/:slug`
- **方法**: `GET`
- **认证**: 不需要
- **参数**: `slug` - 文章slug
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "_id": "文章ID",
      "title": "文章标题",
      "post_content": "文章内容",
      "slug": "文章slug",
      "user": "作者ID",
      "createdAt": "创建时间",
      "updatedAt": "更新时间"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "Post not found"
    }
    ```

#### 3. 获取文章总数

- **URL**: `/api/posts/count/post`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "data": 10
    }
    ```

#### 4. 获取客户端文章

- **URL**: `/api/posts/client/post`
- **方法**: `GET`
- **认证**: 不需要
- **响应示例**:
  - 成功 (200):
    ```json
    [
      {
        "_id": "文章ID",
        "title": "文章标题",
        "post_content": "文章内容",
        "slug": "文章slug",
        "user": "作者ID",
        "createdAt": "创建时间",
        "updatedAt": "更新时间"
      }
    ]
    ```

#### 5. 创建新文章

- **URL**: `/api/posts`
- **方法**: `POST`
- **认证**: 需要JWT
- **请求体参数**:
  ```json
  {
    "title": "文章标题",
    "post_content": "文章内容",
    "slug": "文章slug"
  }
  ```
- **响应示例**:
  - 成功 (201):
    ```json
    {
      "message": "Post created !"
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "Slug already exists"
    }
    ```

#### 6. 更新文章

- **URL**: `/api/posts/:id`
- **方法**: `PUT`
- **认证**: 需要JWT
- **参数**: `id` - 文章ID
- **请求体参数**:
  ```json
  {
    "title": "新标题",
    "post_content": "新内容"
  }
  ```
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "post updated!"
    }
    ```
  - 失败 (403):
    ```json
    {
      "message": "Not authrorized"
    }
    ```

#### 7. 删除文章

- **URL**: `/api/posts/:id`
- **方法**: `DELETE`
- **认证**: 需要JWT
- **参数**: `id` - 文章ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "Post deleted !"
    }
    ```
  - 失败 (404):
    ```json
    {
      "message": "Post not found"
    }
    ```

#### 8. 上传文章图片

- **URL**: `/api/posts/upload-image`
- **方法**: `POST`
- **认证**: 需要JWT
- **表单数据**: 
  - `image`: 图片文件
  - `postId`: 文章ID
- **响应示例**:
  - 成功 (200):
    ```json
    {
      "message": "Post image uploaded !"
    }
    ```
  - 失败 (400):
    ```json
    {
      "message": "postId is required"
    }
    ```


### 测试API

推荐使用 Postman 或 curl 来测试API接口：

```bash
# 获取所有用户
curl http://localhost:3000/api

# 注册新用户
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","password":"123456"}'

# 登录用户
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# 创建文章（需要JWT token）
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"文章标题","post_content":"文章内容","slug":"article-slug"}'
```
