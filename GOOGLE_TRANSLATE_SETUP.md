# Google Translate API 设置指南

本项目使用 Google Cloud Translation API 来提供翻译功能。请按照以下步骤配置：

## 1. 获取 Google Translate API Key

### 步骤 1: 创建 Google Cloud 项目
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 登录您的 Google 账户
3. 创建新项目或选择现有项目

### 步骤 2: 启用 Cloud Translation API
1. 在 Google Cloud Console 中，导航到 "APIs & Services" > "Library"
2. 搜索 "Cloud Translation API"
3. 点击 "Cloud Translation API" 并启用它

### 步骤 3: 创建 API Key
1. 导航到 "APIs & Services" > "Credentials"
2. 点击 "Create Credentials" > "API key"
3. 复制生成的 API key

### 步骤 4: 配置 API Key 限制（推荐）
1. 点击刚创建的 API key 进行编辑
2. 在 "API restrictions" 部分：
   - 选择 "Restrict key"
   - 选择 "Cloud Translation API"
3. 在 "Application restrictions" 部分（可选）：
   - 可以设置 HTTP referrers 限制
   - 或者 IP 地址限制

## 2. 配置项目

### 步骤 1: 添加 API Key
打开 `src/config/translate.ts` 文件，将您的 API Key 填入：

```typescript
export const TRANSLATE_CONFIG = {
  // 请在这里填入您的Google Translate API Key
  GOOGLE_TRANSLATE_API_KEY: 'YOUR_API_KEY_HERE',
  // ... 其他配置
};
```

### 步骤 2: 验证配置
1. 重启开发服务器
2. 打开浏览器扩展
3. 尝试翻译功能

## 3. 支持的语言

当前支持以下语言：
- 英语 (EN)
- 中文简体 (中文)
- 日语 (日本語)
- 韩语 (한국어)
- 西班牙语 (ES)
- 法语 (FR)
- 德语 (DE)
- 俄语 (RU)
- 意大利语 (IT)
- 葡萄牙语 (PT)

## 4. 费用信息

Google Translate API 的费用结构：
- 前 500,000 字符/月免费
- 超出后每百万字符 $20

详细信息请查看 [Google Cloud Translation 定价](https://cloud.google.com/translate/pricing)

## 5. 故障排除

### 常见问题：

**Q: 显示 "Please configure Google Translate API Key" 错误**
A: 请确保在 `src/config/translate.ts` 中正确配置了 API Key

**Q: 翻译失败，显示 "Translation failed" 消息**
A: 
1. 检查 API Key 是否正确
2. 确认已启用 Cloud Translation API
3. 检查网络连接
4. 查看浏览器控制台的详细错误信息

**Q: 某些语言翻译不准确**
A: Google Translate API 会自动检测源语言，您也可以在代码中调整语言检测逻辑

### 调试模式：
打开浏览器开发者工具的 Console 标签，可以看到详细的翻译请求和响应信息。

## 6. 安全注意事项

- 不要将 API Key 提交到公共代码仓库
- 建议设置 API Key 的使用限制
- 定期轮换 API Key
- 监控 API 使用量以避免意外费用

## 7. 离线备用方案

如果 Google Translate API 不可用，系统会自动使用内置的简单翻译字典作为备用方案。备用翻译支持常见的求职相关词汇。 