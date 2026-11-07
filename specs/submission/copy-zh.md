# 投稿文案 · 四语言对照

> **A 节（游戏内）为准**，B 节（Google Form）的措辞与规则由 A 派生。
> 修改规则：
> - 改文案只改代码块 / 表格里的文字，**编号不要删、不要改**。
> - `{n}`、`{a}`、`{b}` 是程序变量，保留原样。
> - 四语言顺序固定：中文 / English / 日本語 / 한국어。
> - 游戏内实际生效的是中文原文对应的 `I18N_UI` 词条；改中文后我会同步更新英/日/韩。
> - 表格里的 `<br>` 表示表单内换行，粘贴到 Google Form 时按行分开即可。

---

## A. 游戏内 · 投稿页

| 编号 | 位置 | 中文 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| A01 | 顶栏 🎨 按钮悬停提示 | 投稿 | Submit art | 投稿 | 투고 |
| A02 | 投稿弹窗标题 | ✏️ 投稿 · {n} 只月巴还缺立绘 | ✏️ Submit · {n} Bannies still need art | ✏️ 投稿 · 立ち絵待ちのバニー {n} 体 | ✏️ 투고 · 일러스트가 필요한 버니 {n}마리 |
| A03 | 表单按钮主文案 | 打开投稿表单 | Open submission form | 投稿フォームを開く | 투고 양식 열기 |
| A04 | 表单按钮副文案 | Google 表单 · 上传 PNG 立绘 | Google Form · upload a PNG illustration | Google フォーム · PNG 立ち絵をアップロード | Google 설문지 · PNG 일러스트 업로드 |
| A05 | 说明区标题 | 投稿说明 | How submission works | 投稿について | 투고 안내 |
| A07 | 说明第 1 条 | 同一只月巴被画了多次时，通过的作品都会保留，可以在图鉴里自由切换。 | If the same Banny gets several approved artworks, all of them are kept — you can switch freely in the Codex. | 同じバニーに複数の作品が届いた場合、採用された絵はすべて保存され、図鑑で自由に切り替えられます。 | 같은 버니에 여러 작품이 모이면 승인된 그림을 모두 보관하고, 도감에서 자유롭게 전환할 수 있어요. |
| A08 | 说明第 2 条 | 透明背景 PNG 优先（1024×1024，≤5MB）。JPG / WebP 会由开发者抠成透明底，边缘可能有瑕疵。 | Transparent PNG preferred (1024×1024, ≤5MB). JPG / WebP will be cut into a transparent PNG by the developer; edges may look rough. | 透明背景の PNG を推奨（1024×1024、5MB 以下）。JPG / WebP は開発者が透過 PNG に切り抜きます（輪郭が粗くなる場合あり）。 | 투명 배경 PNG 권장(1024×1024, 5MB 이하). JPG / WebP는 개발자가 투명 PNG로 누끼 처리하며, 가장자리가 거칠 수 있어요. |
| A10 | 搜索框占位文字 | 搜索月巴名字或简介… | Search by name or description… | 名前や紹介文で検索… | 이름이나 소개로 검색… |
| A11 | 计数（未搜索） | 共 {n} 只还缺立绘 | {n} Bannies still need art | 立ち絵待ち {n} 体 | 일러스트가 필요한 버니 {n}마리 |
| A12 | 计数（搜索中） | 找到 {n} 只 | {n} found | {n} 体見つかりました | {n}마리 찾음 |
| A13 | 搜索无结果 | 没有找到匹配的月巴 | No matching Bannies | 該当するバニーが見つかりません | 일치하는 버니가 없습니다 |
| A14 | 卡片状态角标 | 缺立绘 | No art yet | 立ち絵なし | 일러스트 없음 |
| A15 | 详情里的按钮 | 为它投稿 | Submit art for this one | この子に投稿する | 이 버니에 투고하기 |
| A16 | 立绘切换按钮悬停提示 | 切换立绘 | Switch artwork | 立ち絵を切り替え | 일러스트 전환 |
| A17 | 多立绘角标悬停提示 | 共 {n} 张立绘 | {n} artworks | 立ち絵 {n} 枚 | 일러스트 {n}장 |

---

## B. Google Form · 表单与题目

### B01 · 表单标题
```
月巴立绘投稿 · Banny Art Submission
```
```
Banny Art Submission
```
```
バニー立ち絵の投稿 · Banny Art Submission
```
```
버니 일러스트 투고 · Banny Art Submission
```

### B02 · 表单说明

**中文**
```
给月巴画一张立绘，让它出现在游戏里。

两种投稿：
1) 给还没有立绘的月巴补图。已有立绘的月巴不会被替换。
2) 新增一只月巴。只填名字，ID 由开发者分配。

图片要求：
透明背景 PNG 优先（1024×1024，≤5MB）。JPG / WebP 会由开发者抠成透明底，边缘可能有瑕疵。
不要水印、文字、真人照片或他人版权角色。

审核说明：
同一只月巴被画了多次时，通过的作品都会保留，可以在图鉴里自由切换。
新增月巴的名字与稀有度可能由开发者微调。

谢谢你来画月巴。
```

**English**
```
Draw a Banny and help it come to life in the game.

Two kinds of submissions:
1) Art for a Banny that has no artwork yet. Existing art will never be replaced.
2) A brand-new Banny. Name only — the ID is assigned by the developer.

Image rules:
Transparent PNG preferred (1024×1024, ≤5MB). JPG / WebP will be cut into a transparent PNG by the developer; edges may look rough.
No watermarks, text, photos of real people, or copyrighted characters.

Review:
If the same Banny gets several approved artworks, all of them are kept — you can switch freely in the Codex.
For new Bannies, the developer may adjust the name and rarity for balance.

Thank you for drawing for the Bannies.
```

**日本語**
```
バニーに立ち絵を描いて、ゲームの中に登場させましょう。

投稿は2種類：
1) まだ立ち絵のないバニーに絵を描く。既存の立ち絵が差し替わることはありません。
2) 新しいバニーを追加する。名前だけ記入してください。ID は開発者が割り当てます。

画像について：
透明背景の PNG を推奨（1024×1024、5MB 以下）。JPG / WebP は開発者が透過 PNG に切り抜きます（輪郭が粗くなる場合あり）。
透かし・文字・実在の人物の写真・他人の著作権キャラクターは禁止です。

審査について：
同じバニーに複数の作品が届いた場合、採用された絵はすべて保存され、図鑑で自由に切り替えられます。
新しいバニーの名前とレア度は、バランス調整のため開発者が微調整する場合があります。

バニーを描いてくれてありがとうございます。
```

**한국어**
```
버니에 일러스트를 그려 게임 속에 등장시켜 주세요.

투고는 두 가지:
1) 아직 일러스트가 없는 버니에 그림을 그리기. 기존 일러스트는 교체되지 않아요.
2) 새로운 버니 추가하기. 이름만 적어 주세요. ID는 개발자가 지정해요.

이미지 규칙:
투명 배경 PNG 권장(1024×1024, 5MB 이하). JPG / WebP는 개발자가 투명 PNG로 누끼 처리하며, 가장자리가 거칠 수 있어요.
워터마크, 글자, 실존 인물 사진, 타인의 저작권 캐릭터는 안 됩니다.

심사 안내:
같은 버니에 여러 작품이 모이면 승인된 그림을 모두 보관하고, 도감에서 자유롭게 전환할 수 있어요.
새 버니의 이름과 희귀도는 밸런스를 위해 개발자가 조정할 수 있어요.

버니를 그려 주셔서 감사합니다.
```

### B03 · 第 1 节 · 投稿类型

| 字段 | 中文 | English | 日本語 | 한국어 |
|---|---|---|---|---|
| 题干 | 投稿类型 | Submission type | 投稿タイプ | 투고 유형 |
| 选项 1 | 补图（还没有立绘） | Artwork (no art yet) | 立ち絵（立ち絵なし） | 일러스트 (일러스트 없음) |
| 选项 2 | 新增一只月巴 | A new Banny | 新しいバニー | 새 버니 |

### B04 · Section A · 补图

| 字段 | 中文 | English | 日本語 | 한국어 |
|---|---|---|---|---|
| 标题 | 补图 | Artwork | 立ち絵 | 일러스트 |
| 说明 | 选择你画的月巴。列表里只有还没有立绘的月巴，已有立绘的月巴不会被替换。 | Pick the Banny you drew. Only Bannies without artwork are listed — existing art will never be replaced. | 描いたバニーを選んでください。一覧にはまだ立ち絵のないバニーだけが表示されます。既存の立ち絵が差し替わることはありません。 | 그린 버니를 선택해 주세요. 목록에는 아직 일러스트가 없는 버니만 있어요. 기존 일러스트는 교체되지 않아요. |
| Q1 题干 | 你画的是哪只月巴？ | Which Banny did you draw? | どのバニーを描きましたか？ | 어떤 버니를 그렸나요? |
| Q1 帮助 | 格式：月巴名称（ID）。 | Format: Banny name (ID). | 形式：バニーの名前（ID）。 | 형식: 버니 이름 (ID). |
| Q2 题干 | 立绘文件 | Artwork file | 立ち絵ファイル | 일러스트 파일 |
| Q2 帮助 | 透明背景 PNG 优先（1024×1024，≤5MB）。JPG / WebP 会由开发者抠成透明底，边缘可能有瑕疵。 | Transparent PNG preferred (1024×1024, ≤5MB). JPG / WebP will be cut into a transparent PNG by the developer; edges may look rough. | 透明背景の PNG を推奨（1024×1024、5MB 以下）。JPG / WebP は開発者が透過 PNG に切り抜きます（輪郭が粗くなる場合あり）。 | 투명 배경 PNG 권장(1024×1024, 5MB 이하). JPG / WebP는 개발자가 투명 PNG로 누끼 처리하며, 가장자리가 거칠 수 있어요. |
| Q3 题干 | 画师署名 | Artist credit | クレジット名 | 작가 크레딧 |
| Q3 帮助 | 游戏内显示的署名。留空即匿名。 | The name shown in the game. Leave blank to stay anonymous. | ゲーム内に表示されるクレジット名。空欄なら匿名になります。 | 게임에 표시될 작가 이름. 비워 두면 익명이에요. |
| Q4 题干 | 备注 | Notes | メモ | 메모 |
| Q4 帮助 | 关于设定、姿势或构图的补充说明。 | Anything we should know about the design, pose, or composition. | 設定・ポーズ・構図について補足があれば書いてください。 | 설정, 포즈, 구도에 대해 알려 주실 내용이 있으면 적어 주세요. |

### B06 · Section B · 新增一只月巴

| 字段 | 中文 | English | 日本語 | 한국어 |
|---|---|---|---|---|
| 标题 | 新增一只月巴 | A new Banny | 新しいバニー | 새 버니 |
| 说明 | 只填名字，ID 由开发者分配。如果您的月巴是新增的，请回答以下问题，如果是补充旧的月巴，可以忽略以下问题。 | Name only — the developer assigns the ID. If you are submitting a new Banny, please answer the questions below; if you are adding art to an existing Banny, you can skip them. | 名前だけ記入してください。ID は開発者が割り当てます。新しいバニーを投稿する場合は以下の質問にお答えください。既存のバニーに立ち絵を追加する場合は、以下は無視してかまいません。 | 이름만 적어 주세요. ID는 개발자가 지정해요. 새로운 버니를 투고하는 경우 아래 질문에 답해 주세요. 기존 버니에 일러스트를 추가하는 경우 아래 질문은 건너뛰어도 돼요. |
| Q1 题干 | 月巴名字 | Banny name | バニーの名前 | 버니 이름 |
| Q1 帮助 | 尽量简短。如果与现有月巴重名，我们可能微调。 | Keep it short. If it duplicates an existing name, we may adjust it slightly. | 短めにお願いします。既存のバニーと名前が被る場合、少し調整することがあります。 | 짧게 적어 주세요. 기존 버니와 이름이 겹치면 조금 조정할 수 있어요. |
| Q2 题干 | 稀有度 | Rarity | レア度 | 희귀도 |
| Q2 选项 | 1 — 常见<br>2 — 少见<br>3 — 稀有<br>4 — 史诗<br>5 — 传说 | 1 — Common<br>2 — Uncommon<br>3 — Rare<br>4 — Epic<br>5 — Legendary | 1 — コモン<br>2 — アンコモン<br>3 — レア<br>4 — エピック<br>5 — レジェンド | 1 — 일반<br>2 — 흔하지 않음<br>3 — 희귀<br>4 — 에픽<br>5 — 전설 |
| Q2 帮助 | 稀有度会影响价值与生长时间，开发者可能按平衡性微调。 | Rarity affects value and growth time; the developer may adjust it for balance. | レア度は価値と成長時間に影響します。バランス調整のため開発者が微調整する場合があります。 | 희귀도는 가치와 성장 시간에 영향을 줘요. 밸런스를 위해 개발자가 조정할 수 있어요. |
| Q3 题干 | 简介 | Description | 紹介文 | 소개 |
| Q3 帮助 | 一句话设定，最多 60 字，会显示在图鉴里。 | One sentence, max 60 characters. Shown in the Codex. | 一言設定、60文字まで。図鑑に表示されます。 | 한 문장, 최대 60자. 도감에 표시돼요. |
| Q4 题干 | 立绘文件 | Artwork file | 立ち絵ファイル | 일러스트 파일 |
| Q4 帮助 | 同 B04 的 Q2 帮助 | Same as B04 Q2 help | B04 の Q2 ヘルプと同じ | B04의 Q2 도움말과 동일 |
| Q5 题干 | 画师署名 | Artist credit | クレジット名 | 작가 크레딧 |
| Q5 帮助 | 同 B04 的 Q3 帮助 | Same as B04 Q3 help | B04 の Q3 ヘルプと同じ | B04의 Q3 도움말과 동일 |

### B07 · 最后一节 · 授权与确认

**标题**

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 授权与确认 | Permission & confirmation | 権利と確認 | 권한 및 확인 |

**Q1 · 原创与授权**

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 我确认此作品为本人原创（或已获得作者授权），允许在游戏内展示、裁切、压缩、加描边与光晕。 | I confirm this artwork is my own original work (or I have the author's permission), and I allow it to be displayed, cropped, compressed, outlined and glow-tinted in the game. | この作品は本人のオリジナル（または作者の許諾を得ています）であり、ゲーム内での表示・トリミング・圧縮・縁取り・グロー加工を許可します。 | 이 작품은 제가 직접 그린 원작(또는 작가의 허락을 받았으며), 게임 내 표시·자르기·압축·외곽선·글로우 처리를 허용합니다. |

**Q2 · 非 PNG 转换确认**

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 我了解：如果上传的不是透明背景 PNG，开发者会代为抠成透明底 PNG，边缘可能有瑕疵。 | I understand that if my upload is not a transparent PNG, the developer will cut it into a transparent PNG, and the edges may look rough. | アップロードが透明背景の PNG でない場合、開発者が透過 PNG に切り抜きます。輪郭が粗くなる場合があることを理解しました。 | 업로드한 파일이 투명 배경 PNG가 아니면 개발자가 투명 PNG로 누끼 처리하며, 가장자리가 거칠 수 있음을 이해합니다. |

**Q3 · 重复投稿处理**

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 我了解：如果这只月巴已被他人补图并通过，我的作品同样会被保留——所有通过的立绘都会收录，玩家可以在图鉴里自由切换。 | I understand that if this Banny already received approved art from someone else, my artwork will also be kept — all approved artworks stay, and players can switch between them in the Codex. | このバニーにすでに他の人の立ち絵が採用されている場合でも、私の作品も保存されます。採用された立ち絵はすべて収録され、プレイヤーは図鑑で自由に切り替えられます。 | 이 버니에 이미 다른 사람의 일러스트가 승인되어 있어도 제 작품 역시 보관됩니다. 승인된 일러스트는 모두 수록되며, 플레이어는 도감에서 자유롭게 전환할 수 있습니다. |

### B08 · 提交成功页

**中文**
```
谢谢你来画月巴！

投稿已收到。

通过后会带画师署名进入游戏。
```

**English**
```
Thanks for drawing for the Bannies!

Your submission has been received.

If approved, your art will appear in the game with your artist credit.
```

**日本語**
```
バニーを描いてくれてありがとうございます！

投稿を受け付けました。

採用された場合はクレジット付きでゲームに登場します。
```

**한국어**
```
버니를 그려 주셔서 감사합니다!

투고가 접수되었어요.

승인되면 작가 크레딧과 함께 게임에 등장해요.
```

---

## C. 附：不在文档里改、但要一起维护的内容

- 下拉选项清单：[options-all.txt](./options-all.txt)（168 项，原第一/第二图鉴已合并）
- 表单设置、审核表列、入库字段：[form-copy.md](./form-copy.md)
