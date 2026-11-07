# i18n P5 系统说明长文 —— 译文清单（待批注）

范围：`I18N_MISC` 语义键 58 条（帮助文档 / 斗月巴规则 / 成就脚注 / 飞行说明 / 日历图例 / 各类空态 / 皮肤栏标题）+ `I18N_BANNY` `_desc` 键 250 条（成就描述 40 + 旅行地图描述 13 + 便当与旅行道具说明 9）。

口径：说明/UI 类日文**敬体**（です・ます）、韩文**해요체**；旅行地图描述属叙事文本，日文常体、韩文한다체。强调标签 `<b>`、`<br>`、`&lt;` 与 `{占位符}` 原样保留；数字千分位与 R1~R6 不译。

取值：`$tm(key, 中文兜底, params)` 读 `I18N_MISC`（支持 `{k}` 插值）；`$tn(I18N_BANNY, key, 'd', 中文兜底)` 读 `I18N_BANNY`。中文档两者均直返兜底，行为与改造前一致。

---

## A 帮助文档（29 条）

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `help_warn` | ⚠️ <b>游戏尚在开发中，存档只存在浏览器缓存里</b>，清缓存、换设备或浏览器异常都可能丢失，请定期用下方「💾 导出文件」备份。 | ⚠️ <b>The game is still in development, and your save only lives in the browser cache</b>. Clearing the cache, switching devices, or a browser hiccup can all wipe it. Please back up regularly with "💾 Export File" below. | ⚠️ <b>ゲームはまだ開発中で、セーブはブラウザのキャッシュにしか保存されません</b>。キャッシュの削除、機種変更、ブラウザの不具合などで失われることがあります。下の「💾 ファイルを書き出す」で定期的にバックアップしてください。 | ⚠️ <b>게임은 아직 개발 중이며, 세이브는 브라우저 캐시에만 저장돼요</b>. 캐시 삭제, 기기 변경, 브라우저 오류로 사라질 수 있으니 아래 "💾 파일 내보내기"로 정기적으로 백업해 주세요. |
| 2 | `help_goal_t` | 🎯 目标 | 🎯 Goal | 🎯 目標 | 🎯 목표 |
| 3 | `help_goal` | 收集图鉴里所有月巴，每发现新种类首收 <b>3 倍金币</b>。集齐第一图鉴解锁<b>第二图鉴与旅行</b>；收集到<b>百日月巴</b>后解锁<b>🪽 飞行小游戏</b>。 | Collect every Banny in the Codex; each new species pays <b>3× Coins</b> on first collection. Complete the first Codex to unlock <b>the second Codex and Trips</b>; collect the <b>Hundred-Day Banny</b> to unlock the <b>🪽 flight minigame</b>. | 図鑑のすべてのバニーを集めましょう。新種を初めて収穫すると<b>コイン 3 倍</b>。第一図鑑を完成させると<b>第二図鑑と旅</b>が解放され、<b>百日バニー</b>を集めると<b>🪽 飛行ミニゲーム</b>が解放されます。 | 도감의 모든 버니를 모으세요. 새 종을 처음 수확하면 <b>코인 3배</b>를 받아요. 첫 도감을 완성하면 <b>두 번째 도감과 여행</b>이 열리고, <b>백일 버니</b>를 모으면 <b>🪽 비행 미니게임</b>이 열려요. |
| 4 | `help_grow_t` | 🌱 生长与收获 | 🌱 Growth & Harvest | 🌱 成長と収穫 | 🌱 성장과 수확 |
| 5 | `help_grow` | 月巴在木头上经历<b>幼年 → 成长 → 成熟</b>，只有成熟后才能看到真面目并收获，稀有度越高越难出现。成熟后需<b>手动点击收取</b>（番茄钟专注期间自动收集）。离线也会生长，最多结算 <b>12 小时</b>。 | On a piece of wood a Banny goes through <b>Baby → Growing → Ripe</b>. Only when ripe can you see its true form and harvest it; the rarer it is, the harder it appears. Once ripe you must <b>tap to collect</b> (Pomodoro focus collects automatically). They also grow while offline, up to <b>12 hours</b> at a time. | バニーは木材の上で<b>幼年 → 成長 → 成熟</b>と進みます。成熟して初めて本当の姿が見え、収穫できます。レア度が高いほど出現しにくくなります。成熟後は<b>タップして収穫</b>が必要です（ポモドーロの集中中は自動収穫）。オフラインでも成長し、最大 <b>12 時間</b>分まで精算されます。 | 버니는 나무 위에서 <b>유아 → 성장 → 성숙</b> 단계를 거쳐요. 성숙해야만 본모습을 보고 수확할 수 있으며, 희귀도가 높을수록 나타나기 어려워요. 성숙 후에는 <b>직접 탭해서 수확</b>해야 해요(뽀모도로 집중 중에는 자동 수확). 오프라인에서도 성장하며, 최대 <b>12시간</b>까지 정산돼요. |
| 6 | `help_zone_t` | 🏡 场地 | 🏡 Plots | 🏡 区画 | 🏡 구획 |
| 7 | `help_zone` | 共 8 个场地，不同场地解锁不同月巴；<b>买木头、扩槽位都在场景内完成</b>，每根木头可养多只。 | There are 8 plots, and each plot unlocks different Bannies; <b>buying wood and expanding slots are both done inside the scene</b>, and each piece of wood can host several Bannies. | 区画は全部で 8 つあり、区画ごとに解放されるバニーが異なります。<b>木材の購入と発生枠の拡張はシーン内で行います</b>。木材 1 本につき複数匹を育てられます。 | 구획은 총 8곳이며, 구획마다 해금되는 버니가 달라요. <b>나무 구매와 슬롯 확장은 장면 안에서 이뤄져요</b>. 나무 하나에 여러 마리를 키울 수 있어요. |
| 8 | `help_pomo_t` | 🍅 番茄钟 | 🍅 Pomodoro | 🍅 ポモドーロ | 🍅 뽀모도로 |
| 9 | `help_pomo` | 专注期间<b>生长速度 x2 且成熟自动收集</b>；切出界面自动暂停，回来自动继续（开后台挂机可继续计时）。完整番茄才记满时长，不足 5 分钟不记录，也可手动打卡。记录可在<b>打卡日历</b>与 📊 统计中复盘，还支持<b>📌 置顶小窗</b>。 | During focus, <b>growth speed is ×2 and ripe Bannies are auto-collected</b>. Switching away pauses it and coming back resumes (turn on background mode to keep timing). Only a full Pomodoro counts as its full length; under 5 minutes does not count, though you can also check in manually. Review your records in the <b>check-in calendar</b> and 📊 Stats, and you can also pin a <b>📌 mini window</b>. | 集中中は<b>成長速度が 2 倍になり、成熟したものは自動収穫</b>されます。画面を離れると自動で一時停止し、戻ると自動で再開します（バックグラウンド稼働をオンにすると計時が続きます）。完全なポモドーロのみ満点の時間として記録され、5 分未満は記録されません。手動チェックインも可能です。記録は<b>チェックインカレンダー</b>と 📊 統計で振り返れ、<b>📌 ピン留め小窓</b>にも対応しています。 | 집중 중에는 <b>성장 속도가 2배이고, 성숙한 버니는 자동으로 수확</b>돼요. 화면을 벗어나면 자동으로 일시정지되고 돌아오면 다시 이어져요(백그라운드 모드를 켜면 계속 측정). 온전한 뽀모도로만 시간이 꽉 기록되며, 5분 미만은 기록되지 않아요. 수동 체크인도 가능해요. 기록은 <b>체크인 달력</b>과 📊 통계에서 돌아볼 수 있고, <b>📌 작은 창 고정</b>도 지원해요. |
| 10 | `help_time_t` | 🕰️ 时间与天气 | 🕰️ Time & Weather | 🕰️ 時間と天気 | 🕰️ 시간과 날씨 |
| 11 | `help_time` | 游戏内<b>约 2 现实小时 = 1 游戏年</b>，季节与昼夜快速轮转，天气每 8~18 分钟变化一次。番茄钟与待办按<b>现实时间</b>计时。 | In game, <b>about 2 real hours = 1 game year</b>; seasons and day/night cycle quickly, and the weather changes every 8–18 minutes. Pomodoros and to-dos are timed by <b>real time</b>. | ゲーム内では<b>現実の約 2 時間 = ゲーム内 1 年</b>です。季節と昼夜が素早く巡り、天気は 8〜18 分ごとに変わります。ポモドーロとタスクは<b>現実時間</b>で計時されます。 | 게임 안에서는 <b>현실 약 2시간 = 게임 1년</b>이에요. 계절과 밤낮이 빠르게 돌고, 날씨는 8~18분마다 바뀌어요. 뽀모도로와 할 일은 <b>현실 시간</b>으로 측정돼요. |
| 12 | `help_rare_t` | 🗓️ 稀有月巴 | 🗓️ Rare Bannies | 🗓️ レアバニー | 🗓️ 희귀 버니 |
| 13 | `help_rare` | 依赖<b>游戏时间（季节/昼夜）、天气、场地、道具与累计收获</b>，状态栏与图鉴都有提示；个别超稀有月巴无门槛但概率极低。 | Depends on <b>in-game time (season/day-night), weather, plot, items, and cumulative harvests</b>; the status bar and Codex both give hints. A few ultra-rare Bannies have no requirement but an extremely low chance. | <b>ゲーム内時間（季節・昼夜）、天気、区画、アイテム、累計収穫量</b>に左右されます。ステータスバーと図鑑にヒントがあります。ごく一部の超レアバニーは条件なしですが、出現確率はごくわずかです。 | <b>게임 시간(계절·밤낮), 날씨, 구획, 아이템, 누적 수확량</b>에 좌우돼요. 상태 표시줄과 도감에 힌트가 있어요. 일부 초희귀 버니는 조건이 없지만 확률은 극히 낮아요. |
| 14 | `help_travel_t` | 🧳 旅行 | 🧳 Trips | 🧳 旅 | 🧳 여행 |
| 15 | `help_travel` | <b>集齐第一图鉴后解锁</b>。月巴带着便当出门，归来带回<b>信件、照片、特产</b>与第二图鉴的新月巴，还会随机遇到<b>🚪 门口访客</b>。相关玩法：<b>🎰 好运收获</b>老虎机、<b>📮 信箱</b>回看信件。 | <b>Unlocks after you complete the first Codex</b>. Your Banny sets out with a bento and returns with <b>letters, photos, and souvenirs</b> plus new second-Codex Bannies, and may randomly meet a <b>🚪 doorstep visitor</b>. Related features: the <b>🎰 Lucky Harvest</b> slot machine and the <b>📮 mailbox</b> for rereading letters. | <b>第一図鑑を完成させると解放</b>されます。バニーはお弁当を持って出かけ、<b>手紙・写真・特産品</b>と第二図鑑の新しいバニーを持ち帰ります。たまに<b>🚪 玄関先の来客</b>に出会うこともあります。関連: <b>🎰 ラッキー収穫</b>スロット、<b>📮 郵便受け</b>で手紙を見返せます。 | <b>첫 도감을 완성하면 해금</b>돼요. 버니가 도시락을 들고 떠나서 <b>편지·사진·특산품</b>과 두 번째 도감의 새 버니를 가져와요. 가끔 <b>🚪 문 앞 손님</b>을 만나기도 해요. 관련 기능: <b>🎰 행운 수확</b> 슬롯머신, <b>📮 우체통</b>에서 편지 다시 보기. |
| 16 | `help_fly_t` | 🪽 飞行小游戏 | 🪽 Flight Minigame | 🪽 飛行ミニゲーム | 🪽 비행 미니게임 |
| 17 | `help_fly` | <b>收集到百日月巴后解锁</b>。选一只月巴，点屏幕或按空格让它上飞、穿过柱子得分，分<b>关卡</b>与<b>自由</b>两种模式，成绩记入 🏆 排行榜。 | <b>Unlocks after you collect the Hundred-Day Banny</b>. Pick a Banny, then tap the screen or press Space to make it fly upward and score by passing through the pillars. There are <b>stage</b> and <b>free</b> modes, and scores go to the 🏆 leaderboard. | <b>百日バニーを集めると解放</b>されます。バニーを 1 匹選び、画面をタップするかスペースキーで上昇させ、柱をくぐって得点します。<b>ステージ</b>と<b>フリー</b>の 2 モードがあり、成績は 🏆 ランキングに記録されます。 | <b>백일 버니를 모으면 해금</b>돼요. 버니 한 마리를 고르고 화면을 톡 누르거나 스페이스를 누르면 위로 날아올라 기둥을 통과하며 점수를 얻어요. <b>스테이지</b>와 <b>프리</b> 두 모드가 있고, 점수는 🏆 리더보드에 기록돼요. |
| 18 | `help_task_t` | ✅ 任务 / 待办 | ✅ Tasks / To-dos | ✅ タスク / やること | ✅ 할 일 / 투두 |
| 19 | `help_task` | 支持<b>分类、优先级、#标签、起止日期</b>；可用 <b>🍅 预估</b>按番茄数自动拆成子项，开启<b>🔄 习惯</b>后按时间段每天自动生成。完成的番茄会关联到任务。 | Supports <b>categories, priorities, #tags, and start/end dates</b>; you can use <b>🍅 estimate</b> to auto-split a task into sub-items by Pomodoro count, and turn on <b>🔄 Habit</b> to regenerate it daily by time period. Finished Pomodoros link to their task. | <b>カテゴリ・優先度・#タグ・開始/終了日</b>に対応。<b>🍅 見積もり</b>でポモドーロ数に応じて自動でサブ項目に分割でき、<b>🔄 習慣</b>をオンにすると時間帯ごとに毎日自動生成されます。完了したポモドーロはタスクに紐づきます。 | <b>분류·우선순위·#태그·시작/종료일</b>을 지원해요. <b>🍅 예상</b>으로 뽀모도로 수에 맞춰 자동으로 하위 항목으로 나눌 수 있고, <b>🔄 습관</b>을 켜면 시간대별로 매일 자동 생성돼요. 완료한 뽀모도로는 할 일에 연결돼요. |
| 20 | `help_dex_t` | 📗 图鉴与皮肤 | 📗 Codex & Skins | 📗 図鑑とスキン | 📗 도감과 스킨 |
| 21 | `help_dex` | 记录每种月巴的<b>身高/体重极值</b>、首次出现时间与简介，收集进度达标可解锁<b>皮肤/主题</b>并随时切换。 | Records each Banny\u2019s <b>height/weight extremes</b>, first-appearance time, and profile; reaching collection milestones unlocks <b>skins/themes</b> you can switch anytime. | 各バニーの<b>身長・体重の極値</b>、初出現時刻、紹介文を記録します。収集の進捗が条件を満たすと<b>スキン・テーマ</b>が解放され、いつでも切り替えられます。 | 버니마다 <b>키·몸무게 극값</b>, 최초 등장 시각, 소개를 기록해요. 수집 진척이 기준에 도달하면 <b>스킨·테마</b>가 열려 언제든 바꿀 수 있어요. |
| 22 | `help_event_t` | 💫 天降事件 | 💫 Skyfall Events | 💫 天からのイベント | 💫 하늘에서 내리는 이벤트 |
| 23 | `help_event` | 状态栏出现「💫 天降事件！」时点一下，领取限时惊喜。 | When "💫 Skyfall Event!" appears in the status bar, tap it to claim a limited-time surprise. | ステータスバーに「💫 天からのイベント！」が出たらタップして、期間限定のサプライズを受け取りましょう。 | 상태 표시줄에 "💫 하늘에서 내리는 이벤트!"가 뜨면 톡 눌러 기간 한정 깜짝 선물을 받으세요. |
| 24 | `help_other_t` | ⚙️ 其他 | ⚙️ Other | ⚙️ その他 | ⚙️ 기타 |
| 25 | `help_other` | 顶栏可开<b>🔊 静音</b>与<b>⚡ 低功耗</b>；<b>🏆 成就</b>共 40 项随进度自动达成，点顶栏 🏆 查看进度；极少数日子会限时出现口令入口。 | The top bar lets you toggle <b>🔊 Mute</b> and <b>⚡ Low Power</b>; there are 40 <b>🏆 Achievements</b> that unlock automatically as you progress — tap 🏆 in the top bar to check them. On rare days a limited-time passcode entry appears. | トップバーで<b>🔊 ミュート</b>と<b>⚡ 低電力</b>を切り替えられます。<b>🏆 実績</b>は全 40 個で、進捗に応じて自動達成され、トップバーの 🏆 で確認できます。ごくまれに期間限定の合言葉入口が現れます。 | 상단 바에서 <b>🔊 음소거</b>와 <b>⚡ 저전력</b>을 켤 수 있어요. <b>🏆 업적</b>은 총 40개로 진척에 따라 자동 달성되며, 상단 바의 🏆를 눌러 확인해요. 아주 드물게 기간 한정 암호 입구가 나타나요. |
| 26 | `help_backup_t` | 💾 存档备份 | 💾 Save Backup | 💾 セーブのバックアップ | 💾 세이브 백업 |
| 27 | `help_save_count` | 📦 备份内容：图鉴 {dex} 种 · 场地 {zon}/{ztot} · 🍅 打卡 {pomo} 条 · 任务 {task} 条 · 番茄钟设置 | 📦 Backup contents: {dex} Codex species · plots {zon}/{ztot} · 🍅 check-ins {pomo} · tasks {task} · Pomodoro settings | 📦 バックアップ内容：図鑑 {dex} 種 ・ 区画 {zon}/{ztot} ・ 🍅 チェックイン {pomo} 件 ・ タスク {task} 件 ・ ポモドーロ設定 | 📦 백업 내용: 도감 {dex}종 · 구획 {zon}/{ztot} · 🍅 체크인 {pomo}건 · 할 일 {task}건 · 뽀모도로 설정 |
| 28 | `help_mobile` | 📱 <b>手机用户注意：请点「💾 导出文件」备份，不要用「📋 复制存档」。</b>复制有数量上限，存档过长时容易被截断、复制不全，导出成文件才完整可靠。 | 📱 <b>Mobile users: please back up with "💾 Export File", not "📋 Copy Save".</b> Copying has a size limit, and a long save can be truncated or copied incompletely — exporting to a file is complete and reliable. | 📱 <b>スマホの方へ：バックアップは「📋 セーブをコピー」ではなく「💾 ファイルを書き出す」をご利用ください。</b>コピーには文字数上限があり、セーブが長いと途中で切れて不完全になりがちです。ファイルに書き出せば完全で確実です。 | 📱 <b>모바일 사용자 안내: 백업은 "📋 세이브 복사"가 아니라 "💾 파일 내보내기"를 이용해 주세요.</b> 복사에는 길이 제한이 있어 세이브가 길면 잘리거나 불완전해질 수 있어요. 파일로 내보내야 완전하고 확실해요. |
| 29 | `help_reset_t` | ⚠️ 重置存档 | ⚠️ Reset Save | ⚠️ セーブのリセット | ⚠️ 세이브 초기화 |

## B 斗月巴规则（10 条）

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `dd_title` | 📖 斗月巴规则 | 📖 Banny Duel Rules | 📖 バニー対決のルール | 📖 버니 맞짱 규칙 |
| 2 | `dd_rank` | <b>牌面大小</b>：3 &lt; 4 &lt; … &lt; K &lt; A &lt; 2 &lt; 小王 &lt; 大王 | <b>Card order</b>: 3 &lt; 4 &lt; … &lt; K &lt; A &lt; 2 &lt; small Joker &lt; big Joker | <b>カードの強さ</b>：3 &lt; 4 &lt; … &lt; K &lt; A &lt; 2 &lt; 小ジョーカー &lt; 大ジョーカー | <b>카드 서열</b>: 3 &lt; 4 &lt; … &lt; K &lt; A &lt; 2 &lt; 작은 조커 &lt; 큰 조커 |
| 3 | `dd_combo` | <b>牌型</b>：单张、对子、三张、三带一、三带二、顺子（≥5 张连续单牌）、连对（≥3 对连续）、飞机（连续三张，可带单/带对）、四带二、炸弹（四张相同）、王炸（双王）。 | <b>Card sets</b>: single, pair, triple, triple with one, triple with a pair, straight (5+ consecutive singles), consecutive pairs (3+ pairs in a row), airplane (consecutive triples, optionally with singles or pairs), four with two, bomb (four of a kind), rocket (both Jokers). | <b>役</b>：単枚・ペア・スリーカード・スリー＋1・スリー＋ペア・ストレート（5 枚以上の連続単枚）・連続ペア（3 ペア以上の連続）・飛行機（連続スリー、単枚/ペアを付け可）・フォー＋2・ボム（同じ札 4 枚）・ロケット（ジョーカー 2 枚）。 | <b>족보</b>: 단일, 페어, 트리플, 트리플+1, 트리플+페어, 스트레이트(5장 이상 연속 단일), 연속 페어(3페어 이상 연속), 비행기(연속 트리플, 단일/페어 첨부 가능), 포카드+2, 폭탄(같은 카드 4장), 로켓(조커 2장). |
| 4 | `dd_beat` | <b>压牌</b>：同牌型同张数比大小；炸弹可压任意非炸弹牌，王炸最大。 | <b>Beating</b>: same set type and same count are compared by rank; a bomb beats any non-bomb, and the rocket is highest. | <b>出し方</b>：同じ役・同じ枚数で大小を比べます。ボムはボム以外の何でも倒せ、ロケットが最強です。 | <b>카드 내기</b>: 같은 족보·같은 장수면 서열로 비교해요. 폭탄은 폭탄이 아닌 어떤 카드도 이기고, 로켓이 가장 커요. |
| 5 | `dd_goal` | <b>目标</b>：先把手中牌出完的一方获胜。地主一人对两个农民，任一农民出完则农民方获胜。 | <b>Goal</b>: be the first side to play out all its cards. The landlord faces two farmers alone; if either farmer runs out, the farmers win. | <b>目標</b>：手札を先に全部出し切った側の勝ちです。地主 1 人 対 農民 2 人で、どちらか一方の農民が上がれば農民側の勝ちです。 | <b>목표</b>: 손패를 먼저 다 내려놓은 쪽이 승리해요. 지주 1명 대 농민 2명이며, 농민 한 명이라도 다 내면 농민 편이 이겨요. |
| 6 | `dd_diff` | <b>难度与奖励</b>：墨镜月巴（简单，AI 会犯错，奖励 ×0.2）、进食月巴（中等，奖励 ×0.5）、背头月巴（困难，AI 很强很聪明，奖励 ×1）。押注最高 100 🍅，也可以不押注「随便玩玩」。地主赢净赚 2×押注，农民赢净赚 1×押注，再乘难度倍率；输则损失押注。 | <b>Difficulty & rewards</b>: Sunglasses Banny (Easy, the AI makes mistakes, reward ×0.2), Munching Banny (Medium, reward ×0.5), Slicked-back Banny (Hard, a strong, clever AI, reward ×1). You can bet up to 100 🍅, or play "just for fun" with no bet. As landlord you net 2× the bet on a win, as a farmer 1× the bet, then multiplied by the difficulty rate; lose and you lose your bet. | <b>難易度と報酬</b>：サングラスバニー（やさしい、AI がミスをし、報酬 ×0.2）、もぐもぐバニー（ふつう、報酬 ×0.5）、リーゼントバニー（むずかしい、AI が強く賢く、報酬 ×1）。賭けは最大 100 🍅 まで、賭けずに「気ままに遊ぶ」こともできます。地主で勝つと賭けの 2 倍、農民で勝つと 1 倍を純増し、さらに難易度倍率を掛けます。負けると賭けを失います。 | <b>난이도와 보상</b>: 선글라스 버니(쉬움, AI가 실수하고 보상 ×0.2), 먹방 버니(보통, 보상 ×0.5), 리젠트 버니(어려움, AI가 매우 강하고 영리하며 보상 ×1). 최대 100 🍅까지 걸 수 있고, 걸지 않고 "그냥 즐기기"도 가능해요. 지주로 이기면 판돈의 2배, 농민으로 이기면 1배를 순이익으로 얻고 난이도 배율을 곱해요. 지면 판돈을 잃어요. |
| 7 | `dd_daily` | <b>每日押注次数</b>：每天最多押注 <b>3 次</b>（北京时间自然日 0 点重置）。3 次用完后，当天只能「随便玩玩」（不押注、不输赢番茄）。 | <b>Daily bets</b>: at most <b>3 bets</b> per day (reset at 00:00 Beijing time). After the 3 are used, for the rest of the day you can only play "just for fun" (no bet, no Tomatoes won or lost). | <b>1 日の賭け回数</b>：1 日につき最大 <b>3 回</b>まで賭けられます（北京時間の 0 時にリセット）。3 回を使い切ると、その日は「気ままに遊ぶ」しかできません（賭けなし、トマトの勝ち負けなし）。 | <b>하루 판돈 횟수</b>: 하루 최대 <b>3번</b>까지 걸 수 있어요(베이징 시간 0시에 초기화). 3번을 다 쓰면 그날은 "그냥 즐기기"만 가능해요(판돈 없음, 토마토 승패 없음). |
| 8 | `dd_refresh` | <b>关于刷新</b>：押注在开局瞬间就扣除并记次。中途刷新或关窗不会丢局——回到游戏会自动恢复到牌桌接着打（手牌、押注、进度都在），打完这一局才写入战绩。所以刷新并不能重开换牌，看到手牌不好想刷新重来是不划算的，请想好再开局。 | <b>About refreshing</b>: the bet is deducted and counted the instant the game starts. Refreshing or closing the window mid-game does not lose it — returning to the game restores you to the table to continue (hand, bet, and progress intact), and records are saved only after the hand finishes. So refreshing cannot reroll your hand; if you see a bad hand, refreshing to start over is not worth it. Think it through before you start. | <b>リロードについて</b>：賭けは対局開始の瞬間に引かれ、回数が記録されます。途中でリロードしたり窓を閉じても対局は失われません——戻ると自動で卓に復帰して続きから打てます（手札・賭け・進捗もそのまま）。1 局終えて初めて戦績が記録されます。つまりリロードで手札を引き直すことはできません。手札が悪いからとリロードしてやり直すのは損なので、よく考えてから始めてください。 | <b>새로고침에 대하여</b>: 판돈은 대국 시작 순간에 차감되고 횟수가 기록돼요. 중간에 새로고침하거나 창을 닫아도 대국은 사라지지 않아요——돌아오면 자동으로 탁자로 복귀해 이어서 칠 수 있어요(손패·판돈·진행도 그대로). 한 판을 끝내야 전적이 기록돼요. 즉 새로고침으로 손패를 다시 돌릴 수는 없어요. 손패가 안 좋다고 새로고침해 다시 시작하는 건 손해이니, 잘 생각하고 시작하세요. |
| 9 | `dd_multi` | <b>多开页面</b>：若同时开多个页面，番茄余额与押注次数都以存档为准，不会因为多开而多出次数或重复花掉同一笔番茄。 | <b>Multiple tabs</b>: if you open several pages at once, your Tomato balance and bet count both follow the save; opening more tabs does not grant extra bets or spend the same Tomatoes twice. | <b>複数タブ</b>：複数のページを同時に開いても、トマト残高と賭け回数はセーブが基準です。タブを増やしても回数が増えたり、同じトマトを二重に使うことはありません。 | <b>다중 탭</b>: 여러 페이지를 동시에 열어도 토마토 잔액과 판돈 횟수는 세이브를 기준으로 해요. 탭을 늘려도 횟수가 늘거나 같은 토마토를 두 번 쓰지 않아요. |
| 10 | `ui_dd_ok` | 知道了 | Got it | わかりました | 알겠어요 |

## C 成就脚注 / 飞行 / 空态 / 图例 / 皮肤栏（19 条）

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `ui_btn_copy` | 📋 复制存档 | 📋 Copy Save | 📋 セーブをコピー | 📋 세이브 복사 |
| 2 | `ui_btn_export` | 💾 导出文件 | 💾 Export File | 💾 ファイルを書き出す | 💾 파일 내보내기 |
| 3 | `ui_btn_paste` | 📥 粘贴导入 | 📥 Paste & Import | 📥 貼り付けて取り込む | 📥 붙여넣기 가져오기 |
| 4 | `ui_btn_importf` | 📂 导入文件 | 📂 Import File | 📂 ファイルを取り込む | 📂 파일 가져오기 |
| 5 | `ui_btn_confirm_import` | ✅ 确认导入（覆盖当前存档） | ✅ Confirm import (overwrite current save) | ✅ 取り込みを確定（現在のセーブを上書き） | ✅ 가져오기 확인 (현재 세이브 덮어쓰기) |
| 6 | `ui_btn_reset` | 🗑️ 重置全部存档 | 🗑️ Reset All Save Data | 🗑️ すべてのセーブをリセット | 🗑️ 전체 세이브 초기화 |
| 7 | `ui_placeholder_import` | 粘贴存档 JSON 到此处… | Paste save JSON here… | セーブの JSON をここに貼り付け… | 세이브 JSON을 여기에 붙여넣기… |
| 8 | `ach_footnote` | 🏆 成就随进度自动达成，达成时会在游戏里提示一次；金框为已达成，灰框显示当前进度。 | 🏆 Achievements unlock automatically as you progress, with an in-game notice when you earn one; gold frames are earned, grey frames show current progress. | 🏆 実績は進捗に応じて自動達成され、達成時にゲーム内で一度通知されます。金枠は達成済み、灰枠は現在の進捗を示します。 | 🏆 업적은 진척에 따라 자동 달성되며, 달성 시 게임에서 한 번 알려줘요. 금색 테두리는 달성, 회색 테두리는 현재 진척을 나타내요. |
| 9 | `fly_freemode` | 自由模式 · 没有终点，一直飞下去<br>本模式最佳：<b>{n}</b> 分 | Free Mode · no finish line, just keep flying<br>Best in this mode: <b>{n}</b> pts | フリーモード ・ 終わりはなく、ひたすら飛び続ける<br>このモードのベスト：<b>{n}</b> 点 | 프리 모드 · 끝이 없이 계속 날아가기<br>이 모드 최고 기록: <b>{n}</b>점 |
| 10 | `fly_lb_empty` | 还没有自由模式的记录，快去飞一次吧～ | No free-mode records yet — go take a flight! | まだフリーモードの記録がありません。さっそく飛んでみましょう～ | 아직 프리 모드 기록이 없어요. 얼른 한 번 날아보세요~ |
| 11 | `ui_cal_legend_task` | • 有任务的日期带圆点 · 点击日期选择 / 查看当天待办 | • Dates with tasks show a dot · tap a date to select / view that day\u2019s to-dos | • タスクのある日はドット付き ・ 日付をタップして選択 / その日のやることを表示 | • 할 일이 있는 날은 점 표시 · 날짜를 눌러 선택 / 그날 할 일 보기 |
| 12 | `ui_cal_legend_pomo` | 🎨 每 8 小时换一种颜色 · 一天最多 4 色（24 小时） | 🎨 A new color every 8 hours · up to 4 colors a day (24 hours) | 🎨 8 時間ごとに色が変わり ・ 1 日最大 4 色（24 時間） | 🎨 8시간마다 색이 바뀜 · 하루 최대 4색(24시간) |
| 13 | `ui_gal_empty` | 🖼 画廊还空着<br><small>新的画面正在路上，敬请期待…</small> | 🖼 The gallery is still empty<br><small>New artwork is on the way — stay tuned…</small> | 🖼 ギャラリーはまだ空です<br><small>新しい一枚を準備中。お楽しみに…</small> | 🖼 갤러리가 아직 비어 있어요<br><small>새 그림을 준비 중이에요. 기대해 주세요…</small> |
| 14 | `ui_tv_yard_empty` | 🧺 庭院安安静静，先去图鉴里收集一些月巴吧 | 🧺 The yard is quiet — go collect some Bannies in the Codex first | 🧺 庭はしんと静か。まず図鑑でバニーを集めましょう | 🧺 마당이 조용해요. 먼저 도감에서 버니를 모아 보세요 |
| 15 | `ui_tv_home_empty` | 🧺 室内空空的，让月巴去收集一些番茄吧 | 🧺 Indoors is empty — send a Banny out to gather some Tomatoes | 🧺 部屋はがらんとしています。バニーにトマトを集めさせましょう | 🧺 실내가 텅 비었어요. 버니를 보내 토마토를 모아 오게 하세요 |
| 16 | `ui_skin_map_title` | 🗺 地图皮肤 | 🗺 Map Skins | 🗺 マップスキン | 🗺 맵 스킨 |
| 17 | `ui_skin_map_note` | 集齐对应地图的信件与特产解锁，点击领取·切换 | Unlock by collecting that map\u2019s letters and souvenirs; tap to claim & switch | 対応するマップの手紙と特産品を集めると解放。タップで受け取り・切り替え | 해당 맵의 편지와 특산품을 모으면 해금. 눌러서 받기·전환 |
| 18 | `ui_skin_ui_title` | 🎨 界面皮肤 | 🎨 UI Skins | 🎨 インターフェーススキン | 🎨 인터페이스 스킨 |
| 19 | `ui_skin_ui_note` | 收获对应月巴解锁，点击领取·切换 | Unlock by harvesting the matching Banny; tap to claim & switch | 対応するバニーを収穫すると解放。タップで受け取り・切り替え | 해당 버니를 수확하면 해금. 눌러서 받기·전환 |

## D 成就描述（40 条，`I18N_BANNY` 键 `ach_<id>_desc`）

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `ach_h1_desc` | 收获第 1 只月巴 | Harvest your first Banny | 初めてバニーを収穫する | 첫 버니를 수확하기 |
| 2 | `ach_d1_desc` | 图鉴解锁 10 种月巴 | Unlock 10 Banny species in the Codex | 図鑑で 10 種のバニーを解放する | 도감에서 버니 10종 해금하기 |
| 3 | `ach_p1_desc` | 完成或记录第 1 个番茄钟 | Complete or log your first Pomodoro | 初めてポモドーロを完了または記録する | 첫 뽀모도로를 완료하거나 기록하기 |
| 4 | `ach_z2_desc` | 解锁第 2 个场地 | Unlock your 2nd plot | 2 つ目の区画を解放する | 두 번째 구획 해금하기 |
| 5 | `ach_h2_desc` | 累计收获 100 次 | Harvest 100 times in total | 累計で 100 回収穫する | 누적 100회 수확하기 |
| 6 | `ach_s8_desc` | 任意一根栽培木达到 8 个槽位 | Reach 8 slots on any single wood | いずれかの木材の発生枠を 8 つまで拡張する | 아무 나무 하나를 슬롯 8개까지 확장하기 |
| 7 | `ach_d2_desc` | 开启第二图鉴 | Unlock the second Codex | 第二図鑑を解放する | 두 번째 도감 해금하기 |
| 8 | `ach_z8_desc` | 8 个场地全部解锁 | Unlock all 8 plots | 8 つの区画をすべて解放する | 구획 8곳 모두 해금하기 |
| 9 | `ach_w10_desc` | 栽培木总数达到 10 根 | Own 10 woods in total | 木材の総数を 10 本にする | 나무 총 10그루 보유하기 |
| 10 | `ach_p2_desc` | 累计打卡 100 次 | Log 100 check-ins in total | 累計 100 回チェックインする | 누적 100회 체크인하기 |
| 11 | `ach_p3_desc` | 连续打卡 7 天 | Check in 7 days in a row | 7 日連続でチェックインする | 7일 연속 체크인하기 |
| 12 | `ach_g1_desc` | 累计赚取 1,000,000 金币 | Earn 1,000,000 Coins in total | 累計 1,000,000 コインを稼ぐ | 누적 1,000,000 코인 벌기 |
| 13 | `ach_i4_desc` | 商店 4 件道具全部购入 | Buy all 4 shop items | ショップのアイテム 4 点をすべて購入する | 상점 아이템 4종 모두 구매하기 |
| 14 | `ach_t1_desc` | 累计完成 50 个任务 | Finish 50 to-dos in total | 累計 50 個のタスクを完了する | 누적 50개 할 일 완료하기 |
| 15 | `ach_a10_desc` | 常驻加速器升到 Lv.10 | Upgrade the permanent Accelerator to Lv.10 | 常駐アクセラレーターを Lv.10 まで上げる | 상시 가속기를 Lv.10까지 올리기 |
| 16 | `ach_e1_desc` | 任意一只月巴四项极值全部达成金框 | Max out all four extremes of any one Banny | いずれか 1 匹のバニーの 4 項目の極値をすべて金枠にする | 아무 버니 한 마리의 네 가지 극값을 모두 금색 테두리로 달성하기 |
| 17 | `ach_h3_desc` | 累计收获 1,000 次 | Harvest 1,000 times in total | 累計 1,000 回収穫する | 누적 1,000회 수확하기 |
| 18 | `ach_p4_desc` | 累计专注时长达到 50 小时 | Focus for 50 hours in total | 累計の集中時間を 50 時間にする | 누적 집중 시간 50시간 달성하기 |
| 19 | `ach_v1_desc` | 旅行去过 6 张不同的地图 | Visit 6 different maps on Trips | 旅で 6 種類のマップを訪れる | 여행에서 서로 다른 맵 6곳 방문하기 |
| 20 | `ach_d3_desc` | 两页图鉴合计解锁 100 种月巴 | Unlock 100 Banny species across both Codexes | 2 つの図鑑を合わせて 100 種のバニーを解放する | 두 도감을 합쳐 버니 100종 해금하기 |
| 21 | `ach_h4_desc` | 累计收获 5,000 次 | Harvest 5,000 times in total | 累計 5,000 回収穫する | 누적 5,000회 수확하기 |
| 22 | `ach_d4_desc` | 第一图鉴解锁 50 种月巴 | Unlock 50 species in the first Codex | 第一図鑑で 50 種のバニーを解放する | 첫 도감에서 버니 50종 해금하기 |
| 23 | `ach_d5_desc` | 第一图鉴解锁 80 种月巴 | Unlock 80 species in the first Codex | 第一図鑑で 80 種のバニーを解放する | 첫 도감에서 버니 80종 해금하기 |
| 24 | `ach_c1_desc` | 任意一种月巴收集满 50 只 | Collect 50 of any one Banny | いずれか 1 種のバニーを 50 匹集める | 아무 버니 한 종을 50마리 모으기 |
| 25 | `ach_e2_desc` | 5 只月巴四项极值全部达成金框 | Max out all four extremes of 5 Bannies | 5 匹のバニーで 4 項目の極値をすべて金枠にする | 버니 5마리의 네 가지 극값을 모두 금색 테두리로 달성하기 |
| 26 | `ach_w30_desc` | 栽培木总数达到 30 根 | Own 30 woods in total | 木材の総数を 30 本にする | 나무 총 30그루 보유하기 |
| 27 | `ach_d6_desc` | 第二图鉴解锁 30 种月巴 | Unlock 30 species in the second Codex | 第二図鑑で 30 種のバニーを解放する | 두 번째 도감에서 버니 30종 해금하기 |
| 28 | `ach_p5_desc` | 连续打卡 30 天 | Check in 30 days in a row | 30 日連続でチェックインする | 30일 연속 체크인하기 |
| 29 | `ach_v2_desc` | 旅行去过 8 张不同的地图 | Visit 8 different maps on Trips | 旅で 8 種類のマップを訪れる | 여행에서 서로 다른 맵 8곳 방문하기 |
| 30 | `ach_s1_desc` | 解锁全部 4 款季节皮肤 | Unlock all 4 seasonal skins | 季節スキン 4 種をすべて解放する | 계절 스킨 4종 모두 해금하기 |
| 31 | `ach_a15_desc` | 常驻加速器升到 Lv.15 | Upgrade the permanent Accelerator to Lv.15 | 常駐アクセラレーターを Lv.15 まで上げる | 상시 가속기를 Lv.15까지 올리기 |
| 32 | `ach_p6_desc` | 累计打卡 500 次 | Log 500 check-ins in total | 累計 500 回チェックインする | 누적 500회 체크인하기 |
| 33 | `ach_c2_desc` | 任意一种月巴收集满 200 只 | Collect 200 of any one Banny | いずれか 1 種のバニーを 200 匹集める | 아무 버니 한 종을 200마리 모으기 |
| 34 | `ach_t2_desc` | 累计完成 200 个任务 | Finish 200 to-dos in total | 累計 200 個のタスクを完了する | 누적 200개 할 일 완료하기 |
| 35 | `ach_v3_desc` | 收集 40 种旅行特产 | Collect 40 kinds of trip souvenirs | 旅の特産品を 40 種集める | 여행 특산품 40종 모으기 |
| 36 | `ach_f1_desc` | 飞行自由模式得分达到 30 | Score 30 in Flight free mode | 飛行フリーモードで 30 点を取る | 비행 프리 모드에서 30점 달성하기 |
| 37 | `ach_e3_desc` | 20 只月巴四项极值全部达成金框 | Max out all four extremes of 20 Bannies | 20 匹のバニーで 4 項目の極値をすべて金枠にする | 버니 20마리의 네 가지 극값을 모두 금색 테두리로 달성하기 |
| 38 | `ach_p7_desc` | 累计专注时长达到 200 小时 | Focus for 200 hours in total | 累計の集中時間を 200 時間にする | 누적 집중 시간 200시간 달성하기 |
| 39 | `ach_g2_desc` | 累计赚取 100,000,000 金币 | Earn 100,000,000 Coins in total | 累計 100,000,000 コインを稼ぐ | 누적 100,000,000 코인 벌기 |
| 40 | `ach_d7_desc` | 两页图鉴合计解锁 150 种月巴 | Unlock 150 Banny species across both Codexes | 2 つの図鑑を合わせて 150 種のバニーを解放する | 두 도감을 합쳐 버니 150종 해금하기 |

## E 旅行地图描述（13 条，键 `dest_<id>_desc`）

注：仅 `need==='charm'` 的 4 张图（雪山 / 遗迹 / 冰湖 / 失落王庭）当前会在旅行商店渲染；其余 9 条为潜伏数据，先行译好备用。

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `dest_fairy_desc` | 穿过森林边缘尽头那道会呼吸的藤门，是一处似乎被时间遗忘的秘境——据说这里住着精灵。 | Through the breathing vine gate at the far end of the Forest Edge lies a hidden realm that time seems to have forgotten — they say fairies live here. | 森のほとりの突き当たりにある、息づくような蔦の門をくぐると、時間に忘れられたかのような秘境が広がっている——ここには精霊が住むという。 | 숲의 가장자리 끝, 숨 쉬는 듯한 덩굴 문을 지나면 시간에게 잊힌 듯한 비경이 펼쳐져 있다——이곳에는 정령이 산다고 한다. |
| 2 | `dest_ancient_desc` | 穿过桃源尽头那道半开的石门，是一处不被时间记住的旧地——据说这里住着古老的生物与神话中的存在。 | Through the half-open stone gate at the end of Fairy Hideaway lies an old land time does not remember — they say ancient creatures and mythical beings live here. | 桃源郷の突き当たりにある半開きの石門をくぐると、時間に記憶されない古き地が広がっている——ここには古き生き物と神話の存在が住むという。 | 무릉도원 끝, 반쯤 열린 돌문을 지나면 시간이 기억하지 않는 옛 땅이 펼쳐져 있다——이곳에는 고대의 생물과 신화 속 존재가 산다고 한다. |
| 3 | `dest_cursed_desc` | 校对完那本书的瞬间，书页自己翻动，把两位吸进了一场幻境。这里曾是被诅咒的死地，寸草不生。 | The moment the book was proofread, its pages turned on their own and pulled the two into an illusion. This was once a cursed land where nothing grew. | あの本の校正を終えた瞬間、ページがひとりでにめくれて、二人は幻境へと引き込まれた。ここはかつて呪われた死の地で、草一本生えなかった。 | 그 책의 교정을 마친 순간, 책장이 저절로 넘어가 두 사람은 환영 속으로 빨려 들어갔다. 이곳은 한때 저주받은 죽음의 땅으로, 풀 한 포기 자라지 않았다. |
| 4 | `dest_island_desc` | 月巴和番茄乘着小船出了海，一路上遇见海豚与鲸鱼，最后靠上一座亮着灯火的小岛。岛上的夜晚，有篝火，也有说不完的传说。 | Banny and Tomato set out to sea in a small boat, met dolphins and whales along the way, and finally came to an island lit with lamps. On that island, nights bring bonfires and endless legends. | バニーとトマトは小舟で海へ出て、道中でイルカとクジラに出会い、最後に灯りのともる小島へとたどり着いた。島の夜には焚き火があり、語り尽くせない伝説もある。 | 버니와 토마토는 작은 배로 바다에 나가, 가는 길에 돌고래와 고래를 만나고, 마침내 불이 켜진 작은 섬에 닿았다. 섬의 밤에는 모닥불이 있고, 끝없는 전설도 있다. |
| 5 | `dest_atlantis_desc` | 航海途中，海面忽然诡异得没有一丝风，巨浪凭空而起掀翻了小船。月巴和番茄沉入海底，醒来时却发现自己竟能呼吸，面前是一座空无一人的海底城市。 | Mid-voyage, the sea turned eerily windless, and a giant wave rose from nowhere to capsize the boat. Banny and Tomato sank to the seafloor — and woke to find they could breathe, facing an empty undersea city. | 航海の途中、海面は不気味なほど風ひとつなくなり、大波がどこからともなく湧いて小舟をひっくり返した。バニーとトマトは海底へ沈み、目を覚ますと自分たちが呼吸できることに気づく。目の前には、人ひとりいない海底都市が広がっていた。 | 항해 도중, 바다는 으스스할 만큼 바람 한 점 없었고, 큰 파도가 어디선가 솟아올라 작은 배를 뒤집었다. 버니와 토마토는 해저로 가라앉았고, 깨어나 보니 숨을 쉴 수 있다는 것을 알게 되었다. 눈앞에는 사람 하나 없는 해저 도시가 펼쳐져 있었다. |
| 6 | `dest_merfolk_desc` | 破开水面的一刻，阳光重新照了下来。可还没等松口气，月巴和番茄就发现，海面下浮着一圈模糊的影子，正围着它们慢慢打转。那是一群早就悄悄等在这里的生灵。 | The instant they broke the surface, sunlight fell again. But before they could breathe easy, Banny and Tomato noticed a ring of blurry shadows drifting below, slowly circling them. It was a host of beings that had quietly waited here all along. | 水面を破った瞬間、陽光がふたたび降り注いだ。だが安堵する間もなく、バニーとトマトは海面下にぼんやりした影が輪になって浮かび、自分たちの周りをゆっくり回っているのに気づく。それは、ずっと前からここで静かに待っていた生き物たちだった。 | 수면을 깨뜨린 순간, 햇빛이 다시 쏟아졌다. 하지만 안심하기도 전에, 버니와 토마토는 수면 아래 흐릿한 그림자들이 둥글게 떠서 자신들을 천천히 맴도는 것을 알아차렸다. 그것은 오래전부터 이곳에서 조용히 기다리던 생명들이었다. |
| 7 | `dest_moon_desc` | 小镇入夜后，广场后巷会亮起一串暖黄的灯笼。沿着灯火往里走，是一条只有夜里才开张的集市。这里卖的都是白天买不到的东西。 | After nightfall in town, a string of warm yellow lanterns lights up the back alley behind the square. Follow the lights inward to a market that opens only at night. Everything here is something you cannot buy by day. | 町に夜が更けると、広場の裏路地に暖かな黄色の提灯が一列に灯る。その灯りをたどって奥へ進むと、夜だけに開く市が現れる。ここで売られるのは、昼には買えないものばかりだ。 | 마을에 밤이 내리면, 광장 뒤 골목에 따뜻한 노란 등불이 줄지어 켜진다. 그 불빛을 따라 안으로 들어가면, 밤에만 열리는 시장이 나온다. 이곳에서 파는 것은 낮에는 살 수 없는 것들뿐이다. |
| 8 | `dest_nightmare_desc` | 又是一个夜市之夜，月巴和番茄重回小镇。可就在灯火最盛的一刻，灯忽然全灭了。 | Another night-market night, and Banny and Tomato returned to town. Yet at the very peak of the lights, every lamp suddenly went out. | また夜市の夜、バニーとトマトは町へ戻ってきた。だが灯りが最も盛り上がったその瞬間、明かりがすべて消えてしまった。 | 또 다시 야시장의 밤, 버니와 토마토는 마을로 돌아왔다. 그런데 불빛이 가장 환한 순간, 등불이 갑자기 모두 꺼져 버렸다. |
| 9 | `dest_dream_desc` | 回到家中的月巴和番茄沉沉睡去，可番茄却怎么都醒不过来。月巴用额头靠着它，走进了那片深紫色的梦境。 | Back home, Banny and Tomato fell fast asleep — but Tomato would not wake no matter what. Banny pressed its forehead to Tomato and stepped into that deep-violet dream. | 家に戻ったバニーとトマトは深く眠りについたが、トマトはどうしても目を覚まさない。バニーは額をトマトに寄せて、その深い紫の夢の中へと入っていった。 | 집으로 돌아온 버니와 토마토는 깊이 잠들었지만, 토마토는 아무리 해도 깨어나지 않았다. 버니는 이마를 토마토에 대고, 그 짙은 보랏빛 꿈속으로 걸어 들어갔다. |
| 10 | `dest_snow_desc` | 终年积雪的高岭，能捡到雪绒花与极光尘。 | A high ridge covered in snow all year round, where you can find edelweiss and aurora dust. | 一年中雪に覆われた高嶺。ここではエーデルワイスとオーロラの塵が拾える。 | 일 년 내내 눈에 덮인 높은 고개. 이곳에서는 에델바이스와 오로라 가루를 주울 수 있다. |
| 11 | `dest_ruins_desc` | 藤蔓掩埋的古老废墟，藏有古币与星图残卷。 | Ancient ruins buried under vines, hiding old coins and fragments of a star chart. | 蔦に埋もれた古き廃墟。古銭と星図の残巻が隠されている。 | 덩굴에 묻힌 오래된 폐허. 옛 주화와 성도 조각이 숨겨져 있다. |
| 12 | `dest_ice_desc` | 结着蓝冰的静湖，湖心开着一朵稀有的雪莲。 | A still lake of blue ice, with a rare snow lotus blooming at its heart. | 青い氷に覆われた静かな湖。湖の中心には珍しい雪蓮が一輪咲いている。 | 푸른 얼음이 얼어붙은 고요한 호수. 호수 한가운데에는 희귀한 설련이 한 송이 피어 있다. |
| 13 | `dest_empire_desc` | 雪原深处一座被时间遗忘的帝国旧址，断碑上刻着无法识别的名字。 | Deep in the snowfield, the ruined site of an empire time has forgotten, its broken steles carved with names no one can read. | 雪原の奥深くにある、時間に忘れられた帝国の旧跡。折れた碑には、読み解けない名が刻まれている。 | 설원 깊숙이 자리한, 시간에게 잊힌 제국의 옛터. 부러진 비석에는 알아볼 수 없는 이름이 새겨져 있다. |

## F 便当与旅行道具说明（9 条，键 `food_*_desc` / `tvi_*_desc`）

| # | 键 | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|---|
| 1 | `food_food1_desc` | 大概率前往森林，小概率去小镇/大海/雪地 | Most likely the Forest; small chance of the Town / Sea / Snowfield | 高い確率で森、低い確率で町・海・雪原へ向かいます | 높은 확률로 숲, 낮은 확률로 마을·바다·설원으로 가요 |
| 2 | `food_food2_desc` | 大概率前往小镇，小概率去森林/大海/雪地 | Most likely the Town; small chance of the Forest / Sea / Snowfield | 高い確率で町、低い確率で森・海・雪原へ向かいます | 높은 확률로 마을, 낮은 확률로 숲·바다·설원으로 가요 |
| 3 | `food_food4_desc` | 大概率前往大海，小概率去森林/小镇/雪地 | Most likely the Sea; small chance of the Forest / Town / Snowfield | 高い確率で海、低い確率で森・町・雪原へ向かいます | 높은 확률로 바다, 낮은 확률로 숲·마을·설원으로 가요 |
| 4 | `food_food3_desc` | 大概率前往雪地，小概率去森林/小镇/大海 | Most likely the Snowfield; small chance of the Forest / Town / Sea | 高い確率で雪原、低い確率で森・町・海へ向かいます | 높은 확률로 설원, 낮은 확률로 숲·마을·바다로 가요 |
| 5 | `tvi_bell_desc` | 一次性·需配便当，前往「小镇」地区的任一地图 | Single use · requires a bento; goes to any map in the "Town" region | 1 回限り ・ お弁当が必要。「町」地区のいずれかのマップへ向かいます | 1회용 · 도시락 필요. "마을" 지역의 아무 맵으로 가요 |
| 6 | `tvi_lamp_desc` | 一次性·需配便当，必定前往「大海」地区的任一地图 | Single use · requires a bento; always goes to a map in the "Sea" region | 1 回限り ・ お弁当が必要。「海」地区のいずれかのマップへ必ず向かいます | 1회용 · 도시락 필요. "바다" 지역의 아무 맵으로 반드시 가요 |
| 7 | `tvi_charm_desc` | 特产+1/件（耐久3）·配豪华便当前往雪地 | Souvenir +1 per item (durability 3) · pair with the Luxury Bento to reach the Snowfield | 特産品 +1／個（耐久 3）・豪華弁当と組み合わせて雪原へ | 특산품 +1/개(내구 3) · 고급 도시락과 함께 설원으로 |
| 8 | `tvi_compass_desc` | 一次性·仅配豪华便当+护身符去雪地时可用，指定去雪山/遗迹/冰湖/失落王庭 | Single use · usable only with the Luxury Bento + charm on the Snowfield route; choose Snow Mountain / Ruins / Ice Lake / Lost Court | 1 回限り ・ 豪華弁当＋お守りで雪原へ向かうときのみ使用可。雪山／遺跡／氷湖／失われた王庭を指定します | 1회용 · 고급 도시락+부적과 함께 설원으로 갈 때만 사용 가능. 설산/유적/빙호/잃어버린 왕정을 지정해요 |
| 9 | `tvi_pass_desc` | 永久只买一次·需装进行囊才生效·每周（周一0点刷新）可指定前往任意地图一次·不改变去哪个地区，只调整同一地区内「图一~图四」的抽取概率（更偏向靠后的地图） | Permanent, buy once · works only when loaded into the bag · once a week (resets Monday 00:00) you can pick any map to visit · does not change which region you go to, only shifts the odds among "Map 1–Map 4" within the same region (favoring the later maps) | 永久・購入は 1 回のみ ・ 荷袋に入れて初めて有効 ・ 毎週（月曜 0 時にリセット）1 回だけ任意のマップを指定できます ・ 行き先の地区は変わらず、同じ地区内の「マップ 1〜マップ 4」の抽選確率のみを調整します（後ろのマップ寄り） | 영구, 1회만 구매 · 가방에 넣어야 발동 · 매주(월요일 0시 초기화) 원하는 맵을 한 번 지정할 수 있어요 · 가는 지역은 바뀌지 않고, 같은 지역 안의 "맵 1~맵 4" 뽑기 확률만 조정해요(뒤쪽 맵 쪽으로) |

---

## 取原串失败的条目（应为空）

MISC 未取到中文：无
BANNY 未取到中文：无
