# Vercel + Cloudflare Worker Demo

这是一个演示项目，展示了如何在Vercel上部署一个静态网站并通过JavaScript直接调用Cloudflare Worker。

## 项目结构

```
.
├── public/
│   └── index.html     # 静态HTML文件，有利于SEO
├── package.json       # 项目依赖和脚本
└── vercel.json        # Vercel部署配置
```

## 特性

- 使用纯静态HTML文件，有利于SEO优化
- 支持动态配置多个Cloudflare Worker端点
- 零后端代码，完全无服务器
- 不消耗Vercel函数调用额度

## 部署到Vercel

有几种方式可以将此项目部署到Vercel：

### 方法1：通过Git仓库（推荐）

1. 将代码推送到GitHub、GitLab或Bitbucket仓库
2. 访问[Vercel官网](https://vercel.com/)并登录/注册
3. 点击 "New Project"
4. 选择您推送代码的仓库
5. 保持默认设置，点击 "Deploy"
6. 等待部署完成，获取分配的域名

### 方法2：使用Vercel CLI

1. 安装Vercel CLI工具：
   ```bash
   npm install -g vercel
   ```

2. 在项目根目录下运行：
   ```bash
   vercel
   ```

3. 按照提示操作：
   - 如果尚未登录，会提示您登录
   - 选择默认项目设置
   - 部署完成后会提供预览链接

### 方法3：直接上传

1. 访问[Vercel官网](https://vercel.com/)并登录
2. 下载并安装[Vercel Desktop应用](https://vercel.com/download)
3. 将整个项目文件夹拖拽到Vercel Desktop应用中
4. 按照提示完成部署

## 动态配置多Worker URL

为了避免将Worker URL硬编码在代码中，本演示提供了动态配置功能：

1. 在"Worker Configuration"区域输入Worker URL、请求方法和数据
2. 点击"Save Endpoint"保存配置
3. 保存的端点会出现在"Saved Endpoints"列表中
4. 点击"Load"可以重新加载已保存的配置
5. 所有配置存储在浏览器的localStorage中

这种方法使得管理多个Worker URL变得非常容易，无需修改代码即可切换不同的Worker。

## 本地开发

使用任意静态文件服务器运行项目，例如：

使用Node.js:
```bash
npx serve public/
```

使用Python 3:
```bash
cd public/
python -m http.server 8000
```

然后访问 http://localhost:8000 查看应用。

## 使用方法

1. 访问部署后的网站
2. 配置Worker URL和请求参数
3. 点击"Call Worker Directly"按钮调用Worker
4. 结果将显示在页面下方