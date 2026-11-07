# 「月巴立绘投稿」Google Form 文案（方案 A）

> 配套文件：
> - [copy-zh.md](./copy-zh.md)：投稿文案四语言对照（以 A 节为准，改文案从这里改）
> - [options-all.txt](./options-all.txt)：可补图月巴 168 项（原第一/第二图鉴已合并，按图鉴顺序）
>
> 文案以 [copy-zh.md](./copy-zh.md) 的四语言对照为准（A 节游戏内、B 节表单）；本文件保留表单结构、题目类型与设置说明，两边如有出入请先改 copy-zh.md。
> 选项清单保持图鉴原顺序，不要打乱。

---

## 1. 表单基础信息

**表单标题**

```
Banny Art Submission · 月巴立绘投稿
```

**表单说明（Description）**

```
Draw a Banny and help it come to life in the game.
给月巴画一张立绘，让它出现在游戏里。

Two kinds of submissions:
两种投稿：
1) Art for a Banny that has no artwork yet. Existing artwork cannot be replaced.
   给还没有立绘的月巴补图。已有立绘的月巴不接受替换。
2) A brand-new Banny. Fill in the name only — the ID is assigned by the developer.
   新增一只月巴。只填名字，ID 由开发者分配。

Image rules:
图片要求：
- Transparent PNG preferred, 1024×1024, max 5 MB.
  优先透明背景 PNG，1024×1024，单文件不超过 5MB。
- If you upload JPG / WebP, we will cut it into a transparent PNG for you. Edges may look rough.
  如果上传 JPG / WebP，我们会代你抠成透明底 PNG，边缘可能有瑕疵。
- No watermarks, text, photos of real people, or copyrighted characters.
  不要水印、文字、真人照片或他人版权角色。

Review:
审核说明：
- If the same Banny already received approved art from someone else, your art is kept too — every approved artwork stays and players can switch between them in the Codex.
  如果同一只月巴已被他人补图并通过，你的作品同样会被收录：所有通过的立绘都会保留，玩家可以在图鉴里自由切换。
- For new Bannies, the developer may adjust the name and rarity for balance.
  新增月巴的名字与稀有度可能由开发者微调。

Thank you for drawing for the Bannies.
谢谢你来画月巴。
```

**表单设置**

| 项 | 设置 |
|---|---|
| Collect email addresses | 开启（Verified） |
| Limit to 1 response | 关闭 |
| Progress bar | 开启 |
| Shuffle question order | 关闭 |
| Confirmation message | 见第 6 节 |

---

## 2. Section 1 — 投稿类型

**Question**

```
Submission type · 投稿类型
```

**Type**：Multiple choice（必填）

**Options**

```
Art for a Banny (no art yet) · 补图
A new Banny · 新增月巴
```

**Section navigation**

- 选项 1 → Section A
- 选项 2 → Section B

---

## 3. Section A — 补图

**Section title**

```
Art for a Banny · 补图
```

**Section description**

```
Pick the Banny you drew. Only Bannies without artwork are listed — artwork that already exists cannot be replaced.
选择你画的月巴。列表里只有尚未有立绘的月巴，已有立绘的不能替换。
```

**Q1**

```
Which Banny did you draw? · 你画的是哪只月巴？
```

- Type：Dropdown（必填）
- 选项：把 `options-all.txt` 的 168 行整段粘贴进去
- Help text：

```
Format: Banny name (ID). 格式：月巴名称（ID）。
```

**Q2**

```
Artwork · 立绘文件
```

- Type：File upload（必填）
- 允许类型：PNG, JPG, JPEG, WEBP
- 单文件上限：5MB
- 最多文件数：1
- Help text：

```
Transparent PNG preferred. Non-PNG files will be converted into a transparent PNG by us.
优先透明背景 PNG。非 PNG 文件会由我们抠成透明底 PNG。
```

**Q3**

```
Artist credit · 画师署名
```

- Type：Short answer（选填）
- Help text：

```
The name shown in the game. Leave blank to stay anonymous.
游戏内显示的署名。留空即匿名。
```

**Q4**

```
Notes · 备注
```

- Type：Paragraph（选填）
- Help text：

```
Anything we should know about the design or pose.
关于设定、姿势或构图的补充说明。
```

---

## 4. Section B — 新增月巴

**Section title**

```
A new Banny · 新增月巴
```

**Section description**

```
Name only — the ID is assigned by the developer. If you are submitting a new Banny, please answer the questions below; if you are adding art to an existing Banny, you can skip them.
只填名字，ID 由开发者分配。如果您的月巴是新增的，请回答以下问题，如果是补充旧的月巴，可以忽略以下问题。
```

**Q1**

```
Banny name · 月巴名字
```

- Type：Short answer（必填）
- 校验建议：≤6 个汉字或 ≤20 个字符
- Help text：

```
Keep it short. We may adjust it slightly if it duplicates an existing name.
尽量简短。如果与现有月巴重名，我们可能微调。
```

**Q2**

```
Rarity · 稀有度
```

- Type：Multiple choice（必填）
- Options：

```
1 — Common · 常见
2 — Uncommon · 少见
3 — Rare · 稀有
4 — Epic · 史诗
5 — Legendary · 传说
```

- Help text：

```
Rarity affects value and growth time. The developer may adjust it for balance.
稀有度会影响价值与生长时间，开发者可能按平衡性微调。
```

**Q3**

```
Description · 简介
```

- Type：Paragraph（必填）
- Help text：

```
One sentence, max 60 characters. Shown in the Codex.
一句话设定，最多 60 字，会显示在图鉴里。
```

**Q4**

```
Artwork · 立绘文件
```

- Type：File upload（必填）
- 允许类型：PNG, JPG, JPEG, WEBP
- 单文件上限：5MB
- 最多文件数：1
- Help text：

```
Transparent PNG preferred. Non-PNG files will be converted into a transparent PNG by us.
优先透明背景 PNG。非 PNG 文件会由我们抠成透明底 PNG。
```

**Q5**

```
Artist credit · 画师署名
```

- Type：Short answer（选填）
- Help text：

```
The name shown in the game. Leave blank to stay anonymous.
游戏内显示的署名。留空即匿名。
```

---

## 5. Final Section — 授权与确认

**Section title**

```
Permission & confirmation · 授权与确认
```

**Q1**

```
Original work & license · 原创与授权
```

- Type：Checkboxes（必填，只有一个选项）
- Option：

```
I confirm this artwork is my own original work (or I have the author's permission), and I allow it to be displayed, cropped, compressed, outlined and glow-tinted in the game.
我确认此作品为本人原创（或已获得作者授权），允许在游戏内展示、裁切、压缩、加描边与光晕。
```

**Q2**

```
Non-PNG conversion · 非 PNG 转换确认
```

- Type：Checkboxes（必填，只有一个选项）
- Option：

```
I understand that if my upload is not a transparent PNG, it will be cut into a transparent PNG by the developer, and the edges may be rough.
我了解：如果上传的不是透明背景 PNG，开发者会代为抠成透明底 PNG，边缘可能有瑕疵。
```

**Q3**

```
Duplicate handling · 重复投稿处理
```

- Type：Checkboxes（必填，只有一个选项）
- Option：

```
I understand that if this Banny already received approved art from someone else, my artwork will also be kept — all approved artworks stay, and players can switch between them in the Codex.
我了解：如果这只月巴已被他人补图并通过，我的作品同样会被保留——所有通过的立绘都会收录，玩家可以在图鉴里自由切换。
```

---

## 6. 提交成功页

```
Thanks for drawing for the Bannies!
谢谢你来画月巴！

Your submission has been received.
投稿已收到。

If approved, your art will appear in the game with your credit.
通过后会带署名进入游戏。
```

---

## 7. 表单设置清单

- [ ] 标题与说明已粘贴
- [ ] Section 1 两个选项已设置「Go to section」
- [ ] Section A 下拉已粘贴 168 行（`options-all.txt`）
- [ ] Section B 稀有度只开放 1–5
- [ ] 文件题限制为 PNG/JPG/JPEG/WEBP，单文件 5MB，最多 1 个
- [ ] 三个确认题都设为必填
- [ ] 收集邮箱已开启
- [ ] 提交成功页已替换
- [ ] 用手机和桌面各预览一次

---

## 8. 附：审核表列

Forms 自动生成的 Sheets 里补充这些列：

```
类型 | 目标/名字 | 稀有度 | 简介 | 画师 | 文件链接 |
状态 | 最终ID | 最终图片URL | 拒绝原因 | 审核时间
```

状态取值：

```
待审 / 通过 / 拒绝 / 已上线
```

拒绝原因取值：

```
非原创 / 有版权角色 / 含文字水印 / 尺寸不足 / 背景无法抠净 / 信息不全
```

---

## 9. 附：入库速查

**补图**

```js
{id:'mb_pang', ..., img:'https://origin.picgo.net/.../mb_pang.png', by:'@画师ID'}
```

**补图 · 同一只月巴有多张立绘**

`img` 是主图（第 1 张），其余追加到 `imgs`；`by` 按每张单独记：

```js
{id:'mb_pang', ..., img:'https://…/mb_pang_A.png', by:'@画师A',
 imgs:[
   {url:'https://…/mb_pang_A.png', by:'@画师A'},
   {url:'https://…/mb_pang_B.png', by:'@画师B'},
 ]}
```

> 已存在的 `img` 不用改，直接在 `imgs` 里追加即可；重复 URL 会自动去重。
> 玩家在游戏内选择的立绘记录在存档 `artPick` 里，与代码配置无关。

**新增**

```js
{id:'m2_c_cloud', name:'云朵月巴', img:'https://origin.picgo.net/.../m2_c_cloud.png',
 r:3, v:35, t:400, cond:null,
 color:'#c9b2e8', shape:'round', by:'@画师ID', desc:'喜欢趴在云上，掉下来会变成雨。'}
```

**新增数值对照**

| 稀有度 | v | t |
|---|---|---|
| 1 | 10 | 100 |
| 2 | 18 | 180 |
| 3 | 35 | 400 |
| 4 | 80 | 700 |
| 5 | 220 | 1400 |

**ID 规则**

```
m2_c_<英文slug>     例：m2_c_cloud / m2_c_lantern
仅小写字母、数字、下划线；上线后不可改
```

---

## 10. 游戏内投稿页文案（四语言）

位置：游戏首页顶栏「🎨 投稿」→ 投稿弹窗里「📮 打开投稿表单」按钮**下方**、搜索框上方。
行为：跟随游戏语言切换（中 / 英 / 日 / 韩），文案维护在 `index.html` 的 `I18N_UI`。

**中文**

```
投稿说明
- 同一只月巴被画了多次时，通过的作品都会保留，可以在图鉴里自由切换。
- 透明背景 PNG 优先（1024×1024，≤5MB）。JPG / WebP 会由开发者抠成透明底，边缘可能有瑕疵。
```

**English**

```
How submission works
- If the same Banny gets several approved artworks, all of them are kept — you can switch freely in the Codex.
- Transparent PNG preferred (1024×1024, ≤5MB). JPG / WebP will be cut into a transparent PNG by the developer; edges may look rough.
```

**日本語**

```
投稿について
- 同じバニーに複数の作品が届いた場合、採用された絵はすべて保存され、図鑑で自由に切り替えられます。
- 透明背景の PNG を推奨（1024×1024、5MB 以下）。JPG / WebP は開発者が透過 PNG に切り抜きます（輪郭が粗くなる場合あり）。
```

**한국어**

```
투고 안내
- 같은 버니에 여러 작품이 모이면 승인된 그림을 모두 보관하고, 도감에서 자유롭게 전환할 수 있어요.
- 투명 배경 PNG 권장(1024×1024, 5MB 이하). JPG / WebP는 개발자가 투명 PNG로 누끼 처리하며, 가장자리가 거칠 수 있어요.
```

---

## 11. 附：重复立绘规则与实现状态

**已定规则**

- 同一只月巴可以有多张通过审核的立绘，全部保留，**不生成新的月巴**、不新增 ID。
- 玩家可在图鉴中自由切换查看同一只月巴的不同立绘。
- 画师署名按每张立绘单独记录。

**实现状态（2026-10-21）**

- 表单文案（第 1 节、第 5 节 Q3）与游戏内投稿页文案（第 10 节）已按此规则更新。
- 图鉴多立绘切换**已实现**：
  - 数据：`img` 继续作为主图（兼容旧数据），新增 `imgs:[{url,by}]` 保存全部立绘；两者合并去重后即为该月巴的立绘列表。
  - 图鉴卡片：多张立绘的月巴右上角显示 `🎨n` 角标；卡片与详情都显示当前选中的那张。
  - 详情浮层：立绘下方出现 `‹ 🎨 1 / n ›`，点击左右切换，画师署名随当前立绘变化。
  - 存档：选择结果存于 `S.artPick[月巴id]`，刷新后保留；未选过时默认主图。
  - 主界面、掉落、旅行等用到该月巴的地方都会跟着显示选中的立绘。
