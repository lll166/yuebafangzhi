# i18n P8 收口 —— 译文清单（待批注）

范围：P8 收口阶段新增的键 = 单引号残留补扫（行囊/图鉴/状态栏/图例等）+ 模板字符串文本节点补译（番茄钟 / 任务 / 待办日历 / 图鉴页签）+ 日期与数字格式模板。

机制：① 单引号残留走常规 `$t()`；② 模板字符串（反引号）**不改源码**，由 `$walkText(root)` 在 `openModal()` 写回 DOM 后按**文本节点**补译——键仍是中文原文，未命中则原样保留；③ 日期走 `mdKey()` 按语言格式化，时长/数字走 `$tf('{h}时{m}分')`、`$tf('{n}秒')`、`fmt()` 的 B/億/억。

口径：UI/提示日文**敬体**、韩文**해요체**；术语照 `I18N_GLOSSARY`（Banny / バニー / 버니、Tomato / トマト / 토마토、Pomodoro / ポモドーロ / 뽀모도로、Codex / 図鑑 / 도감）。

---

| # | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|
| 1 | {h}时{m}分 | {h}h{m}m | {h}時間{m}分 | {h}시간 {m}분 |
| 2 | {h}时 | {h}h | {h}時間 | {h}시간 |
| 3 | {n}秒 | {n}s | {n}秒 | {n}초 |
| 4 |  · 点开区域查看该地区各图的信件</p> |  · open a region to see each map’s letters</p> |  · 地域を開いて各マップの手紙を見る</p> |  · 지역을 열어 각 맵의 편지 보기</p> |
| 5 |  封</div> |  letters</div> |  通</div> |  통</div> |
| 6 |  封（3/4）<br> |  letters (3/4)<br> |  通（3/4）<br> |  통 (3/4)<br> |
| 7 |  张图 · 来信  |  maps · Letters  |  マップ · 手紙  |  맵 · 편지  |
| 8 |  张图 · 特产  |  maps · Souvenirs  |  マップ · 特産品  |  맵 · 특산품  |
| 9 |  种</div> |  kinds</div> |  種類</div> |  종</div> |
| 10 |  种（按产地）</p> |  kinds (by origin)</p> |  種類（産地別）</p> |  종 (산지별)</p> |
| 11 |  等 |  etc. |  など |  등 |
| 12 | " onclick="tvSwitchBookPage(\'letter\')">✉️ 信件</button> | " onclick="tvSwitchBookPage(’letter’)">✉️ Letters</button> | " onclick="tvSwitchBookPage(’letter’)">✉️ 手紙</button> | " onclick="tvSwitchBookPage(’letter’)">✉️ 편지</button> |
| 13 | " onclick="tvSwitchBookPage(\'special\')">🌿 特产</button> | " onclick="tvSwitchBookPage(’special’)">🌿 Souvenirs</button> | " onclick="tvSwitchBookPage(’special’)">🌿 特産品</button> | " onclick="tvSwitchBookPage(’special’)">🌿 특산품</button> |
| 14 | </div><div style="font-size:11px;color:var(--dim)">🍙饭团直达</div></div> | </div><div style="font-size:11px;color:var(--dim)">🍙 Direct by rice ball</div></div> | </div><div style="font-size:11px;color:var(--dim)">🍙 おにぎりで直行</div></div> | </div><div style="font-size:11px;color:var(--dim)">🍙 주먹밥으로 직행</div></div> |
| 15 | <div class="tv-note">🧳 月巴正在收拾行囊…</div> | <div class="tv-note">🧳 The Banny is packing…</div> | <div class="tv-note">🧳 バニーが荷造り中…</div> | <div class="tv-note">🧳 버니가 짐을 싸고 있어요…</div> |
| 16 | <p style="color:var(--dim);font-size:12px;margin-top:4px">🔓 解锁「失落王庭」：雪山/遗迹/冰湖 每图信件 ≥  | <p style="color:var(--dim);font-size:12px;margin-top:4px">🔓 Unlock "Lost Court": letters in Snowy Peak / Ruins / Ice Lake ≥  | <p style="color:var(--dim);font-size:12px;margin-top:4px">🔓 「失われた王庭」を解放：雪山・遺跡・氷湖 各マップの手紙 ≥  | <p style="color:var(--dim);font-size:12px;margin-top:4px">🔓 "잊힌 왕정" 해금: 설산·유적·얼음호수 각 맵 편지 ≥  |
| 17 | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">本周的机会已经用掉啦，下周（周一 0 点刷新）可再次指定。本周剩余时间它仍会调整同一地区内「图一~图四」的抽取概率（更偏向靠后的地图），但不会改变去哪个地区。</p> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">This week’s chance is used up. Next week (resets Monday 00:00) you can pick again. For the rest of this week it still shifts the odds among "Map 1–Map 4" within the same region (favoring the later maps), without changing which region you go to.</p> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">今週のチャンスは使い切りました。来週（月曜 0 時にリセット）また指定できます。今週の残り時間も、同じ地区内の「マップ 1〜マップ 4」の抽選確率を調整します（後ろのマップ寄り）。行き先の地区は変わりません。</p> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">이번 주 기회를 다 썼어요. 다음 주(월요일 0시 초기화)에 다시 지정할 수 있어요. 이번 주 남은 시간 동안에도 같은 지역 안의 "맵 1~맵 4" 뽑기 확률을 조정해요(뒤쪽 맵 쪽으로). 가는 지역은 바뀌지 않아요.</p> |
| 18 | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">每周可指定前往任意一张地图一次<span style="color:var(--dim)">（使用小号护身符只需带最便宜的饭团即可，无需该图专属道具；只选目的地不消耗机会，真正出发后才消耗）</span></p><div class="sh-grid"> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">Once a week you can pick any map to visit<span style="color:var(--dim)"> (with the Mini Charm you only need the cheapest rice ball — no map-specific item required; choosing a destination doesn’t use the chance, only actually departing does)</span></p><div class="sh-grid"> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">毎週 1 回、任意のマップを指定できます<span style="color:var(--dim)">（小さいお守りなら一番安いおにぎりだけで OK。そのマップ専用の道具は不要。目的地を選ぶだけでは消費されず、実際に出発すると消費します）</span></p><div class="sh-grid"> | <p style="color:var(--dim);font-size:12px;margin:0 0 2px">매주 한 번 원하는 맵을 지정할 수 있어요<span style="color:var(--dim)">(미니 부적이면 가장 싼 주먹밥만 있으면 돼요. 그 맵 전용 도구는 필요 없고, 목적지만 고르는 건 소모되지 않으며 실제로 출발할 때 소모돼요)</span></p><div class="sh-grid"> |
| 19 | <p style="color:var(--dim);font-size:12px;margin:8px 0 2px">🧭 指南针：装进行囊了，但它只在「去雪地」时才有用——需同时带 <b>豪华便当</b> + <b>幸运护身符</b>。</p> | <p style="color:var(--dim);font-size:12px;margin:8px 0 2px">🧭 Compass: it’s in your bag, but it only works for Snowfield trips — bring a <b>Luxury Bento</b> + a <b>Lucky Charm</b> as well.</p> | <p style="color:var(--dim);font-size:12px;margin:8px 0 2px">🧭 コンパス：荷袋に入っていますが、「雪原へ行く」ときだけ役に立ちます。<b>豪華弁当</b>＋<b>幸運のお守り</b>も一緒に必要です。</p> | <p style="color:var(--dim);font-size:12px;margin:8px 0 2px">🧭 나침반: 가방에 있지만 "설원으로 갈 때"만 쓸 수 있어요. <b>고급 도시락</b> + <b>행운의 부적</b>도 함께 필요해요.</p> |
| 20 | <p style="color:var(--gold);font-size:12px;text-align:center">已指定： | <p style="color:var(--gold);font-size:12px;text-align:center">Selected:  | <p style="color:var(--gold);font-size:12px;text-align:center">指定： | <p style="color:var(--gold);font-size:12px;text-align:center">지정:  |
| 21 | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 小号护身符（已装备）</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 Mini Charm (equipped)</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 小さいお守り（装備中）</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 미니 부적 (장착됨)</p> |
| 22 | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 小号护身符（永久）</p><p style="color:var(--dim);font-size:12px;margin:0 0 2px">还没有生效——请先把仓库里的 <b>小号护身符</b> 装进行囊。</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 Mini Charm (permanent)</p><p style="color:var(--dim);font-size:12px;margin:0 0 2px">Not active yet — load the <b>Mini Charm</b> from the warehouse into your bag first.</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 小さいお守り（永久）</p><p style="color:var(--dim);font-size:12px;margin:0 0 2px">まだ効果なし。倉庫の<b>小さいお守り</b>を先に荷袋に入れてください。</p> | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🎫 미니 부적 (영구)</p><p style="color:var(--dim);font-size:12px;margin:0 0 2px">아직 발동 전이에요. 창고의 <b>미니 부적</b>을 먼저 가방에 넣어 주세요.</p> |
| 23 | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🧭 指南针：选择雪地目的地 | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🧭 Compass: choose a Snowfield destination | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🧭 コンパス：雪原の目的地を選ぶ | <p style="color:var(--text);font-size:13px;font-weight:700;margin:8px 0 2px">🧭 나침반: 설원 목적지 선택 |
| 24 | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">来信  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">Letters  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">手紙  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">편지  |
| 25 | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">🍎 已收获特产  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">🍎 Souvenirs collected  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">🍎 集めた特産品  | <p style="color:var(--text);font-size:13px;margin:2px 0 8px">🍎 모은 특산품  |
| 26 | A季 | A-Season | A季 | A계절 |
| 27 | B时 | B-Time | B時 | B시간 |
| 28 | C气 | C-Weather | C気 | C날씨 |
| 29 | 　<span style="color:var(--dim);font-weight:400">未指定则随机</span> | 　<span style="color:var(--dim);font-weight:400">random if not set</span> | 　<span style="color:var(--dim);font-weight:400">未指定ならランダム</span> | 　<span style="color:var(--dim);font-weight:400">지정하지 않으면 무작위</span> |
| 30 | 　<span style="color:var(--gold)">已选： | 　<span style="color:var(--gold)">Selected:  | 　<span style="color:var(--gold)">選択： | 　<span style="color:var(--gold)">선택:  |
| 31 | 」旅行啦，留话： | " is travelling! Leave a note:  | 」は旅に出ました！ひとこと残す： | "가 여행을 떠났어요! 한마디 남기기:  |
| 32 | 产地 ·  | Origin ·  | 産地 ·  | 산지 ·  |
| 33 | 去「 | to " | へ「 | 로 " |
| 34 | 嫌疑月巴 | Suspicious Banny | 容疑バニー | 용의 버니 |
| 35 | 按月 | By month | 月別 | 월별 |
| 36 | 条件未达成 | Condition not met | 条件未達成 | 조건 미달성 |
| 37 | 缴纳了罚款，这是所有的番茄。 |  paid the fine — here are all the Tomatoes. |  は罰金を払いました。これがトマトのすべてです。 |  가 벌금을 냈어요. 이게 토마토 전부예요. |
| 38 | 近30天 | Last 30 days | 直近 30 日 | 최근 30일 |
| 39 | 近7天 | Last 7 days | 直近 7 日 | 최근 7일 |
| 40 | 👮 警察巴捉拿了 | 👮 Officer Banny caught  | 👮 警察バニーが捕まえた： | 👮 경찰 버니가 잡았다:  |
| 41 | 📅 日历 · 热力图 | 📅 Calendar · Heatmap | 📅 カレンダー · ヒートマップ | 📅 달력 · 히트맵 |
| 42 | 📊 概览 | 📊 Overview | 📊 概要 | 📊 개요 |
| 43 | 🧺 室内空空的，让月巴去收集一些番茄吧 | 🧺 Indoors is empty — send a Banny out for Tomatoes | 🧺 室内はがらんとしています。バニーにトマトを集めさせましょう | 🧺 실내가 텅 비었어요. 버니를 보내 토마토를 모아 오게 하세요 |
| 44 | 后台挂机 | Background mode | バックグラウンド | 백그라운드 |
| 45 | 🍅 专注 | 🍅 Focus | 🍅 集中 | 🍅 집중 |
| 46 | 常用项目 | Presets | よく使う項目 | 자주 쓰는 항목 |
| 47 | 本次专注 | This session | 今回の集中 | 이번 집중 |
| 48 | ＋ 存为常用 | ＋ Save preset | ＋ よく使う項目に保存 | ＋ 자주 쓰기 저장 |
| 49 | 25分 | 25 min | 25分 | 25분 |
| 50 | 15分 | 15 min | 15分 | 15분 |
| 51 | 45分 | 45 min | 45分 | 45분 |
| 52 | 60分 | 60 min | 60分 | 60분 |
| 53 | 休息时长 | Break length | 休憩時間 | 휴식 시간 |
| 54 | 5分 | 5 min | 5分 | 5분 |
| 55 | 10分 | 10 min | 10分 | 10분 |
| 56 | ⏹ 停止 | ⏹ Stop | ⏹ 停止 | ⏹ 중지 |
| 57 | 🍅 专注期间 | 🍅 While focusing | 🍅 集中中は | 🍅 집중 중에는 |
| 58 | 月巴生长 x2 且成熟自动收集 | Bannies grow ×2 and ripe ones are auto-collected | バニーは成長 2 倍、成熟分は自動回収 | 버니 성장 2배, 성숙하면 자동 수확 |
| 59 | ；切出界面计时自动暂停；开启右上角「后台挂机」开关可切出页面继续计时。其余时段月巴需 | ; leaving the screen pauses the timer; turn on “Background mode” at the top right to keep counting while away. At other times Bannies need | 。画面を離れると自動で一時停止し、右上の「バックグラウンド」をオンにすると画面を離れても計時が続きます。それ以外の時間帯はバニーを | ; 화면을 벗어나면 타이머가 일시정지되고, 오른쪽 위 "백그라운드"를 켜면 화면을 벗어나도 계속돼요. 그 외 시간에는 버니를 |
| 60 | 手动收集 | manual collection | 手動で回収 | 직접 수확 |
| 61 | 完成的番茄才记满时长 | to count as full focus time | する必要があります（満点の時間として記録） | 해야 온전한 시간으로 기록돼요 |
| 62 | ，中途停止只记已专注时间（不足 5 分钟不记录）。完成后 | , and stopping early only counts the time focused (under 5 minutes is not recorded). When done it | 。途中で止めると集中した時間だけ記録されます（5 分未満は記録なし）。完了すると | , 중간에 멈추면 집중한 시간만 기록돼요(5분 미만은 기록 안 됨). 완료하면 |
| 63 | 自动进入休息 | goes to a break automatically | 自動で休憩に入ります | 자동으로 휴식에 들어가요 |
| 64 | ，休息结束可开始 | , and when the break ends you can start | 。休憩が終わると | , 휴식이 끝나면 |
| 65 | 下一个番茄 | the next Pomodoro | 次のポモドーロを始められます | 다음 뽀모도로를 시작할 수 있어요 |
| 66 | ＋ 添加 | ＋ Add | ＋ 追加 | ＋ 추가 |
| 67 | 今天 | Today | 今日 | 오늘 |
| 68 | 明天 | Tomorrow | 明日 | 내일 |
| 69 | 📅 起止 | 📅 Dates | 📅 期間 | 📅 기간 |
| 70 | 至 | to | 〜 | ~ |
| 71 | 起止不同即为时间段任务 | Different start and end makes it a ranged task | 開始と終了が違えば期間タスクになります | 시작과 끝이 다르면 기간 할 일이 돼요 |
| 72 | 🔄 习惯：时间段内每天自动生成待办 | 🔄 Habit: auto-creates a to-do each day in the range | 🔄 習慣：期間内は毎日自動でやることが作られます | 🔄 습관: 기간 동안 매일 자동으로 할 일이 생겨요 |
| 73 | 📅 待办日历 | 📅 To-do calendar | 📅 やることカレンダー | 📅 할 일 달력 |
| 74 | ‹ 上月 | ‹ Prev month | ‹ 前月 | ‹ 지난달 |
| 75 | 下月 › | Next month › | 翌月 › | 다음 달 › |
| 76 | {y}年{m}月 | {m}/{y} | {y}年{m}月 | {y}년 {m}월 |
| 77 | 🍅 番茄钟弹窗里可 | In the Pomodoro window you can | 🍅 ポモドーロ画面で | 🍅 뽀모도로 창에서 |
| 78 | 关联任务 | link a task | タスクを関連付けられます | 할 일을 연결할 수 있어요 |
| 79 | ；完成或停止（≥5分钟）会自动累加实际番茄数，达到预估即自动勾选完成。 | ; finishing or stopping (≥5 min) adds the real Pomodoro count, and reaching the estimate ticks it done. | 。完了または停止（5 分以上）で実際のポモドーロ数が加算され、見積もりに達すると自動で完了になります。 | ; 완료하거나 멈추면(5분 이상) 실제 뽀모도로 수가 더해지고, 예상치에 도달하면 자동으로 완료 처리돼요. |
| 80 | ✂️ 数量填 | ✂️ Set the count to | ✂️ 数量に | ✂️ 개수를 |
| 81 | 即可自动拆分成小项逐项勾选， |  and it splits into sub-items you can tick one by one;  | と入力すると小項目に自動分割され、一つずつチェックできます。 | 로 입력하면 작은 항목으로 나뉘어 하나씩 체크할 수 있어요.  |
| 82 | 单位 | Unit | 単位 | 단위 |
| 83 | （页/次/天…）可不填。 |  (pages/times/days…) is optional. | （ページ／回／日…）は任意です。 | (페이지/회/일…)는 비워도 돼요. |
| 84 | ✉️ 信件 | ✉️ Letters | ✉️ 手紙 | ✉️ 편지 |
| 85 | 🌿 特产 | 🌿 Souvenirs | 🌿 特産品 | 🌿 특산품 |
