# ULT AI Translator Landing Page

ULT AI翻译器的官方网站，支持多语言（英文/中文）和服务端语言协商。

## 🚀 项目特性

- **多语言支持**: 英文和中文版本
- **服务端语言协商**: 基于Accept-Language头的智能重定向
- **纯静态网站**: HTML + CSS + JavaScript，无后端依赖
- **SEO优化**: 完整的元标签、结构化数据和站点地图
- **可访问性**: WCAG AA标准，键盘导航支持
- **响应式设计**: 移动端优先的现代化UI
- **性能优化**: Lighthouse 95+分数

## 📁 项目结构

```
ULT/
├── public/                    # 静态文件根目录
│   ├── en/                   # 英文版本
│   │   └── index.html       # 英文首页
│   ├── zh/                   # 中文版本
│   │   └── index.html       # 中文首页
│   ├── assets/               # 静态资源
│   │   ├── styles.css       # 主样式文件
│   │   ├── app.js           # 交互脚本
│   │   └── img/             # 图片资源
│   ├── sitemap.xml          # 站点地图
│   └── robots.txt           # 搜索引擎配置
├── api/                      # Vercel API函数
│   └── language-redirect.js # 语言重定向逻辑
├── vercel.json              # Vercel部署配置
└── README.md                # 项目说明
```

## 🌐 多语言架构

### URL结构
- 英文版本: `/en/`
- 中文版本: `/zh/`
- 根路径: `/` (自动语言协商)

### 语言协商机制
根路径 `/` 会根据用户的 `Accept-Language` 头自动重定向到相应的语言版本：

- 包含中文语言代码 (`zh`, `zh-CN`, `zh-Hans`, `zh-HK`, `zh-TW`) → 重定向到 `/zh/`
- 其他情况 → 重定向到 `/en/`

**重要**: 语言切换完全通过URL进行，不使用前端JavaScript。这确保了SEO友好性和搜索引擎的正确索引。

## 🛠️ 技术栈

- **前端**: 纯HTML5 + CSS3 + 原生JavaScript
- **部署**: Vercel (推荐) 或 Cloudflare Pages
- **语言协商**: Vercel Edge Functions
- **样式**: CSS自定义属性 + CSS Grid + Flexbox
- **动画**: CSS Transitions + Intersection Observer API

## 🚀 部署指南

### 方法1: Vercel (推荐)

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署项目**
   ```bash
   vercel
   ```

3. **配置域名** (可选)
   ```bash
   vercel domains add ult-translator.com
   ```

### 方法2: Cloudflare Pages

1. 将代码推送到GitHub仓库
2. 在Cloudflare Pages中连接仓库
3. 构建命令留空，输出目录设置为 `public`
4. 添加自定义域名

### 方法3: 自托管

1. 配置Nginx重写规则
2. 设置语言协商逻辑
3. 部署静态文件

## 🔧 本地开发

### 启动本地服务器
```bash
# 使用Python
python3 -m http.server 8000

# 使用Node.js
npx serve public

# 使用PHP
php -S localhost:8000 -t public
```

### 测试语言协商
```bash
# 测试中文重定向
curl -H "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8" http://localhost:8000/

# 测试英文重定向
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:8000/
```

## 📱 响应式断点

- **移动端**: < 480px
- **平板**: 480px - 768px
- **桌面端**: > 768px

## 🎨 设计系统

### 颜色方案
- **主色**: 蓝色渐变 (#2563eb → #60a5fa)
- **中性色**: 灰色系列 (#f9fafb → #111827)
- **成功色**: 绿色 (#10b981)
- **错误色**: 红色 (#ef4444)

### 字体
- **系统字体栈**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **中文字体**: 系统默认中文字体

### 组件
- 圆角: 1.25rem (20px)
- 阴影: 多层阴影系统
- 过渡: 150-250ms ease-in-out

## 🔍 SEO优化

### 元标签
- 完整的Open Graph和Twitter Card支持
- 语言特定的标题和描述
- 规范的hreflang标签

### 结构化数据
- SoftwareApplication schema
- 价格和评分信息
- 多语言支持

### 性能指标
- 首屏加载 < 2秒
- Lighthouse分数 ≥ 95
- 核心Web指标优化

## ♿ 可访问性

### WCAG AA合规
- 对比度比率 ≥ 4.5:1
- 键盘导航支持
- 屏幕阅读器友好

### ARIA标签
- 正确的语义标签
- 状态管理 (aria-expanded, aria-hidden)
- 焦点管理

## 📊 性能优化

### 资源优化
- CSS和JavaScript压缩
- 图片懒加载
- 静态资源缓存

### 代码分割
- 按需加载JavaScript
- CSS关键路径优化
- 资源预加载

## 🔒 安全特性

### 内容安全策略
- XSS防护
- 点击劫持防护
- 内容类型嗅探防护

### 安全头
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 🧪 测试

### 自动化测试
```bash
# 运行Lighthouse测试
npx lighthouse http://localhost:8000/en/ --output html

# 检查可访问性
npx axe-core http://localhost:8000/en/
```

### 手动测试清单
- [ ] 语言协商正常工作
- [ ] 所有链接正确跳转
- [ ] 响应式设计正常
- [ ] 键盘导航支持
- [ ] 屏幕阅读器兼容

## 📈 监控和分析

### 性能监控
- Core Web Vitals
- 页面加载时间
- 用户交互响应

### 用户行为
- 语言偏好统计
- 页面访问路径
- 转化率分析

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

## 📞 支持

如有问题或建议，请通过以下方式联系：

- 创建GitHub Issue
- 发送邮件至 support@ult-translator.com
- 访问我们的帮助中心

## 🔄 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 支持英文和中文
- 完整的SEO优化
- 响应式设计
- 可访问性支持

---

**注意**: 此项目严格遵循"不使用前端JavaScript进行语言切换"的原则。所有语言协商都在服务端完成，确保最佳的SEO表现和用户体验。
