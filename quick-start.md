# 🚀 ULT AI 翻译器官网 - 快速启动指南

## ⚡ 5分钟快速部署

### 1. 启动本地开发服务器
```bash
# 使用部署脚本（推荐）
./deploy.sh dev

# 或手动启动
npx serve public -p 8000
```

### 2. 访问网站
- 🌐 本地服务器: http://localhost:8000
- 🇺🇸 英文版本: http://localhost:8000/en/
- 🇨🇳 中文版本: http://localhost:8000/zh/

### 3. 测试语言协商
```bash
# 测试中文重定向
curl -H "Accept-Language: zh-CN,zh;q=0.9" http://localhost:8000/

# 测试英文重定向
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:8000/
```

## 🎯 核心功能验证

### ✅ 多语言支持
- [ ] 英文页面正常显示
- [ ] 中文页面正常显示
- [ ] 语言切换链接工作正常

### ✅ 响应式设计
- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 移动端显示正常

### ✅ 交互功能
- [ ] FAQ展开/收起
- [ ] AI助手模态框
- [ ] 平滑滚动
- [ ] 滚动动画

### ✅ SEO优化
- [ ] 页面标题正确
- [ ] Meta描述完整
- [ ] 结构化数据存在
- [ ] 站点地图可访问

## 🚀 部署到生产环境

### Vercel部署（推荐）
```bash
# 预览部署
./deploy.sh deploy

# 生产部署
./deploy.sh deploy:prod
```

### 手动部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

## 🧪 运行测试

### 性能测试
```bash
./deploy.sh test
```

### 手动测试
```bash
# Lighthouse测试
npx lighthouse http://localhost:8000/en/ --output html

# 可访问性测试
npx axe-core http://localhost:8000/en/
```

## 📱 移动端测试

### 浏览器开发者工具
1. 打开Chrome开发者工具
2. 点击设备模拟器图标
3. 选择不同设备尺寸
4. 测试响应式布局

### 真机测试
1. 确保手机和电脑在同一网络
2. 找到电脑的本地IP地址
3. 在手机浏览器访问 `http://[电脑IP]:8000`

## 🔧 常见问题

### Q: 页面样式不显示？
A: 检查CSS文件路径，确保 `public/assets/styles.css` 存在

### Q: JavaScript功能不工作？
A: 检查浏览器控制台是否有错误，确保 `public/assets/app.js` 正确加载

### Q: 语言协商不工作？
A: 本地开发时语言协商功能需要Vercel环境，本地测试请直接访问 `/en/` 或 `/zh/`

### Q: 图片不显示？
A: 当前使用占位图片，请替换 `public/assets/img/` 目录下的图片文件

## 📊 性能指标

### 目标分数
- **Lighthouse Performance**: ≥ 95
- **Lighthouse Accessibility**: ≥ 95
- **Lighthouse Best Practices**: ≥ 95
- **Lighthouse SEO**: ≥ 95

### 核心Web指标
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🎨 自定义配置

### 修改颜色主题
编辑 `public/assets/styles.css` 中的CSS变量：
```css
:root {
  --primary-blue: #2563eb;      /* 主色调 */
  --primary-blue-light: #60a5fa; /* 浅色调 */
  --border-radius: 1.25rem;     /* 圆角大小 */
}
```

### 修改内容
- 英文内容: `public/en/index.html`
- 中文内容: `public/zh/index.html`
- 样式: `public/assets/styles.css`
- 交互: `public/assets/app.js`

### 添加新语言
1. 复制 `public/en/` 目录为 `public/[语言代码]/`
2. 翻译HTML内容
3. 更新 `vercel.json` 路由配置
4. 更新 `sitemap.xml`

## 🔗 有用的链接

- 📖 [完整文档](./README.md)
- 🚀 [部署脚本](./deploy.sh)
- ⚙️ [Vercel配置](./vercel.json)
- 🌐 [语言重定向API](./api/language-redirect.js)

---

**🎉 恭喜！您的ULT AI翻译器官网已经成功运行！**

下一步：
1. 自定义内容和样式
2. 添加真实图片和品牌元素
3. 配置域名和SSL证书
4. 部署到生产环境

如有问题，请查看完整文档或创建Issue。
