# 「今日」App 项目信息

## 快速定位
- **本地路径**: `C:\Users\Administrator\projects\01-daily-tracker\`
- **线上地址**: `pincko11.github.io/today`
- **GitHub 仓库**: `github.com/pincko11/today`
- **推送方式**: SSH 密钥 `~/.ssh/id_ed25519_github`

## 技术栈
- 纯 HTML/CSS/JS 单文件 (`index.html`)
- PWA 三件套: `manifest.json` / `sw.js` / `icon.png`
- 密码锁: SHA-256 哈希 + localStorage 永久免密
- 部署: GitHub Pages (main 分支 / 根目录)
- 数据: localStorage 存手机本地，不传服务器

## 更新流程
```
改代码 → git add -A → git commit -m "描述" → git push
等1分钟 → 手机Chrome清缓存 → 刷新
```

## 功能清单
- 五位恋与深空男主头像 + 点击随机语录（各6条，来自B站/微博高赞）
- 夸夸图嵌入式打卡+任务合并卡片
- 全部完成纸屑庆祝动画
- 连续打卡天数 + 文案随天数变化（0/3/7/14/30天不同文案）
- PWA 桌面图标，全屏独立运行
- 离线可用（Service Worker）

## 密码
- 默认: `xingxing`
- 修改: 用 python 算新哈希，替换 STORED_HASH

## 文件说明
| 文件 | 用途 |
|------|------|
| index.html | 主页面（界面+逻辑+样式全在一个文件） |
| manifest.json | PWA 配置（App名、图标、全屏模式） |
| sw.js | Service Worker（离线缓存） |
| icon.png | App 图标 |
| icon.svg | App 图标（矢量备用） |
| kuakua.jpg | 夸夸背景图 |
| xavier.jpg 等 | 五位男主头像 |
| avatar-lv.jpg | 等级系统默认头像 |
| preview-lv.html | 等级系统设计预览页（开发用） |
| .git/ | Git 仓库 |

## 最近更新（2026-05-23）

### 等级系统
- 经验条：嫩粉色填充，XX/100 在条内右端
- 打勾任务 +10 XP，每天首次打开检查昨日未完成任务每条 -20
- 7 个段位称号（执行者 → 执行万物本体），首次到达弹出「🎉恭喜你，领域展开，成为XXX」
- 升级弹窗：液态玻璃半透明粉黄调，「😲！升级了！执行力好强！Lv.X ⬆」
- 弹窗冲突：称号优先于升级，二选一不重复
- 头像可点换/长按管理/删除历史，base64 存 localStorage，隐私安全
- 弹窗彩纸粒子特效

### Service Worker
- 改为**网络优先策略**（HTML 走网络保证最新，图片走缓存保证速度）
- 新版本自动检测 + 页面自动刷新，不用手动清缓存
- 坑：旧版缓存优先 → 改网络优先解决

### 弹窗设计
- 参考 glassmorphism 液态玻璃：背景透明度 0.10-0.28 + backdrop-filter blur(20px) + 微细边框 + 内高光
- 弹窗背后页面完全可见（overlay 全透明）
