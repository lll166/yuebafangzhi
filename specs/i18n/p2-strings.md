# P2 文案清单 · 交互反馈与模板参数化（待你批注）

本批范围：**通用反馈（错误/确认/提示 toast）· 弹层标题 · 商店 / 仓库与行囊 / 槽位 / 天气瓶 / 图鉴卡片与详情 / 番茄钟统计与打卡 · 旅行结算与信件的界面标签**。
下方按代码里的区块分组，逐条给出「中文 → English → 日本語 → 한국어」。**译文已落进代码 `I18N_UI`，可直接在浏览器切换语言预览；如需改词请直接批注。**

## 怎么反馈

- 想改某条 → 在格子旁写「改：xxx」，或按区块说「H16 的 `今日` 改 Today」。
- 带 `{n}` / `{a}` / `{b}` 的是占位符模板，数字与千分位保持原样。
- 长段玩法说明（指南针 / 小号护身符段落、帮助文档、斗月巴规则）不属本批，归 **P5**。

## 已套用的统一约定（见 `I18N_GLOSSARY` + 风格约定）

- 月巴 → **Banny** / **バニー** / **버니**
- UI 类文案：日文敬体（です・ます）、韩文 해요체；按钮名用名词短语、不加敬体
- 数字保留阿拉伯数字与千分位；专名一律照术语表

---

## G. 通用弹层 / 杂项

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 标题 | Title | タイトル | 제목 |
| ✦ 图鉴新增 ✦ | ✦ New in Codex! ✦ | ✦ 図鑑に追加 ✦ | ✦ 도감 신규 ✦ |
| 首次收获 x3 ·  | First harvest x3 ·  | 初回収穫 x3 ·  | 첫 수확 x3 ·  |
| 关闭 | Close | 閉じる | 닫기 |
| 返回 | Back | 戻る | 뒤로 |
| 取消 | Cancel | キャンセル | 취소 |
| 确定 | OK | OK | 확인 |
| 确认 | Confirm | 確認 | 확인 |
| 保存 | Save | 保存 | 저장 |
| 删除 | Delete | 削除 | 삭제 |
| 添加 | Add | 追加 | 추가 |
| 下一页 | Next | 次へ | 다음 |
| 上一页 | Prev | 前へ | 이전 |

## H. P2 交互反馈：错误提示 / 通用反馈

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 金币不足 | Not enough coins | コインが足りません | 코인이 부족해요 |
| 金币不足，还差 {n}🪙 | Not enough coins — {n}🪙 short | コインが足りません。あと {n}🪙 | 코인이 부족해요 — {n}🪙 모자라요 |
| 先解锁场地 | Unlock the plot first | 先に区画を解放してください | 먼저 구획을 해금해 주세요 |
| 已满级 | Max level | 最大レベル | 최대 레벨 |
| 🍅 番茄不够 | 🍅 Not enough tomatoes | 🍅 トマトが足りません | 🍅 토마토가 부족해요 |
| ⚠️ 尚未达成解锁条件 | ⚠️ Unlock conditions not met yet | ⚠️ まだ解放条件を満たしていません | ⚠️ 아직 해금 조건을 충족하지 못했어요 |
| ⚡ 已开启低功耗模式（省电） | ⚡ Low-power mode on (saving power) | ⚡ 低電力モードをオンにしました（省電） | ⚡ 저전력 모드를 켰어요 (절전) |
| ✨ 已关闭低功耗模式 | ✨ Low-power mode off | ✨ 低電力モードをオフにしました | ✨ 저전력 모드를 껐어요 |
| 🎨 已启用「{n}」皮肤 | 🎨 Skin "{n}" equipped | 🎨 スキン「{n}」を適用しました | 🎨 "{n}" 스킨을 적용했어요 |
| 🎨 图鉴皮肤「{n}」已可领取！ | 🎨 Codex skin "{n}" is ready to claim! | 🎨 図鑑スキン「{n}」が受け取れます！ | 🎨 도감 스킨 "{n}"을 받을 수 있어요! |
| 📐 新纪录！「{a}」{b} {c}cm / {d}g | 📐 New record! "{a}" {b} {c}cm / {d}g | 📐 新記録！「{a}」{b} {c}cm / {d}g | 📐 신기록! "{a}" {b} {c}cm / {d}g |
| 解锁「{n}」！ | Unlocked "{n}"! | 「{n}」を解放しました！ | "{n}" 해금! |

## H2. 场地 / 槽位 / 快长肥 / 天气

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🪵 槽位购买 · {n} | 🪵 Buy Slot · {n} | 🪵 発生枠購入 · {n} | 🪵 슬롯 구매 · {n} |
| ⏳ 快长肥冷却中，{n}s 后再用 | ⏳ Quick-Grow cooling down — try again in {n}s | ⏳ ぐんぐん肥料はクールダウン中です。{n} 秒後にお使いください | ⏳ 쑥쑥 비료 쿨다운 중 — {n}초 후에 사용하세요 |
| 快长肥生效：{n} 个生长中的月巴加速了！ | Quick-Grow applied: {n} growing Bannies sped up! | ぐんぐん肥料が効きました：成長中のバニー {n} 体が加速しました！ | 쑥쑥 비료 사용: 성장 중인 버니 {n}마리가 빨라졌어요! |
| 没有生长中的月巴 | No Bannies are growing | 成長中のバニーはいません | 성장 중인 버니가 없어요 |
| 🌦️ 天气瓶 · 选择天气 | 🌦️ Weather Bottle · Choose Weather | 🌦️ 天気の瓶 · 天気を選ぶ | 🌦️ 날씨병 · 날씨 선택 |
| 🌦️ 天气已设为：{n}（持续2小时） | 🌦️ Weather set to {n} (lasts 2 hours) | 🌦️ 天気を{n}に設定しました（2時間持続） | 🌦️ 날씨를 {n}(으)로 설정했어요 (2시간 지속) |

## H3. 商店

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 常驻加速器 Lv.{n} | Always-on Accelerator Lv.{n} | 常駐アクセラレーター Lv.{n} | 상시 가속기 Lv.{n} |
| （满级） |  (Max) | （最大） |  (최대) |
| 所有月巴生长速度永久 +10%/级，当前共 +{n}% | All Banny growth speed permanently +10% per level, currently +{n}% total | すべてのバニーの成長速度が永続で 1 レベルごとに +10%。現在は合計 +{n}% | 모든 버니 성장 속도가 레벨당 영구 +10%, 현재 총 +{n}% |
| 所有生长中的月巴剩余时间减半 | Halves the remaining time of all growing Bannies | 成長中のすべてのバニーの残り時間を半分にします | 성장 중인 모든 버니의 남은 시간을 절반으로 줄여요 |
| 已拥有 | Owned | 所持済み | 보유 중 |
| 常驻加速器升至 Lv.{n}（速度+{a}%） | Accelerator upgraded to Lv.{n} (speed +{a}%) | 常駐アクセラレーターを Lv.{n} に強化（速度 +{a}%） | 상시 가속기를 Lv.{n}(으)로 강화 (속도 +{a}%) |
| 获得「{n}」！ | Obtained "{n}"! | 「{n}」を獲得しました！ | "{n}"을 획득했어요! |

## H4. 天降事件

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🍅 {a} 送给你 {b} 金币！ | 🍅 {a} gave you {b} coins! | 🍅 {a} から {b} コインをプレゼント！ | 🍅 {a}이(가) {b} 코인을 선물했어요! |
|  还附赠 {n} 个番茄🍅 |  Plus {n} tomatoes 🍅 |  さらにトマト {n} 個🍅 |  게다가 토마토 {n}개🍅 |

## H5. 备份 / 存档

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| ✅ 存档已复制（🍅 打卡 {a} 条 · 任务 {b} 条） | ✅ Save copied (🍅 {a} check-ins · {b} tasks) | ✅ セーブをコピーしました（🍅 チェックイン {a} 件 · タスク {b} 件） | ✅ 세이브를 복사했어요 (🍅 체크인 {a}건 · 할 일 {b}건) |
| ❌ 复制失败，请手动复制 | ❌ Copy failed — please copy manually | ❌ コピーに失敗しました。手動でコピーしてください | ❌ 복사에 실패했어요 — 직접 복사해 주세요 |
| ✅ 存档已导出为文件 | ✅ Save exported as a file | ✅ セーブをファイルとして書き出しました | ✅ 세이브를 파일로 내보냈어요 |
| ✅ 导入成功（🍅 打卡 {a} 条 · 任务 {b} 条），正在刷新… | ✅ Imported (🍅 {a} check-ins · {b} tasks), refreshing… | ✅ インポート成功（🍅 チェックイン {a} 件 · タスク {b} 件）。更新します… | ✅ 가져오기 완료 (🍅 체크인 {a}건 · 할 일 {b}건), 새로고침할게요… |
| ❌ 文件不是有效的存档内容 | ❌ The file is not a valid save | ❌ ファイルは有効なセーブデータではありません | ❌ 파일이 올바른 세이브가 아니에요 |
| ⚠️ 请先粘贴存档内容 | ⚠️ Paste the save content first | ⚠️ 先にセーブ内容を貼り付けてください | ⚠️ 먼저 세이브 내용을 붙여넣어 주세요 |
| ❌ 存档格式无效，导入失败 | ❌ Invalid save format — import failed | ❌ セーブ形式が無効です。インポートに失敗しました | ❌ 세이브 형식이 올바르지 않아 가져오기에 실패했어요 |

## H6. 番茄钟

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🍅 番茄开始：「{n}」专注中，月巴生长 x2 | 🍅 Started: focusing on "{n}", Banny growth x2 | 🍅 開始：「{n}」に集中中。バニーの成長 x2 | 🍅 시작: "{n}" 집중 중, 버니 성장 x2 |
| ⏹ 已停止：「{n}」记录已专注 {a} | ⏹ Stopped: "{n}" recorded {a} focused | ⏹ 停止：「{n}」の集中時間 {a} を記録しました | ⏹ 중지: "{n}" 집중 시간 {a} 기록했어요 |
| ⏹ 已停止：「{n}」专注不足 5 分钟，未记录 | ⏹ Stopped: "{n}" under 5 minutes — not recorded | ⏹ 停止：「{n}」は 5 分未満のため記録しません | ⏹ 중지: "{n}"이(가) 5분 미만이라 기록하지 않았어요 |
| ☕ 已跳过休息，准备开始下一个番茄 | ☕ Break skipped — ready for the next pomodoro | ☕ 休憩をスキップしました。次のポモドーロへ | ☕ 휴식을 건너뛰었어요 — 다음 뽀모도로를 시작할게요 |
| 🍅 完成「{n}」！休息 {a} 分钟 ☕ | 🍅 "{n}" complete! Take a {a}-minute break ☕ | 🍅 「{n}」完了！{a} 分休憩しましょう ☕ | 🍅 "{n}" 완료! {a}분 쉬세요 ☕ |
| ☕ 休息结束！准备开始下一个番茄钟 | ☕ Break over! Ready for the next pomodoro | ☕ 休憩終了！次のポモドーロを始めましょう | ☕ 휴식 끝! 다음 뽀모도로를 시작할게요 |
| ☕ 休息时长设为 {n} 分钟 | ☕ Break length set to {n} minutes | ☕ 休憩時間を {n} 分に設定しました | ☕ 휴식 시간을 {n}분으로 설정했어요 |
| 🌙 已开启后台挂机：切出页面番茄钟继续计时 | 🌙 Background mode on: the pomodoro keeps counting when you switch away | 🌙 バックグラウンド稼働をオンにしました。ページを離れてもポモドーロは計時を続けます | 🌙 백그라운드 모드를 켰어요: 페이지를 벗어나도 뽀모도로가 계속 돌아가요 |
| 🌞 已关闭后台挂机 | 🌞 Background mode off | 🌞 バックグラウンド稼働をオフにしました | 🌞 백그라운드 모드를 껐어요 |
| ⏱️ 专注时长设为 {n} 分钟 | ⏱️ Focus length set to {n} minutes | ⏱️ 集中時間を {n} 分に設定しました | ⏱️ 집중 시간을 {n}분으로 설정했어요 |
| （本次专注不受影响，下次开始生效） |  (this session is unaffected; takes effect next time) | （今回の集中には影響せず、次回から有効です） |  (이번 집중에는 영향 없고, 다음부터 적용돼요) |
| 当前环境不支持置顶小窗（需 https + 新版浏览器） | This environment does not support the pinned mini window (needs https + a modern browser) | この環境ではミニウィンドウ固定に対応していません（https + 新しいブラウザが必要です） | 이 환경에서는 미니 창 고정을 지원하지 않아요 (https + 최신 브라우저 필요) |
| 无法开启置顶小窗 | Could not open the pinned mini window | ミニウィンドウを固定できませんでした | 미니 창 고정을 열 수 없어요 |
| 🎯 今日目标已设为 {n} 分钟 | 🎯 Today's goal set to {n} minutes | 🎯 今日の目標を {n} 分に設定しました | 🎯 오늘 목표를 {n}분으로 설정했어요 |
| 🍅 「{n}」本轮收获 | 🍅 "{n}" — this round's harvest | 🍅 「{n}」今回の収穫 | 🍅 "{n}" 이번 수확 |

## H7. 常用项目

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🗂️ 项目已切换：「{n}」 | 🗂️ Project switched: "{n}" | 🗂️ プロジェクトを切り替えました：「{n}」 | 🗂️ 프로젝트 전환: "{n}" |
| 请先输入项目名称 | Enter a project name first | 先にプロジェクト名を入力してください | 먼저 프로젝트 이름을 입력해 주세요 |
| 已是常用项目 | Already a saved project | すでによく使う項目です | 이미 자주 쓰는 프로젝트예요 |
| 🗂️ 已存为常用：「{n}」 | 🗂️ Saved to favorites: "{n}" | 🗂️ よく使う項目に保存しました：「{n}」 | 🗂️ 자주 쓰는 항목으로 저장했어요: "{n}" |

## H8. 任务 / 待办

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| ✅ 完成「{n}」({a}) | ✅ Done "{n}" ({a}) | ✅ 完了「{n}」({a}) | ✅ 완료 "{n}" ({a}) |
| ↩️ 已恢复「{n}」({a}) | ↩️ Restored "{n}" ({a}) | ↩️ 元に戻しました「{n}」({a}) | ↩️ 되돌렸어요 "{n}" ({a}) |
| ✅ {a}/{b}{c}：「{n}」({d}) | ✅ {a}/{b}{c}: "{n}" ({d}) | ✅ {a}/{b}{c}：「{n}」({d}) | ✅ {a}/{b}{c}: "{n}" ({d}) |
| ✅ 任务完成：「{n}」 | ✅ Task complete: "{n}" | ✅ タスク完了：「{n}」 | ✅ 할 일 완료: "{n}" |
| 请输入任务标题 | Enter a task title | タスクのタイトルを入力してください | 할 일 제목을 입력해 주세요 |
| 习惯需设置起止日期（起止不同） | A habit needs a start and end date (and they must differ) | 習慣には開始日と終了日が必要です（開始と終了は別の日） | 습관은 시작일과 종료일이 필요해요 (서로 달라야 해요) |
| ✅ 已添加任务：「{n}」 | ✅ Task added: "{n}" | ✅ タスクを追加しました：「{n}」 | ✅ 할 일을 추가했어요: "{n}" |
| ✅ 任务已更新 | ✅ Task updated | ✅ タスクを更新しました | ✅ 할 일을 업데이트했어요 |
| ↩️ 已恢复：「{n}」 | ↩️ Restored: "{n}" | ↩️ 元に戻しました：「{n}」 | ↩️ 되돌렸어요: "{n}" |
| ✅ 已勾选 {a}/{b}{c}：「{n}」 | ✅ Checked {a}/{b}{c}: "{n}" | ✅ チェック {a}/{b}{c}：「{n}」 | ✅ 체크 {a}/{b}{c}: "{n}" |
| ↩️ 已取消第{n}{a}：「{b}」 | ↩️ Unchecked #{n}{a}: "{b}" | ↩️ {n} 番目{a}を取り消しました：「{b}」 | ↩️ {n}번째{a}를 취소했어요: "{b}" |
| 🗑 任务已删除 | 🗑 Task deleted | 🗑 タスクを削除しました | 🗑 할 일을 삭제했어요 |
| 📌 已关联任务：「{n}」 | 📌 Linked task: "{n}" | 📌 タスクを関連付けました：「{n}」 | 📌 할 일을 연결했어요: "{n}" |
| 📌 已取消关联任务 | 📌 Task unlinked | 📌 タスクの関連付けを解除しました | 📌 할 일 연결을 해제했어요 |
| 确定删除任务吗？\n「{n}」 | Delete this task?\n"{n}" | このタスクを削除しますか？\n「{n}」 | 이 할 일을 삭제할까요?\n"{n}" |

## H9. 打卡

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| ✅ 打卡成功：「{n}」{a}{b} | ✅ Check-in saved: "{n}" {a}{b} | ✅ チェックイン成功：「{n}」{a}{b} | ✅ 체크인 완료: "{n}" {a}{b} |
| ✅ 打卡已更新 | ✅ Check-in updated | ✅ チェックインを更新しました | ✅ 체크인을 업데이트했어요 |
| 🗑 打卡已删除 | 🗑 Check-in deleted | 🗑 チェックインを削除しました | 🗑 체크인을 삭제했어요 |
| 确定删除这条打卡吗？\n「{n}」 {a} | Delete this check-in?\n"{n}" {a} | このチェックインを削除しますか？\n「{n}」 {a} | 이 체크인을 삭제할까요?\n"{n}" {a} |
| 确定重置全部存档吗？此操作不可撤销！ | Reset the entire save? This cannot be undone! | すべてのセーブをリセットしますか？この操作は取り消せません！ | 모든 세이브를 초기화할까요? 이 작업은 되돌릴 수 없어요! |

## H10. 旅行 / 信箱 / 飞行

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🔒 第一图鉴集齐{n}个月巴后可解锁旅行！ | 🔒 Collect {n} Bannies in Codex 1 to unlock Trips! | 🔒 図鑑 1 でバニーを {n} 体集めると旅が解放されます！ | 🔒 도감 1에서 버니 {n}마리를 모으면 여행이 해금돼요! |
| 你放过了它，番茄总算保住了。 | You let it go — the tomatoes are safe after all. | 見逃してあげた。トマトは無事でした。 | 그냥 보내줬어요. 토마토는 무사했네요. |
| 🧺 月巴们还在攒番茄，稍后再来 | 🧺 The Bannies are still saving up tomatoes — come back later | 🧺 バニーたちはまだトマトを貯めています。また後で来てください | 🧺 버니들이 아직 토마토를 모으고 있어요 — 나중에 다시 와요 |
| 🕒 已按北京时间校准时钟（修正 {n} 秒） | 🕒 Clock calibrated to Beijing time (adjusted {n}s) | 🕒 北京時間に合わせて時計を調整しました（{n} 秒補正） | 🕒 베이징 시간에 맞춰 시계를 보정했어요 ({n}초 수정) |
| 🎲 今天已经赌过啦，明天再来 | 🎲 Already gambled today — come back tomorrow | 🎲 今日はもう賭けました。また明日どうぞ | 🎲 오늘은 이미 내기했어요 — 내일 다시 와요 |
| 🪙 金币不够这个档位 | 🪙 Not enough coins for this tier | 🪙 この段階に必要なコインが足りません | 🪙 이 단계에 필요한 코인이 부족해요 |
| 🚪 你客气地请访客回去了，它说改天再来。 | 🚪 You politely sent the visitor away — it says it will come another day. | 🚪 丁寧に帰ってもらった。また今度来ると言っている。 | 🚪 정중히 돌려보냈어요. 다음에 다시 오겠대요. |
| 🚪 门口没有人，安静得很 | 🚪 No one at the door — all quiet | 🚪 玄関には誰もいません。静かなものです | 🚪 문 앞에 아무도 없어요 — 조용하네요 |
| 🧭 指南针只能在去雪地时使用 | 🧭 The compass only works on trips to the Snowfield | 🧭 方位磁針は雪原へ行くときだけ使えます | 🧭 나침반은 설원에 갈 때만 쓸 수 있어요 |
| 🧭 去雪地要带上豪华便当，指南针才能用 | 🧭 To reach the Snowfield, bring a Deluxe Bento so the compass works | 🧭 雪原へ行くには豪華なお弁当が必要です。そうして初めて方位磁針が使えます | 🧭 설원에 가려면 호화 도시락을 챙겨야 나침반을 쓸 수 있어요 |
| 🧭 去「{n}」要先装一枚幸运护身符 | 🧭 To go to "{n}", pack a Lucky Charm first | 🧭 「{n}」へ行くには先に幸運のお守りを装備してください | 🧭 "{n}"에 가려면 먼저 행운의 부적을 챙겨야 해요 |
| 🚫 狂风把指南针的指针吹散了，这里还去不了 | 🚫 The gale blew the compass needle apart — you can't go here yet | 🚫 強風で方位磁針の針が乱れました。ここへはまだ行けません | 🚫 강풍이 나침반 바늘을 흩어놨어요 — 아직 여기로 갈 수 없어요 |
| 🎫 先购买小号护身符 | 🎫 Buy the Mini Charm first | 🎫 先にミニお守りを購入してください | 🎫 먼저 미니 부적을 구매해 주세요 |
| 🎫 小号护身符本周的机会已经用掉啦 | 🎫 This week's Mini Charm chance is already used | 🎫 ミニお守りの今週のチャンスはもう使いました | 🎫 미니 부적의 이번 주 기회는 이미 사용했어요 |
| 🔒 该地图尚未解锁 | 🔒 This map is not unlocked yet | 🔒 このマップはまだ解放されていません | 🔒 이 지도는 아직 해금되지 않았어요 |
| 🔒 该地图尚未解锁：需该地区前 3 张图各集齐 {n} 封信件（3/4） | 🔒 Map locked: collect {n} letters in each of the first 3 maps of the region (3/4) | 🔒 マップは未解放：この地域の前 3 枚のマップでそれぞれ手紙 {n} 通を集めてください（3/4） | 🔒 지도 미해금: 이 지역 앞 3개 지도에서 각각 편지 {n}통을 모아야 해요 (3/4) |
| 🎫 小号护身符只需购买一次 | 🎫 The Mini Charm only needs to be bought once | 🎫 ミニお守りは一度だけ購入すれば十分です | 🎫 미니 부적은 한 번만 구매하면 돼요 |
| 行囊已满（最多4件） | Bag full (max 4 items) | 荷物がいっぱいです（最大 4 個） | 짐이 가득 찼어요 (최대 4개) |
| 已装便当，最多带 1 份 | A bento is packed — only 1 allowed | お弁当はすでに入っています。最大 1 個です | 도시락은 이미 넣었어요 — 최대 1개예요 |
| 已装护身符，最多带 1 个 | A charm is packed — only 1 allowed | お守りはすでに入っています。最大 1 個です | 부적은 이미 넣었어요 — 최대 1개예요 |
| 已装小号护身符，最多带 1 个 | A Mini Charm is packed — only 1 allowed | ミニお守りはすでに入っています。最大 1 個です | 미니 부적은 이미 넣었어요 — 최대 1개예요 |
| 旅途中的护身符不能取出 | The charm cannot be taken out during a trip | 旅の途中でお守りを取り出すことはできません | 여행 중에는 부적을 꺼낼 수 없어요 |
| ✨ 收到 {n} 🍅！ | ✨ Received {n} 🍅! | ✨ {n} 🍅 を受け取りました！ | ✨ {n} 🍅를 받았어요! |
| ✨ 口令生效，获得 500 🍅！ | ✨ Code accepted — 500 🍅 granted! | ✨ 合言葉が有効です。500 🍅 を獲得！ | ✨ 코드가 적용됐어요 — 500 🍅 획득! |
| 此口令已使用过啦 | This code has already been used | この合言葉はもう使いました | 이 코드는 이미 사용했어요 |
| ✈️ 已有月巴在旅行中，等它回来再出发吧 | ✈️ A Banny is already away — wait for it to return | ✈️ すでに旅中のバニーがいます。帰ってから出発しましょう | ✈️ 이미 여행 중인 버니가 있어요 — 돌아온 뒤 출발해요 |
| 🐰 先在图鉴里选择一位月巴出发 | 🐰 Pick a Banny in the Codex before setting off | 🐰 まず図鑑で出発するバニーを選びましょう | 🐰 먼저 도감에서 출발할 버니를 골라 주세요 |
| 🍙 至少带上 1 个便当才能出发！ | 🍙 Bring at least 1 bento to set off! | 🍙 出発にはお弁当が最低 1 個必要です！ | 🍙 출발하려면 도시락이 최소 1개 필요해요! |
| 🎫 本次将使用小号护身符，指定前往「{n}」并消耗本周机会。\n（仅需饭团即可，确定出发吗？） | 🎫 This trip will use the Mini Charm to head to "{n}" and use up this week's chance.\n(Only a rice ball is needed — set off?) | 🎫 今回ミニお守りを使用し、「{n}」へ向かいます。今週のチャンスを消費します。\n（おにぎりだけで行けます。出発しますか？） | 🎫 이번 여행은 미니 부적으로 "{n}"에 갑니다. 이번 주 기회를 사용해요.\n(주먹밥만 있으면 돼요 — 출발할까요?) |
| ✈️ 出发去旅行啦！ | ✈️ Off on a trip! | ✈️ 旅へ出発！ | ✈️ 여행을 떠나요! |
| 　🐰 上一趟归家奖励 +{n} 🍅 已自动发放 | 　🐰 Last trip's homecoming reward +{n} 🍅 was granted automatically | 　🐰 前回の帰宅報酬 +{n} 🍅 を自動で付与しました | 　🐰 지난 여행의 귀가 보상 +{n} 🍅를 자동 지급했어요 |
| 欢迎回来！你离开了 {a}，{b} 个月巴已成熟待收~ | Welcome back! You were away {a} — {b} Bannies are ripe and waiting~ | おかえりなさい！{a} 離れていました。バニー {b} 体が成熟して待っています～ | 다녀오셨네요! {a} 동안 비웠고, 버니 {b}마리가 성숙해 기다려요~ |
| 🍅 它还不会飞。等到「月巴们的百日战纪」集齐，才能带你去天上。 | 🍅 It can't fly yet. Collect "The Hundred-Day Chronicle of Bannies" first to reach the sky. | 🍅 まだ飛べません。「バニーたちの百日戦記」を集めると、空へ連れて行けます。 | 🍅 아직 날 수 없어요. "버니들의 백일 전기"를 모으면 하늘로 데려갈 수 있어요. |
| 请收集到百日月巴再来哦~ | Come back once you have the Hundred-Day Banny~ | 百日バニーを集めてから来てくださいね～ | 백일 버니를 모은 뒤에 다시 오세요~ |
| 🔒 通过前一关才能解锁哦 | 🔒 Clear the previous stage to unlock | 🔒 前のステージをクリアすると解放されます | 🔒 이전 스테이지를 통과해야 해금돼요 |
| 口令不对哦～ | That code isn't right~ | 合言葉が違います～ | 코드가 맞지 않아요~ |
| 这个口令已经领过啦 | This code has already been claimed | この合言葉はもう受け取りました | 이 코드는 이미 받았어요 |
| 🏆 达成 {n} 项成就！点顶栏 🏆 查看 | 🏆 {n} achievement(s) unlocked! Tap 🏆 in the top bar to view | 🏆 実績 {n} 件達成！上の 🏆 から確認できます | 🏆 업적 {n}개 달성! 상단 🏆에서 확인하세요 |
| ✨ 发现新版本，正在自动刷新… | ✨ A new version was found — refreshing automatically… | ✨ 新しいバージョンを検出。自動で更新します… | ✨ 새 버전을 발견했어요 — 자동으로 새로고침할게요… |

## H11. 弹窗标题（旅行 / 信箱 / 对赌 / 图鉴）

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🎰 好运收获 | 🎰 Lucky Harvest | 🎰 ラッキー収穫 | 🎰 행운 수확 |
| 🎲 金币对赌 | 🎲 Coin Gamble | 🎲 コイン勝負 | 🎲 코인 내기 |
| 🎲 开骰中 | 🎲 Rolling | 🎲 ダイス回転中 | 🎲 주사위 굴리는 중 |
| 🎲 第 {n} 轮 | 🎲 Round {n} | 🎲 第 {n} ラウンド | 🎲 {n}라운드 |
| 🎉 赢了！ | 🎉 You won! | 🎉 勝ちました！ | 🎉 이겼어요! |
| 🍅 收下番茄 | 🍅 Take the Tomatoes | 🍅 トマトを受け取る | 🍅 토마토 받기 |
| 今天已经赌过啦，明天再来吧～ | Already gambled today — come back tomorrow~ | 今日はもう賭けました。また明日どうぞ～ | 오늘은 이미 내기했어요 — 내일 다시 와요~ |
| 知道了 | Got it | わかりました | 알겠어요 |
| 🏷 旅行图鉴 | 🏷 Travel Codex | 🏷 旅の図鑑 | 🏷 여행 도감 |
| 🐰 收到此信的月巴 | 🐰 The Banny who got this letter | 🐰 この手紙を受け取ったバニー | 🐰 이 편지를 받은 버니 |
| 💌 来信 | 💌 Letter | 💌 手紙 | 💌 편지 |
| 📮 信箱 · 来信 | 📮 Mailbox · Letters | 📮 郵便受け · 手紙 | 📮 우체통 · 편지 |
| 👋 门口有人敲门 | 👋 Someone's Knocking | 👋 玄関をノックしている | 👋 문을 두드리는 사람 |
| 📔 旅行笔记 | 📔 Travel Journal | 📔 旅の記録 | 📔 여행 일지 |
| 🛍 商店 · 用 🍅 购买 | 🛍 Shop · Buy with 🍅 | 🛍 ショップ · 🍅 で購入 | 🛍 상점 · 🍅로 구매 |
| 💼 仓库与行囊 | 💼 Storage & Bag | 💼 倉庫と荷物 | 💼 창고와 짐 |
| 🎁 回礼 | 🎁 Thank-you Gift | 🎁 お返し | 🎁 답례 |
| 🎉 旅行归来 | 🎉 Back from a Trip | 🎉 旅から帰宅 | 🎉 여행에서 돌아옴 |
| 💌 番茄的安慰 | 💌 Tomato's Comfort | 💌 トマトの慰め | 💌 토마토의 위로 |
| 🍅 有月巴鬼鬼祟祟 | 🍅 A Banny Is Sneaking Around | 🍅 こっそりしているバニー | 🍅 몰래하는 버니 |
| 🎯 捉拿月巴！ | 🎯 Catch the Banny! | 🎯 バニーを捕まえろ！ | 🎯 버니를 잡아라! |
| 🖼 画廊 {a}/{b} | 🖼 Gallery {a}/{b} | 🖼 ギャラリー {a}/{b} | 🖼 갤러리 {a}/{b} |
| 📗 图鉴 · 第{a}页 {b}/{c} ({d}%) | 📗 Codex · Page {a} {b}/{c} ({d}%) | 📗 図鑑 · 第 {a} ページ {b}/{c} ({d}%) | 📗 도감 · {a}페이지 {b}/{c} ({d}%) |
| 🎉 恭喜收集齐全！ | 🎉 Congratulations on completing the collection! | 🎉 コンプリートおめでとう！ | 🎉 컬렉션 완성 축하해요! |
| 🏆 成就 {a}/{b} | 🏆 Achievements {a}/{b} | 🏆 実績 {a}/{b} | 🏆 업적 {a}/{b} |

## H12. 旅行结算模板

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 🌿 从「{a}」带回新特产：{b}！ | 🌿 Brought a new souvenir from "{a}": {b}! | 🌿 「{a}」から新しい特産品を持ち帰りました：{b}！ | 🌿 "{a}"에서 새 특산품을 가져왔어요: {b}! |
| ♻️ 重复 {a} 兑换 {n} 🍅！ | ♻️ Duplicate {a} exchanged for {n} 🍅! | ♻️ 重複の {a} を {n} 🍅 に交換しました！ | ♻️ 중복 {a}을(를) {n} 🍅로 교환했어요! |
| 月巴从<b>「{a}」</b>回来了！（第 {n} 次旅行） | Your Banny is back from <b>"{a}"</b>! (Trip #{n}) | バニーが<b>「{a}」</b>から帰ってきました！（{n} 回目の旅） | 버니가 <b>"{a}"</b>에서 돌아왔어요! ({n}번째 여행) |
| 🎁 带回特产： | 🎁 Souvenirs brought back:  | 🎁 持ち帰った特産品： | 🎁 가져온 특산품:  |
| 从「{a}」带回 {b} | from "{a}": {b} | 「{a}」から {b} | "{a}"에서 {b} |
|  · 已兑换 {n} 🍅 |  · exchanged for {n} 🍅 |  · {n} 🍅 に交換済み |  · {n} 🍅로 교환됨 |
| 这次带回了温暖的问候 | This time it brought back a warm greeting | 今回は温かい挨拶を持ち帰りました | 이번에는 따뜻한 인사를 가져왔어요 |

## H13. 商店行 / 弹层标题补充

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 快长肥 | Quick-Grow | ぐんぐん肥料 | 쑥쑥 비료 |
| 天气瓶 | Weather Bottle | 天気の瓶 | 날씨병 |
| 生效中 · 重新选择会重置为新的 2 小时 | Active · choosing again resets a fresh 2 hours | 発効中 · 選び直すと新たな 2 時間にリセットされます | 적용 중 · 다시 고르면 2시간이 새로 시작돼요 |
| 自选天气（晴/多云/雨/暴雨/雪）· 生效 2 现实小时 | Pick weather (Sunny/Cloudy/Rain/Storm/Snow) · lasts 2 real hours | 天気を選ぶ（晴れ／曇り／雨／大雨／雪）· 現実時間 2 時間持続 | 날씨 선택 (맑음/흐림/비/폭우/눈) · 실제 2시간 지속 |
| 📅 打卡日历 · {a}年{b}月 | 📅 Check-in Calendar · {a}-{b} | 📅 チェックインカレンダー · {a}年{b}月 | 📅 체크인 달력 · {a}년 {b}월 |
| 📄 本周专注周报 | 📄 Weekly Focus Report | 📄 今週の集中レポート | 📄 이번 주 집중 리포트 |
| 📄 本月专注月报 | 📄 Monthly Focus Report | 📄 今月の集中レポート | 📄 이번 달 집중 리포트 |
| 🛒 商店 | 🛒 Shop | 🛒 ショップ | 🛒 상점 |
| 📊 统计与日历 | 📊 Stats & Calendar | 📊 統計とカレンダー | 📊 통계와 달력 |
| ✅ 任务 / 待办 | ✅ Tasks / To-do | ✅ タスク / やること | ✅ 할 일 / 투두 |
| ✏️ 编辑任务 | ✏️ Edit Task | ✏️ タスクを編集 | ✏️ 할 일 편집 |
| 🍅 番茄钟 | 🍅 Pomodoro | 🍅 ポモドーロ | 🍅 뽀모도로 |
| ✅ 打卡 | ✅ Check-in | ✅ チェックイン | ✅ 체크인 |
| ✏️ 编辑打卡 | ✏️ Edit Check-in | ✏️ チェックインを編集 | ✏️ 체크인 편집 |
| 🍅 天降事件 | 🍅 Surprise Event | 🍅 突然のイベント | 🍅 깜짝 이벤트 |
| ❓ 玩法说明 | ❓ How to Play | ❓ 遊び方 | ❓ 게임 방법 |

## H14. 槽位 / 天气瓶 / 动态时段值

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 栽培木 #{a} · {b} 槽 | Cultivation Log #{a} · {b} slots | 栽培木 #{a} · {b} 枠 | 재배목 #{a} · {b} 슬롯 |
| 已达到最大槽位 ({n} 槽) | Max slots reached ({n} slots) | 最大発生枠に到達（{n} 枠） | 최대 슬롯 도달 ({n} 슬롯) |
| 购买后增加 1 个种植槽 | Adds 1 planting slot after purchase | 購入すると発生枠が 1 つ増えます | 구매하면 재배 슬롯이 1개 늘어나요 |
| 已满 | Full | 満杯 | 가득 참 |
| 槽位+ {n}🪙 | Slot + {n}🪙 | 発生枠+ {n}🪙 | 슬롯+ {n}🪙 |
| 💰 金币：{n} · 点击下方按钮即可为新槽位购入 | 💰 Coins: {n} · tap the button below to buy a new slot | 💰 コイン：{n} · 下のボタンを押すと新しい発生枠を購入できます | 💰 코인: {n} · 아래 버튼을 누르면 새 슬롯을 구매할 수 있어요 |
| 还没有栽培木 | No cultivation logs yet | まだ栽培木がありません | 아직 재배목이 없어요 |
| 当前 | Current | 現在 | 현재 |
| 天气瓶已生效，重新选择会重置为新的 2 小时。 | The weather bottle is active; choosing again resets a fresh 2 hours. | 天気の瓶が発効中です。選び直すと新たな 2 時間にリセットされます。 | 날씨병이 적용 중이에요. 다시 고르면 2시간이 새로 시작돼요. |
| 选择天气需消耗 1 瓶（{n}🪙），生效 2 现实小时。 | Choosing weather costs 1 bottle ({n}🪙) and lasts 2 real hours. | 天気を選ぶには 1 本（{n}🪙）を消費し、現実時間 2 時間持続します。 | 날씨를 고르려면 1병({n}🪙)이 필요하고, 실제 2시간 동안 지속돼요. |
| 时间结束后瓶即失效，需重新购入。 | The bottle expires when time runs out — buy another to continue. | 時間が終わると瓶は無効になり、買い直しが必要です。 | 시간이 끝나면 병이 사라져요. 다시 구매해야 합니다. |
| 🌱 春季 | 🌱 Spring | 🌱 春 | 🌱 봄 |
| ☀️ 夏季 | ☀️ Summer | ☀️ 夏 | ☀️ 여름 |
| 🍂 秋季 | 🍂 Autumn | 🍂 秋 | 🍂 가을 |
| ❄️ 冬季 | ❄️ Winter | ❄️ 冬 | ❄️ 겨울 |
| 凌晨 | Late night | 未明 | 새벽 |
| 上午 | Morning | 午前 | 오전 |
| 中午 | Noon | 昼 | 정오 |
| 下午 | Afternoon | 午後 | 오후 |
| 傍晚 | Evening | 夕方 | 저녁 |
| 晚上 | Night | 夜 | 밤 |
| 晴 | Sunny | 晴れ | 맑음 |
| 多云 | Cloudy | 曇り | 흐림 |
| 雨 | Rain | 雨 | 비 |
| 暴雨 | Storm | 大雨 | 폭우 |
| 雪 | Snow | 雪 | 눈 |
| 下雪 | Snow | 雪 | 눈 |
| (雨后) | (after rain) | （雨上がり） | (비 온 뒤) |

## H15. 图鉴卡片 / 稀有度标签

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 普通 | Common | ノーマル | 일반 |
| 常见 | Uncommon | アンコモン | 흔함 |
| 稀有 | Rare | レア | 희귀 |
| 史诗 | Epic | エピック | 에픽 |
| 传说 | Legendary | レジェンド | 전설 |
| 活动 | Event | イベント | 이벤트 |
| 📍 最近 {a}cm · {b}g | 📍 Latest {a}cm · {b}g | 📍 最新 {a}cm · {b}g | 📍 최근 {a}cm · {b}g |
| 📏 最高 {a} | 📏 Tallest {a} | 📏 最高 {a} | 📏 최고 {a} |
| 📏 最矮 {a} | 📏 Shortest {a} | 📏 最低 {a} | 📏 최저 {a} |
| ⚖️ 最重 {a} | ⚖️ Heaviest {a} | ⚖️ 最重 {a} | ⚖️ 최고 무게 {a} |
| ⚖️ 最轻 {a} | ⚖️ Lightest {a} | ⚖️ 最軽 {a} | ⚖️ 최저 무게 {a} |
| 收获 x{n} | Harvested x{n} | 収穫 x{n} | 수확 x{n} |
| 未发现 | Undiscovered | 未発見 | 미발견 |
| 条件：{n} | Condition: {n} | 条件：{n} | 조건: {n} |
| ✨ 概率极低 · 永久可遇 | ✨ Extremely rare · always obtainable | ✨ 確率極低 · いつでも出会える | ✨ 확률 극히 낮음 · 언제든 획득 가능 |
| 📜 简介 | 📜 Profile | 📜 プロフィール | 📜 소개 |
| 关于它的来历仍是个谜… | Its origin remains a mystery… | その由来は謎のまま… | 그 유래는 여전히 수수께끼… |

## H16. 番茄钟统计 / 打卡弹层

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 📊 今日统计 | 📊 Today | 📊 今日の統計 | 📊 오늘 통계 |
| 📊 本周统计 | 📊 This Week | 📊 今週の統計 | 📊 이번 주 통계 |
| 📊 本月统计 | 📊 This Month | 📊 今月の統計 | 📊 이번 달 통계 |
| 今天还没有番茄记录，开始一个吧~ | No pomodoro records today — start one~ | 今日はまだポモドーロの記録がありません。始めてみましょう～ | 오늘은 아직 뽀모도로 기록이 없어요. 시작해 볼까요~ |
| 本周还没有番茄记录 | No pomodoro records this week | 今週はまだポモドーロの記録がありません | 이번 주는 아직 뽀모도로 기록이 없어요 |
| 本月还没有番茄记录 | No pomodoro records this month | 今月はまだポモドーロの記録がありません | 이번 달은 아직 뽀모도로 기록이 없어요 |
| 今日 | Today | 今日 | 오늘 |
| 本周 | This Week | 今週 | 이번 주 |
| 本月 | This Month | 今月 | 이번 달 |
| 周日 | Sun | 日 | 일 |
| 周一 | Mon | 月 | 월 |
| 周二 | Tue | 火 | 화 |
| 周三 | Wed | 水 | 수 |
| 周四 | Thu | 木 | 목 |
| 周五 | Fri | 金 | 금 |
| 周六 | Sat | 土 | 토 |
| 共 <b>{n}</b> 次专注 · 累计 <b>{a}</b> | <b>{n}</b> sessions · <b>{a}</b> total | 計 <b>{n}</b> 回 · 合計 <b>{a}</b> | 총 <b>{n}</b>회 · 누적 <b>{a}</b> |
| 🍅 返回番茄钟 | 🍅 Back to Pomodoro | 🍅 ポモドーロに戻る | 🍅 뽀모도로로 돌아가기 |
| 今日专注 | Focus today | 今日の集中 | 오늘 집중 |
| 今日累计 | Total today | 今日の合計 | 오늘 누적 |
| {n}次 | {n}× | {n}回 | {n}회 |
| {n}天 | {n}d | {n}日 | {n}일 |
| 🔥 连续打卡 | 🔥 Streak | 🔥 連続チェックイン | 🔥 연속 체크인 |
| 专注项目，如：工作 / 学习 | Focus item, e.g. Work / Study | 集中項目（例：仕事／勉強） | 집중 항목 (예: 업무 / 공부) |
| 专注分钟 | Focus minutes | 集中（分） | 집중(분) |
| 打卡内容 / 备注（可选） | Check-in note (optional) | チェックイン内容・メモ（任意） | 체크인 내용 / 메모 (선택) |
| 打卡会记录<b>项目、专注时长、打卡内容与时间</b>，可在主页 📊 统计 的日历中回顾复盘。 | Check-ins record the <b>item, focus duration, note and time</b> — review them in the 📊 Stats calendar on the home screen. | チェックインは<b>項目・集中時間・内容・時刻</b>を記録します。ホームの 📊 統計 カレンダーで振り返れます。 | 체크인은 <b>항목, 집중 시간, 내용, 시각</b>을 기록해요. 홈 화면 📊 통계 달력에서 되돌아볼 수 있어요. |
| ✅ 保存打卡 | ✅ Save Check-in | ✅ チェックインを保存 | ✅ 체크인 저장 |
| 专注项目 | Focus item | 集中項目 | 집중 항목 |
| 修改时长后结束时间自动重算，开始时间不变。 | Changing the duration recomputes the end time; the start time stays the same. | 時間を変更すると終了時刻は自動で再計算され、開始時刻は変わりません。 | 시간을 바꾸면 종료 시각은 자동으로 다시 계산되고, 시작 시각은 그대로예요. |
| 💾 保存 | 💾 Save | 💾 保存 | 💾 저장 |

## H17. 图鉴 / 信箱 / 通用按钮补全

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 你已收集齐第一图鉴 <b>{n}</b> 个月巴！<br>📕 第二图鉴已开启 —— 全新 <b>{a}</b> 种月巴加入掉落，等你来集齐！ | You have collected all <b>{n}</b> Bannies in Codex I!<br>📕 Codex II is now open — <b>{a}</b> brand-new Bannies join the drops. Go complete it! | 第一図鑑のバニー <b>{n}</b> 匹をすべて集めました！<br>📕 第二図鑑が開放 —— 新たな <b>{a}</b> 種のバニーがドロップに追加。集めきりましょう！ | 첫 도감의 버니 <b>{n}</b>마리를 모두 모았어요!<br>📕 두 번째 도감이 열렸어요 — 새로운 <b>{a}</b>종의 버니가 등장. 다 모아 보세요! |
| 📕 查看第二图鉴 | 📕 View Codex II | 📕 第二図鑑を見る | 📕 두 번째 도감 보기 |
| 此次旅行月巴寄回、尚未拆开的信件，点击可以拆开： | Letters your Banny mailed home on this trip, still unopened — tap to open: | 今回の旅でバニーが送り返した、まだ開けていない手紙。タップで開けます： | 이번 여행에서 버니가 보내온, 아직 열지 않은 편지. 눌러서 열어 보세요: |
| 信箱空空，还没有未拆的信件 | Mailbox is empty — no unopened letters | 郵便受けは空です。未開封の手紙はありません | 우체통이 비었어요. 아직 열지 않은 편지가 없어요 |

## H18. 旅行笔记 / 结算补充

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 共记录 {n} 次旅行 | {n} trips recorded | 旅の記録 合計 {n} 回 | 총 {n}회 여행 기록 |
| （仅保留最近 {n} 次） |  (only the latest {n} kept) | （最新 {n} 回のみ保持） |  (최근 {n}회만 보관) |
| 还没有旅行记录，带月巴出门走走吧～ | No trips yet — take your Banny out for a walk~ | まだ旅の記録がありません。バニーを連れて出かけてみましょう～ | 아직 여행 기록이 없어요. 버니와 함께 나가 볼까요~ |
| 第 {n} 次到访 | Visit #{n} | {n} 回目の訪問 | {n}번째 방문 |
|  · 出发  |  · departed  |  · 出発  |  · 출발  |
| 💌 收信 | 💌 Letters | 💌 受信 | 💌 받은 편지 |
| 🌿 新特产 | 🌿 New souvenirs | 🌿 新しい特産品 | 🌿 새 특산품 |
| ♻️ 重复 | ♻️ Duplicates | ♻️ 重複 | ♻️ 중복 |
| 这次没有带回信件与特产，只带了满满的好心情～ | No letters or souvenirs this time — just a heart full of good cheer~ | 今回は手紙も特産品もなし。たっぷりの良い気分だけ持ち帰りました～ | 이번엔 편지도 특산품도 없이, 가득한 좋은 기분만 가져왔어요~ |
| 远方 | Somewhere far | 遠い場所 | 먼 곳 |
| 新 | NEW | 新 | 신규 |
| 重 | DUP | 重 | 중복 |
| 收下 | Accept | 受け取る | 받기 |

## H19. 旅行商店 / 背包 UI 标签（长段说明归 P5）

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|
| 第 {a} / {b} 页 | Page {a} / {b} | {a} / {b} ページ | {a} / {b} 페이지 |
| ‹ 上一页 | ‹ Prev | ‹ 前へ | ‹ 이전 |
| 下一页 › | Next › | 次へ › | 다음 › |
| 🍅 番茄余额： | 🍅 Tomato balance:  | 🍅 トマト残高： | 🍅 토마토 잔액:  |
| 库存 ×{n} | Stock ×{n} | 在庫 ×{n} | 재고 ×{n} |
| 购买 | Buy | 購入 | 구매 |
| ✅ 已拥有（永久有效） | ✅ Owned (permanent) | ✅ 所持済み（永久有効） | ✅ 보유 중 (영구) |
| 🧰 仓库与行囊 | 🧰 Storage & Bag | 🧰 倉庫と荷物 | 🧰 창고와 짐 |
| 仓库 ×{n} | Storage ×{n} | 倉庫 ×{n} | 창고 ×{n} |
| 装进行囊 | Pack | 荷物に入れる | 짐에 넣기 |
| 取出 | Take out | 取り出す | 꺼내기 |
| 旅途中不可取出 | Cannot take out while traveling | 旅の途中は取り出せません | 여행 중에는 꺼낼 수 없어요 |
| 仓库空空的，去 🛍 商店买点物资吧 | Storage is empty — go buy supplies at the 🛍 Shop | 倉庫は空です。🛍 ショップで物資を買いましょう | 창고가 비었어요. 🛍 상점에서 물자를 사 보세요 |
| 🎒 行囊（{n}/4） | 🎒 Bag ({n}/4) | 🎒 荷物（{n}/4） | 🎒 짐 ({n}/4) |
| 还没有带任何东西 | Nothing packed yet | まだ何も入れていません | 아직 아무것도 넣지 않았어요 |
| 🐰 选择去旅行的月巴（{n}） | 🐰 Pick a Banny to travel ({n}) | 🐰 旅するバニーを選ぶ（{n}） | 🐰 여행할 버니 선택 ({n}) |
| ▲ 收起 | ▲ Collapse | ▲ たたむ | ▲ 접기 |
| ▼ 展开 | ▼ Expand | ▼ 展開 | ▼ 펼치기 |
| 图鉴里还没有月巴，先去收集一些吧 | No Bannies in the Codex yet — go collect some | 図鑑にまだバニーがいません。まず集めましょう | 도감에 아직 버니가 없어요. 먼저 모아 보세요 |
| 当前选择： | Current pick:  | 現在の選択： | 현재 선택:  |
| 还没有选择月巴，可搜索或展开挑选 | No Banny picked — search or expand to choose | バニー未選択。検索か展開で選べます | 버니를 고르지 않았어요. 검색하거나 펼쳐서 선택하세요 |
| ✈️ 已有月巴正在旅行中 | ✈️ A Banny is already traveling | ✈️ すでに旅しているバニーがいます | ✈️ 이미 여행 중인 버니가 있어요 |
| 等它回来后才能再次出发 | Wait for its return before setting off again | 戻ってくるまで再出発できません | 돌아온 뒤에 다시 출발할 수 있어요 |
| 没有找到这个名字的月巴 | No Banny with that name | その名前のバニーは見つかりませんでした | 그 이름의 버니를 찾지 못했어요 |
| 继续购物 | Keep shopping | 買い物を続ける | 쇼핑 계속하기 |
| 又是一封重复的信…… | Another duplicate letter… | また重複した手紙…… | 또 중복된 편지…… |
| {a} 回家啦！它把旅途中攒下的 <b>{b}</b> 个 🍅 送给了你 | {a} is home! It gave you the <b>{b}</b> 🍅 it saved up on the trip | {a} が帰ってきました！旅で貯めた <b>{b}</b> 個の 🍅 をくれました | {a}가 돌아왔어요! 여행 중 모은 <b>{b}</b>개의 🍅를 선물했어요 |
| 🍅 番茄： | 🍅 Tomato:  | 🍅 トマト： | 🍅 토마토:  |
| 可搜索或展开更换 |  — search or expand to change | 　検索か展開で変更 |  — 검색하거나 펼쳐서 변경 |
| 🚀 即将出发的月巴 | 🚀 Banny about to depart | 🚀 出発するバニー | 🚀 출발할 버니 |
| （未选择） | (none picked) | （未選択） | (미선택) |
| 出发留言… | Departure message… | 出発メッセージ… | 출발 메시지… |
| ✈️ 出发（需 1 个便当） | ✈️ Depart (needs 1 bento) | ✈️ 出発（お弁当 1 個が必要） | ✈️ 출발 (도시락 1개 필요) |
| 耐久 | Durability | 耐久 | 내구도 |
| ✖ 取消指定（改回随机） | ✖ Clear target (back to random) | ✖ 指定を解除（ランダムに戻す） | ✖ 지정 취소 (무작위로 되돌리기) |

## 内容条目表：条目 id -> 字段 -> {en,ja,ko}（P3~P7 分批填）

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|

## 首次进入跟随浏览器语言（ja/ko/en），其余归中文；之后就以手动选择为准

| 中文 | English | 日本語 | 한국어 |
|---|---|---|---|

---

## ⚠️ 需你拍板的遗留项（非本批新增，但一并列出）

- `🎲 对赌`（斗月巴入口）：现用 en **Betting** / ja **勝負** / ko **도박**。可选 en Gambling、ja 賭け、ko 도박하기。「选 en Gambling、ja 賭け、ko 도박하기。」
- 首页主标题 `放置<span>月巴</span> 🐰`：中文/日/韩保留「放置…」结构，英文用 **Idle Banny**。若想英文也保留品牌结构可改 **Idle <span>Banny</span>**。「改 **Idle <span>Banny</span>」

> 说明：本轮已清理 8 处重复键（同一中文键被定义两次、译文不同）。保留口径见下行：
> `🎉 恭喜收集齐全！` 保留「Congratulations on completing the collection!」版；
> `🐰 收到此信的月巴` 保留「The Banny who got this letter」版；`💌 番茄的安慰` 保留「Tomato's Comfort」版；
> `🏷 旅行图鉴` 保留 ja「旅の図鑑」版；`📔 旅行笔记` / `📮 信箱 · 来信` / `🛍 商店 · 用 🍅 购买` / `💼 仓库与行囊` 两版相同，去重即可。
