# i18n P7 事件与彩蛋 —— 译文清单（待批注）

范围：数据型事件 **438 条**（图鉴 88 / 庭院 88 / 室内 48 / 重复信安慰 20 / 飞行失败 26 + 胜利 6 + 关卡名 10 / 访客名 81 + 八卦 81）+ 台词与界面文案 **约 450 条**（斗月巴、金币对赌、抢番茄、口令彩蛋、番茄钟、任务/日历/toast）。

口径：叙事类（事件、台词、八卦）日文**常体**、韩文**한다체**；UI/提示/toast 日文**敬体**、韩文**해요체**。对白引号 en/ko `"…"`、ja「」，嵌套用 `'…'`/『』。`{name}`/`{n}`/`{a}`/`{b}` 占位符原样保留。

取值：全部以**中文原文作键**存入 `I18N_UI`，渲染处 `$t(...)`；数组本身保持中文源不动。缺条目时 `$t` 原样回退中文，可增量补译。

说明：本表只列 P7 新增的键；与 P2/P5 既有键重复的文案未重复登记。

---

| # | 中文原串 | English | 日本語 | 한국어 |
|---|---|---|---|---|
| 1 | 🍅 {name}把番茄举过头顶，转了个圈又放回掌心：「喏，这是属于我的番茄。」 | 🍅 {name} lifts the tomato over its head, spins around, and sets it back in its palm: "Here — this one is mine." | 🍅 {name}はトマトを頭の上に掲げ、くるりと回ってから手のひらに戻す。「ほら、これは私のトマト。」 | 🍅 {name}는 토마토를 머리 위로 들어 올려 빙글 돌고는 다시 손바닥에 내려놓는다. "자, 이건 내 토마토야." |
| 2 | 📖 {name}盯着番茄看了很久，忽然小声说：「如果番茄会说话就好了……理理我好不好？」 | 📖 {name} stares at the tomato for a long while, then whispers: "If only tomatoes could talk... would you pay me some attention?" | 📖 {name}はトマトを長いこと見つめ、ふと小声で言う。「トマトが話せたらいいのに……相手してくれないかな？」 | 📖 {name}는 토마토를 오래 들여다보다가 문득 작게 말한다. "토마토가 말을 할 수 있으면 좋겠다…… 나 좀 상대해 줄래?" |
| 3 | 💘 {name}用番茄沾了沾清水，当作镜子照了照自己：「才不是番茄好看，是我好看，好吧，番茄也好看。」 | 💘 {name} dips the tomato in clear water and uses it as a mirror: "It’s not that the tomato is pretty — I’m pretty. Fine, the tomato is pretty too." | 💘 {name}はトマトを清水に浸して鏡代わりに自分を映す。「トマトがかわいいんじゃない、私がかわいいの。……はい、トマトもかわいい。」 | 💘 {name}는 토마토를 맑은 물에 적셔 거울 삼아 자신을 비춘다. "토마토가 예쁜 게 아니라 내가 예쁜 거야. ……알았어, 토마토도 예뻐." |
| 4 | 🎀 {name}把番茄别在自己头上当发饰，得意地晃了晃：「好看吧？这可是会脸红的小太阳。」 | 🎀 {name} tucks the tomato into its hair as an ornament and shakes its head proudly: "Nice, right? It’s a little sun that blushes." | 🎀 {name}はトマトを髪飾りみたいに頭に留め、得意げに揺れる。「いいでしょう？ これは顔を赤らめる小さな太陽なんだよ。」 | 🎀 {name}는 토마토를 머리 장식처럼 꽂고 자랑스럽게 흔든다. "예쁘지? 이건 얼굴을 붉히는 작은 태양이야." |
| 5 | 🌊 {name}淋了一身雨，却把干的那只番茄护在怀里，低声说：「你也不许着凉呀。」 | 🌊 {name} gets soaked by the rain but keeps the dry tomato sheltered against its chest, murmuring: "You’re not allowed to catch a cold either." | 🌊 {name}は雨に濡れながらも、乾いたトマトだけは胸に抱えて守り、低い声で言う。「あなたも風邪ひいちゃだめだよ。」 | 🌊 {name}는 비에 흠뻑 젖으면서도 마른 토마토만은 품에 감싸 지키며 낮게 말한다. "너도 감기 걸리면 안 돼." |
| 6 | ⛅ {name}对番茄叹了口气：「万一我先熟了……记得替我把太阳晒回来哦。」 | ⛅ {name} sighs at the tomato: "If I ripen first... remember to soak up the sun for me, okay?" | ⛅ {name}はトマトに向かってため息をつく。「もし私が先に熟しちゃったら……代わりに太陽を浴びておいてね。」 | ⛅ {name}는 토마토를 보며 한숨을 쉰다. "혹시 내가 먼저 익어 버리면…… 대신 햇볕을 쬐어 줘." |
| 7 | 🍂 {name}把一只熟得发亮的番茄推到角落，自己缩了缩：「最红的那颗，留到最后再吃吧。」 | 🍂 {name} pushes a glossy, fully ripe tomato into the corner and shrinks back a little: "The reddest one — I’ll save it for last." | 🍂 {name}はつやつやに熟したトマトを隅へ押しやり、自分は身を縮める。「一番赤いのは、最後まで取っておこう。」 | 🍂 {name}는 윤이 나게 익은 토마토를 구석으로 밀어 두고 몸을 움츠린다. "가장 빨간 건 마지막에 먹자." |
| 8 | 🎶 {name}弹了弹番茄，听出闷闷的回声，笑着说：「熟透了的心，敲起来是这个声音呀。」 | 🎶 {name} flicks the tomato, hears the dull echo, and smiles: "A heart that’s fully ripe — that’s the sound it makes when you tap it." | 🎶 {name}はトマトを弾いて、こもった音を聞き取り、笑って言う。「熟しきった心は、叩くとこんな音がするんだね。」 | 🎶 {name}는 토마토를 톡톡 두드려 둔탁한 울림을 듣고 웃으며 말한다. "푹 익은 마음은 두드리면 이런 소리가 나는구나." |
| 9 | 🌙 {name}在月光下跟番茄碰了碰「额头」，轻声道：「今天也要好好的呀。」 | 🌙 {name} bumps "foreheads" with the tomato under the moonlight and says softly: "Let’s take good care today too." | 🌙 {name}は月明かりの下でトマトと「額」をこつんと合わせ、そっと言う。「今日も元気でいようね。」 | 🌙 {name}는 달빛 아래에서 토마토와 "이마"를 콩 부딪치며 조용히 말한다. "오늘도 잘 지내자." |
| 10 | 🔥 {name}把番茄挡在风里，护住那点温度：「可别被风刮走啦。」 | 🔥 {name} shields the tomato from the wind, guarding its warmth: "Don’t let the wind blow you away." | 🔥 {name}はトマトを風除けに隠して、その温もりを守る。「風に飛ばされないでね。」 | 🔥 {name}는 토마토를 바람막이로 감싸 그 온기를 지킨다. "바람에 날아가지 마." |
| 11 | 💭 {name}盯着滚远的番茄喃喃：「慢点跑嘛。」 | 💭 {name} watches the tomato roll away and murmurs: "Slow down." | 💭 {name}は転がっていくトマトを見つめてつぶやく。「そんなに急がなくていいのに。」 | 💭 {name}는 굴러가는 토마토를 바라보며 중얼거린다. "조금만 천천히 가." |
| 12 | 🌙 {name}抱着睡着的番茄：「月巴和番茄，今晚也要一起睡呢。」 | 🌙 {name} holds the sleeping tomato: "Banny and Tomato — sleeping together again tonight." | 🌙 {name}は眠っているトマトを抱いて。「バニーとトマト、今夜も一緒に寝るんだね。」 | 🌙 {name}는 잠든 토마토를 안고. "버니와 토마토, 오늘도 같이 자는 거야." |
| 13 | 🌻 {name}把番茄放在阳光最足的地方：「晒晒太阳，一起等天黑呀。」 | 🌻 {name} places the tomato where the sun is strongest: "Let’s soak up some sun and wait for night together." | 🌻 {name}はトマトを一番日当たりのいい場所に置く。「日向ぼっこして、一緒に夜を待とうね。」 | 🌻 {name}는 토마토를 햇볕이 가장 잘 드는 곳에 둔다. "볕 좀 쬐면서 같이 밤을 기다리자." |
| 14 | 🌸 {name}用番茄轻轻贴了贴自己的脸：「一样的温度，一样的心跳呢。」 | 🌸 {name} presses the tomato gently to its own cheek: "Same warmth, same heartbeat." | 🌸 {name}はトマトをそっと自分の頬に当てる。「同じ温度、同じ鼓動だね。」 | 🌸 {name}는 토마토를 살며시 자기 볼에 댄다. "같은 온도, 같은 심장 박동이네." |
| 15 | 🌊 {name}捞起一颗漂回来的番茄，愣愣看着：「怎么总往同一个方向去呀。」 | 🌊 {name} scoops up a tomato that drifted back and stares at it: "Why do you always head the same way?" | 🌊 {name}は流れ戻ってきたトマトをすくい上げ、ぼんやり見つめる。「どうして同じ方へ行くんだろう。」 | 🌊 {name}는 떠내려온 토마토를 건져 올려 멍하니 바라본다. "왜 자꾸 같은 쪽으로 가는 걸까." |
| 16 | ⛅ {name}把番茄举到头顶比大小：「刚才是我高，现在换成你咯。」 | ⛅ {name} holds the tomato up over its head to compare heights: "A moment ago I was taller — now it’s your turn." | ⛅ {name}はトマトを頭の上に持ち上げて背比べする。「さっきは私が高かったのに、今は君の番だね。」 | ⛅ {name}는 토마토를 머리 위로 들어 올려 키를 견준다. "아까는 내가 더 컸는데, 이제 네 차례네." |
| 17 | 🥢 {name}把番茄拨到盘子中央：「你就是今天的主菜。」 | 🥢 {name} nudges the tomato to the centre of the plate: "You’re today’s main course." | 🥢 {name}はトマトを皿の真ん中へ寄せる。「君が今日のメインディッシュだよ。」 | 🥢 {name}는 토마토를 접시 가운데로 밀어 둔다. "너는 오늘의 메인 요리야." |
| 18 | 🌖 {name}夜半醒来发现番茄还醒着：「怎么还不睡？我又不会从床底出现，这次是走的门。」 | 🌖 {name} wakes at midnight to find the tomato still awake: "Why aren’t you asleep? I won’t pop out from under the bed — I came through the door this time." | 🌖 {name}は夜中に目を覚ますと、トマトがまだ起きていた。「どうして寝ないの？ 私はベッドの下から出てこないよ、今回はドアから来たんだから。」 | 🌖 {name}는 한밤중에 깨어 보니 토마토가 아직 깨어 있다. "왜 안 자? 나는 침대 밑에서 나타나지 않아, 이번엔 문으로 왔으니까." |
| 19 | 🍂 {name}把一片落叶放在番茄上：「替番茄盖被子，我可贴心啦。」 | 🍂 {name} lays a fallen leaf over the tomato: "Tucking the tomato in — I’m so thoughtful." | 🍂 {name}は落ち葉を一枚トマトに掛ける。「トマトに布団をかけてあげる。私は気が利くんだよ。」 | 🍂 {name}는 낙엽 한 장을 토마토 위에 덮는다. "토마토에게 이불을 덮어 주다니, 나 참 다정하지." |
| 20 | 🔥 {name}烤了烤手心，又怕烫到番茄：「再等等，暖一点才碰你。」 | 🔥 {name} warms its palms by the fire, then worries about burning the tomato: "Wait a little — I’ll only touch you once I’m warm." | 🔥 {name}は手のひらを火で温め、でもトマトを熱しそうで心配する。「もう少し待って。あったかくなってから触るね。」 | 🔥 {name}는 손바닥을 불에 쬐어 따뜻하게 하고는 토마토를 데일까 걱정한다. "조금만 기다려, 따뜻해지면 만질게." |
| 21 | 💬 {name}对番茄说了很多话，番茄没应：「不说也没关系，我都懂的。」 | 💬 {name} says a great deal to the tomato, and it doesn’t answer: "It’s fine if you don’t say anything. I understand." | 💬 {name}はトマトにたくさん話しかけたが、返事はない。「話さなくてもいいよ、ちゃんと分かってるから。」 | 💬 {name}는 토마토에게 많은 말을 걸었지만 대답이 없다. "말하지 않아도 괜찮아, 다 알고 있으니까." |
| 22 | 🌈 {name}用番茄接住窗外漏进的阳光：「把这束颜色献给你，我亲爱的番茄。」 | 🌈 {name} catches the sunlight leaking in through the window with the tomato: "This handful of colour — I offer it to you, my dear tomato." | 🌈 {name}は窓からこぼれる陽光をトマトで受け止める。「この色の束をあなたに。親愛なるトマト。」 | 🌈 {name}는 창문으로 새어 든 햇살을 토마토로 받는다. "이 빛다발을 너에게 바칠게, 사랑하는 토마토." |
| 23 | 🥛 {name}把杯子轻轻推到番茄面前：「今晚的月色很美，对吧。所以来碰杯吧~」 | 🥛 {name} slides the cup gently towards the tomato: "The moon is lovely tonight, isn’t it? So let’s clink cups~" | 🥛 {name}はカップをそっとトマトの前に押し出す。「今夜の月はきれいだね。だから乾杯しよう～」 | 🥛 {name}는 컵을 살며시 토마토 앞으로 밀어 준다. "오늘 밤 달이 참 예쁘지. 그러니까 건배하자~" |
| 24 | 🌠 {name}指着夜空：「那颗星星离我们很远很远，早已经死去，可它还在闪烁呢。」 | 🌠 {name} points at the night sky: "That star is so very far away, and it died long ago — yet it’s still shining." | 🌠 {name}は夜空を指さす。「あの星はすごく遠くて、ずっと前に死んでしまったのに、まだ瞬いているんだよ。」 | 🌠 {name}는 밤하늘을 가리킨다. "저 별은 아주 아주 멀고, 오래전에 죽었는데도 아직 반짝이고 있어." |
| 25 | 🍓 {name}把番茄藏进袖口：「藏起来的最甜，才舍不得交出去。」 | 🍓 {name} hides the tomato in its sleeve: "The hidden ones are the sweetest — I’m not giving this one up." | 🍓 {name}はトマトを袖口に隠す。「隠したものほど甘いんだよ。だから手放したくないの。」 | 🍓 {name}는 토마토를 소매 속에 숨긴다. "숨긴 게 제일 달콤한 법이야. 그래서 못 내줘." |
| 26 | 🪵 {name}和番茄坐在屋檐下躲雨：「不喜欢下雨，但和你躲雨就很快乐。」 | 🪵 {name} sits with the tomato under the eaves, sheltering from the rain: "I don’t like rain, but sheltering from it with you makes me happy." | 🪵 {name}はトマトと軒下に座って雨宿りする。「雨は好きじゃないけど、君と雨宿りするのは楽しいんだ。」 | 🪵 {name}는 토마토와 처마 밑에 앉아 비를 피한다. "비는 싫지만, 너와 함께 비를 피하는 건 즐거워." |
| 27 | 🎐 {name}摇头晃脑逗番茄：「所以，是愿意陪我玩的意思吧？」 | 🎐 {name} bobs its head to tease the tomato: "So that means you’ll play with me, right?" | 🎐 {name}は首を振ってトマトをからかう。「つまり、一緒に遊んでくれるってことだよね？」 | 🎐 {name}는 고개를 흔들며 토마토를 놀린다. "그러니까 같이 놀아 주겠다는 뜻이지?" |
| 28 | 🕯️ {name}吹熄蜡烛前看了番茄一眼：「许愿的时候，要留一个愿望给番茄。」 | 🕯️ {name} glances at the tomato before blowing out the candle: "When I make a wish, one of them has to be for the tomato." | 🕯️ {name}はろうそくを吹き消す前にトマトをちらりと見る。「願い事をするときは、トマトの分も一つ残しておくんだよ。」 | 🕯️ {name}는 초를 불기 전에 토마토를 힐끗 본다. "소원을 빌 때는 토마토 몫도 하나 남겨 둬야 해." |
| 29 | 💧 {name}清晨用露水给番茄洗脸：「醒醒啦，新的一天我们要一起过。」 | 💧 {name} washes the tomato’s face with dew in the early morning: "Wake up — we’re going to spend a brand-new day together." | 💧 {name}は早朝、露でトマトの顔を洗う。「起きて。新しい一日を、私たちは一緒に過ごすんだよ。」 | 💧 {name}는 이른 아침 이슬로 토마토의 얼굴을 씻긴다. "일어나, 새로운 하루를 우리 함께 보내야지." |
| 30 | 🌲 {name}把番茄往自己这边拢了拢：「这样安全一点。」 | 🌲 {name} pulls the tomato a little closer to itself: "This way is safer." | 🌲 {name}はトマトを自分の方へ引き寄せる。「こうした方が安全だよ。」 | 🌲 {name}는 토마토를 자기 쪽으로 끌어당긴다. "이래야 좀 안전해." |
| 31 | 🌸 {name}看见番茄脸红：「你脸红什么？该脸红的不是我吗！」 | 🌸 {name} sees the tomato blushing: "Why are you blushing? Shouldn’t I be the one blushing?" | 🌸 {name}はトマトが顔を赤らめているのを見る。「なんで赤くなってるの？ 赤くなるのは私の方でしょ！」 | 🌸 {name}는 토마토가 얼굴을 붉히는 걸 본다. "왜 얼굴이 빨개? 빨개져야 하는 건 나잖아!" |
| 32 | 🫧 {name}把番茄放进肥皂水里打算洗干净：「别怕，不会溺水的。」 | 🫧 {name} puts the tomato into soapy water to wash it: "Don’t be scared, you won’t drown." | 🫧 {name}はトマトを石けん水に入れて洗おうとする。「怖がらないで、溺れたりしないから。」 | 🫧 {name}는 토마토를 비눗물에 넣고 씻기려 한다. "무서워하지 마, 익사하지는 않아." |
| 33 | 📮 {name}把番茄放进信封又拿出来：「咳咳，搞错了，本来是想给你我写的信。」 | 📮 {name} puts the tomato into an envelope, then takes it out again: "Ahem — my mistake. What I meant to give you was the letter I wrote." | 📮 {name}はトマトを封筒に入れて、また取り出す。「コホン、間違えた。本当は君に、私の書いた手紙を渡すつもりだったんだ。」 | 📮 {name}는 토마토를 봉투에 넣었다가 다시 꺼낸다. "에헴, 착각했어. 원래는 너에게 내가 쓴 편지를 주려던 거야." |
| 34 | 🧣 {name}把自己的围巾围在番茄上：「这样就不会冷了吧。」 | 🧣 {name} wraps its own scarf around the tomato: "Now you won’t be cold, right?" | 🧣 {name}は自分のマフラーをトマトに巻く。「これで寒くないよね。」 | 🧣 {name}는 자기 스카프를 토마토에게 둘러 준다. "이제 춥지 않지?" |
| 35 | 🍚 {name}把番茄稳稳放在饭团中央：「有你在，饭团才叫饭团。」 | 🍚 {name} sets the tomato firmly in the middle of the rice ball: "With you here, a rice ball is really a rice ball." | 🍚 {name}はトマトをしっかりおにぎりの真ん中に置く。「君がいるから、おにぎりはおにぎりなんだよ。」 | 🍚 {name}는 토마토를 주먹밥 한가운데에 단단히 올린다. "네가 있어야 주먹밥이 주먹밥이야." |
| 36 | 🌒 {name}背对着番茄悄悄说：「我没有在等谁。」 | 🌒 {name} says quietly with its back to the tomato: "I’m not waiting for anyone." | 🌒 {name}はトマトに背を向けて、そっと言う。「誰かを待ってるわけじゃない。」 | 🌒 {name}는 토마토에게 등을 돌리고 조용히 말한다. "누구를 기다리는 게 아니야." |
| 37 | ⛲ {name}把番茄放在喷泉边上：「听说许过的愿，月亮会偷偷记下来。」 | ⛲ {name} sets the tomato beside the fountain: "They say the moon secretly writes down every wish you make." | ⛲ {name}はトマトを噴水のそばに置く。「願ったことは、月がこっそり書き留めてくれるんだって。」 | ⛲ {name}는 토마토를 분수 옆에 둔다. "빈 소원은 달이 몰래 적어 둔다고 해." |
| 38 | 🫖 {name}倒了杯温水，把番茄推到面前：「多喝热水。」 | 🫖 {name} pours a cup of warm water and pushes it towards the tomato: "Drink plenty of warm water." | 🫖 {name}は白湯を一杯注ぎ、トマトの前に押し出す。「お湯をたくさん飲んでね。」 | 🫖 {name}는 따뜻한 물을 한 잔 따라 토마토 앞으로 밀어 준다. "따뜻한 물 많이 마셔." |
| 39 | 💤 {name}离开前小声对番茄道晚安：「要梦见我哦，不然我会有点难过。」 | 💤 {name} whispers goodnight to the tomato before leaving: "Dream about me, okay? Otherwise I’ll be a little sad." | 💤 {name}は出ていく前に、トマトに小さな声でおやすみを言う。「私の夢を見てね。じゃないと、ちょっと悲しくなっちゃうから。」 | 💤 {name}는 나가기 전 토마토에게 작게 잘 자라고 인사한다. "내 꿈 꿔, 안 그러면 나 조금 슬플 거야." |
| 40 | 🌾 {name}把番茄藏进麦田深处：「谁也找不到你，只有我知道你在哪里。」 | 🌾 {name} hides the tomato deep in the wheat field: "No one can find you — only I know where you are." | 🌾 {name}はトマトを麦畑の奥深くに隠す。「誰にも見つからないよ。君がどこにいるか、知ってるのは私だけ。」 | 🌾 {name}는 토마토를 밀밭 깊숙이 숨긴다. "아무도 널 찾을 수 없어. 네가 어디 있는지 아는 건 나뿐이야." |
| 41 | ☕ {name}让番茄闻了闻自己手里的杯子：「是热可可的味道，很甜的，要喝吗？」 | ☕ {name} lets the tomato sniff the cup in its hand: "It’s hot cocoa — very sweet. Want some?" | ☕ {name}は手に持ったカップをトマトに嗅がせる。「ホットココアの匂いだよ。甘いんだ。飲む？」 | ☕ {name}는 손에 든 컵을 토마토에게 냄새 맡게 한다. "핫초코 냄새야, 아주 달아. 마실래?" |
| 42 | 🎪 {name}拉着番茄看远处的烟火：「都说烟火转瞬即逝，可我看到你了呀。」 | 🎪 {name} pulls the tomato over to watch the fireworks in the distance: "They say fireworks last only a moment — but I saw you." | 🎪 {name}はトマトを引っ張って遠くの花火を見る。「花火は一瞬で消えるって言うけど、私は君を見つけたよ。」 | 🎪 {name}는 토마토를 끌어와 멀리서 터지는 불꽃을 본다. "불꽃은 순식간이라지만, 나는 너를 봤어." |
| 43 | 🐚 {name}把番茄凑到耳边：「你听，海浪在说……我喜欢你。」 | 🐚 {name} brings the tomato to its ear: "Listen — the waves are saying... I like you." | 🐚 {name}はトマトを耳元に寄せる。「聞いて、波が言ってるよ……君が好きだって。」 | 🐚 {name}는 토마토를 귀에 가져간다. "들어 봐, 파도가 말하고 있어…… 너를 좋아한다고." |
| 44 | 🌰 {name}剥好一颗栗子，一半给自己一半给番茄：「要一人一半才对。」 | 🌰 {name} peels a chestnut and splits it: half for itself, half for the tomato: "Half each — that’s the way." | 🌰 {name}は栗を一つ剥いて、半分は自分に、半分はトマトに。「半分こが正しいんだよ。」 | 🌰 {name}는 밤 한 알을 까서 반은 자기, 반은 토마토에게. "반씩 나누는 게 맞아." |
| 45 | 🪞 {name}把番茄举到镜子前，自己躲到镜后：「这样我们就算是面对面了吧？」 | 🪞 {name} holds the tomato up to the mirror and hides behind it: "Now we’re face to face, aren’t we?" | 🪞 {name}はトマトを鏡の前に掲げ、自分は鏡の後ろに隠れる。「これで私たち、向かい合ってるってことになるよね？」 | 🪞 {name}는 토마토를 거울 앞에 들고 자기는 거울 뒤로 숨는다. "이러면 우리 마주 보고 있는 거 맞지?" |
| 46 | 🌧️ {name}把伞往番茄那边偏了偏：「淋湿一点点没关系，你别淋到就好。」 | 🌧️ {name} tilts the umbrella towards the tomato: "Getting a little wet is fine — as long as you stay dry." | 🌧️ {name}は傘をトマトの方へ傾ける。「少し濡れるくらい平気。君が濡れなければいいんだ。」 | 🌧️ {name}는 우산을 토마토 쪽으로 기울인다. "조금 젖는 건 괜찮아. 네가 안 젖으면 되니까." |
| 47 | ✨ {name}捡起一颗萤火虫放在番茄头顶：「这样在夜里走路，就能随时找到你啦。」 | ✨ {name} picks up a firefly and sets it on the tomato’s head: "Now when we walk at night, I can find you any time." | ✨ {name}はホタルを一匹拾ってトマトの頭に載せる。「これで夜道を歩いても、いつでも君を見つけられるね。」 | ✨ {name}는 반딧불이를 하나 주워 토마토 머리 위에 올린다. "이제 밤길을 걸어도 언제든 널 찾을 수 있어." |
| 48 | 🎏 {name}把番茄挂在风铃下：「叮叮当当的，像你在我心里的声音。」 | 🎏 {name} hangs the tomato under the wind chime: "Ding-ding — just like the sound of you in my heart." | 🎏 {name}はトマトを風鈴の下に吊るす。「ちりんちりん、私の心の中の君の音みたい。」 | 🎏 {name}는 토마토를 풍경 아래에 매단다. "딸랑딸랑, 내 마음속 네 목소리 같아." |
| 49 | 🍬 {name}把糖纸叠成小兔放在番茄旁边：「嗯，有这个陪你，我很快就回来。」 | 🍬 {name} folds a candy wrapper into a little rabbit and sets it beside the tomato: "There — with this to keep you company, I’ll be back soon." | 🍬 {name}はキャンディの包み紙を小さなウサギに折ってトマトのそばに置く。「うん、これがそばにいれば、私はすぐ戻るからね。」 | 🍬 {name}는 사탕 봉지를 작은 토끼로 접어 토마토 옆에 둔다. "응, 이게 있으면 금방 돌아올게." |
| 50 | 🌗 {name}望着熟透的番茄轻声说：「就算你有一天会离开，我也记住了你现在的模样。」 | 🌗 {name} gazes at the fully ripe tomato and says softly: "Even if you leave someday, I’ll remember you just as you are now." | 🌗 {name}は熟しきったトマトを見つめて、そっと言う。「いつか君が離れても、今の姿を私は覚えているから。」 | 🌗 {name}는 푹 익은 토마토를 바라보며 조용히 말한다. "언젠가 네가 떠나도, 나는 지금 이 모습을 기억할게." |
| 51 | 🚧 {name}一把抓住要滚开的番茄，声线压低：「我没说你能走，乖乖待在我手心里。」 | 🚧 {name} grabs the tomato as it starts to roll away, lowering its voice: "I didn’t say you could leave. Stay put in my palm." | 🚧 {name}は転がり出そうなトマトをさっと掴み、声を低くする。「行っていいなんて言ってないよ。おとなしく私の手のひらにいて。」 | 🚧 {name}는 굴러가려는 토마토를 얼른 붙잡고 목소리를 낮춘다. "가도 된다고 안 했어. 얌전히 내 손바닥에 있어." |
| 52 | ✊ {name}把番茄按在墙边：「你说过要一直陪着我的，想反悔？门都没有。」 | ✊ {name} pins the tomato against the wall: "You said you’d stay with me forever — backing out? Not a chance." | ✊ {name}はトマトを壁際に押さえる。「ずっと一緒にいるって言ったよね。なかったことに？ そうはいかないよ。」 | ✊ {name}는 토마토를 벽 쪽에 밀어 붙인다. "계속 함께 있겠다고 했잖아. 무르려고? 안 돼." |
| 53 | 🌹 {name}捧着番茄半跪下来：「从见到你那一刻起，我就认定了。你同意也得同意，不同意也得同意。」 | 🌹 {name} cradles the tomato and kneels on one knee: "From the moment I saw you, I knew. Agree or don’t — you’re agreeing anyway." | 🌹 {name}はトマトを捧げ持ち、片膝をつく。「君を見たその瞬間から、もう決まってたんだよ。賛成でも賛成じゃなくても、賛成してもらうからね。」 | 🌹 {name}는 토마토를 받쳐 들고 한쪽 무릎을 꿇는다. "너를 본 그 순간부터 정해져 있었어. 동의해도, 동의하지 않아도, 동의하는 거야." |
| 54 | 😤 {name}挡住去路，耳尖发红：「再看别的月巴一眼试试？可恶的番茄。」 | 😤 {name} blocks the way, ears reddening: "Just try looking at another Banny. You awful tomato." | 😤 {name}は行く手をふさぎ、耳の先を赤くする。「他のバニーを一目でも見てみなさいよ。この、憎いトマト。」 | 😤 {name}는 길을 막고 귀끝을 붉힌다. "다른 버니를 한 번 쳐다봐 봐. 이 밉살스러운 토마토." |
| 55 | 💍 {name}把番茄轻轻套进花环里：「这回，你可跑不掉了。」 | 💍 {name} slips the tomato gently into a flower wreath: "This time, you’re not getting away." | 💍 {name}はトマトをそっと花輪にはめる。「今度こそ、もう逃げられないよ。」 | 💍 {name}는 토마토를 살며시 꽃 고리에 끼운다. "이번엔 못 도망가." |
| 56 | 🥀 {name}拦住想跑的番茄咬牙切齿：「我等了你整整一夜，你倒好，在被窝睡着了？」 | 🥀 {name} stops the tomato that wants to run, grinding its teeth: "I waited for you the whole night — and you went and fell asleep in bed?" | 🥀 {name}は逃げようとするトマトを引き止め、歯ぎしりする。「一晩じゅう待ってたのに、君は布団で寝てたの？」 | 🥀 {name}는 도망가려는 토마토를 막고 이를 간다. "밤새 기다렸는데, 너는 이불 속에서 잠들었어?" |
| 57 | 🫀 {name}把番茄举到和自己平齐，呼吸微乱：「你说乱掉的心跳是番茄的，还是我的？」 | 🫀 {name} lifts the tomato level with itself, breathing a little uneven: "This out-of-rhythm heartbeat — is it the tomato’s, or mine?" | 🫀 {name}はトマトを自分と同じ高さに持ち上げ、呼吸を少し乱す。「乱れてる鼓動は、トマトのもの？ それとも私の？」 | 🫀 {name}는 토마토를 자기와 같은 높이로 들어 올리고 숨을 조금 가쁘게 쉰다. "흐트러진 심장 박동, 토마토 거야, 내 거야?" |
| 58 | 🐍 {name}捏着番茄凉凉一笑：「昨晚是谁抱着我说要和我看一辈子的月亮？」 | 🐍 {name} holds the tomato and smiles coldly: "Who was it that held me last night and said we’d watch the moon for a lifetime?" | 🐍 {name}はトマトを掴んで冷たく笑う。「昨夜、私を抱きしめて一生の月を見ようって言ったのは誰だったっけ？」 | 🐍 {name}는 토마토를 쥐고 서늘하게 웃는다. "어젯밤 나를 안고 평생 달을 보자고 한 건 누구였지?" |
| 59 | 🏹 {name}把番茄抵在胸前：「说好要一直在一起的。」 | 🏹 {name} presses the tomato to its chest: "We agreed we’d always be together." | 🏹 {name}はトマトを胸に当てる。「ずっと一緒にいるって約束したよね。」 | 🏹 {name}는 토마토를 가슴에 댄다. "계속 함께 있기로 했잖아." |
| 60 | ⛓️ {name}用一根藤蔓轻轻挽住番茄：「你的活动范围只有这么远哦。」 | ⛓️ {name} loops a vine gently around the tomato: "Your range of movement is exactly this far." | ⛓️ {name}は蔓を一本、そっとトマトに絡める。「君の行動範囲はここまでだよ。」 | ⛓️ {name}는 덩굴 하나를 살며시 토마토에 감는다. "네 활동 범위는 여기까지야." |
| 61 | 🤝 {name}攥住番茄苗：「再给你一次机会，重新说。」 | 🤝 {name} grips the tomato sprout: "I’ll give you one more chance. Say it again." | 🤝 {name}はトマトの苗を握る。「もう一度だけチャンスをあげる。言い直して。」 | 🤝 {name}는 토마토 모종을 움켜쥔다. "한 번만 더 기회를 줄게. 다시 말해." |
| 62 | 🖤 {name}望着番茄：「吓死我了，差点把你弄丢了。」 | 🖤 {name} gazes at the tomato: "You scared me — I almost lost you." | 🖤 {name}はトマトを見つめる。「びっくりしたよ、もう少しで君を失くすところだった。」 | 🖤 {name}는 토마토를 바라본다. "깜짝 놀랐어, 하마터면 너를 잃을 뻔했어." |
| 63 | 🥀 {name}把番茄护在身后：「外头那帮月巴想拐走你，还好都被我解决掉了。」 | 🥀 {name} shields the tomato behind itself: "Those Bannies outside wanted to carry you off — good thing I dealt with them all." | 🥀 {name}はトマトを後ろに庇う。「外のバニーたちが君を連れ去ろうとしてたけど、全部片づけておいたよ。」 | 🥀 {name}는 토마토를 등 뒤로 감싼다. "바깥 버니들이 너를 데려가려 했지만, 다 해결해 뒀어." |
| 64 | 🫣 {name}偏过头不敢看，却把番茄攥得更紧：「就……就在我身边，哪儿也别去。」 | 🫣 {name} turns its head away, unable to look, yet grips the tomato tighter: "Just... just stay beside me. Don’t go anywhere." | 🫣 {name}は顔を背けて見られないくせに、トマトをぎゅっと握る。「た……ただ、私のそばにいて。どこにも行かないで。」 | 🫣 {name}는 고개를 돌려 보지 못하면서도 토마토를 더 꼭 쥔다. "그…… 그냥 내 곁에 있어. 아무 데도 가지 마." |
| 65 | 🔪 {name}晃了晃刻着番茄名字的小石头：「你看，石头上刻的字可以保存千年万年哦。」 | 🔪 {name} shakes a small stone carved with the tomato’s name: "Look — words carved in stone can last for thousands of years." | 🔪 {name}はトマトの名が刻まれた小石を揺らす。「ほら、石に刻んだ字は千年も万年も残るんだよ。」 | 🔪 {name}는 토마토의 이름이 새겨진 작은 돌을 흔든다. "봐, 돌에 새긴 글자는 천 년 만 년 남아." |
| 66 | 🌩️ {name}一把拽回番茄，语气凶巴巴：「下次再敢自己跑远，我就……就只好抱得更紧些了。」 | 🌩️ {name} yanks the tomato back, voice fierce: "If you ever run off on your own again, I’ll... I’ll just have to hold you tighter." | 🌩️ {name}はトマトをぐいっと引き戻し、乱暴な口調で。「次また勝手に遠くへ行ったら、私は……もっと強く抱きしめるしかないからね。」 | 🌩️ {name}는 토마토를 확 끌어당기고 험한 말투로. "다음에 또 멋대로 멀리 가면, 나는…… 더 꼭 안을 수밖에 없어." |
| 67 | 💬 {name}把番茄泡在牛奶里：「今天要狠狠惩罚你。」 | 💬 {name} soaks the tomato in milk: "Today you’re getting a thorough punishment." | 💬 {name}はトマトを牛乳に浸す。「今日はこってりお仕置きしてあげる。」 | 💬 {name}는 토마토를 우유에 담근다. "오늘은 제대로 벌 줄 거야." |
| 68 | ✒️ {name}在番茄上轻轻画了个小花：「为什么番茄总是这么笨呢。」 | ✒️ {name} draws a little flower gently on the tomato: "Why is the tomato always so silly?" | ✒️ {name}はトマトに小花をそっと描く。「どうしてトマトはいつもこんなに鈍いんだろうね。」 | ✒️ {name}는 토마토 위에 작은 꽃을 살며시 그린다. "왜 토마토는 항상 이렇게 둔한 걸까." |
| 69 | 🫀 {name}抱住睡着的番茄也闭上眼：「你没有说不，就当你答应啦。」 | 🫀 {name} holds the sleeping tomato and closes its eyes too: "You didn’t say no, so I’ll take it as a yes." | 🫀 {name}は眠っているトマトを抱き、自分も目を閉じる。「嫌って言わなかったから、承諾したってことにしちゃうね。」 | 🫀 {name}는 잠든 토마토를 안고 자기도 눈을 감는다. "싫다고 안 했으니, 승낙한 걸로 할게." |
| 70 | 🧂 {name}把熟透的番茄放回原处，故作轻松：「接下来不需要我的话，我可以离开……你的意思是要我留下吗？谢谢你。」 | 🧂 {name} puts the fully ripe tomato back and pretends to be casual: "If you don’t need me from here on, I can leave... You mean you want me to stay? Thank you." | 🧂 {name}は熟しきったトマトを元の場所に戻し、平気なふりをする。「この先、私がいらないなら、離れてもいいよ……え、私にいてほしいの？ ありがとう。」 | 🧂 {name}는 푹 익은 토마토를 제자리에 돌려놓고 아무렇지 않은 척한다. "앞으로 내가 필요 없다면, 나는 떠나도 돼…… 내가 있어 주길 바라는 거야? 고마워." |
| 71 | 🌫️ {name}看着番茄的背影：「你会选择我吗？」 | 🌫️ {name} watches the tomato’s back: "Will you choose me?" | 🌫️ {name}はトマトの後ろ姿を見つめる。「君は私を選んでくれる？」 | 🌫️ {name}는 토마토의 뒷모습을 바라본다. "너는 나를 선택할 거야?" |
| 72 | 🥀 {name}把最后一只番茄护在怀里笑得发苦：「我只是想保护你而已……」 | 🥀 {name} shelters the last tomato in its arms and smiles bitterly: "I only wanted to protect you..." | 🥀 {name}は最後のトマトを胸に守り、苦い笑みを浮かべる。「私はただ、君を守りたかっただけなのに……」 | 🥀 {name}는 마지막 토마토를 품에 감싸고 쓴웃음을 짓는다. "나는 그냥 너를 지키고 싶었을 뿐인데……" |
| 73 | 🕯️ {name}坐在番茄身边：「能陪我度过最后的冬日吗？」 | 🕯️ {name} sits beside the tomato: "Will you stay with me through the last winter?" | 🕯️ {name}はトマトのそばに座る。「最後の冬を、一緒に過ごしてくれる？」 | 🕯️ {name}는 토마토 옆에 앉는다. "마지막 겨울을 함께 보내 줄래?" |
| 74 | ♻️ {name}手忙脚乱地想把蔫了的番茄救回来：「再给我一次机会好不好？这次我一定好好养你。」 | ♻️ {name} fumbles frantically to revive the wilted tomato: "Give me one more chance, please? This time I’ll take proper care of you." | ♻️ {name}はしおれたトマトを救おうと慌てふためく。「もう一度だけチャンスをくれない？ 今度こそ、ちゃんと育てるから。」 | ♻️ {name}는 시든 토마토를 되살리려 허둥댄다. "한 번만 더 기회를 주면 안 돼? 이번엔 정말 잘 키울게." |
| 75 | 🌨️ {name}在雪里抱着冰凉的番茄发抖：「你说过要一起看燕子飞回来的。」 | 🌨️ {name} shivers in the snow, holding the cold tomato: "You said we’d watch the swallows come back together." | 🌨️ {name}は雪の中で冷えたトマトを抱えて震える。「一緒にツバメの帰りを待つって言ったよね。」 | 🌨️ {name}는 눈 속에서 차가워진 토마토를 안고 떤다. "제비가 돌아오는 걸 같이 보자고 했잖아." |
| 76 | 🫧 {name}轻轻揪着番茄苗：「本想说留你到熟透为止，看来还是我先退场比较合适。」 | 🫧 {name} tugs lightly at the tomato sprout: "I meant to keep you until you were fully ripe — but it seems I’m the one who should step off first." | 🫧 {name}はトマトの苗をそっと摘まむ。「熟しきるまで君を置いておくつもりだったけど、どうやら先に私が退場する方がよさそうだね。」 | 🫧 {name}는 토마토 모종을 살며시 집는다. "푹 익을 때까지 너를 두려 했는데, 아무래도 내가 먼저 퇴장하는 편이 낫겠어." |
| 77 | 🍂 {name}拾起一片黄叶盖在这只红番茄上：「春来秋往，我不会忘记和你相处的每一天。」 | 🍂 {name} picks up a yellowed leaf and lays it over the red tomato: "Springs come, autumns go — I won’t forget a single day with you." | 🍂 {name}は黄葉を一枚拾って、この赤いトマトに掛ける。「春が来て秋が去っても、君と過ごした一日一日を忘れないよ。」 | 🍂 {name}는 누런 잎을 하나 주워 이 붉은 토마토 위에 덮는다. "봄이 오고 가을이 가도, 너와 보낸 하루하루를 잊지 않을게." |
| 78 | 🩸 {name}用指尖碰了碰番茄渗出的汁水：「番茄真的好可爱啊。」 | 🩸 {name} touches the juice seeping from the tomato with a fingertip: "The tomato really is adorable." | 🩸 {name}は指先でトマトの滲む汁に触れる。「トマトって、本当にかわいいなあ。」 | 🩸 {name}는 손끝으로 토마토에서 배어 나온 즙을 만진다. "토마토는 정말 귀엽구나." |
| 79 | 🖤 {name}把受伤的番茄小心捧在手里：「你要再多重视自己一点……」 | 🖤 {name} cradles the injured tomato carefully in its hands: "You need to value yourself a little more..." | 🖤 {name}は傷ついたトマトを大事に両手で捧げる。「もっと自分を大事にしてよ……」 | 🖤 {name}는 다친 토마토를 조심스레 두 손에 받친다. "너는 자신을 좀 더 아껴야 해……" |
| 80 | 🥀 {name}望着远走的番茄轻叹：「去吧，我这边没什么值得你回头。」 | 🥀 {name} sighs as the tomato walks away: "Go on. There’s nothing here worth you looking back for." | 🥀 {name}は遠ざかるトマトを見つめて小さくため息をつく。「行って。私のところには、君が振り返る価値なんて何もないから。」 | 🥀 {name}는 멀어지는 토마토를 바라보며 가볍게 한숨 쉰다. "가. 내 쪽에는 네가 돌아볼 만한 게 아무것도 없어." |
| 81 | 🍵 {name}把不敢吃的番茄放凉，对影子自嘲：「原来我等了一季，等的只是自己的一场过期妄想。」 | 🍵 {name} lets the tomato it dares not eat go cold and mocks its own shadow: "So I waited a whole season — for nothing but my own expired delusion." | 🍵 {name}は食べられないトマトを冷まして、影に向かって自嘲する。「なんだ、一季待ったのは、自分の賞味期限切れの妄想のためだったのか。」 | 🍵 {name}는 차마 먹지 못한 토마토를 식히며 그림자에게 자조한다. "그렇구나, 한 철을 기다린 건 그저 내 유통기한 지난 망상 때문이었어." |
| 82 | ⏳ {name}守在熟过头的番茄旁：「到底是吃还是不吃呢？」 | ⏳ {name} keeps watch beside the overripe tomato: "So — eat it, or not?" | ⏳ {name}は熟しすぎたトマトのそばで見守る。「いったい、食べるべきか、食べざるべきか。」 | ⏳ {name}는 너무 익은 토마토 곁을 지키며. "대체 먹을까, 말까." |
| 83 | 💌 {name}在番茄上偷偷写了字又擦掉：「那些没敢说出口的话，就烂在我心里吧。」 | 💌 {name} secretly writes words on the tomato, then rubs them out: "The things I never dared to say — let them rot inside me." | 💌 {name}はトマトにこっそり字を書いては消す。「言い出せなかった言葉は、私の心の中で腐っていけばいい。」 | 💌 {name}는 토마토에 몰래 글씨를 썼다가 지운다. "차마 말하지 못한 말은 내 마음속에서 썩어 가면 돼." |
| 84 | 🌑 {name}对上番茄眼睛：「你说初恋的颜色，是不是火红的？」 | 🌑 {name} meets the tomato’s eyes: "Would you say the colour of first love is a fiery red?" | 🌑 {name}はトマトと目が合う。「初恋の色って、真っ赤なんだと思う？」 | 🌑 {name}는 토마토와 눈이 마주친다. "첫사랑의 색은, 새빨간 걸까?" |
| 85 | 🗝️ {name}把褪色的番茄照片放到墙角落灰：「我当然已经忘记了你。」 | 🗝️ {name} puts a faded photograph of the tomato in the corner to gather dust: "Of course I’ve already forgotten you." | 🗝️ {name}は色あせたトマトの写真を壁の隅に置いて埃をかぶせる。「もちろん、君のことなんてとっくに忘れてるよ。」 | 🗝️ {name}는 빛바랜 토마토 사진을 벽 구석에 두어 먼지가 쌓이게 한다. "물론, 너를 이미 잊었어." |
| 86 | 🕯️ {name}隔着光似乎看到了番茄的身影：「剩这点余温，也够我撑到春天了。」 | 🕯️ {name} seems to see the tomato’s figure through the light: "This little leftover warmth is enough to carry me to spring." | 🕯️ {name}は光の向こうにトマトの姿が見えた気がする。「この残り火みたいな温もりでも、春まで持たせられるよ。」 | 🕯️ {name}는 빛 너머로 토마토의 모습이 보이는 듯하다. "이 남은 온기만으로도 봄까지 버틸 수 있어." |
| 87 | 🍒 {name}把番茄举到耳边，尾音低低：「这样我们就永远永远在一起了哦？」 | 🍒 {name} holds the tomato to its ear, voice trailing low: "Now we’ll be together forever and ever, right?" | 🍒 {name}はトマトを耳元に持ち上げ、語尾を低く落とす。「これで私たち、ずっとずっと一緒だね？」 | 🍒 {name}는 토마토를 귀에 대고 끝음을 낮춘다. "이제 우리 영원히영원히 함께야, 그렇지?" |
| 88 | 🥂 {name}轻轻抵着番茄微笑：「是等着被谁一口吃掉吗……还是让我来吃掉讨厌的番茄吧。」 | 🥂 {name} leans gently against the tomato and smiles: "Are you waiting for someone to eat you up in one bite... or shall I eat this infuriating tomato myself?" | 🥂 {name}はトマトにそっと寄りかかって微笑む。「誰かに一口で食べられるのを待ってるの……それとも、嫌いなトマトは私が食べてあげようか。」 | 🥂 {name}는 토마토에 살며시 기대어 미소 짓는다. "누군가에게 한 입에 먹히기를 기다리는 거야…… 아니면 이 밉살스러운 토마토는 내가 먹어 줄까." |
| 89 | 一只月巴 | a Banny | あるバニー | 어떤 버니 |
| 90 | 另一只月巴 | another Banny | もう一匹のバニー | 또 다른 버니 |
| 91 | {n}在篱笆边挖了一个小坑，好像在藏宝贝。 | {n} digs a small hole by the fence, apparently hiding a treasure. | {n}は垣根のそばに小さな穴を掘って、宝物でも隠すみたい。 | {n}는 울타리 옆에 작은 구덩이를 파고, 보물이라도 숨기는 것 같다. |
| 92 | {n}追着一只蝴蝶跑了一圈又一圈，气喘吁吁。 | {n} chases a butterfly round and round, panting for breath. | {n}はチョウを追って何度も何度も走り回り、息を切らしている。 | {n}는 나비를 쫓아 몇 바퀴나 뛰고는 숨을 헐떡인다. |
| 93 | {n}和{a}为最后一颗番茄猜拳，谁也不让谁。 | {n} and {a} play rock-paper-scissors over the last tomato, neither giving way. | {n}と{a}は最後のトマトをめぐってじゃんけんをし、どちらも譲らない。 | {n}와 {a}는 마지막 토마토를 두고 가위바위보를 하는데, 누구도 양보하지 않는다. |
| 94 | 一阵风吹过，{n}的帽子被吹到了树枝上。 | A gust of wind blows {n}’s hat up onto a branch. | 一陣の風が吹き、{n}の帽子が枝の上まで飛ばされた。 | 바람이 한 줄기 불더니 {n}의 모자가 나뭇가지 위로 날아갔다. |
| 95 | {n}蹲在番茄田边，认真地数着果子。 | {n} squats by the tomato patch, seriously counting the fruit. | {n}はトマト畑のそばにしゃがんで、真剣に実を数えている。 | {n}는 토마토 밭 옆에 쪼그려 앉아 진지하게 열매를 센다. |
| 96 | {a}把{b}埋进了落叶堆里，只露出两只眼睛。 | {a} buries {b} in a pile of fallen leaves, leaving only two eyes showing. | {a}は{b}を落ち葉の山に埋めて、目だけを出している。 | {a}는 {b}를 낙엽 더미에 묻고 두 눈만 내놓았다. |
| 97 | {n}用叶子卷了个喇叭，吹出呜呜的声音。 | {n} rolls a leaf into a horn and blows a low hooting sound. | {n}は葉っぱを巻いてラッパを作り、ブーブーと鳴らす。 | {n}는 잎을 말아 나팔을 만들고 부우부우 소리를 낸다. |
| 98 | {n}在泥巴里打了个滚，现在灰扑扑的。 | {n} rolls around in the mud and is now covered in dust. | {n}は泥の中で転げ回り、今はすっかり土まみれだ。 | {n}는 진흙 속에서 뒹굴고는 지금 먼지투성이가 되었다. |
| 99 | {a}和{b}一起抬着一根小树枝，像在为番茄搬家。 | {a} and {b} carry a little twig together, as if moving house for a tomato. | {a}と{b}は小さな枝を一緒に運んでいて、トマトの引っ越しでも手伝うみたい。 | {a}와 {b}는 작은 나뭇가지를 함께 들고, 토마토 이사를 돕는 것 같다. |
| 100 | {n}对着天空大喊，喊完假装害羞地捂住了嘴。 | {n} shouts at the sky, then covers its mouth pretending to be shy. | {n}は空に向かって大声を上げ、終わると照れたふりをして口を押さえる。 | {n}는 하늘을 향해 크게 외치고는, 쑥스러운 척 입을 가린다. |
| 101 | 篱笆下传来沙沙声，{n}探头看了看又缩了回去。 | Something rustles under the fence; {n} peeks out, then ducks back. | 垣根の下からさらさらと音がして、{n}は顔を出して見たあと、また引っ込んだ。 | 울타리 아래에서 사각사각 소리가 나자, {n}는 고개를 내밀어 보다가 다시 움츠렸다. |
| 102 | {n}把石头排成一排，说是给小番茄修的桥。 | {n} lines up stones in a row, calling it a bridge for the little tomato. | {n}は石を一列に並べて、小さなトマトのための橋だと言う。 | {n}는 돌을 한 줄로 늘어놓고 작은 토마토를 위한 다리라고 한다. |
| 103 | {n}接住了一颗番茄，高兴得转圈。 | {n} catches a tomato and spins around with delight. | {n}はトマトを受け止めて、うれしくてくるくる回る。 | {n}는 토마토를 받아내고 기뻐서 빙글빙글 돈다. |
| 104 | {a}偷偷往{b}的水杯里加了点泻药。 | {a} secretly slips a little laxative into {b}’s water cup. | {a}はこっそり{b}のコップに下剤を少し入れた。 | {a}는 몰래 {b}의 물컵에 설사약을 조금 넣었다. |
| 105 | {n}在树荫下铺了块小手帕，准备野餐。 | {n} spreads a little handkerchief in the shade, preparing a picnic. | {n}は木陰に小さなハンカチを敷いて、ピクニックの準備をする。 | {n}는 나무 그늘에 작은 손수건을 펴고 소풍을 준비한다. |
| 106 | {n}学着大月巴的样子浇花，结果浇到自己头上。 | {n} copies the grown-up Banny and waters the flowers — and ends up pouring it over its own head. | {n}は大きいバニーのまねをして花に水をやり、あげく自分の頭にかけてしまった。 | {n}는 어른 버니를 따라 꽃에 물을 주다가, 결국 자기 머리에 쏟고 말았다. |
| 107 | 菜地里有个番茄长大了，{n}围着它转了三圈。 | A tomato in the vegetable patch has grown; {n} circles it three times. | 菜園でトマトが一つ大きくなり、{n}はその周りを三回まわった。 | 텃밭에서 토마토 하나가 자랐고, {n}는 그 주위를 세 바퀴 돌았다. |
| 108 | {n}捡到一片枫叶，觉得番茄一定会喜欢，夹进了随身的小本子。 | {n} picks up a maple leaf, decides the tomato will surely like it, and tucks it into its little notebook. | {n}は紅葉を一枚拾い、トマトがきっと気に入ると思って、持ち歩きの小帳に挟んだ。 | {n}는 단풍잎을 하나 주워 토마토가 분명 좋아할 거라며, 들고 다니는 작은 수첩에 끼워 넣었다. |
| 109 | {a}教{b}编了个花环，番茄戴上去有点歪。 | {a} teaches {b} to weave a flower wreath; on the tomato it sits a little crooked. | {a}は{b}に花輪の編み方を教え、トマトがかぶると少し傾いた。 | {a}는 {b}에게 꽃 고리 엮는 법을 가르쳤고, 토마토가 쓰니 조금 비뚤어졌다. |
| 110 | {n}打了个大大的哈欠，又打起精神继续玩番茄。 | {n} gives a big yawn, then perks up and goes back to playing with the tomato. | {n}は大きなあくびをして、また気合を入れ直してトマトで遊び続ける。 | {n}는 크게 하품을 하고는 다시 기운을 내어 토마토를 가지고 논다. |
| 111 | {n}在院墙根画了一幅涂鸦，签上了自己和番茄的名字。 | {n} draws a doodle at the base of the garden wall and signs both its own name and the tomato’s. | {n}は庭の塀の根元にらくがきを描き、自分の名とトマトの名を書き添えた。 | {n}는 마당 담벼락 아래에 낙서를 그리고, 자기 이름과 토마토 이름을 서명했다. |
| 112 | {n}把蒲公英吹得满天飞，又追着跑。 | {n} blows dandelion seeds all over the sky, then chases after them. | {n}はタンポポを吹いて空いっぱいに飛ばし、また追いかけて走る。 | {n}는 민들레를 불어 하늘 가득 날리고는 다시 쫓아 달린다. |
| 113 | {a}和{b}在比赛跳远，{a}输了不服气。 | {a} and {b} have a long-jump contest, and {a} loses and refuses to accept it. | {a}と{b}は走り幅跳びで競い、{a}は負けて納得がいかない。 | {a}와 {b}는 멀리뛰기 시합을 했고, {a}는 져서 억울해한다. |
| 114 | {n}搬来一块小石头，说是要建一个番茄城堡的地基。 | {n} hauls over a small stone, saying it’s the foundation for a tomato castle. | {n}は小さな石を運んできて、トマト城の土台にするんだと言う。 | {n}는 작은 돌을 날라 와서 토마토 성의 기초로 쓰겠다고 한다. |
| 115 | {n}藏在灌木丛后，等着给{a}一个惊吓。 | {n} hides behind the bushes, waiting to startle {a}. | {n}は茂みの後ろに隠れて、{a}をびっくりさせるのを待っている。 | {n}는 덤불 뒤에 숨어 {a}를 놀라게 하려고 기다린다. |
| 116 | 一阵雨停后，{n}在积水边照起了镜子。 | After the rain stops, {n} uses a puddle as a mirror. | 雨がやんだあと、{n}は水たまりで身だしなみを整え始めた。 | 비가 그친 뒤 {n}는 물웅덩이에 비친 자신을 들여다본다. |
| 117 | {n}用小木棍拨弄泥土，挖出了一条蚯蚓。 | {n} pokes at the soil with a little stick and digs up an earthworm. | {n}は小さな木の棒で土をつついて、ミミズを一匹掘り出した。 | {n}는 작은 나무 막대로 흙을 헤집다가 지렁이 한 마리를 캐냈다. |
| 118 | {a}把{b}推上了秋千，越荡越高，然后飞了出去。 | {a} pushes {b} on the swing, higher and higher — and then {b} goes flying. | {a}は{b}をブランコに押し上げ、どんどん高くしたら、飛んでいってしまった。 | {a}는 {b}를 그네에 태워 점점 높이 밀었고, 결국 {b}는 날아가 버렸다. |
| 119 | {n}对着番茄的方向挥挥手，说了声晚安。 | {n} waves towards the tomato and says goodnight. | {n}はトマトの方へ手を振って、おやすみと言った。 | {n}는 토마토 쪽으로 손을 흔들며 잘 자라고 말했다. |
| 120 | {n}在石阶上睡着了，怀里还抱着颗小番茄。 | {n} falls asleep on the stone steps, still hugging a little tomato. | {n}は石段で眠ってしまい、胸には小さなトマトを抱えたままだ。 | {n}는 돌계단에서 잠들었고, 품에는 작은 토마토를 안고 있다. |
| 121 | {n}发现了一只番茄，尾随了它一路。 | {n} spots a tomato and follows it the whole way. | {n}はトマトを一匹見つけて、ずっと後をつけていった。 | {n}는 토마토 하나를 발견하고 죽 따라갔다. |
| 122 | {a}和{b}用花瓣拼了一幅番茄的画，真好看。 | {a} and {b} arrange petals into a picture of a tomato — quite lovely. | {a}と{b}は花びらでトマトの絵を描いた。なかなかきれいだ。 | {a}와 {b}는 꽃잎으로 토마토 그림을 만들었다. 참 예쁘다. |
| 123 | {n}在晾衣绳下钻来钻去，玩起了躲猫猫。 | {n} weaves back and forth under the clothesline, playing hide-and-seek. | {n}は物干しロープの下をくぐり抜けて、かくれんぼを始めた。 | {n}는 빨랫줄 아래를 이리저리 지나며 숨바꼭질을 한다. |
| 124 | {n}把番茄种子撒进土里，认真做了个记号。 | {n} sows tomato seeds into the soil and carefully marks the spot. | {n}はトマトの種を土にまいて、真剣に印をつけた。 | {n}는 토마토 씨앗을 흙에 뿌리고 진지하게 표시를 해 두었다. |
| 125 | 菜园的稻草人歪了，{n}努力把它扶正。 | The scarecrow in the vegetable garden has tipped; {n} tries hard to set it upright. | 菜園のかかしが傾き、{n}は一生懸命まっすぐに直そうとする。 | 텃밭의 허수아비가 기울자, {n}는 애써 바로 세우려 한다. |
| 126 | {n}围着一棵大树转圈，数着年轮。 | {n} circles a big tree, counting its growth rings. | {n}は大きな木の周りを回りながら、年輪を数えている。 | {n}는 큰 나무 주위를 돌며 나이테를 센다. |
| 127 | {a}把{b}带出门，说要一起看番茄。 | {a} takes {b} outside, saying they’ll go look at the tomatoes together. | {a}は{b}を外へ連れ出し、一緒にトマトを見に行くと言う。 | {a}는 {b}를 밖으로 데리고 나가 함께 토마토를 보러 가자고 한다. |
| 128 | {n}用草茎编了小戒指，但对番茄来说大了点。 | {n} weaves a little ring from a grass stalk, but it’s a bit big for the tomato. | {n}は草の茎で小さな指輪を編んだが、トマトには少し大きかった。 | {n}는 풀줄기로 작은 반지를 엮었지만, 토마토에게는 조금 컸다. |
| 129 | {n}在井边打水，桶太沉了只好放弃。 | {n} draws water at the well, but the bucket is too heavy and it has to give up. | {n}は井戸のそばで水をくもうとしたが、桶が重すぎて諦めた。 | {n}는 우물가에서 물을 길으려 했지만, 양동이가 너무 무거워 포기했다. |
| 130 | {n}捡起一片落叶，在风里当风筝放。 | {n} picks up a fallen leaf and flies it like a kite in the wind. | {n}は落ち葉を一枚拾い、風の中で凧みたいに飛ばす。 | {n}는 낙엽을 하나 주워 바람 속에서 연처럼 날린다. |
| 131 | {n}和{a}挤在一把小伞下躲雨。 | {n} and {a} squeeze together under one small umbrella, sheltering from the rain. | {n}と{a}は小さな傘の下に詰め込まれて雨宿りする。 | {n}와 {a}는 작은 우산 하나 아래 옹기종기 비를 피한다. |
| 132 | {n}把小番茄放在手心，小心翼翼地呵护。 | {n} sets the little tomato in its palm and tends it carefully. | {n}は小さなトマトを手のひらに載せ、大事に大事に守る。 | {n}는 작은 토마토를 손바닥에 올리고 조심조심 보살핀다. |
| 133 | {a}偷走了{n}的小番茄，等着{n}发现。 | {a} steals {n}’s little tomato and waits for {n} to notice. | {a}は{n}の小さなトマトを盗み、{n}が気づくのを待っている。 | {a}는 {n}의 작은 토마토를 훔치고, {n}가 알아채기를 기다린다. |
| 134 | {n}用树枝在地上写写画画，像在练字。 | {n} scribbles on the ground with a twig, as if practising handwriting. | {n}は木の枝で地面に書きなぐり、字の練習でもしているようだ。 | {n}는 나뭇가지로 땅에 끄적이며 글씨 연습을 하는 것 같다. |
| 135 | {n}堆了个小雪人，可惜阳光太暖化了。 | {n} builds a little snowman, but the warm sun melts it. | {n}は小さな雪だるまを作ったが、日差しが暖かくて溶けてしまった。 | {n}는 작은 눈사람을 만들었지만, 햇살이 따뜻해 녹아 버렸다. |
| 136 | {n}把野花编进辫子里，美滋滋地摇头晃脑。 | {n} weaves wildflowers into its braid and sways its head happily. | {n}は野花を三つ編みに編み込み、ごきげんに首を振る。 | {n}는 들꽃을 땋은 머리에 엮고 신나서 고개를 흔든다. |
| 137 | {a}和{b}蹲在一起研究番茄生长，看了很久。 | {a} and {b} squat together studying how tomatoes grow, watching for a long while. | {a}と{b}は一緒にしゃがんでトマトの育ち方を研究し、長いこと見ていた。 | {a}와 {b}는 나란히 쪼그려 앉아 토마토가 자라는 걸 연구하며 한참을 들여다봤다. |
| 138 | {n}偷走了一颗番茄，准备自己吃。 | {n} steals a tomato, planning to eat it alone. | {n}はトマトを一つ盗み、自分で食べるつもりだ。 | {n}는 토마토 하나를 훔쳐 혼자 먹을 생각이다. |
| 139 | {n}在树下捡橡果，口袋里装得鼓鼓囊囊。 | {n} gathers acorns under the tree until its pockets bulge. | {n}は木の下でどんぐりを拾い、ポケットがぱんぱんになった。 | {n}는 나무 아래에서 도토리를 주워 주머니가 불룩해졌다. |
| 140 | {n}对着井口喊话，想知道下面有没有番茄。 | {n} shouts down the well, wanting to know if there are tomatoes down there. | {n}は井戸に向かって呼びかけ、下にトマトがないか知りたがる。 | {n}는 우물 입구를 향해 소리치며, 아래에 토마토가 있는지 궁금해한다. |
| 141 | {n}用番茄汁在石头上写字，被风一吹模糊了。 | {n} writes on a stone with tomato juice, and the wind blurs it away. | {n}はトマトの汁で石に字を書いたが、風に吹かれて滲んでしまった。 | {n}는 토마토 즙으로 돌에 글씨를 썼지만, 바람에 번져 버렸다. |
| 142 | {a}教{b}用叶子折小船，折了好几个。 | {a} teaches {b} to fold little boats from leaves — several of them. | {a}は{b}に葉っぱで小舟の折り方を教え、いくつも折った。 | {a}는 {b}에게 잎으로 작은 배 접는 법을 가르쳤고, 여러 개를 접었다. |
| 143 | {n}把窝边的杂草拔得干干净净，一脸骄傲。 | {n} pulls every weed around its nest clean and looks very proud. | {n}は巣の周りの雑草をきれいに抜き、誇らしげな顔をしている。 | {n}는 둥지 주변 잡초를 말끔히 뽑고 아주 뿌듯한 얼굴이다. |
| 144 | {n}在围栏上挂了个小铃铛，风吹过叮当作响。 | {n} hangs a little bell on the fence; the wind sets it ringing. | {n}は柵に小さな鈴を掛け、風が吹くとちりんと鳴る。 | {n}는 울타리에 작은 방울을 달았고, 바람이 불면 딸랑딸랑 울린다. |
| 145 | {n}把吃剩的果核种进土里，说会长出月亮。 | {n} plants the leftover fruit pit in the soil, saying a moon will grow from it. | {n}は食べ残した種を土に植え、月が生えてくるんだと言う。 | {n}는 먹다 남은 씨앗을 흙에 심고 달이 자라날 거라고 한다. |
| 146 | {a}和{b}围着篝火思考怎么料理番茄，最后都决定吃独食。 | {a} and {b} sit by the campfire wondering how to cook the tomato — and in the end both decide to eat it alone. | {a}と{b}は焚き火を囲んでトマトの料理法を考え、最後は二人とも独り占めすることにした。 | {a}와 {b}는 모닥불을 둘러싸고 토마토 요리법을 고민하다가, 결국 둘 다 혼자 먹기로 했다. |
| 147 | {n}把路过的番茄轻轻捧过水洼。 | {n} gently carries a passing tomato over a puddle. | {n}は通りかかったトマトを、そっと水たまりの向こうへ運んだ。 | {n}는 지나가던 토마토를 살며시 물웅덩이 건너로 옮겨 준다. |
| 148 | {n}在树梢挂了个小秋千，番茄坐上去晃悠悠。 | {n} hangs a tiny swing from a treetop; the tomato sits and sways gently. | {n}は木の梢に小さなブランコを掛け、トマトが乗るとゆらゆら揺れる。 | {n}는 나무 끝에 작은 그네를 달았고, 토마토가 타면 흔들흔들 흔들린다. |
| 149 | {n}把石子扔进池塘，数着溅起的圈圈。 | {n} tosses pebbles into the pond, counting the ripples. | {n}は池に小石を投げ、跳ねる波紋を数える。 | {n}는 연못에 조약돌을 던지고 퍼지는 물결을 센다. |
| 150 | {n}吹了个泡泡，泡泡在阳光下五颜六色。 | {n} blows a bubble, and it shimmers in many colours in the sun. | {n}はシャボン玉を吹き、玉は日の光を受けて色とりどりに光る。 | {n}는 비눗방울을 불었고, 방울은 햇빛 아래서 오색으로 빛난다. |
| 151 | {n}在菜畦里发现一只小番茄，和它比赛慢走。 | {n} finds a little tomato in the vegetable rows and races it — at walking slowly. | {n}は畑の畝で小さなトマトを見つけ、ゆっくり歩き比べをする。 | {n}는 밭고랑에서 작은 토마토를 발견하고 느리게 걷기 시합을 한다. |
| 152 | {n}把明天要浇水的日子，用小石子标在了日历上。 | {n} marks tomorrow’s watering day on the calendar with a little stone. | {n}は明日の水やりの日を、小石でカレンダーに印をつけた。 | {n}는 내일 물 주는 날을 작은 돌로 달력에 표시했다. |
| 153 | {a}和{n}并排坐在屋顶上看番茄，谁也不说话。 | {a} and {n} sit side by side on the roof watching the tomatoes, neither saying a word. | {a}と{n}は屋根に並んで座ってトマトを眺め、どちらも口をきかない。 | {a}와 {n}는 지붕에 나란히 앉아 토마토를 바라보며 아무 말도 하지 않는다. |
| 154 | {n}给窗台的番茄换了个更亮的地方。 | {n} moves the windowsill tomato somewhere brighter. | {n}は窓辺のトマトを、もっと明るい場所へ移してあげた。 | {n}는 창가의 토마토를 더 밝은 곳으로 옮겨 주었다. |
| 155 | {n}在院子角落种藏了一颗番茄，眼巴巴等对方说话。 | {n} hides a planted tomato in the garden corner, waiting eagerly for it to speak. | {n}は庭の隅にトマトを植えて隠し、相手がしゃべるのを今か今かと待っている。 | {n}는 마당 구석에 토마토를 심어 숨겨 두고, 상대가 말을 걸어 주기를 애타게 기다린다. |
| 156 | {n}看到了路过的番茄，飞快追过去。 | {n} spots a passing tomato and dashes after it. | {n}は通りかかったトマトを見つけ、すごい勢いで追いかけた。 | {n}는 지나가는 토마토를 보고 빠르게 뒤쫓아간다. |
| 157 | {n}在围墙上画了一道彩虹，彩虹下面是月巴和番茄，颜料还没干。 | {n} paints a rainbow on the garden wall, with a Banny and a tomato beneath it; the paint is still wet. | {n}は塀に虹を描き、その下にはバニーとトマト。絵の具はまだ乾いていない。 | {n}는 담벼락에 무지개를 그렸고, 그 아래에는 버니와 토마토가 있다. 물감은 아직 마르지 않았다. |
| 158 | {n}抱着番茄抱枕在躺椅上晒太阳，舒服得眯眼。 | {n} lies on a deck chair in the sun hugging a tomato cushion, squinting with comfort. | {n}はトマトのクッションを抱えてデッキチェアで日向ぼっこし、心地よくて目を細める。 | {n}는 토마토 쿠션을 안고 접이식 의자에서 볕을 쬐며, 편안해서 눈을 가늘게 뜬다. |
| 159 | {n}追着一颗自己滚动的番茄，边跑边喊让它等等。 | {n} chases a tomato that rolls on its own, shouting for it to wait. | {n}はひとりでに転がるトマトを追いかけ、走りながら待ってと叫ぶ。 | {n}는 저절로 굴러가는 토마토를 쫓으며 달리면서 기다리라고 외친다. |
| 160 | {n}拼了两只小眼睛，贴在栅栏上，说那是番茄的眼睛。 | {n} makes two little eyes and sticks them on the fence, saying those are the tomato’s eyes. | {n}は小さな目を二つ作って柵に貼り、あれはトマトの目だと言う。 | {n}는 작은 눈 두 개를 만들어 울타리에 붙이고, 저건 토마토의 눈이라고 한다. |
| 161 | 傍晚起风，{n}护着一簇番茄苗，怕它们着凉。 | Wind rises at dusk; {n} shelters a cluster of tomato seedlings, afraid they’ll catch cold. | 夕方に風が立ち、{n}はトマトの苗の束を守り、風邪をひかないかと心配する。 | 저녁에 바람이 일자 {n}는 토마토 모종 무리를 감싸 지키며, 감기 걸릴까 걱정한다. |
| 162 | {a}和{b}一人捧一颗番茄，比谁的更可爱。 | {a} and {b} each hold up a tomato, comparing whose is cuter. | {a}と{b}はそれぞれトマトを一つ捧げ持ち、どちらがかわいいか比べる。 | {a}와 {b}는 각자 토마토를 하나씩 들고 누구 게 더 귀여운지 견준다. |
| 163 | {n}把熟透的番茄放进小篮，码得整整齐齐。 | {n} puts the ripe tomatoes into a little basket, stacked neatly. | {n}は熟したトマトを小さな籠に入れ、きちんと並べる。 | {n}는 잘 익은 토마토를 작은 바구니에 담아 가지런히 정리한다. |
| 164 | {n}教番茄苗做早操，说这样会长得更结实。 | {n} teaches the tomato seedlings morning exercises, saying they’ll grow sturdier that way. | {n}はトマトの苗に朝の体操を教え、そうすると丈夫に育つんだと言う。 | {n}는 토마토 모종에게 아침 체조를 가르치며, 그러면 더 튼튼하게 자란다고 한다. |
| 165 | 一滴露珠落在番茄上，{n}看了很久舍不得擦。 | A dewdrop falls on the tomato; {n} gazes at it for a long time, unwilling to wipe it away. | 露が一粒トマトに落ち、{n}は長いこと眺めて、拭き取るのが惜しい。 | 이슬 한 방울이 토마토에 떨어졌고, {n}는 한참을 바라보며 닦아 내기 아쉬워한다. |
| 166 | {n}摘下一颗青番茄，又把它放回去，说再等等它长大。 | {n} picks an unripe tomato, then puts it back, saying they should wait for it to grow. | {n}は青いトマトをもぎ取り、また戻して、もう少し大きくなるまで待とうと言う。 | {n}는 푸른 토마토를 따고는 다시 돌려놓으며, 조금 더 자랄 때까지 기다리자고 한다. |
| 167 | 雨后小水洼映出番茄，{n}以为它掉下去了，伏下身子去捞。 | After the rain a puddle reflects the tomato; {n} thinks it has fallen in and bends down to fish it out. | 雨上がりの水たまりにトマトが映り、{n}は落ちたと思って身をかがめてすくおうとする。 | 비 온 뒤 물웅덩이에 토마토가 비치자, {n}는 빠진 줄 알고 몸을 숙여 건지려 한다. |
| 168 | {n}悄悄把一颗番茄埋回土里，说要让它多睡会儿。 | {n} quietly buries a tomato back in the soil, saying it should sleep a little longer. | {n}はこっそりトマトを一つ土に埋め戻し、もう少し寝かせてあげようと言う。 | {n}는 몰래 토마토 하나를 흙에 다시 묻으며, 조금 더 자게 두자고 한다. |
| 169 | {a}给番茄写了张小纸条，夹在栏杆的缝里。 | {a} writes a little note to the tomato and tucks it into a gap in the railing. | {a}はトマトに小さなメモを書いて、手すりの隙間に挟んだ。 | {a}는 토마토에게 작은 쪽지를 써서 난간 틈에 끼워 두었다. |
| 170 | {n}用一片大叶子给番茄搭了个凉棚，怕它晒昏头。 | {n} builds a shade canopy for the tomato with a big leaf, afraid it’ll get dizzy from the sun. | {n}は大きな葉っぱでトマトに日よけを作り、日射しでくらくらしないかと心配する。 | {n}는 큰 잎으로 토마토에게 그늘 막을 만들어 주며, 볕에 어지러울까 걱정한다. |
| 171 | {n}蹲在田埂上，对着番茄叶子讲了一上午悄悄话。 | {n} squats on the field ridge, whispering to a tomato leaf all morning. | {n}は畦にしゃがんで、トマトの葉に向かって午前じゅう内緒話をしていた。 | {n}는 밭두렁에 쪼그려 앉아 토마토 잎을 향해 오전 내내 속삭였다. |
| 172 | {a}和{b}用番茄排成一条小路，一直通向院门口。 | {a} and {b} line up tomatoes into a little path leading all the way to the gate. | {a}と{b}はトマトを並べて小道を作り、庭の門まで続けた。 | {a}와 {b}는 토마토를 늘어놓아 작은 길을 만들고, 마당 문까지 이어 갔다. |
| 173 | {n}把番茄抱在怀里轻轻摇，像在哄宝宝睡觉。 | {n} cradles the tomato in its arms and rocks it gently, as if soothing a baby to sleep. | {n}はトマトを胸に抱いてそっと揺り、赤ちゃんを寝かしつけるようだ。 | {n}는 토마토를 품에 안고 살며시 흔들며, 아기를 재우는 것 같다. |
| 174 | 一阵风把番茄卷了两个跟头，{n}笑得弯下了腰。 | A gust of wind sends the tomato tumbling twice, and {n} doubles over laughing. | 一陣の風がトマトを二回転させ、{n}は笑いすぎて腰を折る。 | 바람이 토마토를 두 바퀴 굴렸고, {n}는 웃느라 허리를 숙였다. |
| 175 | {n}数着番茄红了几个。 | {n} counts how many tomatoes have turned red. | {n}はトマトがいくつ赤くなったか数えている。 | {n}는 토마토가 몇 개 빨개졌는지 센다. |
| 176 | {a}背着{n}拿走了一颗番茄，{a}举着到手番茄，说要带它去旅行。 | {a} takes a tomato behind {n}’s back and holds it up, saying it will take it travelling. | {a}は{n}に隠れてトマトを一つ持ち出し、手に入れたトマトを掲げて、旅に連れて行くと言う。 | {a}는 {n} 몰래 토마토 하나를 가져가 들고, 여행을 데려가겠다고 한다. |
| 177 | {n}在番茄脸画了个笑脸，番茄看起来也在笑。 | {n} draws a smiley on the tomato’s face, and the tomato looks like it’s smiling too. | {n}はトマトの顔に笑顔を描き、トマトも笑っているように見える。 | {n}는 토마토 얼굴에 웃는 낯을 그렸고, 토마토도 웃는 것처럼 보인다. |
| 178 | 天黑了，{n}把番茄揣进怀里，说担心它怕黑所以带回家。 | Night falls, and {n} tucks the tomato into its coat, saying it was worried it fears the dark, so it’s taking it home. | 日が暮れ、{n}はトマトを懐にしまい、暗いのが怖いだろうから家に連れて帰ると言う。 | 날이 어두워지자 {n}는 토마토를 품에 넣으며, 어둠을 무서워할까 봐 집에 데려간다고 한다. |
| 179 | {n}正数着囤积的番茄，数到一半睡着了 | {n} is counting its hoard of tomatoes and falls asleep halfway through. | {n}は溜め込んだトマトを数えていて、途中で眠ってしまった。 | {n}는 모아 둔 토마토를 세다가 중간에 잠들었다. |
| 180 | {n}在给番茄排队，最大的那颗被摆在最前面 | {n} is lining up the tomatoes, with the biggest one at the very front. | {n}はトマトを並べていて、一番大きいのが先頭に置かれている。 | {n}는 토마토를 줄 세우는 중이고, 가장 큰 것이 맨 앞에 놓여 있다. |
| 181 | {n}偷偷咬了一口番茄，被酸得眯起了眼睛 | {n} sneaks a bite of a tomato and screws up its eyes at the sourness. | {n}はこっそりトマトをかじり、酸っぱさに目を細めた。 | {n}는 몰래 토마토를 한 입 베어 물고, 신맛에 눈을 찡그렸다. |
| 182 | {n}把番茄当皮球滚来滚去，玩得满头汗 | {n} rolls the tomatoes around like balls, working up a sweat. | {n}はトマトをまりのように転がして遊び、汗だくになっている。 | {n}는 토마토를 공처럼 굴리며 놀다가 땀범벅이 되었다. |
| 183 | {n}正小心翼翼地把番茄种进花盆里 | {n} is carefully planting a tomato into a flowerpot. | {n}は慎重にトマトを植木鉢に植えている。 | {n}는 조심스럽게 토마토를 화분에 심고 있다. |
| 184 | {n}守着窗台上的番茄苗，不许任何人靠近 | {n} guards the tomato seedling on the windowsill, letting no one near. | {n}は窓辺のトマトの苗を見張り、誰も近づけさせない。 | {n}는 창가의 토마토 모종을 지키며 아무도 가까이 오지 못하게 한다. |
| 185 | {n}用番茄汁在纸上画画，画完还签了名 | {n} paints on paper with tomato juice, and signs its name when finished. | {n}はトマトの汁で紙に絵を描き、描き終えると署名もした。 | {n}는 토마토 즙으로 종이에 그림을 그리고, 다 그리면 서명도 했다. |
| 186 | {n}正把一个番茄举高高，炫耀它有多红 | {n} holds a tomato up high, showing off how red it is. | {n}はトマトを高く掲げて、どれだけ赤いか自慢している。 | {n}는 토마토를 높이 들어 올려 얼마나 빨간지 자랑한다. |
| 187 | {n}蹲在墙角闻番茄的味道，一脸陶醉 | {n} squats in the corner sniffing the tomato, looking utterly enchanted. | {n}は隅にしゃがんでトマトの匂いをかいで、うっとりしている。 | {n}는 구석에 쪼그려 앉아 토마토 냄새를 맡으며 넋이 나가 있다. |
| 188 | {n}把番茄摆成小太阳的形状，然后满意地点头 | {n} arranges tomatoes into the shape of a little sun, then nods in satisfaction. | {n}はトマトを小さな太陽の形に並べ、満足げにうなずく。 | {n}는 토마토를 작은 태양 모양으로 놓고, 만족스럽게 고개를 끄덕인다. |
| 189 | {n}正偷偷数口袋里藏着的番茄，被发现了会脸红 | {n} secretly counts the tomatoes hidden in its pocket, and blushes if caught. | {n}はポケットに隠したトマトをこっそり数えていて、見つかると顔を赤らめる。 | {n}는 주머니에 숨긴 토마토를 몰래 세고 있고, 들키면 얼굴을 붉힌다. |
| 190 | {n}把一颗番茄藏到枕头底下，说要留着当夜宵 | {n} hides a tomato under its pillow, saying it will save it for a midnight snack. | {n}はトマトを一つ枕の下に隠し、夜食に取っておくと言う。 | {n}는 토마토 하나를 베개 밑에 숨기며 야식으로 남겨 두겠다고 한다. |
| 191 | {n}正拿番茄练习杂技，抛得满天都是 | {n} practises juggling with tomatoes, tossing them all over the air. | {n}はトマトで曲芸の練習をしていて、宙いっぱいに放り上げている。 | {n}는 토마토로 곡예 연습을 하며 하늘 가득 던져 올린다. |
| 192 | {n}和番茄一起午睡，醒来看见番茄少了一颗 | {n} naps with the tomatoes, and wakes to find one missing. | {n}はトマトと一緒に昼寝をし、目を覚ますとトマトが一つ減っていた。 | {n}는 토마토와 함께 낮잠을 잤고, 깨어 보니 토마토가 하나 줄어 있었다. |
| 193 | {n}在给番茄贴小标签，写上「我的」两个字 | {n} sticks little labels on the tomatoes, writing "mine" on each. | {n}はトマトに小さなラベルを貼り、「私のもの」と書いている。 | {n}는 토마토에 작은 라벨을 붙이며 "내 거"라고 적는다. |
| 194 | {n}把番茄串成串，说要烤来吃 | {n} strings the tomatoes onto skewers, saying they’ll be grilled. | {n}はトマトを串に刺し、焼いて食べると言う。 | {n}는 토마토를 꼬치에 꿰며 구워 먹겠다고 한다. |
| 195 | {n}对着番茄许愿，希望明天长出更多的番茄 | {n} makes a wish to the tomatoes, hoping more will grow tomorrow. | {n}はトマトに願をかけ、明日もっとトマトが実りますようにと祈る。 | {n}는 토마토에게 소원을 빌며, 내일 더 많은 토마토가 열리기를 바란다. |
| 196 | {n}把最小的番茄让给其他月巴，自己吃那颗大的 | {n} gives the smallest tomato to the other Bannies and eats the big one itself. | {n}は一番小さなトマトを他のバニーに譲り、自分は大きい方を食べる。 | {n}는 가장 작은 토마토를 다른 버니에게 양보하고, 자기는 큰 것을 먹는다. |
| 197 | {n}正在给番茄做一顶小红帽，戴起来刚刚好 | {n} is making a little red hat for the tomato, and it fits just right. | {n}はトマトに小さな赤い帽子を作っていて、かぶせるとぴったりだ。 | {n}는 토마토에게 작은 빨간 모자를 만들어 주는데, 씌워 보니 딱 맞는다. |
| 198 | {n}在房间里堆了一座番茄小山，爬上去又滑下来 | {n} piles up a little mountain of tomatoes in the room, climbs it, and slides back down. | {n}は部屋にトマトの小山を積み、登っては滑り落ちる。 | {n}는 방에 토마토 산을 쌓고, 올라갔다가 미끄러져 내려온다. |
| 199 | {n}把番茄举到灯下仔细端详，像在鉴定宝石 | {n} holds a tomato under the lamp, examining it as if appraising a gem. | {n}はトマトを灯りの下に掲げてじっくり眺め、宝石でも鑑定するみたいだ。 | {n}는 토마토를 등불 아래 들어 자세히 살피며, 보석이라도 감정하는 것 같다. |
| 200 | {n}给番茄盖了张小被子，怕它着凉 | {n} tucks a little blanket over the tomato, afraid it will catch cold. | {n}はトマトに小さな布団をかけて、風邪をひかないようにと気遣う。 | {n}는 토마토에게 작은 이불을 덮어 주며, 감기 걸릴까 봐 걱정한다. |
| 201 | {n}正把熟透的番茄按颜色排队，从深红到浅红 | {n} lines up the ripe tomatoes by colour, from deep red to pale red. | {n}は熟したトマトを色順に並べている。濃い赤から薄い赤へ。 | {n}는 잘 익은 토마토를 색깔순으로 줄 세운다. 진한 빨강에서 연한 빨강까지. |
| 202 | {n}抱着番茄罐子数了一遍又一遍，乐得直晃脑袋 | {n} hugs the tomato jar and counts again and again, bobbing its head with joy. | {n}はトマトの瓶を抱えて何度も何度も数え、うれしそうに首を振る。 | {n}는 토마토 단지를 안고 몇 번이고 세며, 기뻐서 고개를 흔든다. |
| 203 | {n}在窗边哼着歌，给番茄哼了一首摇篮曲 | {n} hums by the window, singing the tomatoes a lullaby. | {n}は窓辺で鼻歌を歌い、トマトに子守唄をうたってやる。 | {n}는 창가에서 콧노래를 부르며 토마토에게 자장가를 불러 준다. |
| 204 | {n}翻着旧相册，笑到停不下来 | {n} flips through an old photo album, laughing without stopping. | {n}は古いアルバムをめくり、笑いが止まらない。 | {n}는 오래된 앨범을 넘기며 웃음을 멈추지 못한다. |
| 205 | {n}在番茄软垫上打盹。 | {n} dozes on the tomato cushion. | {n}はトマトのクッションの上でうたた寝している。 | {n}는 토마토 쿠션 위에서 졸고 있다. |
| 206 | {n}正在把房间改成番茄痛房。 | {n} is turning the room into a full-on tomato shrine. | {n}は部屋をトマト尽くしの祭壇部屋に改造している。 | {n}는 방을 토마토 성지방으로 개조하고 있다. |
| 207 | {n}把番茄一个个搬上窗台，说要给它们晒小被子 | {n} carries the tomatoes one by one onto the windowsill, saying they need their little blankets aired. | {n}はトマトを一つずつ窓辺に運び、小さな布団を干してあげると言う。 | {n}는 토마토를 하나씩 창가로 옮기며, 작은 이불을 말려 주겠다고 한다. |
| 208 | {n}正用番茄拼出爱心形状 | {n} is arranging tomatoes into the shape of a heart. | {n}はトマトでハートの形を作っている。 | {n}는 토마토로 하트 모양을 만들고 있다. |
| 209 | {n}给番茄浇完水，蹲在旁边等它长高 | {n} finishes watering the tomato and squats beside it, waiting for it to grow taller. | {n}はトマトに水をやり終え、そばにしゃがんで大きくなるのを待っている。 | {n}는 토마토에 물을 다 주고, 옆에 쪼그려 앉아 키가 자라기를 기다린다. |
| 210 | {n}威胁番茄，说要把一颗番茄夹进书里，压成书签 | {n} threatens the tomato, saying it will press one between the pages into a bookmark. | {n}はトマトを脅して、本に挟んで押しトマトのしおりにするぞと言う。 | {n}는 토마토를 협박하며, 책에 끼워 눌러 책갈피로 만들겠다고 한다. |
| 211 | {n}抱着番茄打盹，梦里被番茄追着跑 | {n} dozes off hugging a tomato and dreams of being chased by tomatoes. | {n}はトマトを抱えてうたた寝し、夢の中でトマトに追いかけられる。 | {n}는 토마토를 안고 졸다가, 꿈에서 토마토에게 쫓긴다. |
| 212 | {n}把熟番茄腌进罐子，说要留到冬天再吃 | {n} pickles ripe tomatoes into a jar, saying they will be saved for winter. | {n}は熟したトマトを瓶に漬け、冬まで取っておくと言う。 | {n}는 익은 토마토를 단지에 절여 겨울까지 두고 먹겠다고 한다. |
| 213 | {n}在屋里搭了个小帐篷，叫番茄一起躲进来 | {n} builds a little tent indoors and calls the tomatoes in to hide with it. | {n}は部屋に小さなテントを張り、トマトも一緒に入っておいでと呼ぶ。 | {n}는 방에 작은 텐트를 치고, 토마토도 같이 들어오라고 부른다. |
| 214 | {n}给番茄跳了一支舞，跳累了就瘫在软垫上，非要番茄夸它。 | {n} dances for the tomatoes, then flops onto the cushion exhausted and insists the tomatoes praise it. | {n}はトマトにダンスを披露し、疲れてクッションに倒れ込むと、トマトに褒めてもらうまで動かない。 | {n}는 토마토에게 춤을 선보이고, 지쳐 쿠션에 쓰러지면 토마토가 칭찬해 줄 때까지 움직이지 않는다. |
| 215 | {n}把番茄排成一圈，然后在中间转圈 | {n} arranges the tomatoes in a circle, then spins around in the middle. | {n}はトマトを輪に並べ、その真ん中でくるくる回る。 | {n}는 토마토를 둥글게 늘어놓고, 그 가운데에서 빙글빙글 돈다. |
| 216 | {n}对着番茄小声说了句谢谢，说完脸有点红 | {n} whispers a thank-you to the tomato, and its face turns a little red. | {n}はトマトに小さな声でありがとうと言い、言い終えると少し顔が赤くなる。 | {n}는 토마토에게 작게 고맙다고 말하고는, 얼굴이 조금 붉어진다. |
| 217 | {n}把心爱的番茄藏在床底 | {n} hides its beloved tomato under the bed. | {n}は大切なトマトをベッドの下に隠す。 | {n}는 아끼는 토마토를 침대 밑에 숨긴다. |
| 218 | {n}挑了一颗番茄，放进口袋说要随身带 | {n} picks a tomato, puts it in its pocket, and says it will carry it everywhere. | {n}はトマトを選んでポケットに入れ、いつも持ち歩くと言う。 | {n}는 토마토를 골라 주머니에 넣으며, 늘 들고 다니겠다고 한다. |
| 219 | {n}给番茄戴上小领结，说它是屋里的绅士 | {n} puts a little bow tie on the tomato, calling it the gentleman of the house. | {n}はトマトに小さな蝶ネクタイを着け、この家の紳士だと言う。 | {n}는 토마토에게 작은 나비넥타이를 달아 주며, 이 집의 신사라고 한다. |
| 220 | {n}把番茄塞进小被子，学着哄它睡觉 | {n} tucks the tomato into a little blanket, trying to coax it to sleep. | {n}はトマトを小さな布団に包み、寝かしつけようとする。 | {n}는 토마토를 작은 이불에 감싸 넣고 재우려 한다. |
| 221 | {n}把一颗番茄滚到床尾，又赶紧追过去捡 | {n} rolls a tomato to the foot of the bed, then hurries after it to pick it up. | {n}はトマトをベッドの端まで転がし、慌てて追いかけて拾う。 | {n}는 토마토를 침대 끝까지 굴리고는, 얼른 쫓아가 주워 온다. |
| 222 | {n}坐在窗边，数着番茄等天黑下去 | {n} sits by the window counting tomatoes, waiting for night to fall. | {n}は窓辺に座り、トマトを数えながら日が暮れるのを待つ。 | {n}는 창가에 앉아 토마토를 세며 날이 어두워지기를 기다린다. |
| 223 | {n}把番茄汁滴进清水里，说这杯叫月色 | {n} drips tomato juice into clear water and calls this cup "moonlight". | {n}はトマトの汁を清水に一滴落とし、この一杯は「月色」だと名づける。 | {n}는 토마토 즙을 맑은 물에 한 방울 떨어뜨리며, 이 한 잔은 "달빛"이라고 부른다. |
| 224 | {n}把番茄放在高处，让番茄求它放自己下来 | {n} puts the tomato up high and makes it beg to be let down. | {n}はトマトを高いところに置き、降ろしてと頼ませる。 | {n}는 토마토를 높은 곳에 올려 두고, 내려 달라고 빌게 만든다. |
| 225 | {n}和最小那颗番茄坐在一起，说要和番茄成为最好的朋友 | {n} sits with the smallest tomato, saying it wants to be the tomato’s best friend. | {n}は一番小さなトマトと並んで座り、トマトと一番の友達になると言う。 | {n}는 가장 작은 토마토와 나란히 앉아, 토마토와 가장 친한 친구가 되겠다고 한다. |
| 226 | {n}关灯前轻轻摸了摸番茄，说了声晚安好梦 | {n} gently strokes the tomato before turning off the light and wishes it goodnight and sweet dreams. | {n}は灯りを消す前にトマトをそっと撫で、おやすみ、いい夢をと告げる。 | {n}는 불을 끄기 전에 토마토를 살며시 쓰다듬으며, 잘 자, 좋은 꿈 꿔라고 말한다. |
| 227 | 🍅 番茄摸摸月巴的头：「没关系呀，重复的信，也有不同的心情嘛。」 | 🍅 Tomato strokes the Banny’s head: "It’s all right — even the same letter can carry a different mood." | 🍅 トマトはバニーの頭を撫でる。「大丈夫だよ。同じ手紙でも、違う気持ちがこもってるんだよ。」 | 🍅 토마토는 버니의 머리를 쓰다듬는다. "괜찮아. 같은 편지라도 다른 마음이 담겨 있으니까." |
| 228 | 🍅 番茄坐到月巴怀里：「别灰心，下一封一定是从别的地方寄来的。」 | 🍅 Tomato sits in the Banny’s arms: "Don’t be discouraged — the next one will surely come from somewhere new." | 🍅 トマトはバニーの腕の中に座る。「落ち込まないで。次の一通はきっと、別の場所から届くよ。」 | 🍅 토마토는 버니의 품에 앉는다. "낙심하지 마. 다음 편지는 분명 다른 곳에서 올 거야." |
| 229 | 🍅 番茄朝月巴靠近：「先吃口甜的，心情就好起来啦。」 | 🍅 Tomato leans close to the Banny: "Have something sweet first — you’ll feel better right away." | 🍅 トマトはバニーに近づく。「まず甘いものを一口。それで気分もよくなるよ。」 | 🍅 토마토는 버니에게 다가간다. "먼저 단것 한 입 먹어. 그러면 기분이 나아질 거야." |
| 230 | 🍅 番茄轻声说：「新的信可能就是迷路了吧。」 | 🍅 Tomato says softly: "Maybe the new letter has simply lost its way." | 🍅 トマトは小さな声で言う。「新しい手紙は、きっと道に迷ってるだけだよ。」 | 🍅 토마토는 작게 말한다. "새 편지는 아마 길을 잃은 거겠지." |
| 231 | 🍅 番茄替月巴擦擦眼角：「你已经很努力了，没事没事。」 | 🍅 Tomato wipes the Banny’s eyes: "You’ve worked so hard. It’s fine, it’s fine." | 🍅 トマトはバニーの目尻を拭う。「よく頑張ったね。大丈夫、大丈夫。」 | 🍅 토마토는 버니의 눈가를 닦아 준다. "충분히 애썼어. 괜찮아, 괜찮아." |
| 232 | 🍅 番茄陪月巴坐在窗边：「慢慢等，我会一直陪着你。」 | 🍅 Tomato sits with the Banny by the window: "Take your time. I’ll stay with you the whole way." | 🍅 トマトはバニーと窓辺に座る。「ゆっくり待とう。私はずっとそばにいるよ。」 | 🍅 토마토는 버니와 창가에 앉는다. "천천히 기다리자. 나는 계속 네 곁에 있을게." |
| 233 | 🍅 番茄把重复的信整齐收好：「每一封都值得珍惜，哪怕是同一封。」 | 🍅 Tomato puts the duplicate letter away neatly: "Every letter is worth treasuring — even the same one." | 🍅 トマトは重複した手紙をきちんとしまう。「どの手紙も大切にする価値があるよ。たとえ同じ一通でも。」 | 🍅 토마토는 겹친 편지를 가지런히 정리한다. "모든 편지는 소중히 할 가치가 있어. 같은 편지라도." |
| 234 | 🍅 番茄蹭蹭月巴的鼻尖：「我觉得，下一封肯定是新的信！」 | 🍅 Tomato nuzzles the Banny’s nose: "I think the next one is definitely going to be new!" | 🍅 トマトはバニーの鼻先にすり寄る。「次の一通は、きっと新しい手紙だと思うよ！」 | 🍅 토마토는 버니의 코끝에 비빈다. "내 생각엔 다음 건 분명 새 편지일 거야!" |
| 235 | 🍅 番茄哼起轻快的小调：「今天的失望，是明天惊喜的伏笔。」 | 🍅 Tomato hums a cheerful tune: "Today’s disappointment is tomorrow’s surprise in disguise." | 🍅 トマトは軽やかに鼻歌をうたう。「今日の失望は、明日の驚きの伏線なんだよ。」 | 🍅 토마토는 경쾌하게 콧노래를 부른다. "오늘의 실망은 내일의 놀라움을 위한 복선이야." |
| 236 | 🍅 番茄握住月巴的手：「我们还有好多好多旅程要走呢。」 | 🍅 Tomato takes the Banny’s hand: "We still have so many journeys ahead of us." | 🍅 トマトはバニーの手を握る。「これからも、まだまだたくさん旅をするんだよ。」 | 🍅 토마토는 버니의 손을 잡는다. "우리에겐 아직 아주 많은 여행이 남아 있어." |
| 237 | 🍅 番茄仰头看着 {name}：「辛苦啦，走了那么远的路，先坐下歇歇吧。」 | 🍅 Tomato looks up at {name}: "You’ve worked hard, walking such a long way. Sit down and rest a while." | 🍅 トマトは{name}を見上げる。「お疲れさま。そんなに遠くまで歩いたんだから、まず座って休もう。」 | 🍅 토마토는 {name}를 올려다본다. "수고했어. 그렇게 멀리 걸었으니, 우선 앉아서 좀 쉬자." |
| 238 | 🍅 番茄牵起 {name} 的手：「没关系，我等你，多久都没关系。」 | 🍅 Tomato takes {name}’s hand: "It’s all right. I’ll wait for you, however long it takes." | 🍅 トマトは{name}の手を引く。「大丈夫。待つよ。どれだけ長くても構わない。」 | 🍅 토마토는 {name}의 손을 잡는다. "괜찮아. 기다릴게, 얼마나 오래 걸려도." |
| 239 | 🍅 番茄轻轻拍着 {name} 的背：「重要的是你平安回来了。」 | 🍅 Tomato pats {name} gently on the back: "What matters is that you came home safe." | 🍅 トマトは{name}の背をそっと叩く。「大事なのは、君が無事に帰ってきたことだよ。」 | 🍅 토마토는 {name}의 등을 살며시 토닥인다. "중요한 건 네가 무사히 돌아온 거야." |
| 240 | 🍅 番茄对 {name} 眨眨眼：「先来想想下一趟旅行，想去什么地方吧。」 | 🍅 Tomato winks at {name}: "Let’s think about where you want to go on the next trip." | 🍅 トマトは{name}にウインクする。「次の旅でどこへ行きたいか、まずはそれを考えようよ。」 | 🍅 토마토는 {name}에게 윙크한다. "다음 여행에서 어디 가고 싶은지 먼저 생각해 보자." |
| 241 | 🍅 番茄把热汤端给 {name}：「先暖暖身子，有汤，也有番茄。」 | 🍅 Tomato brings hot soup to {name}: "Warm yourself up first — there’s soup, and tomatoes too." | 🍅 トマトは{name}に熱いスープを運ぶ。「まず体を温めて。スープもあるし、トマトもあるよ。」 | 🍅 토마토는 {name}에게 따뜻한 수프를 가져다준다. "먼저 몸을 녹여. 수프도 있고 토마토도 있어." |
| 242 | 🍅 番茄抱住 {name}：「你带回来的每一封信，我都有好好收着。」 | 🍅 Tomato hugs {name}: "Every letter you brought back, I’ve kept safe." | 🍅 トマトは{name}を抱きしめる。「君が持ち帰った手紙は、どれもちゃんと取ってあるよ。」 | 🍅 토마토는 {name}를 안는다. "네가 가져온 편지는 하나도 빠짐없이 잘 보관해 뒀어." |
| 243 | 🍅 番茄靠在 {name} 肩头：「就把信的事先放一边，好不好？」 | 🍅 Tomato leans on {name}’s shoulder: "Let’s put the letters aside for now, okay?" | 🍅 トマトは{name}の肩にもたれる。「手紙のことはいったん脇に置こうよ、ね？」 | 🍅 토마토는 {name}의 어깨에 기댄다. "편지 일은 일단 옆에 두자, 응?" |
| 244 | 🍅 番茄摸摸 {name} 的头：「你已经走了这么远，真的很厉害啦。」 | 🍅 Tomato strokes {name}’s head: "You’ve already come so far — that’s really something." | 🍅 トマトは{name}の頭を撫でる。「もうこんなに遠くまで来たんだよ。本当にすごいことだよ。」 | 🍅 토마토는 {name}의 머리를 쓰다듬는다. "너는 벌써 이렇게 멀리 왔어. 정말 대단한 거야." |
| 245 | 🍅 番茄朝 {name} 笑了笑：「新信说不定正在路上，明天就到了。」 | 🍅 Tomato smiles at {name}: "The new letter might already be on its way — it could arrive tomorrow." | 🍅 トマトは{name}に笑いかける。「新しい手紙はもう道の上かもしれないよ。明日には届くかも。」 | 🍅 토마토는 {name}에게 웃어 보인다. "새 편지는 벌써 오는 길일지도 몰라. 내일이면 도착할 거야." |
| 246 | 🍅 番茄朝着 {name} 笑：「就当出去旅游了嘛。」 | 🍅 Tomato grins at {name}: "Just think of it as a little trip." | 🍅 トマトは{name}に向かって笑う。「ちょっと旅行に行ったと思えばいいよ。」 | 🍅 토마토는 {name}를 향해 웃는다. "그냥 여행 다녀온 셈 치자." |
| 247 | 蜗牛师父 | Master Snail | かたつむり師匠 | 달팽이 사부 |
| 248 | 黑猫 | Black Cat | 黒猫 | 검은 고양이 |
| 249 | 棕熊 | Brown Bear | ヒグマ | 불곰 |
| 250 | 猫头鹰 | Owl | フクロウ | 부엉이 |
| 251 | 狐狸 | Fox | キツネ | 여우 |
| 252 | 小鹿 | Fawn | 子ジカ | 아기 사슴 |
| 253 | 松鼠 | Squirrel | リス | 다람쥐 |
| 254 | 白兔 | White Rabbit | 白ウサギ | 흰 토끼 |
| 255 | 刺猬 | Hedgehog | ハリネズミ | 고슴도치 |
| 256 | 鸭子 | Duck | アヒル | 오리 |
| 257 | 青蛙 | Frog | カエル | 개구리 |
| 258 | 山雀 | Titmouse | シジュウカラ | 박새 |
| 259 | 乌龟 | Turtle | カメ | 거북이 |
| 260 | 熊猫 | Panda | パンダ | 판다 |
| 261 | 水獭 | Otter | カワウソ | 수달 |
| 262 | 小猪 | Piglet | 子ブタ | 아기 돼지 |
| 263 | 浣熊 | Raccoon | アライグマ | 너구리 |
| 264 | 考拉 | Koala | コアラ | 코알라 |
| 265 | 老虎 | Tiger | トラ | 호랑이 |
| 266 | 狮子 | Lion | ライオン | 사자 |
| 267 | 猴子 | Monkey | サル | 원숭이 |
| 268 | 企鹅 | Penguin | ペンギン | 펭귄 |
| 269 | 白熊 | Polar Bear | シロクマ | 북극곰 |
| 270 | 狼 | Wolf | オオカミ | 늑대 |
| 271 | 小狗 | Puppy | 子イヌ | 강아지 |
| 272 | 鹦鹉 | Parrot | オウム | 앵무새 |
| 273 | 绵羊 | Sheep | ヒツジ | 양 |
| 274 | 公鸡 | Rooster | ニワトリ | 수탉 |
| 275 | 螃蟹 | Crab | カニ | 게 |
| 276 | 小鸡 | Chick | ヒヨコ | 병아리 |
| 277 | 渡鸦史官 | Raven Chronicler | ワタリガラスの史官 | 큰까마귀 사관 |
| 278 | 雪蛾 | Snow Moth | 雪蛾 | 눈나방 |
| 279 | 信天翁 | Albatross | アホウドリ | 신천옹 |
| 280 | 猞猁 | Lynx | オオヤマネコ | 스라소니 |
| 281 | 雪橇犬 | Sled Dog | そり犬 | 썰매개 |
| 282 | 长毛象 | Mammoth | マンモス | 매머드 |
| 283 | 雪貂 | Ermine | オコジョ | 담비 |
| 284 | 小精灵 | Little Fairy | 小妖精 | 작은 요정 |
| 285 | 独角兽 | Unicorn | 一角獣 | 유니콘 |
| 286 | 流萤 | Firefly | 蛍 | 반딧불이 |
| 287 | 桃源螳螂 | Peach Mantis | 桃源のカマキリ | 무릉도원 사마귀 |
| 288 | 蘑菇精灵 | Mushroom Sprite | キノコの精 | 버섯 정령 |
| 289 | 羽灵 | Feather Spirit | 羽の精 | 깃털 정령 |
| 290 | 月兔 | Moon Rabbit | 月ウサギ | 달토끼 |
| 291 | 花灵 | Flower Spirit | 花の精 | 꽃 정령 |
| 292 | 碧凤蝶 | Blue Morpho | モルフォ蝶 | 모르포 나비 |
| 293 | 泉灵 | Spring Nymph | 泉の精 | 샘 정령 |
| 294 | 精灵长老 | Fairy Elder | 妖精の長老 | 요정 장로 |
| 295 | 糖画师傅 | Sugar Painter | 飴細工職人 | 설탕 그림 장인 |
| 296 | 守灯人 | Lamp Keeper | 灯守り | 등불지기 |
| 297 | 卖花妖精 | Flower-selling Fairy | 花売りの妖精 | 꽃 파는 요정 |
| 298 | 古龙 | Ancient Dragon | 古龍 | 고룡 |
| 299 | 神谕石灵 | Oracle Stone Spirit | 神託石の精 | 신탁석 정령 |
| 300 | 巨石守卫 | Stone Warden | 巨石の守衛 | 거석 수호자 |
| 301 | 余烬灯灵 | Ember Lamp Spirit | 残り火の灯霊 | 잔불 등령 |
| 302 | 枯骨花匠 | Bone Gardener | 枯骨の花匠 | 마른뼈 정원사 |
| 303 | 旧旗守夜人 | Old Banner Watcher | 古い旗の夜番 | 옛 깃발 야경꾼 |
| 304 | 符文看守 | Rune Watcher | ルーンの番人 | 룬 수호자 |
| 305 | 夜市摊主 | Night Market Stallholder | 夜市の店主 | 야시장 주인 |
| 306 | 地窖主人 | Cellar Owner | 地下室の主 | 지하 저장고 주인 |
| 307 | 影子卫兵 | Shadow Guard | 影の衛兵 | 그림자 수비병 |
| 308 | 游荡的影子 | Wandering Shadow | さまよう影 | 배회하는 그림자 |
| 309 | 斗篷残影 | Cloak Afterimage | 外套の残影 | 망토 잔영 |
| 310 | 梦蝶 | Dream Butterfly | 夢蝶 | 꿈나비 |
| 311 | 梦游之人 | Sleepwalker | 夢遊の人 | 몽유병자 |
| 312 | 破晓微光 | Dawn Glimmer | 夜明けの微光 | 새벽의 미광 |
| 313 | 海豚向导 | Dolphin Guide | イルカの案内役 | 돌고래 안내자 |
| 314 | 岛民阿礁 | Islander A-Jiao | 島民のアジャオ | 섬주민 아자오 |
| 315 | 座头鲸 | Humpback Whale | ザトウクジラ | 혹등고래 |
| 316 | 篝火主持 | Bonfire Host | 焚き火の司会 | 모닥불 진행자 |
| 317 | 贝壳婆婆 | Granny Shell | 貝殻のおばあさん | 조개 할머니 |
| 318 | 人鱼 | Merfolk | 人魚 | 인어 |
| 319 | 章鱼占卜师 | Octopus Diviner | タコの占い師 | 문어 점술사 |
| 320 | 空城回声 | Echo of the Empty City | 空城のこだま | 빈 성의 메아리 |
| 321 | 沉船老船长 | Old Shipwreck Captain | 沈没船の老船長 | 난파선 노선장 |
| 322 | 沉城鲨 | Sunken-city Shark | 沈城ザメ | 침몰도시 상어 |
| 323 | 人鱼长老 | Merfolk Elder | 人魚の長老 | 인어 장로 |
| 324 | 人鱼歌者 | Merfolk Singer | 人魚の歌い手 | 인어 가수 |
| 325 | 小人鱼 | Little Merfolk | 小人魚 | 어린 인어 |
| 326 | 大魔法师残影 | Archmage Afterimage | 大魔法使いの残影 | 대마법사 잔영 |
| 327 | 海面泡沫灵 | Sea Foam Spirit | 海面の泡の精 | 바다 거품 정령 |
| 328 | 听说番茄只是多看了林间的鹿一眼，第二天月巴就牵着番茄绕森林走了三圈。 | They say Tomato only glanced at a deer in the woods, and the next day the Banny took it around the forest three times. | トマトが森のシカをちらりと見ただけなのに、翌日月バはトマトを連れて森を三周も歩いたらしい。 | 토마토가 숲의 사슴을 한 번 힐끗 봤을 뿐인데, 다음 날 버니는 토마토를 데리고 숲을 세 바퀴나 돌았다고 한다. |
| 329 | 镇上都在传，番茄夸了杂货店的老板娘一句，月巴就笑眯眯地把番茄的便当盒写上了自己的名字。谁信这是顺手的。 | The whole town is talking: Tomato complimented the grocer’s wife once, and the Banny, all smiles, wrote its own name on Tomato’s lunchbox. As if that were just a coincidence. | 町じゅうで噂になっている。トマトが雑貨屋の女将を褒めただけで、月巴はにこにこしながらトマトの弁当箱に自分の名前を書いた。手が滑っただけだなんて、誰が信じるだろう。 | 마을 전체가 그 이야기다. 토마토가 잡화점 주인 아주머니를 한 번 칭찬했더니, 버니는 싱글벙글하며 토마토의 도시락통에 자기 이름을 적어 넣었다. 우연이었다고 누가 믿겠나. |
| 330 | 蜂蜜铺的老板娘说，月巴每次买蜜都要多问一句「番茄最近来过没有」，问得比天气预报还勤。 | The honey-shop owner says the Banny asks one extra question every time it buys honey: "Has Tomato been by lately?" — asked more often than the weather report. | 蜂蜜屋の女将いわく、月巴は蜜を買うたびに必ず一言余計に聞く。「最近トマトは来ましたか」——天気予報より頻りに聞くのだという。 | 꿀 가게 주인 말로는, 버니는 꿀을 살 때마다 꼭 한마디를 더 묻는다. "요즘 토마토 왔어요?" — 일기예보보다 더 자주 묻는다고 한다. |
| 331 | 值夜的猫头鹰说，番茄半夜踢了被子，是月巴守在一旁给盖好的。番茄早上还纳闷被子怎么会自己动。 | The owl on night watch says Tomato kicked off its blanket at midnight and the Banny stayed up to tuck it back in. In the morning Tomato wondered why the blanket had moved by itself. | 夜番のフクロウいわく、夜中にトマトが布団を蹴り飛ばしたのを、月巴がそばで見守って掛け直してやったそうだ。朝のトマトは、布団がひとりでに動いたと不思議がっていた。 | 밤샘하던 부엉이 말로는, 한밤중에 토마토가 이불을 걷어찼고 버니가 옆에서 지키다 덮어 주었다고 한다. 아침에 토마토는 이불이 어째서 혼자 움직였는지 의아해했다. |
| 332 | 我听说月巴把番茄的名字写满了自己的日记，番茄却一本正经地问：「你是不是在练习写字？」 | I hear the Banny filled its diary with Tomato’s name, and Tomato asked in all seriousness: "Are you practising your handwriting?" | 聞いた話だが、月巴は日記をトマトの名前でいっぱいにしたらしい。トマトは真面目な顔で聞いた。「字の練習でもしてるの？」 | 듣자니 버니는 일기를 토마토 이름으로 가득 채웠다 한다. 토마토는 진지한 얼굴로 물었다. "글씨 연습하는 거야?" |
| 333 | 村子里的孩子说，番茄夸过小鹿的角好看，月巴第二天就送了番茄一顶鹿角帽——说是「怕你羡慕别人」。 | The village children say Tomato admired a fawn’s antlers, and the next day the Banny gave it an antler hat — "in case you envy someone else". | 村の子どもたちいわく、トマトが子ジカの角を褒めたら、翌日月巴は鹿の角の帽子をトマトに贈った。「人がうらやましくないように」だそうだ。 | 마을 아이들 말로는, 토마토가 아기 사슴 뿔을 예쁘다고 했더니 다음 날 버니가 사슴뿔 모자를 선물했다. "남 부러워하지 않게"라면서. |
| 334 | 松鼠们传话：月巴帮番茄捡了三天松果，番茄感动地说「你真是我最好的朋友」，月巴笑得眼睛弯弯的。 | The squirrels pass the word: the Banny spent three days gathering pinecones for Tomato, and when Tomato said gratefully "you really are my best friend", the Banny’s eyes curved into a smile. | リスの伝言。月巴は三日もかけてトマトのために松ぼっくりを集め、トマトが「君は本当に一番の友達だね」と感激すると、月巴は目を三日月にして笑った。 | 다람쥐들의 전언. 버니는 사흘 동안 토마토를 위해 솔방울을 모았고, 토마토가 "너는 정말 최고의 친구야"라며 감동하자 버니는 눈이 초승달처럼 휘어지게 웃었다. |
| 335 | 兔子洞里的八卦：月巴给番茄织了条围巾，番茄试戴后认真说「有点紧」，月巴笑着说「紧点暖和」。 | Gossip from the rabbit burrow: the Banny knitted Tomato a scarf; after trying it on Tomato said earnestly "it’s a bit tight", and the Banny laughed: "Tight keeps you warm." | ウサギの巣穴の噂話。月巴がトマトにマフラーを編んでやり、トマトが試しに着けて「ちょっときつい」と真顔で言うと、月巴は笑って言った。「きつい方が暖かいんだよ」。 | 토끼 굴의 소문. 버니가 토마토에게 목도리를 떠 줬고, 토마토가 써 보고는 "조금 꽉 껴"라고 진지하게 말하자 버니는 웃으며 말했다. "꽉 껴야 따뜻해." |
| 336 | 刺猬外婆说，月巴和番茄第一次见面那天，番茄把伞全让给了月巴，月巴笑着应了——然后默默跟在番茄身后淋了一路。 | Granny Hedgehog says that on the day they first met, Tomato gave the Banny the whole umbrella; the Banny accepted with a smile — and then quietly walked behind Tomato, getting soaked the whole way. | ハリネズミのおばあさんいわく、初めて会った日、トマトは傘をそっくり月巴に譲り、月巴は笑って受け取った——そして黙ってトマトの後ろをずぶ濡れで歩いていった。 | 고슴도치 할머니 말로는, 처음 만난 날 토마토가 우산을 통째로 버니에게 양보했고 버니는 웃으며 받았다. 그리고는 말없이 토마토 뒤를 따라 흠뻑 젖은 채 걸어갔다. |
| 337 | 河边的鸭子嘎嘎讨论：番茄把浪花糖分给月巴一半，月巴把剩下的一半包好收进口袋，说「留着以后慢慢吃」。 | The ducks by the river quack it over: Tomato shared half its wave-foam candy with the Banny, and the Banny wrapped the remaining half and pocketed it, saying "I’ll save it for later." | 川辺のアヒルたちがガアガア話し合う。トマトが波花糖を半分月巴に分け、月巴は残りの半分を包んでポケットにしまい、「あとでゆっくり食べる」と言ったそうだ。 | 강가의 오리들이 꽥꽥 이야기한다. 토마토가 물결사탕을 반 나눠 버니에게 주자, 버니는 남은 반을 싸서 주머니에 넣으며 "나중에 천천히 먹을래"라고 했다. |
| 338 | 池塘里的青蛙说，番茄每次路过月巴家门口都要停下来数它们的数量，月巴就在窗后看着，从没出声打扰。 | The frogs in the pond say that whenever Tomato passes the Banny’s door it stops to count them; the Banny watches from behind the window and never once interrupts. | 池のカエルいわく、トマトは月巴の家の前を通るたびに足を止めてカエルの数を数える。月巴は窓の後ろからそれを見ていて、一度も声をかけなかった。 | 연못의 개구리 말로는, 토마토는 버니 집 앞을 지날 때마다 멈춰 서서 개구리 수를 센다. 버니는 창 뒤에서 그 모습을 보며 한 번도 말을 걸지 않았다. |
| 339 | 山雀们叽叽喳喳：月巴夸番茄「今天的帽子很好看」，番茄就真的把那顶帽子戴了整整一周。 | The tits chatter: the Banny complimented Tomato — "nice hat today" — and Tomato wore that hat for a whole week. | シジュウカラたちが囀る。月巴が「今日の帽子、いいね」と褒めると、トマトは本当にその帽子を一週間ずっとかぶっていた。 | 박새들이 지저귄다. 버니가 "오늘 모자 예쁘네"라고 칭찬하자, 토마토는 정말 그 모자를 일주일 내내 썼다. |
| 340 | 海边老乌龟说，他游了八十年，见过月巴把捡到的贝壳偷偷埋进番茄的口袋，番茄还以为是贝壳自己跑进去的。 | The old sea turtle says that in eighty years of swimming he saw the Banny secretly tuck a shell it had found into Tomato’s pocket — and Tomato thought the shell had crawled in by itself. | 海辺の老ガメいわく、八十年泳いできて、月巴が拾った貝殻をこっそりトマトのポケットに忍ばせるのを見た。トマトは貝殻が自分で入り込んだと思っていた。 | 바닷가 늙은 거북이 말로는, 팔십 년을 헤엄치면서 버니가 주운 조개껍데기를 몰래 토마토 주머니에 밀어 넣는 걸 보았다. 토마토는 조개가 스스로 들어간 줄 알았다. |
| 341 | 竹林里都在传，月巴把番茄的名字刻在了竹子上，番茄认真看了半天问：「这是不是森林的寻人启事？」 | Word in the bamboo grove: the Banny carved Tomato’s name into a bamboo stalk, and Tomato studied it for ages and asked: "Is this a missing-person notice for the forest?" | 竹林じゅうの噂。月巴が竹にトマトの名前を刻むと、トマトは長いこと見つめて聞いた。「これ、森の尋ね人掲示？」 | 대나무숲의 소문. 버니가 대나무에 토마토 이름을 새기자, 토마토는 한참을 들여다보고 물었다. "이거 숲의 사람 찾기 안내문이야?" |
| 342 | 水獭们浮在水面说，看到月巴把番茄的信贴在胸口口袋里，番茄却问「你是不是忘了家里有抽屉」。 | The otters floating on the water say they saw the Banny tuck Tomato’s letter into its chest pocket, and Tomato asked: "Did you forget there are drawers at home?" | 水面に浮かぶカワウソたちいわく、月巴がトマトの手紙を胸のポケットに入れるのを見た。トマトは「家に引き出しがあるの、忘れたの？」と聞いた。 | 물 위에 떠 있는 수달들 말로는, 버니가 토마토의 편지를 가슴 주머니에 넣는 걸 보았다. 토마토는 "집에 서랍 있는 거 잊었어?"라고 물었다. |
| 343 | 猪圈的传闻：月巴把布丁分给番茄一半，自己那份留着第二天吃。番茄感动地说「你对我真好」，月巴说「因为只分给你」。 | News from the pigsty: the Banny gave Tomato half its pudding and kept its own half for the next day. Tomato said, touched, "you’re so good to me", and the Banny said: "Because I only share with you." | 豚小屋の噂。月巴はプリンを半分トマトにあげ、自分の分は翌日まで取っておいた。トマトが「君は本当に優しいね」と感激すると、月巴は言った。「君にだけ分けてるんだよ」。 | 돼지 우리의 소문. 버니는 푸딩을 반 토마토에게 주고 자기 몫은 다음 날까지 남겨 두었다. 토마토가 "너는 정말 다정해"라고 감동하자 버니는 말했다. "너에게만 나눠 주는 거야." |
| 344 | 浣熊翻到月巴的日记，写满了番茄的名字，署名「最好的朋友」——番茄本人还认真点头说「确实是好朋友」。 | A raccoon leafed through the Banny’s diary: filled with Tomato’s name and signed "best friend" — and Tomato itself nodded seriously and said, "we really are good friends." | アライグマが月巴の日記を見つけ、トマトの名前でいっぱいの頁に「一番の友達」と署名してあるのを見た。トマト本人は真面目にうなずいて「確かにいい友達だね」と言った。 | 너구리가 버니의 일기를 발견했는데, 토마토 이름으로 가득한 페이지에 "가장 친한 친구"라고 서명되어 있었다. 토마토 본인은 진지하게 고개를 끄덕이며 "정말 좋은 친구지"라고 했다. |
| 345 | 考拉打着哈欠说：月巴每天摘一片最嫩的叶子放在番茄窗台，番茄以为是风吹来的，还问「今天风真大」。 | The koala yawns and says: every day the Banny picks the tenderest leaf and leaves it on Tomato’s windowsill; Tomato thinks the wind brought it, and even says, "the wind is strong today." | コアラがあくびをしながら言う。月巴は毎日いちばん柔らかい葉を一枚摘んでトマトの窓台に置く。トマトは風が運んできたと思い、「今日は風が強いね」と言う。 | 코알라가 하품하며 말한다. 버니는 매일 가장 연한 잎을 하나 따서 토마토 창턱에 놓는다. 토마토는 바람이 가져온 줄 알고 "오늘 바람 세네"라고 말한다. |
| 346 | 森林里的老虎说，月巴遇到危险时挡在番茄前面，番茄却在后面喊「兄弟别怕，我来保护你」——月巴笑着没反驳。 | The tiger in the forest says that when danger came, the Banny stood in front of Tomato — and Tomato shouted from behind, "Don’t be scared, brother, I’ll protect you!" The Banny just smiled and didn’t argue. | 森のトラいわく、危険が迫ると月巴はトマトの前に立ちはだかった。トマトは後ろから叫んだ。「兄弟、怖がらないで、私が守るから！」——月巴は笑って、何も言い返さなかった。 | 숲의 호랑이 말로는, 위험이 닥치자 버니가 토마토 앞을 막아섰다. 토마토는 뒤에서 외쳤다. "형씨 무서워 마, 내가 지켜 줄게!" — 버니는 웃기만 하고 반박하지 않았다. |
| 347 | 草原上都在传：狮子王见过月巴把唯一的毯子盖在番茄身上守了一夜的火，番茄睡醒第一句话是「火没灭吧？」 | Word on the savanna: the Lion King saw the Banny put its only blanket over Tomato and keep the fire all night; Tomato’s first words on waking were "the fire didn’t go out, did it?" | 草原じゅうの噂。ライオン王は、月巴がたった一枚の毛布をトマトに掛けて一夜の火を守るのを見た。トマトが目を覚まして最初に言ったのは「火、消えてないよね？」だった。 | 초원 전체의 소문. 사자왕은 버니가 유일한 담요를 토마토에게 덮어 주고 밤새 불을 지키는 것을 보았다. 토마토가 깨어나 처음 한 말은 "불 안 꺼졌지?"였다. |
| 348 | 猴子们挂在树上打赌，猜番茄什么时候能发现月巴的好。番茄自己倒是淡定，可急死看戏的。 | The monkeys hang in the trees betting on when Tomato will finally notice how good the Banny is. Tomato stays perfectly calm — and the onlookers are dying of impatience. | サルたちは木にぶら下がって賭けをする。トマトがいつ月巴の優しさに気づくか、と。トマト本人は平然としていて、見ている方が気をもむ。 | 원숭이들은 나무에 매달려 내기를 한다. 토마토가 언제 버니의 다정함을 알아차릴까, 하고. 토마토는 태연하고, 구경하는 쪽이 애가 탄다. |
| 349 | 企鹅们挤在一起八卦：月巴把最暖的石头全塞给番茄取暖，番茄冻得直哆嗦还坚持说「我抗冻，你拿去」。 | The penguins huddle together gossiping: the Banny pushed all the warmest stones to Tomato, and Tomato, shivering hard, still insisted, "I can take the cold — you keep them." | ペンギンたちが寄り集まって噂話。月巴は一番暖かい石を全部トマトに押しやり、トマトは震えながらも「私は寒さに強いから、君が使いなよ」と言い張った。 | 펭귄들이 옹기종기 모여 수다를 떤다. 버니는 가장 따뜻한 돌을 모두 토마토에게 밀어 주었고, 토마토는 부들부들 떨면서도 "나는 추위에 강하니까 네가 써"라고 우겼다. |
| 350 | 白熊喝着热可可说：全北方的雪都知道，月巴每天睡前和番茄说晚安。 | The polar bear sips hot cocoa and says: every snow in the north knows that the Banny says goodnight to Tomato before bed every night. | シロクマはホットココアを飲みながら言う。北の雪はみんな知っている。月巴は毎晩寝る前にトマトにおやすみを言うのだ。 | 북극곰은 핫초코를 마시며 말한다. 북쪽의 눈은 모두 안다. 버니는 매일 잠들기 전 토마토에게 잘 자라고 인사한다. |
| 351 | 狼群嚎完月亮后传话：月巴在雪地里陪番茄走了三天三夜，番茄问「你是不是担心我迷路？」，月巴说「是啊」。 | After howling at the moon, the wolves pass the word: the Banny walked with Tomato through the snow for three days and nights. Tomato asked, "Were you worried I’d get lost?" and the Banny said, "Yes." | オオカミの群れが月に吠えたあと伝えた。月巴は雪の中を三日三晩トマトと歩いた。トマトが「私が迷子になるのが心配だったの？」と聞くと、月巴は「そうだよ」と答えた。 | 늑대 무리가 달에 울부짖은 뒤 전한다. 버니는 눈밭에서 사흘 밤낮 토마토와 걸었다. 토마토가 "내가 길을 잃을까 봐 걱정한 거야?"라고 묻자 버니는 "그래"라고 답했다. |
| 352 | 街角的小狗汪汪说：月巴每次出门都绕到番茄门口，装作「正好经过」，番茄每次都信，还热情地请月巴进来坐。 | The puppy on the corner yaps: every time the Banny goes out it takes a detour past Tomato’s door, pretending it "just happened to pass by". Tomato believes it every time and warmly invites the Banny in. | 街角の子イヌがワンワン言う。月巴は出かけるたびにトマトの家の前へ回り込み、「たまたま通りかかった」ふりをする。トマトは毎回それを信じ、嬉しそうに月巴を家に招き入れる。 | 길모퉁이의 강아지가 멍멍 짖는다. 버니는 외출할 때마다 토마토 집 앞으로 돌아가 "그냥 지나가던 길"인 척한다. 토마토는 매번 그 말을 믿고 반갑게 버니를 집에 들인다. |
| 353 | 鹦鹉学舌：月巴喊番茄名字的次数比喊自己还多，番茄认真说「你是不是怕自己忘了我叫什么」。 | The parrot mimics them: the Banny says Tomato’s name more often than its own, and Tomato said seriously, "Are you afraid you’ll forget what I’m called?" | オウムの物真似。月巴は自分の名よりトマトの名を呼ぶ回数の方が多い。トマトは真面目に言った。「私の名前を忘れるのが心配なの？」 | 앵무새의 흉내. 버니는 자기 이름보다 토마토 이름을 더 자주 부른다. 토마토는 진지하게 말했다. "내 이름 잊을까 봐 걱정되는 거야?" |
| 354 | 绵羊咩咩传：月巴把新织的围巾先给番茄试，说「你怕冷」。番茄憋红脸说「我才不怕冷」。 | The sheep bleat it along: the Banny gave its newly knitted scarf to Tomato to try first, saying "you’re afraid of the cold". Tomato went red and said, "I am not afraid of the cold." | ヒツジがメエメエ伝える。月巴は新しく編んだマフラーをまずトマトに試させ、「君は寒がりだから」と言う。トマトは顔を赤らめて「寒がりじゃないよ」と言った。 | 양이 메에메에 전한다. 버니는 새로 뜬 목도리를 먼저 토마토에게 써 보라며 "너 추위 타니까"라고 했다. 토마토는 얼굴을 붉히며 "추위 안 타"라고 했다. |
| 355 | 公鸡打鸣时宣布：全村的鸡都看见月巴等番茄一起看日出，番茄问「你这么爱看日出啊」，月巴说「爱看你看日出」。 | The rooster announces at crow: every chicken in the village has seen the Banny waiting for Tomato to watch the sunrise together. Tomato asked, "Do you love sunrises that much?" and the Banny said, "I love watching you watch the sunrise." | ニワトリが時を告げて宣言する。村じゅうの鶏が見ている。月巴はトマトと一緒に日の出を見るのを待っている。トマトが「そんなに日の出が好きなの？」と聞くと、月巴は言った。「君が日の出を見ているのを見るのが好きなんだ」。 | 수탉이 울음으로 선언한다. 마을의 모든 닭이 보았다. 버니는 토마토와 함께 일출을 보려고 기다린다. 토마토가 "일출이 그렇게 좋아?"라고 묻자 버니는 말했다. "네가 일출을 보는 걸 보는 게 좋아." |
| 356 | 螃蟹横着走还不忘八卦：月巴把捡到的珍珠全留给番茄。番茄认真问「这玩意儿能吃吗」。 | The crab walks sideways and still manages to gossip: the Banny leaves every pearl it finds for Tomato, and Tomato asks seriously, "Can you eat this thing?" | カニは横歩きしながらも噂話を忘れない。月巴は拾った真珠を全部トマトに残す。トマトは真顔で聞く。「これ、食べられるの？」 | 게는 옆으로 걸으면서도 수다를 잊지 않는다. 버니는 주운 진주를 모두 토마토에게 남긴다. 토마토는 진지하게 묻는다. "이거 먹을 수 있어?" |
| 357 | 小鸡们叽叽喳喳：月巴把番茄画在蛋壳上，番茄认真问「这是不是彩蛋活动？」 | The chicks peep: the Banny drew a tomato on an eggshell, and Tomato asked seriously, "Is this an egg-hunt event?" | ヒヨコたちがピヨピヨ言う。月巴が卵の殻にトマトを描くと、トマトは真顔で聞いた。「これってエッグハントのイベント？」 | 병아리들이 삐약거린다. 버니가 달걀 껍데기에 토마토를 그리자, 토마토는 진지하게 물었다. "이거 에그 이벤트야?" |
| 358 | 渡鸦史官叼着一卷残页说：这是些过去的故事，史书上的记录真真假假，但月巴对番茄的誓言没有人会质疑。 | The raven chronicler holds a fragment of a scroll in its beak: these are stories of the past; the records in the histories are half true and half false, but no one would question the Banny’s vow to Tomato. | ワタリガラスの史官が残頁をくわえて言う。これは昔の物語だ。史書の記録は真実も嘘も混じっているが、月巴がトマトに立てた誓いを疑う者はいない。 | 큰까마귀 사관이 찢긴 페이지를 물고 말한다. 이것은 옛날 이야기다. 사서의 기록은 진실과 거짓이 섞여 있지만, 버니가 토마토에게 한 맹세를 의심할 사람은 없다. |
| 359 | 雪蛾绕着断碑飞了三圈说：番茄陛下葬在哪儿，它问过冰湖的月亮，也问过遗迹的风，两边都说「不在我这儿」。 | The snow moth circles the broken stele three times: where King Tomato lies buried, it has asked the moon over the ice lake and the wind in the ruins, and both said, "Not here." | 雪蛾が断碑の周りを三周飛んで言う。トマト陛下がどこに眠っているのか、氷の湖の月にも、遺跡の風にも尋ねたが、どちらも「私のところではない」と答えた。 | 눈나방이 부러진 비석 주위를 세 바퀴 돌며 말한다. 토마토 폐하께서 어디에 묻히셨는지, 얼음 호수의 달에게도 유적의 바람에게도 물었지만 둘 다 "내 쪽이 아니다"라고 답했다. |
| 360 | 信天翁说它认得那两位：一个名字刻在王座下，一个名字刻在雪里。它说王庭最后那封没寄出的信，收信人栏只写了「月巴」。 | The albatross says it knows those two: one name is carved beneath the throne, one is carved in the snow. It says the last letter the Court never sent has only the word "Banny" in the recipient line. | アホウドリはあの二人を知っていると言う。一つの名は玉座の下に、もう一つの名は雪に刻まれている。王庭が最後に出せなかった手紙の宛名欄には、「バニー」とだけ書かれていた。 | 신천옹은 그 두 사람을 안다고 한다. 한 이름은 왕좌 아래에, 다른 이름은 눈 속에 새겨져 있다. 왕정이 끝내 보내지 못한 마지막 편지의 수신인 칸에는 "버니"라고만 적혀 있었다. |
| 361 | 猞猁蹲在空殿的梁上说：它见过月巴对着空王座汇报政务，一句不落。 | The lynx crouches on a beam of the empty hall: it has seen the Banny report affairs of state to the empty throne, not missing a single word. | オオヤマネコは空の大殿の梁にしゃがんで言う。月巴が空の玉座に向かって政務を報告するのを見たことがある。一言も欠かさずに。 | 스라소니는 빈 대전 들보에 웅크리고 말한다. 버니가 빈 왕좌를 향해 정무를 보고하는 것을 본 적이 있다. 한마디도 빠뜨리지 않고. |
| 362 | 雪橇犬说：王庭那口钟它拖去修过三次，每次月巴都拦下来说别修，钟一响就真的像殿里没人了。 | The sled dog says: it hauled the Court’s bell off to be repaired three times, and each time the Banny stopped it and said not to bother — once the bell rings, it will truly feel like no one is left in the hall. | そり犬いわく、王庭の鐘は三度修理に出そうとしたが、そのたびに月巴が止めて、直さなくていいと言った。鐘が鳴れば、本当に殿に誰もいない気がしてしまうから。 | 썰매개 말로는, 왕정의 종을 세 번이나 수리하러 가져갔지만 그때마다 버니가 막아서며 고치지 말라고 했다. 종이 울리면 정말 대전에 아무도 없는 것 같아지니까. |
| 363 | 长毛象用鼻子卷着棋子说：当年下的最后一盘棋，对面那把椅子一直空着，每次月巴去的时候，都会低声说「陛下，该您了」。 | The mammoth curls its trunk around a chess piece: in the last game they played, the chair opposite stayed empty, and every time the Banny goes there it says softly, "Your move, Your Majesty." | マンモスは鼻で駒を巻きながら言う。最後に対局したとき、向かいの椅子はずっと空いていた。月巴が行くたびに、小さな声で言う。「陛下、あなたの番です」。 | 매머드는 코로 기물을 감으며 말한다. 마지막으로 둔 한 판에서 맞은편 의자는 늘 비어 있었다. 버니는 갈 때마다 낮게 말한다. "폐하, 차례십니다." |
| 364 | 雪貂从地宫门缝里钻出来说：门楣上那行字它认得，前半句是君王的名，后半句是个没写完的约定。 | The ermine slips out through the crack of the underground hall’s door: it can read the line on the lintel — the first half is a king’s name, the second half is a promise left unfinished. | オコジョが地下宮殿の扉の隙間から抜け出して言う。入口の梁の一行は読める。前半は君王の名、後半は書きかけの約束だ。 | 담비가 지하 궁전 문틈으로 빠져나와 말한다. 입구 들보의 한 줄을 읽을 수 있다. 앞부분은 군왕의 이름, 뒷부분은 미처 다 쓰지 못한 약속이다. |
| 365 | 小精灵们围着番茄转了三圈说：这么大一颗番茄，是从云上面掉下来的吗？ | The little fairies circle Tomato three times: a tomato this big — did it fall down from above the clouds? | 小妖精たちはトマトの周りを三周回って言う。こんなに大きなトマト、雲の上から落ちてきたの？ | 작은 요정들이 토마토 주위를 세 바퀴 돌며 말한다. 이렇게 큰 토마토, 구름 위에서 떨어진 거야? |
| 366 | 独角兽低下头让番茄摸它的角，说这是它第一次让谁碰到，因为番茄身上有森林的味道。 | The unicorn lowers its head and lets Tomato touch its horn, saying this is the first time it has let anyone do so, because Tomato carries the scent of the forest. | 一角獣は頭を下げ、トマトに角を触らせて言う。誰かに触らせたのは初めてだと。トマトから森の匂いがするから。 | 유니콘은 고개를 숙여 토마토가 뿔을 만지게 하며 말한다. 누군가에게 만지게 한 건 처음이라고. 토마토에게서 숲 냄새가 나니까. |
| 367 | 流萤们提着小灯笼排成队，说要把番茄和月巴送回藤门口，免得它们在桃源里走丢。 | The fireflies line up with their little lanterns, saying they will escort Tomato and the Banny back to the vine gate so they do not get lost in the hideaway. | 蛍たちは小さな灯りを提げて列を作り、トマトと月巴を蔓の扉まで送り届けると言う。桃源郷で迷わないように。 | 반딧불이들은 작은 등불을 들고 줄을 서서, 토마토와 버니를 덩굴 문까지 데려다주겠다고 한다. 무릉도원에서 길을 잃지 않도록. |
| 368 | 螳螂举着藤环说：这是它照着月巴的尺寸编的，没想到番茄戴上也刚刚好。 | The mantis holds up a vine ring: it wove it to the Banny’s measurements, and was surprised it fits Tomato perfectly too. | カマキリが蔓の輪を掲げて言う。月巴の寸法に合わせて編んだのに、トマトが着けてもぴったりだった。 | 사마귀가 덩굴 고리를 들어 보이며 말한다. 버니 치수에 맞춰 엮었는데, 토마토가 써도 딱 맞았다. |
| 369 | 蘑菇精灵说：桃源的桃花酿只有招待尊贵的客人时才拿出来，月巴和番茄都分到了，而且番茄还喝醉了。 | The mushroom sprite says: the hideaway’s peach wine is brought out only for honoured guests. Both the Banny and Tomato got some — and Tomato got drunk. | キノコの精いわく、桃源郷の桃花酒は賓客をもてなすときだけ出される。月巴もトマトも分けてもらい、しかもトマトは酔っぱらってしまった。 | 버섯 정령 말로는, 무릉도원의 복숭아술은 귀한 손님을 대접할 때만 꺼낸다. 버니도 토마토도 나눠 받았고, 게다가 토마토는 취해 버렸다. |
| 370 | 羽灵把一根精灵羽别在番茄衣襟上，说：如果离开这里，你们也能跟随指引找回这里。 | The feather spirit pins a fairy feather to Tomato’s collar: if you leave here, it will guide you back. | 羽の精はトマトの襟に妖精の羽を留めて言う。ここを離れても、その導きでまた戻ってこられるよ。 | 깃털 정령은 토마토 옷깃에 요정 깃털을 달아 주며 말한다. 여기를 떠나도 그 안내를 따라 다시 돌아올 수 있어. |
| 371 | 月兔蹲在那轮大月亮下捣着石臼：它见过月巴把番茄举高，也不知道它们在看什么。 | The moon rabbit crouches under the great moon pounding its stone mortar: it has seen the Banny lift Tomato high, and it still does not know what they were looking at. | 月ウサギは大きな月の下で石臼をつきながら言う。月巴がトマトを高く持ち上げるのを見たが、何を見ているのかは分からない。 | 달토끼는 커다란 달 아래에서 맷돌을 찧으며 말한다. 버니가 토마토를 높이 들어 올리는 걸 보았지만, 무엇을 보는지는 모르겠다. |
| 372 | 花灵从桃花里探出头说：精灵们封番茄做「会走路的花」，它一点都不意外，毕竟番茄走到哪儿，哪儿的花就开得更起劲。 | The flower spirit pokes its head out of a peach blossom: the fairies dubbed Tomato "the flower that walks", and it is not surprised at all — wherever Tomato goes, the flowers there bloom harder. | 花の精が桃の花から顔を出して言う。妖精たちがトマトを「歩く花」に任じたのも無理はない。トマトが行く先々で、花はますます元気に咲くのだから。 | 꽃 정령이 복숭아꽃에서 고개를 내밀며 말한다. 요정들이 토마토를 "걷는 꽃"으로 봉한 것도 무리가 아니다. 토마토가 가는 곳마다 꽃이 더 힘차게 핀다. |
| 373 | 碧凤蝶停在番茄头顶说了很久的话，番茄也说了很多，提到最多的名字是月巴。 | The blue morpho rested on Tomato’s head and talked for a long while; Tomato talked a lot too, and the name it mentioned most was the Banny’s. | モルフォ蝶はトマトの頭にとまって長いこと話した。トマトもたくさん話し、いちばん多く口にした名は月巴だった。 | 모르포 나비는 토마토 머리에 앉아 오래 이야기했다. 토마토도 많이 이야기했고, 가장 자주 꺼낸 이름은 버니였다. |
| 374 | 泉灵离开了故乡，谁走到泉水边，都能听见月巴和番茄的故事。 | The spring nymph left its homeland, yet whoever walks to the spring can still hear the story of the Banny and Tomato. | 泉の精は故郷を離れた。それでも泉のそばに来る者は、月巴とトマトの物語を聞くことができる。 | 샘 정령은 고향을 떠났다. 그래도 샘가에 다가가는 사람은 버니와 토마토의 이야기를 들을 수 있다. |
| 375 | 精灵长老摸着自己长长的胡须说：能走进桃源的人，都会获得幸福。 | The fairy elder strokes its long beard: whoever can walk into the hideaway will find happiness. | 妖精の長老は長い髭を撫でながら言う。桃源郷に入れる者は、みな幸せになれる。 | 요정 장로는 긴 수염을 쓰다듬으며 말한다. 무릉도원에 들어올 수 있는 사람은 모두 행복을 얻는다. |
| 376 | 糖画师傅转着铜勺说：那晚月巴站在摊前看了很久，最后让我画了一颗番茄，说这个要带回家。 | The sugar-painting master twirls his copper spoon: that night the Banny stood before the stall watching for a long time, then asked me to paint a tomato — saying this one was going home. | 飴細工職人は銅の匙を回しながら言う。あの夜、月巴は屋台の前で長いこと眺め、最後にトマトを描いてくれと言った。これは家に持って帰るんだと。 | 설탕 그림 장인은 구리 국자를 돌리며 말한다. 그날 밤 버니는 가게 앞에서 한참을 바라보다가, 마지막에 토마토를 그려 달라고 했다. 이건 집에 가져갈 거라고. |
| 377 | 守灯人看着最后一盏灯时说：这些年他见过许多人来逛夜市，只有月巴每次走前面都会回头，好像害怕番茄走丢了。 | Watching the last lantern, the lamp keeper says: over the years many people have come to the night market, but only the Banny looks back every time it walks ahead — as if afraid Tomato will get lost. | 灯守りは最後の灯りを見つめて言う。長年、夜市には多くの人が来たが、前に歩きながら毎回振り返るのは月巴だけだ。トマトが迷子になるのを怖がるみたいに。 | 등불지기는 마지막 등불을 바라보며 말한다. 오랜 세월 야시장에 많은 사람이 왔지만, 앞서 걸으면서 매번 뒤를 돌아보는 건 버니뿐이다. 토마토가 길을 잃을까 두려운 것처럼. |
| 378 | 卖花妖精理着花枝说：那晚月巴挑了最小的一束，说番茄手小小的，拿不下太大的。 | The flower-selling fairy tidies her stems: that night the Banny picked the smallest bunch, saying Tomato’s hands are small and could not hold anything bigger. | 花売りの妖精は花の枝を整えながら言う。あの夜、月巴はいちばん小さな花束を選んだ。トマトの手は小さいから、大きいのは持てないんだと。 | 꽃 파는 요정은 꽃가지를 정리하며 말한다. 그날 밤 버니는 가장 작은 다발을 골랐다. 토마토 손이 작아서 큰 건 못 든다고. |
| 379 | 古龙慢吞吞地说：它记得那两位英雄的样子，和如今站在它面前的月巴和番茄一模一样。 | The ancient dragon says slowly: it remembers what those two heroes looked like, exactly like the Banny and Tomato standing before it now. | 古龍はゆっくりと言う。あの二人の英雄の姿を覚えている。今目の前に立っている月巴とトマトと、そっくりそのままだ。 | 고룡은 느릿하게 말한다. 그 두 영웅의 모습을 기억한다. 지금 눈앞에 서 있는 버니와 토마토와 똑같다. |
| 380 | 神谕石灵说：它记得这里原本一无所有。是「外来者」一砖一瓦地把它变成了如今的模样，为了感谢它们，古老的生物们也给出了相应的谢礼。 | The oracle stone spirit says: it remembers when there was nothing here at all. It was the "outsiders" who built it up, little by little, into what it is now, and to thank them the ancient beings gave gifts in return. | 神託石の精いわく、ここはもともと何もなかった。それを今の姿にしたのは「外から来た者たち」だ。少しずつ積み上げて。感謝のしるしに、古い生き物たちも相応の返礼を贈った。 | 신탁석 정령 말로는, 이곳은 원래 아무것도 없었다. 지금의 모습으로 만든 것은 "바깥에서 온 자들"이다. 하나씩 쌓아 올려서. 고마움의 표시로 고대 생물들도 그에 걸맞은 답례를 바쳤다. |
| 381 | 巨石守卫一动就掉下碎石，它说：因为自己喜欢站在入口，所以知道的事比大家都多，当初的两位英雄肯定会回来的，就算它们的寿命和这里的生物都不同。 | The stone warden crumbles a little whenever it moves: it says that because it likes standing at the entrance, it knows more than the others, and those two heroes will surely come back — even if their lifespans differ from every creature here. | 巨石の守衛は動くたびに砕けた石を落としながら言う。入口に立つのが好きだから、誰よりも多くのことを知っている。あの二人の英雄はきっと戻ってくる。たとえ彼らの寿命がここの生き物と違っても。 | 거석 수호자는 움직일 때마다 부서진 돌을 떨어뜨리며 말한다. 입구에 서 있는 걸 좋아해서 남들보다 아는 게 많다. 그 두 영웅은 반드시 돌아온다. 그들의 수명이 이곳 생물과 다를지라도. |
| 382 | 余烬灯灵是死地里最后一盏没灭的灯，番茄管它叫「小灯芯」。它说：月巴把火种埋进最深的基石下，只留下一句「灯还亮着，就有可以回的家。」。 | The ember lamp spirit is the last lamp still burning in the dead land, and Tomato calls it "Little Wick". It says: the Banny buried the embers beneath the deepest foundation stone, leaving only the words, "as long as the lamp still burns, there is a home to return to." | 残り火の灯霊は死の地で最後まで消えなかった灯りで、トマトはそれを「小さい灯芯」と呼ぶ。いわく、月巴は火種をいちばん深い礎石の下に埋め、ただ一言残した。「灯りがまだ点いているかぎり、帰る家はある。」。 | 잔불 등령은 죽은 땅에서 마지막까지 꺼지지 않은 등불이고, 토마토는 그것을 "작은 심지"라고 부른다. 말하길, 버니는 불씨를 가장 깊은 주춧돌 아래 묻고 한마디만 남겼다. "등불이 아직 켜져 있는 한, 돌아갈 집은 있다.". |
| 383 | 枯骨花匠守着花田里的每一个花苞，番茄叫它「花花」。它说：是番茄替大家挡下了最后一记诅咒，那么小一团，却把所有人都护在身后，从那以后整片死地都叫番茄「英雄」。不过番茄却被生气的月巴敲了头。 | The bone gardener tends every bud in the flower field, and Tomato calls it "Flora". It says: it was Tomato who took the last curse for everyone. Such a tiny thing, yet it shielded them all behind it — and ever since, the whole dead land calls Tomato "hero". Though the angry Banny gave it a rap on the head. | 枯骨の花匠は花畑のつぼみを一つひとつ守っていて、トマトはそれを「お花ちゃん」と呼ぶ。いわく、最後の呪いをみんなの代わりに受けたのはトマトだ。あんなに小さな体で、皆を後ろに庇って。それ以来、死の地じゅうがトマトを「英雄」と呼ぶ。もっとも、怒った月巴に頭をこつんとされたが。 | 마른뼈 정원사는 꽃밭의 봉오리를 하나하나 돌보고, 토마토는 그것을 "꽃둥이"라고 부른다. 말하길, 마지막 저주를 모두 대신해 받은 건 토마토다. 그렇게 작은 몸으로 모두를 뒤로 감싸고. 그 뒤로 죽은 땅 전체가 토마토를 "영웅"이라 부른다. 다만 화가 난 버니에게 머리를 한 대 맞았다. |
| 384 | 旧旗守夜人把不再残破的旗帜插在建好的房顶上，这原本是它身体的一部分，番茄把它补好还叫它「大旗子」。每天番茄都会在旗帜下点名，生怕有人没有回来，点一次还不够，要让月巴再点一次。 | The old banner watcher plants the no-longer-tattered flag on the roof of a finished house; it was once part of its own body, and Tomato mended it and called it "Big Flag". Every day Tomato takes roll call under the flag, afraid someone has not come back — and once is not enough, so it makes the Banny count again. | 古い旗の夜番は、もう破れていない旗を建て終えた屋根に立てる。それはもともと自分の体の一部で、トマトが繕って「大きい旗」と名づけた。毎日トマトは旗の下で点呼を取る。誰かが帰っていないのではと心配で、一度では足りず、月巴にももう一度数えさせる。 | 옛 깃발 야경꾼은 더는 너덜너덜하지 않은 깃발을 다 지은 집 지붕에 꽂는다. 그것은 원래 자기 몸의 일부였고, 토마토가 꿰매 주며 "큰 깃발"이라 불렀다. 매일 토마토는 깃발 아래에서 점호를 한다. 누군가 돌아오지 않았을까 봐 걱정해서, 한 번으로는 부족해 버니에게 한 번 더 세게 한다. |
| 385 | 符文看守守着一枚枚亮起来的符文，这样诅咒就不会卷土重来，番茄叫它「纸片片」。它说：诅咒解除那天，月巴和番茄手牵着手，让满地的符文一齐亮起来。 | The rune watcher guards each rune as it lights up, so the curse can never return, and Tomato calls it "Papery". It says: on the day the curse broke, the Banny and Tomato held hands and made every rune on the ground shine at once. | ルーンの番人は灯っていくルーンを一つずつ守っている。そうすれば呪いは二度と戻らない。トマトはそれを「紙っぺらさん」と呼ぶ。いわく、呪いが解けた日、月巴とトマトは手をつなぎ、地面じゅうのルーンを一斉に輝かせた。 | 룬 수호자는 하나씩 빛나는 룬을 지킨다. 그래야 저주가 다시 돌아오지 않는다. 토마토는 그것을 "종이짝"이라고 부른다. 말하길, 저주가 풀린 날 버니와 토마토는 손을 잡고 땅바닥의 룬을 일제히 빛나게 했다. |
| 386 | 夜市摊主一边收摊一边说：那晚灯灭得太突然，他当场就睡着了，醒来时天已经亮了，摊上的糖画还好端端地摆着。后来发生了什么，他一点都不知道。 | The night-market stallholder says as he packs up: that night the lights went out so suddenly that he fell asleep on the spot; when he woke it was already light, and the sugar paintings on his stall were still sitting there untouched. What happened after, he has no idea. | 夜市の店主は店じまいをしながら言う。あの夜は灯りがあまりに突然消えて、その場で眠ってしまった。目を覚ますと夜は明けていて、屋台の飴細工はそのままきちんと並んでいた。そのあと何があったのか、まったく知らない。 | 야시장 주인은 가게를 정리하며 말한다. 그날 밤은 불이 너무 갑자기 꺼져서 그 자리에서 잠들었다. 깨어 보니 날이 밝았고, 가게의 설탕 그림은 그대로 가지런히 놓여 있었다. 그 뒤에 무슨 일이 있었는지는 전혀 모른다. |
| 387 | 地窖主人挠着头说：那间酒铺的地窖他早就不用了，锁都锈了，钥匙也丢了，他从来不知道里面还有暗门。至于那晚的事，他更是毫无头绪。 | The cellar owner scratches his head: he stopped using the wine shop’s cellar long ago, the lock has rusted and the key is lost, and he never knew there was a hidden door inside. As for that night, he is completely in the dark. | 地下室の主は頭をかきながら言う。酒屋の地下室はとうに使っていない。錠は錆びつき、鍵もなくした。中に隠し扉があるなんて知らなかった。あの夜のこととなると、なおさら見当もつかない。 | 지하 저장고 주인은 머리를 긁으며 말한다. 술집 지하는 오래전부터 쓰지 않는다. 자물쇠는 녹슬었고 열쇠도 잃어버렸다. 안에 숨은 문이 있다는 건 몰랐다. 그날 밤 일은 더더욱 감이 잡히지 않는다. |
| 388 | 影子卫兵一动不动地守在暗道口：它只记得自己是奉命看守的，至于谁下的令、守的是什么，一概想不起来。月巴和番茄经过时，它竟没有拦着。 | The shadow guard stands motionless at the mouth of the hidden passage: it remembers only that it was ordered to keep watch — who gave the order, or what it guards, it cannot recall at all. When the Banny and Tomato passed by, it did not stop them. | 影の衛兵は暗い通路の入口でぴくりとも動かずに立っている。覚えているのは、命じられて見張っているということだけ。誰の命令か、何を守っているのかは、まったく思い出せない。月巴とトマトが通ったとき、なぜか止めなかった。 | 그림자 수비병은 어두운 통로 입구에서 꿈쩍도 하지 않고 서 있다. 기억하는 건 명을 받아 지키고 있다는 것뿐. 누가 명했는지, 무엇을 지키는지는 전혀 떠오르지 않는다. 버니와 토마토가 지나갈 때 어째서인지 막지 않았다. |
| 389 | 游荡的影子摇摇晃晃：那晚它也在街上，见过月巴把番茄护在怀里，一路狂奔，还回头冲它做了个噤声的手势。 | The wandering shadow sways: it was on the street that night too, and saw the Banny clutching Tomato as it ran, glancing back to signal it to stay quiet. | さまよう影はゆらゆら揺れながら言う。あの夜、自分も通りにいた。月巴がトマトを胸に抱えて走り抜け、振り返って黙っているようにと合図したのを見た。 | 배회하는 그림자는 흔들흔들 말한다. 그날 밤 나도 거리에 있었다. 버니가 토마토를 품에 안고 내달리며, 돌아보고는 조용히 하라는 손짓을 했다. |
| 390 | 斗篷残影立在梦的边缘，谁问它话它都不答，只是沉默地看着来的人。有人说，它是在等一个早就不会回来的人。 | The cloak afterimage stands at the edge of the dream; it answers no one, only watching in silence whoever comes. Some say it is waiting for someone who will never return. | 外套の残影は夢の端に立っている。誰が話しかけても答えず、ただ黙って来る者を見つめる。それは、とうに戻らない人を待っているのだと言う者もいる。 | 망토 잔영은 꿈의 가장자리에 서 있다. 누가 말을 걸어도 답하지 않고, 그저 조용히 오는 이를 바라본다. 누군가는 이미 돌아오지 않을 사람을 기다린다고 말한다. |
| 391 | 梦蝶在番茄睡过的枕边绕了很久，说它认得那些梦境的碎片，每一片都有浓重的思念。 | The dream butterfly circled the pillow where Tomato had slept for a long time: it recognises those fragments of dream — every one of them thick with longing. | 夢蝶はトマトが眠った枕の周りを長いこと舞った。あの夢のかけらに見覚えがある。どれも濃い思念をまとっている。 | 꿈나비는 토마토가 잠들었던 베개 주위를 오래 맴돌았다. 그 꿈의 조각들을 알아본다. 하나같이 짙은 그리움이 묻어 있다. |
| 392 | 梦游的人总在夜间小镇上游荡，说自己从不做梦，却常常见到一个小小的身影，牵着一颗番茄慢慢走。 | The sleepwalker wanders the town at night, saying it never dreams — yet it often sees a small figure walking slowly, leading a tomato by the hand. | 夢遊の人はいつも夜の町をさまよっていて、夢は見ないと言う。それなのに、小さな影がトマトの手を引いてゆっくり歩くのを、よく見かける。 | 몽유병자는 늘 밤의 마을을 배회하며 꿈은 꾸지 않는다고 말한다. 그런데도 작은 모습이 토마토의 손을 잡고 천천히 걷는 걸 자주 본다. |
| 393 | 破晓的微光守在梦的出口，说只要天亮了，困在里面的人就能走出来。 | The glimmer of dawn keeps watch at the dream’s exit: once day breaks, those trapped inside can walk out. | 夜明けの微光は夢の出口を見張っていて言う。夜が明ければ、中に閉じ込められた者は出てこられる。 | 새벽의 미광은 꿈의 출구를 지키며 말한다. 날이 밝기만 하면, 안에 갇힌 이도 걸어 나올 수 있다. |
| 394 | 海豚向导在海面上翻了个跟头说：它带过很多船出海，它说看到月巴带着一颗会说话的番茄往岛上去了。 | The dolphin guide flips on the surface: it has led many boats out to sea, and it says it saw the Banny headed for the island with a talking tomato. | イルカの案内役は海面で宙返りをして言う。たくさんの船を海へ連れて行った。月巴が、話をするトマトを連れて島へ向かうのを見たよ。 | 돌고래 안내자는 수면에서 공중제비를 돌며 말한다. 많은 배를 바다로 데려갔다. 버니가 말하는 토마토를 데리고 섬으로 가는 걸 봤어. |
| 395 | 阿礁蹲在篝火边说：来岛上度假的人不少，但像月巴这样，一听说海里的传说，就赶紧把番茄护到身后的，他还是头一个见。 | A-Jiao crouches by the bonfire: plenty of people come to the island on holiday, but the Banny is the first he has seen who, the moment it hears a legend of the sea, hurries to tuck Tomato behind it. | アジャオは焚き火のそばにしゃがんで言う。島に休暇で来る人は少なくない。だが月巴のように、海の伝説を聞いた途端にトマトを後ろへ庇う者は、初めて見た。 | 아자오는 모닥불 옆에 쪼그려 앉아 말한다. 섬에 휴가를 오는 사람은 적지 않다. 하지만 버니처럼 바다 전설을 듣자마자 토마토를 뒤로 감싸는 사람은 처음 봤다. |
| 396 | 座头鲸慢悠悠地说：那天它唱的是给远方听的歌，没想到只有一颗番茄，认认真真听完了全程，还跟着它的调子打拍子。 | The humpback whale says slowly: that day it sang a song meant for faraway places, and never expected that the only one who listened all the way through, keeping time with its tune, would be a tomato. | ザトウクジラはゆったりと言う。あの日歌ったのは遠くへ届ける歌だった。まさか、最後までちゃんと聴いて、しかも調子に合わせて拍子を取ったのが、たった一粒のトマトだとは思わなかった。 | 혹등고래는 느긋하게 말한다. 그날 부른 것은 먼 곳으로 보내는 노래였다. 설마 끝까지 제대로 듣고, 게다가 곡조에 맞춰 박자를 맞춘 것이 고작 토마토 하나일 줄은 몰랐다. |
| 397 | 篝火主持添了根柴说：晚会散场时，番茄舍不得走，最后帮着把火苗踩灭才肯和月巴回屋。 | The bonfire host adds a log: when the party broke up, Tomato did not want to leave, and only agreed to go back inside with the Banny after helping stamp the fire out. | 焚き火の司会は薪を一本くべて言う。宴がお開きになったとき、トマトは名残惜しそうで、最後に火を踏み消すのを手伝ってから、ようやく月巴と家に入った。 | 모닥불 진행자는 장작을 하나 넣으며 말한다. 잔치가 파할 때 토마토는 아쉬워하며, 마지막에 불씨를 밟아 끄는 걸 도와주고서야 버니와 함께 들어갔다. |
| 398 | 贝壳婆婆把耳朵贴在海螺上说：这片海的传说她从小听到大，她总说真正的秘密就在海里。 | Granny Shell presses her ear to a conch: she has heard the legends of this sea since childhood, and she always says the real secret lies within the sea. | 貝殻のおばあさんは巻き貝に耳を当てて言う。この海の伝説は小さい頃から聞いてきた。本当の秘密は海の中にあるのだと、いつも言っている。 | 조개 할머니는 소라에 귀를 대고 말한다. 이 바다의 전설은 어릴 적부터 들어 왔다. 진짜 비밀은 바다 속에 있다고 늘 말한다. |
| 399 | 人鱼在沉城上放游动，她看到了许久未见的来客，一直偷偷跟着它们，那是月巴和一颗小小的番茄。 | The merfolk swims above the sunken city; she saw visitors she had not seen in a long while and secretly followed them — a Banny and one little tomato. | 人魚は沈んだ街の上を泳ぐ。久しく見なかった客を見つけ、ずっとこっそり後をつけた。それは月巴と、小さなトマト一粒だった。 | 인어는 가라앉은 도시 위를 헤엄친다. 오래 보지 못한 손님을 발견하고 몰래 따라갔다. 그건 버니와 작은 토마토 하나였다. |
| 400 | 章鱼占卜师盘在王城大道上，八条触手各拨着一块潮汐石。问它城里的居民都去了哪里，它只说大家都没事。 | The octopus diviner coils on the royal avenue, each of its eight arms nudging a tide stone. Ask where the city’s people went, and it says only that everyone is fine. | タコの占い師は王城の大通りにうずくまり、八本の触手でそれぞれ潮汐石を転がしている。街の住人がどこへ行ったのかと聞いても、みんな無事だとだけ答える。 | 문어 점술사는 왕성 대로에 몸을 말고 앉아, 여덟 팔로 각각 조석석을 굴리고 있다. 도시 주민들이 어디로 갔느냐고 물어도 모두 무사하다고만 말한다. |
| 401 | 空城回声最爱学人说话。番茄喊一声「有人吗」，它就跟着喊「有人吗」；番茄喊「我们想回家」，它却沉默了很久，才轻轻应了一句「……家」。 | The echo of the empty city loves to mimic. Tomato calls "Is anyone there?" and it calls back "Is anyone there?"; Tomato calls "we want to go home", and it stays silent for a long while before answering softly, "...home." | 空城のこだまは人の言葉を真似るのが大好きだ。トマトが「誰かいますか」と叫べば、「誰かいますか」と返す。トマトが「家に帰りたい」と叫ぶと、長いこと黙ったあと、小さく「……家」と応えた。 | 빈 성의 메아리는 사람 말을 따라 하기를 좋아한다. 토마토가 "누구 있나요" 하고 외치면 "누구 있나요" 하고 따라 한다. 토마토가 "우리 집에 가고 싶어" 하고 외치자, 한참 침묵하다가 작게 "……집"이라고 답했다. |
| 402 | 沉船老船长守着他的破船，他也被卷进来过，但他没有和船一同沉向深海，只是说「海水下面有巨大的什么。」 | The old shipwreck captain keeps to his broken ship; he was swept in too, but he did not sink into the deep with the vessel. He says only, "There is something enormous under the water." | 沈没船の老船長は自分の壊れた船を守っている。彼も巻き込まれたが、船とともに深海へ沈むことはなかった。ただこう言う。「海の底には、巨大な何かがいる。」 | 난파선 노선장은 자기 부서진 배를 지키고 있다. 그도 휩쓸렸지만 배와 함께 심해로 가라앉지는 않았다. 다만 이렇게 말한다. "바다 밑에는 거대한 무언가가 있다." |
| 403 | 沉城鲨是这座城沉进海里之后才来的客人。它不咬人，只在空荡的街道间慢悠悠地游，挑选了喜欢的空屋当成巢穴。 | The sunken-city shark arrived only after the city sank. It does not bite; it simply swims slowly between the empty streets, having picked a vacant house it likes as its lair. | 沈城ザメはこの街が海に沈んでから来た客だ。人を咬まず、空っぽの通りをゆっくり泳ぎ、気に入った空き家を巣に選んだ。 | 침몰도시 상어는 이 도시가 바다에 가라앉은 뒤에 온 손님이다. 사람을 물지 않고, 텅 빈 거리를 느릿하게 헤엄치며 마음에 든 빈집을 둥지로 골랐다. |
| 404 | 人鱼长老说：他们在这片海面下等了好些年，等的不是救援，而是一个能看见他们真实模样的人。 | The merfolk elder says: they have waited beneath this stretch of sea for many years — not for rescue, but for someone who can see their true form. | 人魚の長老は言う。われわれはこの海の下で何年も待ってきた。待っていたのは救援ではなく、本当の姿を見てくれる者だ。 | 인어 장로는 말한다. 우리는 이 바다 아래에서 여러 해를 기다려 왔다. 기다린 것은 구조가 아니라, 진짜 모습을 봐 주는 사람이다. |
| 405 | 人鱼歌者一开口，整片海都安静下来。它说自己是「回归之人」，唱歌只是想让岸上的人知道，他们还好好地活着。 | When the merfolk singer opens its mouth, the whole sea falls silent. It calls itself one of the "returned", and sings only to let those on shore know they are still alive and well. | 人魚の歌い手が口を開くと、海じゅうが静まり返る。自分は「帰ってきた者」だと言い、岸の人に自分たちがちゃんと生きていると知らせるために歌うのだという。 | 인어 가수가 입을 열면 바다 전체가 조용해진다. 자신은 "돌아온 자"라고 말하며, 언덕 사람들에게 자신들이 잘 살아 있음을 알리려고 노래한다고 한다. |
| 406 | 小人鱼最喜欢追着海面的泡沫跑，它说月巴和番茄是第一次见到陆地上来的客人。 | The little merfolk loves chasing foam across the surface, and says the Banny and Tomato are the first guests from the land it has ever met. | 小人魚は海面の泡を追いかけるのが大好きで、月巴とトマトは初めて会った陸からの客だと言う。 | 어린 인어는 수면의 거품을 쫓는 걸 가장 좋아하며, 버니와 토마토는 처음 만난 땅에서 온 손님이라고 한다. |
| 407 | 大魔法师残影守着那圈法阵，却不知道本体去了哪里。 | The archmage’s afterimage guards the ring of the formation, with no idea where the original has gone. | 大魔法使いの残影はその法陣の輪を守っているが、本体がどこへ行ったのかは知らない。 | 대마법사 잔영은 그 법진의 고리를 지키고 있지만, 본체가 어디로 갔는지는 모른다. |
| 408 | 海面泡沫灵在海水中起伏，永不散去。它说，它每天都和这群「回归之人」一起嬉戏。 | The sea-foam spirit rises and falls in the water, never scattering. It says it plays every day with this crowd of "returned ones". | 海面の泡の精は海の中で浮き沈みし、決して消えない。毎日この「帰ってきた者たち」と一緒に遊んでいると言う。 | 바다 거품 정령은 바닷물 속에서 오르내리며 결코 흩어지지 않는다. 매일 이 "돌아온 자들"과 함께 논다고 한다. |
| 409 | 🍅 你看，我说过飞太高会摔的吧？来，到我这儿来。 | 🍅 See? I told you flying too high would end in a fall. Come here. | 🍅 ほら、高く飛びすぎたら落ちるって言ったでしょ。こっちへおいで。 | 🍅 봐, 너무 높이 날면 떨어진다고 했잖아. 이리 와. |
| 410 | 🍅 摔疼了没有？我把最红的那颗留给你压惊。 | 🍅 Did that hurt? I saved the reddest one for you, to settle your nerves. | 🍅 痛かった？ いちばん赤いのを取っておいたよ。びっくりしたでしょう。 | 🍅 다쳤어? 가장 빨간 걸 남겨 뒀어. 놀랐지. |
| 411 | 🍅 别闷着啦，飞不起来也没关系，你在地上也好看。 | 🍅 Don’t sulk. It’s all right if you can’t fly — you look lovely on the ground too. | 🍅 ふさぎ込まないで。飛べなくても大丈夫、地面にいても君は素敵だよ。 | 🍅 삐지지 마. 못 날아도 괜찮아, 땅 위에 있어도 너는 멋져. |
| 412 | 🍅 说好了一起飞的，你怎么自己先掉下去了。 | 🍅 We said we’d fly together. Why did you go and fall first? | 🍅 一緒に飛ぶって言ったのに、どうして一人で先に落ちちゃうの。 | 🍅 같이 날기로 했잖아. 왜 혼자 먼저 떨어지는 거야. |
| 413 | 🍅 我把你捡回来了，下次记得抓紧我的手。 | 🍅 I picked you back up. Next time, hold my hand tight. | 🍅 拾い上げてあげたよ。次はちゃんと私の手を握ってね。 | 🍅 내가 주워 왔어. 다음엔 내 손 꼭 잡아. |
| 414 | 🍅 摔一次而已，没关系的。 | 🍅 One fall — that’s all. It’s fine. | 🍅 一回落ちただけだよ。大丈夫。 | 🍅 한 번 떨어진 것뿐이야. 괜찮아. |
| 415 | 🍅 你看天上的云，像不像我上次说的那朵？ | 🍅 Look at the cloud up there — does it look like the one I mentioned last time? | 🍅 空の雲、見て。前に話したあの雲に似てる？ | 🍅 하늘의 구름 좀 봐. 지난번에 말한 그 구름 닮았지? |
| 416 | 🍅 歇会儿吧，我陪你在这儿晒晒太阳。 | 🍅 Rest a while. I’ll sit here in the sun with you. | 🍅 少し休もう。ここで一緒に日向ぼっこしよう。 | 🍅 잠깐 쉬자. 여기서 같이 볕 좀 쬐자. |
| 417 | 🍅 疼的话就抓着我，我不怕被捏扁。 | 🍅 If it hurts, grab onto me. I don’t mind being squashed. | 🍅 痛かったら私を掴んで。潰れても平気だから。 | 🍅 아프면 나를 꽉 잡아. 찌그러져도 괜찮아. |
| 418 | 🍅 你怎么又撞上去了……我都替你疼。 | 🍅 You crashed into it again... It hurts me just watching. | 🍅 またぶつかったの……見てる私まで痛いよ。 | 🍅 또 부딪혔어…… 보는 나까지 아프다. |
| 419 | 🍅 飞得最高的那一次，我记着的。 | 🍅 I remember that one time you flew the highest. | 🍅 一番高く飛べたあの時、ちゃんと覚えてるよ。 | 🍅 가장 높이 날았던 그때, 나 기억하고 있어. |
| 420 | 🍅 下次别逞强了，我就在下面接着你。 | 🍅 Don’t push yourself so hard next time. I’ll be right below to catch you. | 🍅 次は無理しないで。下でちゃんと受け止めるから。 | 🍅 다음엔 무리하지 마. 아래에서 내가 받아 줄게. |
| 421 | 🍅 我把手帕带来了，擦擦脸吧，灰扑扑的。 | 🍅 I brought a handkerchief. Wipe your face — you’re all dusty. | 🍅 ハンカチ持ってきたよ。顔を拭いて、ほこりだらけだよ。 | 🍅 손수건 가져왔어. 얼굴 닦아, 먼지투성이야. |
| 422 | 🍅 你摔下来那一刻，我的心跳都停了。 | 🍅 The moment you fell, my heart stopped. | 🍅 君が落ちた瞬間、私の心臓も止まりそうだった。 | 🍅 네가 떨어진 그 순간, 내 심장이 멈추는 줄 알았어. |
| 423 | 🍅 起来啦，地上凉，会着凉的。 | 🍅 Get up — the ground is cold, you’ll catch a chill. | 🍅 起きて。地面は冷たいよ、風邪ひいちゃう。 | 🍅 일어나. 바닥이 차가워, 감기 걸려. |
| 424 | 🍅 你是不是忘了，我也会心疼的。 | 🍅 Did you forget that it hurts me too? | 🍅 忘れてる？ 私だって心が痛むんだよ。 | 🍅 잊었어? 나도 마음이 아파. |
| 425 | 🍅 没关系，我们还有好多次可以重来。 | 🍅 It’s all right. We still have plenty of tries left. | 🍅 大丈夫。まだ何度でもやり直せるよ。 | 🍅 괜찮아. 아직 여러 번 다시 할 수 있어. |
| 426 | 🍅 你飞的时候，我一直都在看着你。 | 🍅 While you were flying, I never took my eyes off you. | 🍅 君が飛んでいるとき、ずっと見ていたよ。 | 🍅 네가 날고 있을 때, 나는 계속 너를 보고 있었어. |
| 427 | 🍅 这颗番茄给你，吃完就又有力气了。 | 🍅 Here’s a tomato for you. Eat it and you’ll have your strength back. | 🍅 このトマトをあげる。食べたらまた力が出るよ。 | 🍅 이 토마토 줄게. 먹으면 다시 힘이 날 거야. |
| 428 | 🍅 别皱着眉了，笑一个给我看看。 | 🍅 Stop frowning. Give me a smile. | 🍅 眉をひそめないで。笑って見せて。 | 🍅 눈썹 찌푸리지 마. 한 번 웃어 봐. |
| 429 | 🍅 我就知道你会撞上那根柱子，你才是笨蛋吧。 | 🍅 I knew you’d hit that post. You’re the real dummy here. | 🍅 あの柱にぶつかると思ってたよ。本当に君はおっちょこちょいだね。 | 🍅 그 기둥에 부딪힐 줄 알았어. 진짜 너는 덜렁이구나. |
| 430 | 🍅 摔成这样还嘴硬，我扶你起来。 | 🍅 Banged up this badly and still talking tough — let me help you up. | 🍅 こんなに転んでまだ強がるんだから。ほら、立たせてあげる。 | 🍅 이렇게 넘어지고도 아직 센 척이야. 내가 일으켜 줄게. |
| 431 | 🍅 刚才那一飞，真好看。 | 🍅 That flight just now — it was beautiful. | 🍅 さっきの飛び方、本当にきれいだったよ。 | 🍅 방금 그 비행, 정말 멋졌어. |
| 432 | 🍅 无论你飞多远，我都会在原地等你。 | 🍅 However far you fly, I’ll be right here waiting. | 🍅 どんなに遠くへ飛んでも、私はここで待っているよ。 | 🍅 아무리 멀리 날아도, 나는 여기서 기다릴게. |
| 433 | 🍅 疼吗？我给你吹吹。 | 🍅 Does it hurt? Let me blow on it. | 🍅 痛い？ ふうってしてあげる。 | 🍅 아파? 내가 후 불어 줄게. |
| 434 | 🍅 再来一次吧，这次我陪你一起数。 | 🍅 Let’s try again. This time I’ll count along with you. | 🍅 もう一度やってみよう。今度は一緒に数えるよ。 | 🍅 다시 해 보자. 이번엔 나도 같이 셀게. |
| 435 | 🍅 哇，你飞过去啦！好厉害的月巴。 | 🍅 Wow, you made it across! What an amazing Banny. | 🍅 わあ、飛び越えたね！ すごいバニーだ。 | 🍅 와, 건너갔어! 정말 대단한 버니야. |
| 436 | 🍅 这一关我记住了，下次讲给月亮听。 | 🍅 I’ll remember this stage. Next time I’ll tell the moon about it. | 🍅 このステージ、覚えておくね。今度お月さまに話すんだ。 | 🍅 이 스테이지 기억해 둘게. 다음에 달님에게 들려줄 거야. |
| 437 | 🍅 你看，我说过你能行的吧。 | 🍅 See? I told you you could do it. | 🍅 ほらね、できるって言ったでしょ。 | 🍅 봐, 할 수 있다고 했잖아. |
| 438 | 🍅 再飞远一点，我在这儿等你回来吃番茄。 | 🍅 Fly a little farther — I’ll be here waiting for you to come back and eat tomatoes. | 🍅 もっと遠くへ飛んで。ここで待ってるから、帰ってきたらトマトを食べよう。 | 🍅 조금 더 멀리 날아 봐. 여기서 기다릴게, 돌아오면 토마토 먹자. |
| 439 | 🍅 你翅膀上有风，我看见了。 | 🍅 There’s wind on your wings — I saw it. | 🍅 君の翼に風がまとわりついてた。ちゃんと見えたよ。 | 🍅 네 날개에 바람이 붙어 있었어. 나는 봤어. |
| 440 | 🍅 干得漂亮，奖励你一颗最甜的。 | 🍅 Well done. You’ve earned the sweetest one. | 🍅 よくやったね。いちばん甘いのをあげる。 | 🍅 잘했어. 가장 달콤한 걸 줄게. |
| 441 | 初见 | First Flight | 初飛行 | 첫 비행 |
| 442 | 微风 | Breeze | そよ風 | 산들바람 |
| 443 | 云上 | Above the Clouds | 雲の上 | 구름 위 |
| 444 | 穿林 | Through the Woods | 森抜け | 숲 통과 |
| 445 | 逆风 | Headwind | 向かい風 | 맞바람 |
| 446 | 星夜 | Starry Night | 星夜 | 별밤 |
| 447 | 险峰 | Steep Peaks | 険しい峰 | 험한 봉우리 |
| 448 | 雷雨 | Thunderstorm | 雷雨 | 뇌우 |
| 449 | 极夜 | Polar Night | 極夜 | 극야 |
| 450 | 月巴之王 | Banny King | バニーキング | 버니 킹 |
| 451 |  / 负  |  / Lost  |  / 負  |  / 패  |
| 452 |  · 地主是 <b> |  · Landlord: <b> |  · 地主は <b> |  · 지주는 <b> |
| 453 |  · 奖励 × |  · Reward × |  · 報酬 × |  · 보상 × |
| 454 |  · 累计 <b class=" |  · Total <b class=" |  · 累計 <b class=" |  · 누적 <b class=" |
| 455 |  · 认输  |  · Forfeits  |  · 投了  |  · 기권  |
| 456 |  · 认输 <b> |  · Forfeits <b> |  · 投了 <b> |  · 기권 <b> |
| 457 |  · 输 <b> |  · Lost <b> |  · 負け <b> |  · 패 <b> |
| 458 |  · 队友赢 <b> |  · Teammate won <b> |  · 味方の勝ち <b> |  · 동료 승리 <b> |
| 459 |  · 🃏 出千 <b> |  · 🃏 Cheats <b> |  · 🃏 イカサマ <b> |  · 🃏 치팅 <b> |
| 460 |  出了  |  played  |  が  |  가 냈다  |
| 461 |  出牌…</span> |  to play…</span> |  の出牌を待っています…</span> |  의 차례를 기다리는 중…</span> |
| 462 |  局 ·  |  games ·  |  局 ·  |  판 ·  |
| 463 |  局</div> |  games</div> |  局</div> |  판</div> |
| 464 |  局已评级）</div> |  games rated)</div> |  局を採点）</div> |  판 평가됨)</div> |
| 465 |  张 |  cards |  枚 |  장 |
| 466 |  换走了你的  |  to swap away your  |  と入れ替えて、あなたの  |  와 바꿔치기해 너의  |
| 467 | " onclick="ddHistTabSet('rec')">📜 记录</button> | " onclick="ddHistTabSet('rec')">📜 Records</button> | " onclick="ddHistTabSet('rec')">📜 記録</button> | " onclick="ddHistTabSet('rec')">📜 기록</button> |
| 468 | " onclick="ddHistTabSet('stats')">📊 统计</button> | " onclick="ddHistTabSet('stats')">📊 Stats</button> | " onclick="ddHistTabSet('stats')">📊 統計</button> | " onclick="ddHistTabSet('stats')">📊 통계</button> |
| 469 | " onclick="ddPlayerPass()">不要</button> | " onclick="ddPlayerPass()">Pass</button> | " onclick="ddPlayerPass()">パス</button> | " onclick="ddPlayerPass()">패스</button> |
| 470 | " title="评级分  | " title="Rating score  | " title="評価点  | " title="평가 점수  |
| 471 | %</span><span class="lb">胜率</span></div> | %</span><span class="lb">Win rate</span></div> | %</span><span class="lb">勝率</span></div> | %</span><span class="lb">승률</span></div> |
| 472 | </b> · 负 <b> | </b> · Lost <b> | </b> · 負 <b> | </b> · 패 <b> |
| 473 | </b> 分 · 时长  | </b> pts · Time  | </b> 点 · 時間  | </b>점 · 시간  |
| 474 | </b> 场：本局遇到出千月巴概率 <b> | </b> wins: chance of meeting Cheat Banny this game <b> | </b> 勝：今局イカサマバニーに会う確率 <b> | </b> 승: 이번 판 치팅 버니를 만날 확률 <b> |
| 475 | </b> 局 | </b> games | </b> 局 | </b>판 |
| 476 | </b> 局 · 胜 <b> | </b> games · Won <b> | </b> 局 · 勝 <b> | </b>판 · 승 <b> |
| 477 | </b> 局；其中你赢 <b> | </b> games; you won <b> | </b> 局；うちあなたの勝ち <b> | </b>판, 그중 네 승리 <b> |
| 478 | </b> 张 · 敌方残牌 <b> | </b> cards · Enemy left <b> | </b> 枚 · 敵の残り札 <b> | </b>장 · 상대 잔여 <b> |
| 479 | </b> 张<br> | </b> cards<br> | </b> 枚<br> | </b>장<br> |
| 480 | </b> 手 · 自家残牌 <b> | </b> plays · Your cards left <b> | </b> 手 · 自分の残り札 <b> | </b>번 · 내 잔여 <b> |
| 481 | </b> 次 | </b> left | </b> 回 | </b>회 |
| 482 | </b>（基础 3% + 连胜 ×2%） | </b> (base 3% + streak ×2%) | </b>（基本 3% + 連勝 ×2%） | </b>(기본 3% + 연승 ×2%) |
| 483 | </b>（每连胜一场 +2%） | </b> (+2% per win streak) | </b>（1 勝ごとに +2%） | </b>(1승마다 +2%) |
| 484 | </b>（越高越适合当地主）</div> | </b> (higher is better as Landlord)</div> | </b>（高いほど地主向き）</div> | </b>(높을수록 지주에 적합)</div> |
| 485 | </span><span class="lb">总局数</span></div> | </span><span class="lb">Total games</span></div> | </span><span class="lb">総局数</span></div> | </span><span class="lb">총 판수</span></div> |
| 486 | </span><span class="lb">累计🍅</span></div> | </span><span class="lb">Total 🍅</span></div> | </span><span class="lb">累計🍅</span></div> | </span><span class="lb">누적🍅</span></div> |
| 487 | <br><span class="sc">评分  | <br><span class="sc">Score  | <br><span class="sc">評価  | <br><span class="sc">점수  |
| 488 | <button class="btn gold" onclick="ddBid(true)">👑 叫地主</button> | <button class="btn gold" onclick="ddBid(true)">👑 Call Landlord</button> | <button class="btn gold" onclick="ddBid(true)">👑 地主を宣言</button> | <button class="btn gold" onclick="ddBid(true)">👑 지주 선언</button> |
| 489 | <button class="btn gold" onclick="ddPlayerPlay()">出牌</button> | <button class="btn gold" onclick="ddPlayerPlay()">Play</button> | <button class="btn gold" onclick="ddPlayerPlay()">出す</button> | <button class="btn gold" onclick="ddPlayerPlay()">내기</button> |
| 490 | <button class="btn" onclick="ddBid(false)">🙅 不叫</button> | <button class="btn" onclick="ddBid(false)">🙅 Pass</button> | <button class="btn" onclick="ddBid(false)">🙅 パス</button> | <button class="btn" onclick="ddBid(false)">🙅 패스</button> |
| 491 | <button class="btn" onclick="ddClearSel()">重选</button> | <button class="btn" onclick="ddClearSel()">Clear</button> | <button class="btn" onclick="ddClearSel()">選び直す</button> | <button class="btn" onclick="ddClearSel()">다시 선택</button> |
| 492 | <button class="btn" onclick="ddPlayerHint()">提示</button> | <button class="btn" onclick="ddPlayerHint()">Hint</button> | <button class="btn" onclick="ddPlayerHint()">ヒント</button> | <button class="btn" onclick="ddPlayerHint()">힌트</button> |
| 493 | <button class="btn" onclick="ddQuit()">收手退出</button></div> | <button class="btn" onclick="ddQuit()">Cash out</button></div> | <button class="btn" onclick="ddQuit()">やめて退出</button></div> | <button class="btn" onclick="ddQuit()">그만두기</button></div> |
| 494 | <div class="big">要叫地主吗？</div> | <div class="big">Call Landlord?</div> | <div class="big">地主を宣言しますか？</div> | <div class="big">지주를 선언할까요?</div> |
| 495 | <div class="dd-bottom"><span class="dd-bottom-t">🃏 本局底牌</span> | <div class="dd-bottom"><span class="dd-bottom-t">🃏 Bottom cards</span> | <div class="dd-bottom"><span class="dd-bottom-t">🃏 今局の底札</span> | <div class="dd-bottom"><span class="dd-bottom-t">🃏 이번 판 바닥패</span> |
| 496 | <div class="dd-btns"><button class="btn cta" onclick="ddAgain()">再来一局</button> | <div class="dd-btns"><button class="btn cta" onclick="ddAgain()">Play again</button> | <div class="dd-btns"><button class="btn cta" onclick="ddAgain()">もう一局</button> | <div class="dd-btns"><button class="btn cta" onclick="ddAgain()">한 판 더</button> |
| 497 | <div class="dd-btns"><button class="btn" onclick="ddHideHistory()">返回</button></div> | <div class="dd-btns"><button class="btn" onclick="ddHideHistory()">Back</button></div> | <div class="dd-btns"><button class="btn" onclick="ddHideHistory()">戻る</button></div> | <div class="dd-btns"><button class="btn" onclick="ddHideHistory()">돌아가기</button></div> |
| 498 | <div class="dd-cheat"><span class="dd-cheat-t">🃏 出千月巴出千了</span> | <div class="dd-cheat"><span class="dd-cheat-t">🃏 Cheat Banny cheated</span> | <div class="dd-cheat"><span class="dd-cheat-t">🃏 イカサマバニーがイカサマした</span> | <div class="dd-cheat"><span class="dd-cheat-t">🃏 치팅 버니가 치팅했다</span> |
| 499 | <div class="dd-cheat-row"><span>它用</span> | <div class="dd-cheat-row"><span>It used</span> | <div class="dd-cheat-row"><span>それは</span> | <div class="dd-cheat-row"><span>그것은</span> |
| 500 | <div class="dd-lastrow last"><span class="dd-tag gold">最后一手 | <div class="dd-lastrow last"><span class="dd-tag gold">Final play | <div class="dd-lastrow last"><span class="dd-tag gold">最後の一手 | <div class="dd-lastrow last"><span class="dd-tag gold">마지막 패 |
| 501 | <div class="dd-lastrow rest"><span class="dd-tag">没出的牌 ·  | <div class="dd-lastrow rest"><span class="dd-tag">Unplayed cards ·  | <div class="dd-lastrow rest"><span class="dd-tag">出していない札 ·  | <div class="dd-lastrow rest"><span class="dd-tag">내지 않은 패 ·  |
| 502 | <div class="dd-result"><span>净收益</span><b class=" | <div class="dd-result"><span>Net</span><b class=" | <div class="dd-result"><span>純収益</span><b class=" | <div class="dd-result"><span>순수익</span><b class=" |
| 503 | <div class="dd-result"><span>押注</span><b> | <div class="dd-result"><span>Bet</span><b> | <div class="dd-result"><span>賭け</span><b> | <div class="dd-result"><span>베팅</span><b> |
| 504 | <div class="dd-result"><span>押注</span><b>随便玩玩（不押注）</b></div> | <div class="dd-result"><span>Bet</span><b>Just for fun (no bet)</b></div> | <div class="dd-result"><span>賭け</span><b>気軽に遊ぶ（賭けなし）</b></div> | <div class="dd-result"><span>베팅</span><b>가볍게 즐기기(베팅 없음)</b></div> |
| 505 | <div class="dd-result"><span>返还</span><b> | <div class="dd-result"><span>Return</span><b> | <div class="dd-result"><span>払い戻し</span><b> | <div class="dd-result"><span>환급</span><b> |
| 506 | <div class="dd-result"><span>难度</span><b><img class="dd-ic" src=" | <div class="dd-result"><span>Difficulty</span><b><img class="dd-ic" src=" | <div class="dd-result"><span>難易度</span><b><img class="dd-ic" src=" | <div class="dd-result"><span>난이도</span><b><img class="dd-ic" src=" |
| 507 | <div class="dd-reveal"><div class="dd-reveal-t">🃏 本局牌面</div> | <div class="dd-reveal"><div class="dd-reveal-t">🃏 This game’s hands</div> | <div class="dd-reveal"><div class="dd-reveal-t">🃏 今局の手札</div> | <div class="dd-reveal"><div class="dd-reveal-t">🃏 이번 판 패</div> |
| 508 | <div class="dd-st-sec"><div class="dd-st-t">各难度输赢</div> | <div class="dd-st-sec"><div class="dd-st-t">Results by difficulty</div> | <div class="dd-st-sec"><div class="dd-st-t">難易度別の勝敗</div> | <div class="dd-st-sec"><div class="dd-st-t">난이도별 승패</div> |
| 509 | <div class="dd-st-sec"><div class="dd-st-t">整体战绩</div> | <div class="dd-st-sec"><div class="dd-st-t">Overall record</div> | <div class="dd-st-sec"><div class="dd-st-t">全体の戦績</div> | <div class="dd-st-sec"><div class="dd-st-t">전체 전적</div> |
| 510 | <div class="dd-st-sec"><div class="dd-st-t">累计番茄走势</div> | <div class="dd-st-sec"><div class="dd-st-t">Tomato trend</div> | <div class="dd-st-sec"><div class="dd-st-t">累計トマトの推移</div> | <div class="dd-st-sec"><div class="dd-st-t">누적 토마토 추이</div> |
| 511 | <div class="dd-st-sec"><div class="dd-st-t">评级分布（ | <div class="dd-st-sec"><div class="dd-st-t">Rating distribution ( | <div class="dd-st-sec"><div class="dd-st-t">評価の分布（ | <div class="dd-st-sec"><div class="dd-st-t">평가 분포 ( |
| 512 | <div class="dd-st-sec"><div class="dd-st-t">身份胜率</div> | <div class="dd-st-sec"><div class="dd-st-t">Win rate by role</div> | <div class="dd-st-sec"><div class="dd-st-t">役割別勝率</div> | <div class="dd-st-sec"><div class="dd-st-t">역할별 승률</div> |
| 513 | <div class="dd-st-spark-lb">最新累计 <b class=" | <div class="dd-st-spark-lb">Latest total <b class=" | <div class="dd-st-spark-lb">最新の累計 <b class=" | <div class="dd-st-spark-lb">최신 누적 <b class=" |
| 514 | <div class="sub">上家  | <div class="sub">Previous player  | <div class="sub">前の人は  | <div class="sub">앞사람은  |
| 515 | <div class="sub">你的手牌评分 <b> | <div class="sub">Your hand score <b> | <div class="sub">あなたの手札評価 <b> | <div class="sub">네 패 점수 <b> |
| 516 | <div class="sub">本轮首家，可自由出牌</div> | <div class="sub">You lead this round — play anything</div> | <div class="sub">今局の最初なので自由に出せます</div> | <div class="sub">이번 라운드 선두라 자유롭게 낼 수 있어요</div> |
| 517 | <div class="sub">看完手牌，再点「👑 叫地主」或「🙅 不叫」</div> | <div class="sub">Check your hand, then tap 👑 Call Landlord or 🙅 Pass</div> | <div class="sub">手札を見てから「👑 地主を宣言」か「🙅 パス」を押してください</div> | <div class="sub">패를 본 뒤 👑 지주 선언 또는 🙅 패스를 누르세요</div> |
| 518 | <div>点右上角 ? 看规则</div><div class="sub">押注后开始牌局</div> | <div>Tap ? at the top right for rules</div><div class="sub">Place a bet to start</div> | <div>右上の ? でルールを確認</div><div class="sub">賭けてから開始します</div> | <div>오른쪽 위 ? 로 규칙 보기</div><div class="sub">베팅하면 시작됩니다</div> |
| 519 | <em>🏆 赢家</em> | <em>🏆 Winner</em> | <em>🏆 勝者</em> | <em>🏆 승자</em> |
| 520 | <h3>📜 斗月巴战绩</h3> | <h3>📜 Banny Duel Record</h3> | <h3>📜 バニー対決の戦績</h3> | <h3>📜 버니 맞짱 전적</h3> |
| 521 | <p class="dd-note">当前余额  | <p class="dd-note">Current balance  | <p class="dd-note">現在の残高  | <p class="dd-note">현재 잔액  |
| 522 | <p class="dd-note">🃏 这局出千月巴露过面：连胜清零，下次遇到它的概率回到 3%</p> | <p class="dd-note">🃏 Cheat Banny showed up: win streak reset, its chance returns to 3% next time</p> | <p class="dd-note">🃏 今局イカサマバニーが現れました：連勝リセット、次に会う確率は 3% に戻ります</p> | <p class="dd-note">🃏 이번 판 치팅 버니가 나타났어요: 연승 초기화, 다음 확률은 3%로 돌아갑니다</p> |
| 523 | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">还没有战绩，去打一局吧～</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">No records yet — go play a round!</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">まだ戦績がありません。一局打ってみましょう～</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">아직 전적이 없어요. 한 판 해 볼까요~</p> |
| 524 | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">还没有战绩，去打一局就有统计啦～</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">No records yet — play a round to see stats!</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">まだ戦績がありません。一局打てば統計が出ます～</p> | <p style="color:var(--dim);font-weight:800;text-align:center;margin:18px 0;">아직 전적이 없어요. 한 판 하면 통계가 나와요~</p> |
| 525 | <p style="font-size:12px;color:var(--dim);font-weight:800;line-height:1.6;">共 <b> | <p style="font-size:12px;color:var(--dim);font-weight:800;line-height:1.6;">Total <b> | <p style="font-size:12px;color:var(--dim);font-weight:800;line-height:1.6;">全 <b> | <p style="font-size:12px;color:var(--dim);font-weight:800;line-height:1.6;">총 <b> |
| 526 | <p style="font-size:12px;color:var(--dim);font-weight:800;text-align:center;margin:10px 0;">再打几局就有走势图了～（当前累计  | <p style="font-size:12px;color:var(--dim);font-weight:800;text-align:center;margin:10px 0;">Play a few more games for a trend chart — (current total  | <p style="font-size:12px;color:var(--dim);font-weight:800;text-align:center;margin:10px 0;">あと数局で推移グラフが出ます～（現在の累計  | <p style="font-size:12px;color:var(--dim);font-weight:800;text-align:center;margin:10px 0;">몇 판 더 하면 추이 그래프가 나와요~ (현재 누적  |
| 527 | <span class="chq" title="本局 1 号位是出千月巴：它用手里最小的单牌换走了你最大的一张">🃏 出千</span> | <span class="chq" title="Seat 1 this game was Cheat Banny: it swapped its smallest single for your highest card">🃏 Cheat</span> | <span class="chq" title="今局 1 番席はイカサマバニー：手持ちで一番小さい単枚を、あなたの一番大きい札と入れ替えました">🃏 イカサマ</span> | <span class="chq" title="이번 판 1번 자리가 치팅 버니: 손패에서 가장 작은 단일패를 네 가장 큰 패와 바꿔치기했다">🃏 치팅</span> |
| 528 | <span class="l">😿 负</span> | <span class="l">😿 Loss</span> | <span class="l">😿 負け</span> | <span class="l">😿 패</span> |
| 529 | <span class="mid">换走了你的</span> | <span class="mid"> to swap away your  | <span class="mid">と入れ替えて、あなたの | <span class="mid">와 바꿔치기해 너의  |
| 530 | <span class="pass">不要</span> | <span class="pass">Pass</span> | <span class="pass">パス</span> | <span class="pass">패스</span> |
| 531 | <span class="pass">已出完</span> | <span class="pass">All played</span> | <span class="pass">出し終わり</span> | <span class="pass">다 냄</span> |
| 532 | <span class="q">随便玩玩（不押注）</span> | <span class="q">Just for fun (no bet)</span> | <span class="q">気軽に遊ぶ（賭けなし）</span> | <span class="q">가볍게 즐기기(베팅 없음)</span> |
| 533 | <span class="q">🚪 认输</span> | <span class="q">🚪 Forfeit</span> | <span class="q">🚪 降参</span> | <span class="q">🚪 기권</span> |
| 534 | <span class="tx">本局评级 <b> | <span class="tx">This game’s rating <b> | <span class="tx">今局の評価 <b> | <span class="tx">이번 판 평가 <b> |
| 535 | <span class="w">🎉 胜</span> | <span class="w">🎉 Win</span> | <span class="w">🎉 勝ち</span> | <span class="w">🎉 승리</span> |
| 536 | <span style="font-size:12px;color:var(--dim);font-weight:800">等待  | <span style="font-size:12px;color:var(--dim);font-weight:800">Waiting for  | <span style="font-size:12px;color:var(--dim);font-weight:800">待機中  | <span style="font-size:12px;color:var(--dim);font-weight:800">대기 중  |
| 537 | <span><i style="background:#5aa95a"></i>胜  | <span><i style="background:#5aa95a"></i>Win  | <span><i style="background:#5aa95a"></i>勝  | <span><i style="background:#5aa95a"></i>승  |
| 538 | <span><i style="background:#b6a992"></i>认输  | <span><i style="background:#b6a992"></i>Forfeit  | <span><i style="background:#b6a992"></i>降参  | <span><i style="background:#b6a992"></i>기권  |
| 539 | <span><i style="background:#e0915a"></i>负  | <span><i style="background:#e0915a"></i>Loss  | <span><i style="background:#e0915a"></i>負  | <span><i style="background:#e0915a"></i>패  |
| 540 | <text x="50" y="63" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" opacity=".62">胜率</text> | <text x="50" y="63" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" opacity=".62">Win rate</text> | <text x="50" y="63" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" opacity=".62">勝率</text> | <text x="50" y="63" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" opacity=".62">승률</text> |
| 541 | ⭐ S+ 对局 | ⭐ S+ games | ⭐ S+ の対局 | ⭐ S+ 판 |
| 542 | ⭐ 打出 S+ 评级的局 | ⭐ Games rated S+ | ⭐ S+ 評価を出した対局 | ⭐ S+ 평가를 받은 판 |
| 543 | 」当地主 | " becomes the Landlord | 」が地主 | "가 지주 |
| 544 | 三带一 | Triple + 1 | スリー＋1 | 트리플+1 |
| 545 | 三带二 | Triple + Pair | スリー＋ペア | 트리플+페어 |
| 546 | 三张 | Triple | スリーカード | 트리플 |
| 547 | 不是合法的牌型 | Not a valid combination | 正しい牌型ではありません | 올바른 족보가 아니에요 |
| 548 | 不要 | Pass | パス | 패스 |
| 549 | 亏了 <b class="neg"> | Lost <b class="neg"> | 負け <b class="neg"> | 손실 <b class="neg"> |
| 550 | 今日押注次数已用完（ | No bets left today ( | 本日の賭け回数を使い切りました（ | 오늘 베팅 횟수를 다 썼어요 ( |
| 551 | 今日押注次数：剩余 <b> | Bets left today: <b> | 本日の残り賭け回数：<b> | 오늘 남은 베팅 횟수: <b> |
| 552 | 你 | You | あなた | 너 |
| 553 | 你一共打出 S+ 评级 | You’ve earned S+ rating in  | S+ 評価を出したのは合計  | S+ 평가를 받은 판은 총  |
| 554 | 你叫了地主 | You called Landlord | あなたが地主を宣言しました | 네가 지주를 선언했다 |
| 555 | 你是本轮首家，必须出牌 | You lead this round — you must play | 今局の最初なので必ず出してください | 이번 라운드 선두라 반드시 내야 해요 |
| 556 | 你的身份：🌾 农民 | Your role: 🌾 Peasant | あなたの役：🌾 農民 | 네 역할: 🌾 농민 |
| 557 | 你的身份：👑 地主 | Your role: 👑 Landlord | あなたの役：👑 地主 | 네 역할: 👑 지주 |
| 558 | 你赢了 🎉 | You win 🎉 | あなたの勝ちです 🎉 | 네가 이겼어요 🎉 |
| 559 | 先选牌再出 | Pick cards first | 先に札を選んでください | 먼저 패를 고르세요 |
| 560 | 农民 | Peasant | 農民 | 농민 |
| 561 | 出千月巴 | Cheat Banny | イカサマバニー | 치팅 버니 |
| 562 | 出牌 <b> | Plays <b> | 出牌 <b> | 낸 횟수 <b> |
| 563 | 分 | pts | 点 | 점 |
| 564 | 初始牌 <b> | Starting hand <b> | 初期手札 <b> | 초기 패 <b> |
| 565 | 单张 | Single | 単枚 | 단일 |
| 566 | 只能由你当地主 | So you have to be the Landlord | あなたが地主になります | 네가 지주가 됩니다 |
| 567 | 叫了地主 |  called Landlord | が地主を宣言しました | 가 지주를 선언했다 |
| 568 | 叫地主中 | Calling Landlord… | 地主を宣言中… | 지주 선언 중… |
| 569 | 和 |  and  | と | 와  |
| 570 | 四带两对 | Four + Two Pairs | フォー＋2ペア | 포카드+두 페어 |
| 571 | 四带二 | Four + 2 | フォー＋2 | 포카드+2 |
| 572 | 地主 | Landlord | 地主 | 지주 |
| 573 | 大王 | Big Joker | 大ジョーカー | 큰 조커 |
| 574 | 它一共露面 | It appeared | 合計で登場 | 모두 등장 |
| 575 | 它用  | It used  | それは  | 그것은  |
| 576 | 对子 | Pair | ペア | 페어 |
| 577 | 小王 | Small Joker | 小ジョーカー | 작은 조커 |
| 578 | 已恢复上一局 | Restored last game | 前局を復元しました | 지난 판을 복원했어요 |
| 579 | 思考中… | Thinking… | 考え中… | 생각 중… |
| 580 | 手牌评分 你  | Hand score — you  | 手札評価 あなた  | 패 점수 너  |
| 581 | 打不过上家的牌 | Doesn’t beat the previous play | 前の手より弱いです | 앞 패를 이기지 못해요 |
| 582 | 押注至少 1 🍅，或点「随便玩玩」 | Bet at least 1 🍅, or tap "just for fun" | 1 🍅 以上賭けるか、「気軽に遊ぶ」を押してください | 1 🍅 이상 베팅하거나 "가볍게 즐기기"를 누르세요 |
| 583 | 接着打，押注与手牌都还在 | Continue — your bet and hand are still there | 続きから。賭けも手札もそのままです | 이어서. 베팅도 패도 그대로예요 |
| 584 | 是地主，开始出牌 |  is the Landlord — play begins | が地主です。出牌開始 | 가 지주입니다. 시작합니다 |
| 585 | 暂无对局 | No games yet | 対局なし | 판 없음 |
| 586 | 最高押注 100 🍅 | Max bet 100 🍅 | 最高賭け 100 🍅 | 최대 베팅 100 🍅 |
| 587 | 未出牌 | Not played | 未出牌 | 안 냄 |
| 588 | 本局结束 | Game over | 本局終了 | 판 종료 |
| 589 | 本局结束，余额  | Game over — balance  | 本局終了、残高  | 판 종료, 잔액  |
| 590 | 没有能压过的牌，只能不要 | Nothing beats it — you must pass | 勝てる札がないので、パスしかできません | 이길 패가 없어 패스만 가능해요 |
| 591 | 牌 | Cards | 札 | 패 |
| 592 | 牌局还没结束，现在退出会判为认输，押注不退。确定退出吗？ | The game isn’t over yet. Quitting now counts as a forfeit and your bet is not returned. Quit anyway? | 牌局はまだ終わっていません。今やめると降参扱いになり、賭けは戻りません。本当にやめますか？ | 아직 판이 끝나지 않았어요. 지금 나가면 기권으로 처리되고 베팅은 돌려받지 못해요. 정말 나갈까요? |
| 593 | 番茄不够，最多押  | Not enough Tomatoes — max bet  | トマトが足りません。最大  | 토마토가 부족해요. 최대  |
| 594 | 秒 | s | 秒 | 초 |
| 595 | 胜  | Win  | 勝  | 승  |
| 596 | 获胜） |  wins) | の勝ち） |  승) |
| 597 | 认输退出 | Forfeit | 降参して退出 | 기권하고 나가기 |
| 598 | 赚了 <b class="pos">+ | Won <b class="pos">+ | 得た <b class="pos">+ | 획득 <b class="pos">+ |
| 599 | 赢了 | won | 勝ち | 승리 |
| 600 | 轮到你出牌 | Your turn | あなたの番です | 네 차례예요 |
| 601 | 连对 | Consecutive pairs | 連続ペア | 연속 페어 |
| 602 | 连顺 | Straight | ストレート | 스트레이트 |
| 603 | 都不叫地主 |  both passed | はどちらも地主を宣言しませんでした |  둘 다 지주를 선언하지 않았다 |
| 604 | 都没人叫地主，手牌最好的「 | Nobody called Landlord — best hand: " | 誰も地主を宣言しませんでした。一番強い手札の「 | 아무도 지주를 선언하지 않았다. 가장 강한 패는 " |
| 605 | 随便玩玩 | Just for fun | 気軽に遊ぶ | 가볍게 즐기기 |
| 606 | 飞机 | Airplane | 飛行機 | 비행기 |
| 607 | 飞机带单 | Airplane + Singles | 飛行機＋単枚 | 비행기+단일 |
| 608 | 飞机带对 | Airplane + Pairs | 飛行機＋ペア | 비행기+페어 |
| 609 | 🃏 出千月巴出千了！ | 🃏 Cheat Banny cheated! | 🃏 イカサマバニーがイカサマした！ | 🃏 치팅 버니가 치팅했다! |
| 610 | 🃏 出千月巴对局 | 🃏 Cheat Banny games | 🃏 イカサマバニーとの対局 | 🃏 치팅 버니와의 판 |
| 611 | 🃏 撞上出千月巴的局 | 🃏 Games where Cheat Banny appeared | 🃏 イカサマバニーに当たった対局 | 🃏 치팅 버니를 만난 판 |
| 612 | 🃏 本局遇到出千月巴概率 <b> | 🃏 Chance of Cheat Banny this game <b> | 🃏 今局イカサマバニーに会う確率 <b> | 🃏 이번 판 치팅 버니를 만날 확률 <b> |
| 613 | 🃏 连胜 <b> | 🃏 Win streak <b> | 🃏 連勝 <b> | 🃏 연승 <b> |
| 614 | 🌾 你当农民 | 🌾 You as Peasant | 🌾 あなたが農民 | 🌾 네가 농민 |
| 615 | 🌾 农民 | 🌾 Peasant | 🌾 農民 | 🌾 농민 |
| 616 | 🌾农民 | 🌾Peasant | 🌾農民 | 🌾농민 |
| 617 | 🍅</b> · 共  | 🍅</b> · Total  | 🍅</b> · 全  | 🍅</b> · 총  |
| 618 | 🍅</b>（押  | 🍅</b> (bet  | 🍅</b>（賭け  | 🍅</b> (베팅  |
| 619 | 🎉 你赢了！ | 🎉 You win! | 🎉 あなたの勝ち！ | 🎉 네가 이겼어요! |
| 620 | 👑 你当地主 | 👑 You as Landlord | 👑 あなたが地主 | 👑 네가 지주 |
| 621 | 👑 地主 | 👑 Landlord | 👑 地主 | 👑 지주 |
| 622 | 👑地主 | 👑Landlord | 👑地主 | 👑지주 |
| 623 | 💥炸弹 | 💥Bomb | 💥ボム | 💥폭탄 |
| 624 | 😿 你输了 | 😿 You lose | 😿 あなたの負け | 😿 네가 졌어요 |
| 625 | 🚀王炸 | 🚀Rocket | 🚀ロケット | 🚀로켓 |
| 626 | 🚪 认输退出 | 🚪 Forfeit | 🚪 降参して退出 | 🚪 기권하고 나가기 |
| 627 | ），只能「随便玩玩」 | ), so only "just for fun" is available | ）、「気軽に遊ぶ」しかできません | ), "가볍게 즐기기"만 가능해요 |
| 628 | 墨镜月巴 | Sunglasses Banny | サングラスバニー | 선글라스 버니 |
| 629 | 进食月巴 | Munching Banny | もぐもぐバニー | 냠냠 버니 |
| 630 | 背头月巴 | Slick-Back Banny | オールバックバニー | 올백 버니 |
| 631 | 简单 | Easy | 簡単 | 쉬움 |
| 632 | 中等 | Medium | 普通 | 보통 |
| 633 | 困难 | Hard | 難しい | 어려움 |
| 634 | S 神级 | S — Divine | S 神級 | S 신급 |
| 635 | A 优秀 | A — Excellent | A 優秀 | A 우수 |
| 636 | B 良好 | B — Good | B 良好 | B 양호 |
| 637 | C 及格 | C — Pass | C 合格 | C 합격 |
| 638 | D 差劲 | D — Poor | D 不振 | D 미흡 |
| 639 |  个 🍅！</p> |  Tomatoes!</p> |  個の 🍅！</p> |  🍅!</p> |
| 640 |  个番茄</p> |  Tomatoes</p> |  個のトマト</p> |  토마토</p> |
| 641 |  留下的对局，结算后会占用今天的次数</p> |  left over from an unfinished game — once settled it will count toward today’s limit</p> |  で残った対局です。精算すると本日の回数を使います</p> |  로 남은 판이에요. 정산되면 오늘 횟수를 사용합니다</p> |
| 642 |  轮 · 赌注  |  round · Bet  |  ラウンド · 賭け  |  라운드 · 베팅  |
| 643 |  轮：赢了变  |  rounds: win and it becomes  |  ラウンド：勝てば  |  라운드: 이기면  |
| 644 |  🍅</button><button class="btn cta" onclick="gambleContinue()">🔥 继续赌 × |  🍅</button><button class="btn cta" onclick="gambleContinue()">🔥 Keep betting × |  🍅</button><button class="btn cta" onclick="gambleContinue()">🔥 賭け続ける × |  🍅</button><button class="btn cta" onclick="gambleContinue()">🔥 계속 베팅 × |
| 645 | </div><p style="text-align:center;color:var(--dim);font-size:11px;margin:10px 0 0">当前金币 🪙  | </div><p style="text-align:center;color:var(--dim);font-size:11px;margin:10px 0 0">Current Coins 🪙  | </div><p style="text-align:center;color:var(--dim);font-size:11px;margin:10px 0 0">現在のコイン 🪙  | </div><p style="text-align:center;color:var(--dim);font-size:11px;margin:10px 0 0">현재 코인 🪙  |
| 646 | <div class="gb-btns"><button class="btn cta" onclick="gambleRoll(\'small\')">押小 1·2·3</button><button class="btn cta" onclick="gambleRoll(\'big\')">押大 4·5·6</button></div> | <div class="gb-btns"><button class="btn cta" onclick="gambleRoll(’small’)">Bet Small 1·2·3</button><button class="btn cta" onclick="gambleRoll(’big’)">Bet Big 4·5·6</button></div> | <div class="gb-btns"><button class="btn cta" onclick="gambleRoll(’small’)">小に賭ける 1·2·3</button><button class="btn cta" onclick="gambleRoll(’big’)">大に賭ける 4·5·6</button></div> | <div class="gb-btns"><button class="btn cta" onclick="gambleRoll(’small’)">작은 수 1·2·3</button><button class="btn cta" onclick="gambleRoll(’big’)">큰 수 4·5·6</button></div> |
| 647 | <div class="gb-btns"><button class="btn" onclick="gambleCashOut()">🛑 收下  | <div class="gb-btns"><button class="btn" onclick="gambleCashOut()">🛑 Take  | <div class="gb-btns"><button class="btn" onclick="gambleCashOut()">🛑 受け取る  | <div class="gb-btns"><button class="btn" onclick="gambleCashOut()">🛑 받기  |
| 648 | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">下次再来。</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">Maybe next time.</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">また今度。</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">다음에 또.</button></p> |
| 649 | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">收下离开</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">Take it and leave</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">受け取って離開</button></p> | <p style="text-align:center"><button class="btn cta" onclick="closeModal()">받고 나가기</button></p> |
| 650 | <p style="text-align:center;color:#e08a3c;font-size:17px;font-weight:800;margin:0 0 14px">收获  | <p style="text-align:center;color:#e08a3c;font-size:17px;font-weight:800;margin:0 0 14px">You won  | <p style="text-align:center;color:#e08a3c;font-size:17px;font-weight:800;margin:0 0 14px">獲得  | <p style="text-align:center;color:#e08a3c;font-size:17px;font-weight:800;margin:0 0 14px">획득  |
| 651 | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 6px">⏳ 这是  | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 6px">⏳ This is  | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 6px">⏳ これは  | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 6px">⏳ 이것은  |
| 652 | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 8px">押大（4·5·6）还是押小（1·2·3）？赢了番茄到手，还能继续加注。</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 8px">Big (4·5·6) or Small (1·2·3)? Win to take the Tomatoes and raise the stake.</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 8px">大（4·5·6）か小（1·2·3）？勝てばトマトを獲得、さらに賭けを続けられます。</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:0 0 8px">큰 수(4·5·6)일까 작은 수(1·2·3)일까? 이기면 토마토를 받고 계속 베팅할 수 있어요.</p> |
| 653 | <p style="text-align:center;color:var(--dim);font-size:11px;margin:8px 0 0">开骰中，请稍等一会儿～</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:8px 0 0">Rolling — one moment~</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:8px 0 0">サイコロを振っています。少々お待ちを～</p> | <p style="text-align:center;color:var(--dim);font-size:11px;margin:8px 0 0">주사위를 굴리는 중이에요. 잠시만 기다려 주세요~</p> |
| 654 | <p style="text-align:center;color:var(--dim);font-size:12px;margin:0 0 12px">第  | <p style="text-align:center;color:var(--dim);font-size:12px;margin:0 0 12px">Round  | <p style="text-align:center;color:var(--dim);font-size:12px;margin:0 0 12px">第  | <p style="text-align:center;color:var(--dim);font-size:12px;margin:0 0 12px">  |
| 655 | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 10px">用金币换番茄，和月巴赌一把大小。<br>赢了拿番茄，输了金币归月巴（每天一次）。</p><div class="gb-tiers"> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 10px">Trade Coins for Tomatoes and bet high or low against the Banny.<br>Win to take the Tomatoes; lose and the Coins go to the Banny (once a day).</p><div class="gb-tiers"> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 10px">コインをトマトに替えて、バニーと大小勝負。<br>勝てばトマト、負ければコインはバニーのもの（1 日 1 回）。</p><div class="gb-tiers"> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 10px">코인을 토마토로 바꿔 버니와 큰 수·작은 수 승부를 해요.<br>이기면 토마토, 지면 코인은 버니 몫(하루 한 번).</p><div class="gb-tiers"> |
| 656 | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 4px">第  | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 4px">Round  | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 4px">第  | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 4px">  |
| 657 | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 8px">月巴正在摇骰子……</p> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 8px">The Banny is rolling…</p> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 8px">バニーがサイコロを振っています……</p> | <p style="text-align:center;color:var(--text);font-size:13px;margin:2px 0 8px">버니가 주사위를 굴리고 있어요……</p> |
| 658 | <p style="text-align:center;color:var(--text);font-size:14px;margin:0 0 14px">猜错了，月巴把所有番茄和金币都收走了……</p> | <p style="text-align:center;color:var(--text);font-size:14px;margin:0 0 14px">Wrong guess — the Banny took every Tomato and Coin…</p> | <p style="text-align:center;color:var(--text);font-size:14px;margin:0 0 14px">読み違えました。バニーがトマトもコインも全部持っていきました……</p> | <p style="text-align:center;color:var(--text);font-size:14px;margin:0 0 14px">잘못 짚었어요. 버니가 토마토와 코인을 전부 가져갔어요……</p> |
| 659 | <p style="text-align:center;font-size:15px;color:#e08a3c;font-weight:800;margin:6px 0">🍅 手上现在有  | <p style="text-align:center;font-size:15px;color:#e08a3c;font-weight:800;margin:6px 0">🍅 You now hold  | <p style="text-align:center;font-size:15px;color:#e08a3c;font-weight:800;margin:6px 0">🍅 現在の手持ちは  | <p style="text-align:center;font-size:15px;color:#e08a3c;font-weight:800;margin:6px 0">🍅 지금 가진 것은  |
| 660 | <p style="text-align:center;margin-top:10px"><button class="btn" onclick="closeModal()">先离开（可再进来继续）</button></p> | <p style="text-align:center;margin-top:10px"><button class="btn" onclick="closeModal()">Leave for now (come back to continue)</button></p> | <p style="text-align:center;margin-top:10px"><button class="btn" onclick="closeModal()">いったん離開（また続けられます）</button></p> | <p style="text-align:center;margin-top:10px"><button class="btn" onclick="closeModal()">잠시 나가기 (다시 이어서 가능)</button></p> |
| 661 | <p style="text-align:center;margin-top:8px"><button class="btn" onclick="closeModal()">收下离开</button></p> | <p style="text-align:center;margin-top:8px"><button class="btn" onclick="closeModal()">Take it and leave</button></p> | <p style="text-align:center;margin-top:8px"><button class="btn" onclick="closeModal()">受け取って離開</button></p> | <p style="text-align:center;margin-top:8px"><button class="btn" onclick="closeModal()">받고 나가기</button></p> |
| 662 | 🎉 封顶大丰收 | 🎉 Max jackpot | 🎉 天井大豊作 | 🎉 최대 잭팟 |
| 663 | 🎲 第 1 轮 | 🎲 Round 1 | 🎲 第 1 ラウンド | 🎲 1라운드 |
| 664 | 🎲 输了 | 🎲 You lost | 🎲 負けました | 🎲 졌어요 |
| 665 | ，输了全没了。收手吗？</p> | , and lose it all. Cash out?</p> | 、負ければ全部なくなります。やめますか？</p> | , 지면 전부 잃어요. 그만둘까요?</p> |
| 666 |  个番茄！ |  Tomatoes! |  個のトマト！ |  토마토! |
| 667 |  次<br> |  times<br> |  回<br> |  회<br> |
| 668 | <button class="btn cta" onclick="tvStealAccept()">🚨 捉拿它</button> | <button class="btn cta" onclick="tvStealAccept()">🚨 Catch it</button> | <button class="btn cta" onclick="tvStealAccept()">🚨 捕まえる</button> | <button class="btn cta" onclick="tvStealAccept()">🚨 잡기</button> |
| 669 | <button class="btn" onclick="tvStealDecline()">😴 放过它</button> | <button class="btn" onclick="tvStealDecline()">😴 Let it go</button> | <button class="btn" onclick="tvStealDecline()">😴 見逃す</button> | <button class="btn" onclick="tvStealDecline()">😴 놓아주기</button> |
| 670 | <div class="tv-sg-tip">点击 / 触摸 / 按空格 让滑块停下 · <a href="javascript:void(0)" onclick="tsFinish()" style="color:var(--danger);font-weight:700;text-decoration:none;">🏳 放弃捉拿</a></div> | <div class="tv-sg-tip">Tap / touch / press Space to stop the slider · <a href="javascript:void(0)" onclick="tsFinish()" style="color:var(--danger);font-weight:700;text-decoration:none;">🏳 Give up</a></div> | <div class="tv-sg-tip">クリック / タッチ / スペースでスライダーを止める · <a href="javascript:void(0)" onclick="tsFinish()" style="color:var(--danger);font-weight:700;text-decoration:none;">🏳 諦める</a></div> | <div class="tv-sg-tip">클릭 / 터치 / 스페이스로 슬라이더를 멈추기 · <a href="javascript:void(0)" onclick="tsFinish()" style="color:var(--danger);font-weight:700;text-decoration:none;">🏳 포기하기</a></div> |
| 671 | <p class="tv-steal-sub">是否要捉拿这个月巴？</p> | <p class="tv-steal-sub">Catch this Banny?</p> | <p class="tv-steal-sub">このバニーを捕まえますか？</p> | <p class="tv-steal-sub">이 버니를 잡을까요?</p> |
| 672 | <p style="text-align:center;margin-top:14px"><button class="btn cta" onclick="closeModal()">收下</button></p> | <p style="text-align:center;margin-top:14px"><button class="btn cta" onclick="closeModal()">Take it</button></p> | <p style="text-align:center;margin-top:14px"><button class="btn cta" onclick="closeModal()">受け取る</button></p> | <p style="text-align:center;margin-top:14px"><button class="btn cta" onclick="closeModal()">받기</button></p> |
| 673 | <span>回合 <b id="tsRound">1</b>/ | <span>Round <b id="tsRound">1</b>/ | <span>ラウンド <b id="tsRound">1</b>/ | <span>라운드 <b id="tsRound">1</b>/ |
| 674 | <span>连击 <b id="tsCombo">0</b></span> | <span>Combo <b id="tsCombo">0</b></span> | <span>コンボ <b id="tsCombo">0</b></span> | <span>콤보 <b id="tsCombo">0</b></span> |
| 675 | <span>难度 <b id="tsSpeed"> | <span>Difficulty <b id="tsSpeed"> | <span>難易度 <b id="tsSpeed"> | <span>난이도 <b id="tsSpeed"> |
| 676 | 你追回了部分番茄。 | You recovered some of the Tomatoes. | トマトを一部取り戻しました。 | 토마토를 일부 되찾았어요. |
| 677 | 太好了，你没有损失任何番茄！这个月巴将会受到法律的审判。 | Great — you lost no Tomatoes at all! This Banny will face the law. | よかった、トマトは一つも失いませんでした！このバニーは法の裁きを受けます。 | 다행이에요, 토마토를 하나도 잃지 않았어요! 이 버니는 법의 심판을 받게 됩니다. |
| 678 | 成功捉拿  | Caught!  | 捕まえた！  | 잡았다!  |
| 679 | 月巴带着番茄溜走了……这次一颗番茄都没追回来。 | The Banny slipped away with the Tomatoes… not a single one recovered. | バニーはトマトを持って逃げました……今回は一つも取り戻せませんでした。 | 버니가 토마토를 들고 달아났어요……이번엔 하나도 되찾지 못했어요. |
| 680 | 正在偷你的番茄……</p> | is stealing your Tomatoes…</p> | がトマトを盗んでいます……</p> | 가 네 토마토를 훔치고 있어요……</p> |
| 681 | 🍅 奖励 + | 🍅 Reward + | 🍅 報酬 + | 🍅 보상 + |
| 682 | 🍅 这次没有奖励…… | 🍅 No reward this time… | 🍅 今回は報酬なし…… | 🍅 이번엔 보상이 없어요…… |
| 683 | 🎉 大获全胜 | 🎉 Total victory | 🎉 大勝利 | 🎉 대승리 |
| 684 | 😱 番茄不保 | 😱 Tomatoes lost | 😱 トマトが危ない | 😱 토마토를 잃었어요 |
| 685 | 🥲 追回了一部分 | 🥲 Partly recovered | 🥲 一部取り戻し | 🥲 일부 되찾음 |
| 686 | 命中 | Hit | 命中 | 명중 |
| 687 | 落空 | Miss | 空振り | 빗나감 |
| 688 | </b> 个槽位，收到了约 24 小时的金币产出</p> | </b> slots and received about 24 hours of Coin output</p> | </b> 個の発生枠、約 24 時間分のコイン産出を受け取りました</p> | </b>개 슬롯, 약 24시간분의 코인 생산을 받았어요</p> |
| 689 | <div style="margin-top:12px"><button class="btn cta" onclick="claimCode1001()">领取</button></div> | >Claim</button></div> | >受け取る</button></div> | >받기</button></div> |
| 690 | <div style="margin-top:12px"><button class="btn cta" onclick="claimCode4099()">领取</button></div> | >Claim</button></div> | >受け取る</button></div> | >받기</button></div> |
| 691 | <div style="margin-top:12px"><button class="btn cta" onclick="closeModal()">收下</button></div> | >Take it</button></div> | >受け取る</button></div> | >받기</button></div> |
| 692 | <input id="code1001In" inputmode="numeric" maxlength="4" onkeydown="if(event.keyCode===13)claimCode1001()" placeholder="请输入口令" style="padding:8px;border:1px solid #ccc;border-radius:8px;width:62%;text-align:center;font-size:16px;letter-spacing:4px"> | Enter the code | 口令を入力 | 코드를 입력 |
| 693 | <input id="code4099In" inputmode="numeric" maxlength="4" onkeydown="if(event.keyCode===13)claimCode4099()" placeholder="请输入口令" style="padding:8px;border:1px solid #ccc;border-radius:8px;width:62%;text-align:center;font-size:16px;letter-spacing:4px"> | Enter the code | 口令を入力 | 코드를 입력 |
| 694 | <p style="font-size:13px;color:var(--dim);margin:6px 0 10px">输入口令，领取中秋礼物（仅可领取一次）</p> | Enter the code to claim the Mid-Autumn gift (one-time only) | 口令を入力して中秋の贈り物を受け取る（1 回のみ） | 코드를 입력해 추석 선물을 받으세요 (1회만) |
| 695 | <p style="font-size:13px;color:var(--dim);margin:6px 0 10px">输入口令，领取国庆礼物（仅可领取一次）</p> | Enter the code to claim the National Day gift (one-time only) | 口令を入力して国慶節の贈り物を受け取る（1 回のみ） | 코드를 입력해 국경절 선물을 받으세요 (1회만) |
| 696 | <p style="font-size:13px;color:var(--text);margin:6px 0 4px">按你现有的 <b> | <p style="font-size:13px;color:var(--text);margin:6px 0 4px">Based on your current <b> | <p style="font-size:13px;color:var(--text);margin:6px 0 4px">現在の <b> | <p style="font-size:13px;color:var(--text);margin:6px 0 4px">현재 보유한 <b> |
| 697 | <p style="font-size:15px;font-weight:800;color:#e02424;margin:10px 0 4px"> 月巴和番茄祝贺大家国庆节快乐！🎉</p> |  Banny and Tomato wish everyone a happy National Day! 🎉 |  バニーとトマトが、みなさまの国慶節をお祝いします！🎉 |  버니와 토마토가 모두의 국경절을 축하해요! 🎉 |
| 698 | <p style="font-size:15px;font-weight:800;color:#e02424;margin:10px 0 4px">🌕 月巴和番茄祝大家中秋节快乐！🥮</p> | 🌕 Banny and Tomato wish everyone a happy Mid-Autumn Festival! 🥮 | 🌕 バニーとトマトが、みなさまの中秋節をお祝いします！🥮 | 🌕 버니와 토마토가 모두의 추석을 축하해요! 🥮 |
| 699 | 🎉 国庆口令 | 🎉 National Day code | 🎉 国慶節口令 | 🎉 국경절 코드 |
| 700 | 🎉 国庆快乐 | 🎉 Happy National Day | 🎉 国慶節おめでとう | 🎉 국경절 축하해요 |
| 701 | 🎑 中秋口令 | 🎑 Mid-Autumn code | 🎑 中秋節口令 | 🎑 추석 코드 |
| 702 | 🎑 中秋快乐 | 🎑 Happy Mid-Autumn | 🎑 中秋節おめでとう | 🎑 추석 축하해요 |
| 703 | （开启第二图鉴后还能额外获得 500 🍅） | (unlock the second Codex to get 500 extra 🍅) | （第二図鑑を解放すると追加で 500 🍅） | (두 번째 도감을 열면 500 🍅 추가) |
| 704 | （第二图鉴已开启，附赠 500 🍅） | (second Codex unlocked — 500 🍅 bonus) | （第二図鑑は解放済み、おまけで 500 🍅） | (두 번째 도감 해금됨, 500 🍅 보너스) |
| 705 | <div class="empty">本期还没有打卡记录</div> | <div class="empty">No check-ins this period</div> | <div class="empty">今期のチェックインはまだありません</div> | <div class="empty">이번 기간 체크인 기록이 없어요</div> |
| 706 | <span class="rep-diff up">▲ 上期无记录，全新开始</span> | <span class="rep-diff up">▲ No record last period — a fresh start</span> | <span class="rep-diff up">▲ 前期の記録なし、新たなスタート</span> | <span class="rep-diff up">▲ 지난 기간 기록 없음, 새로 시작</span> |
| 707 | <span class="rep-diff">— 上期无记录</span> | <span class="rep-diff">— No record last period</span> | <span class="rep-diff">— 前期の記録なし</span> | <span class="rep-diff">— 지난 기간 기록 없음</span> |
| 708 | ⏭ 跳过休息 · 下一个番茄 | ⏭ Skip break · next Pomodoro | ⏭ 休憩を飛ばす · 次のポモドーロ | ⏭ 휴식 건너뛰기 · 다음 뽀모도로 |
| 709 | ⏳ 专注中 · 生长 x2 · 自动收集 | ⏳ Focusing · Growth ×2 · Auto-collect | ⏳ 集中中 · 成長 ×2 · 自動回収 | ⏳ 집중 중 · 성장 ×2 · 자동 수확 |
| 710 | ⏸ 已暂停 | ⏸ Paused | ⏸ 一時停止 | ⏸ 일시정지 |
| 711 | ☕ 休息 | ☕ Break | ☕ 休憩 | ☕ 휴식 |
| 712 | ☕ 休息中 · 时长  | ☕ On a break · Length  | ☕ 休憩中 · 時間  | ☕ 휴식 중 · 시간  |
| 713 | ☕ 休息暂停 | ☕ Break paused | ☕ 休憩一時停止 | ☕ 휴식 일시정지 |
| 714 | 一 | Mon | 月 | 월 |
| 715 | 三 | Wed | 水 | 수 |
| 716 | 专注 | Focus | 集中 | 집중 |
| 717 | 专注中 · 生长 x2 | Focusing · Growth ×2 | 集中中 · 成長 ×2 | 집중 중 · 성장 ×2 |
| 718 | 二 | Tue | 火 | 화 |
| 719 | 五 | Fri | 金 | 금 |
| 720 | 休息 | Break | 休憩 | 휴식 |
| 721 | 休息中 · 自动收集 | On a break · Auto-collect | 休憩中 · 自動回収 | 휴식 중 · 자동 수확 |
| 722 | 六 | Sat | 土 | 토 |
| 723 | 四 | Thu | 木 | 목 |
| 724 | 就绪 · 点击开始专注 | Ready · tap to start focusing | 準備完了 · タップで集中開始 | 준비 완료 · 눌러서 집중 시작 |
| 725 | 当前环境不支持置顶（需 https + 新版浏览器） | Pinning isn’t supported here (needs https + a modern browser) | この環境ではピン留めを使えません（https + 新しいブラウザが必要） | 이 환경에서는 고정을 쓸 수 없어요 (https + 최신 브라우저 필요) |
| 726 | 收起 | Collapse | たたむ | 접기 |
| 727 | 收起置顶小窗 | Collapse the pinned window | ピン留め小窓をたたむ | 고정 미니 창 접기 |
| 728 | 未命名 | Untitled | 無題 | 이름 없음 |
| 729 | 每日专注目标（分钟）： | Daily focus goal (minutes): | 1 日の集中目標（分）： | 일일 집중 목표(분): |
| 730 | 置顶小窗 | Pin Mini Window | ミニウィンドウを固定 | 미니 창 고정 |
| 731 | 🎨 每 8 小时换一种颜色 · 一天最多 4 色（24 小时） | 🎨 A new colour every 8 hours · up to 4 colours a day (24 hours) | 🎨 8 時間ごとに色が変わる · 1 日最大 4 色（24 時間） | 🎨 8시간마다 색이 바뀜 · 하루 최대 4색(24시간) |
| 732 | （下次） | (next time) | （次回） | (다음에) |
| 733 |  在外路过时遇到了 <b> |  ran into <b> |  が外で <b> |  가 밖에서 <b> |
| 734 |  托它转交一封来自「 |  and asked it to pass on a letter from " |  に頼まれて、この手紙を届けてくれました。「 |  에게 부탁받아 이 편지를 전해 왔어요. " |
| 735 |  收下了  |  took  |  は受け取りました  |  는 받았어요  |
| 736 |  更想要的  |  wanted even more  |  がもっと欲しがっていた  |  가 더 원했던  |
| 737 | <div class="empty">今天还没有打卡记录</div> | <div class="empty">No check-ins today</div> | <div class="empty">今日のチェックインはまだありません</div> | <div class="empty">오늘 체크인 기록이 없어요</div> |
| 738 | <div class="empty">当天没有待办</div> | <div class="empty">No to-dos that day</div> | <div class="empty">その日のやることはありません</div> | <div class="empty">그날 할 일이 없어요</div> |
| 739 | <div class="empty">当天没有打卡</div> | <div class="empty">No check-ins that day</div> | <div class="empty">その日のチェックインはありません</div> | <div class="empty">그날 체크인 기록이 없어요</div> |
| 740 | <div class="task-none">暂无任务</div> | <div class="task-none">No tasks</div> | <div class="task-none">タスクはありません</div> | <div class="task-none">할 일이 없어요</div> |
| 741 | <p style="text-align:center"><button class="btn" onclick="closeModal()">收下</button></p> | <p style="text-align:center"><button class="btn" onclick="closeModal()">Take it</button></p> | <p style="text-align:center"><button class="btn" onclick="closeModal()">受け取る</button></p> | <p style="text-align:center"><button class="btn" onclick="closeModal()">받기</button></p> |
| 742 | <p style="text-align:center">已拥有 <b>小号护身符</b>，永久有效！</p><p style="text-align:center;font-size:12px;color:var(--dim)">把它<b>装进行囊</b>后生效：每周（周一 0 点刷新）可指定前往任意一张地图一次；随身带着，也会调整同一地区内「图一~图四」的抽取概率（更偏向靠后的地图），但不会改变去哪个地区。</p><p style="text-align:center"><button class="btn cta" onclick="tvShop()"> | <p style="text-align:center">You now have <b>Mini Charm</b> — permanent!</p><p style="text-align:center;font-size:12px;color:var(--dim)">It works once you <b>load it into the bag</b>: once a week (resets Monday 00:00) you can choose any map to visit; carrying it also shifts the odds among "Map 1–Map 4" within the same region (favoring the later maps), without changing which region you go to.</p><p style="text-align:center"><button class="btn cta" onclick="tvShop()"> | <p style="text-align:center"><b>小さいお守り</b>を手に入れました。永久有効です！</p><p style="text-align:center;font-size:12px;color:var(--dim)"><b>荷袋に入れる</b>と効果が出ます。毎週（月曜 0 時にリセット）1 回だけ任意のマップを指定できます。持ち歩くと、同じ地区内の「マップ 1〜マップ 4」の抽選確率も調整します（後ろのマップ寄り）。行き先の地区は変わりません。</p><p style="text-align:center"><button class="btn cta" onclick="tvShop()"> | <p style="text-align:center"><b>미니 부적</b>을 얻었어요. 영구 유효!</p><p style="text-align:center;font-size:12px;color:var(--dim)"><b>가방에 넣어야</b> 효과가 있어요. 매주(월요일 0시 초기화) 한 번 원하는 맵을 지정할 수 있고, 들고 다니면 같은 지역 안의 "맵 1~맵 4" 뽑기 확률도 조정해요(뒤쪽 맵 쪽으로). 가는 지역은 바뀌지 않아요.</p><p style="text-align:center"><button class="btn cta" onclick="tvShop()"> |
| 743 | <p style="text-align:center">💌 邻居  | <p style="text-align:center">💌 Your neighbor  | <p style="text-align:center">💌 ご近所の  | <p style="text-align:center">💌 이웃  |
| 744 | <p style="text-align:center;color:var(--text)">正好是  | <p style="text-align:center;color:var(--text)">It was exactly  | <p style="text-align:center;color:var(--text)">ちょうど  | <p style="text-align:center;color:var(--text)">마침  |
| 745 | <span class="task-chip tag">⏰ 超期</span> | <span class="task-chip tag">⏰ Overdue</span> | <span class="task-chip tag">⏰ 期限切れ</span> | <span class="task-chip tag">⏰ 기한 지남</span> |
| 746 | <span class="task-chip tag">🔄 习惯</span> | <span class="task-chip tag">🔄 Habit</span> | <span class="task-chip tag">🔄 習慣</span> | <span class="task-chip tag">🔄 습관</span> |
| 747 | • 有任务的日期带圆点 · 点击日期选择 / 查看当天待办 | • Dots mark days with tasks · tap a date to select / view that day’s to-dos | • タスクのある日はドット付き · 日付をタップして選択 / その日のやることを表示 | • 할 일이 있는 날은 점 표시 · 날짜를 눌러 선택 / 그날 할 일 보기 |
| 748 | ⏱ 时段 | ⏱ Time slot | ⏱ 時間帯 | ⏱ 시간대 |
| 749 | ● 有任务的日期带圆点 · 点击日期查看当天待办 | ● Dots mark days with tasks · tap a date to view that day’s to-dos | ● タスクのある日はドット付き · 日付をタップしてその日のやることを表示 | ● 할 일이 있는 날은 점 표시 · 날짜를 눌러 그날 할 일 보기 |
| 750 | ☀️ 下午 | ☀️ Afternoon | ☀️ 午後 | ☀️ 오후 |
| 751 | 」的信！</p> | "!</p> | 」の手紙！</p> | " 편지!</p> |
| 752 | 其他 | Other | その他 | 기타 |
| 753 | 去吹吹风。 | Go get some fresh air. | 風に当たってこよう。 | 바람 좀 쐬고 올까. |
| 754 | 去哪里呢？ | Where to? | どこへ行こう？ | 어디로 갈까? |
| 755 | 去捡一颗番茄回来。 | Go pick a tomato and bring it back. | トマトを一つ拾って帰ろう。 | 토마토 하나 주워 올까. |
| 756 | 去看看别处的月亮。 | Go see the moon somewhere else. | よその月を見に行こう。 | 다른 곳의 달을 보러 가자. |
| 757 | 去远方发一会儿呆。 | Go stare into the distance for a while. | 遠くをぼんやり眺めてこよう。 | 멀리 멍하니 바라보다 올까. |
| 758 | 小时 |  hours | 時間 | 시간 |
| 759 | 带上小番茄，出发！ | Take the little tomato and set off! | 小さなトマトを連れて、出発！ | 작은 토마토를 데리고 출발! |
| 760 | 带着番茄兜兜风。 | Take the tomato for a spin. | トマトと一緒に風を切ろう。 | 토마토와 함께 바람 좀 쐬자. |
| 761 | 所选日 | Selected day | 選択した日 | 선택한 날 |
| 762 | 揣上一颗番茄，说走就走。 | Tuck a tomato in and just go. | トマトを懐に入れて、えいっと出発。 | 토마토를 품에 넣고 그냥 떠나자. |
| 763 | 晒晒太阳再回来。 | Get some sun, then come back. | 日向ぼっこしてから帰ろう。 | 볕 좀 쬐고 돌아올까. |
| 764 | 最矮 | Shortest | 一番低い | 가장 작음 |
| 765 | 最轻 | Lightest | 一番軽い | 가장 가벼움 |
| 766 | 最重 | Heaviest | 一番重い | 가장 무거움 |
| 767 | 沿着小路一直走，会遇到番茄吗？ | Follow the path — will we find a tomato? | 小道をまっすぐ行けば、トマトに会えるかな？ | 오솔길을 따라가면 토마토를 만날까? |
| 768 | 沿着晚风走，走到哪算哪。 | Follow the evening breeze, wherever it goes. | 夕風の向くまま、気の向くまま。 | 저녁 바람 따라, 가는 대로. |
| 769 | 番茄说不能一直在床底，要出门走走。 | Tomato says it can’t stay under the bed forever — time to go out. | トマトが、ずっとベッドの下にはいられない、外へ出ようと言っています。 | 토마토가 계속 침대 밑에 있을 순 없다며 밖에 나가자고 해요. |
| 770 | 看看今天的云。 | Look at today’s clouds. | 今日の雲を見てみよう。 | 오늘 구름 좀 보자. |
| 771 | 说不定能遇到新的朋友。 | Maybe we’ll meet new friends. | 新しい友達に会えるかも。 | 새 친구를 만날지도 몰라. |
| 772 | 路边的番茄捡到就是我的了。 | Finders keepers — that roadside tomato is mine. | 道端のトマトは拾った人のもの。 | 길가의 토마토는 줍는 사람 거야. |
| 773 | 这次要走多远呢？ | How far shall we go this time? | 今回はどこまで行こうか。 | 이번엔 얼마나 멀리 갈까? |
| 774 | 远方的番茄在呼唤我。 | A tomato far away is calling me. | 遠くのトマトが私を呼んでいる。 | 멀리 있는 토마토가 나를 부르고 있어. |
| 775 | 随便走走吧。 | Just wander. | ぶらぶら歩こう。 | 그냥 걸어 보자. |
| 776 | 随便逛逛，给番茄带点伴手礼。 | Stroll around and bring the tomato a souvenir. | ぶらぶらしてお土産を買ってこよう。 | 어슬렁거리며 토마토에게 기념품을 사 오자. |
| 777 | 项 |  items |  件 |  개 |
| 778 | 🌅 上午 | 🌅 Morning | 🌅 午前 | 🌅 오전 |
| 779 | 🌅 明天 | 🌅 Tomorrow | 🌅 明日 | 🌅 내일 |
| 780 | 🌙 昨天 | 🌙 Yesterday | 🌙 昨日 | 🌙 어제 |
| 781 | 🌙 晚上 | 🌙 Evening | 🌙 夜 | 🌙 저녁 |
| 782 | 🎫 小号护身符 | 🎫 Mini Charm | 🎫 小さいお守り | 🎫 미니 부적 |
| 783 | 🎯 个人 | 🎯 Personal | 🎯 個人 | 🎯 개인 |
| 784 | 🏠 生活 | 🏠 Life | 🏠 生活 | 🏠 생활 |
| 785 | 💼 工作 | 💼 Work | 💼 仕事 | 💼 업무 |
| 786 | 📅 今天 | 📅 Today | 📅 今日 | 📅 오늘 |
| 787 | 📅 全部 | 📅 All | 📅 すべて | 📅 전체 |
| 788 | 📅 明天 | 📅 Tomorrow | 📅 明日 | 📅 내일 |
| 789 | 📋 今日待办清单 | 📋 Today’s to-do list | 📋 今日のやることリスト | 📋 오늘의 할 일 목록 |
| 790 | 📚 学习 | 📚 Study | 📚 勉強 | 📚 공부 |
| 791 | 🔴 高 | 🔴 High | 🔴 高 | 🔴 높음 |
| 792 | 🕐 每小时 | 🕐 Hourly | 🕐 毎時 | 🕐 매시간 |
| 793 | 🟡 中 | 🟡 Medium | 🟡 中 | 🟡 보통 |
| 794 | 🟢 低 | 🟢 Low | 🟢 低 | 🟢 낮음 |
| 795 | 🧪 已解锁全部图鉴：第一页  | 🧪 Unlocked the entire Codex: page one  | 🧪 図鑑をすべて解放しました：1 ページ目  | 🧪 도감을 전부 해금했어요: 1페이지  |
| 796 | （本次新增  |  (new this time  | （今回の追加  | (이번 추가  |
| 797 | ，不过它今天更想要别的，回礼 🍅 + | , though it wanted something else today. Gift back 🍅 + | , でも今日は別のものが欲しかったみたい。お返し 🍅 + | , 그래도 오늘은 다른 걸 더 원했나 봐요. 답례 🍅 + |
| 798 | ，它开心极了，回礼 🍅 + |  — it’s overjoyed! Gift back 🍅 + |  大喜びです！お返し 🍅 + |  아주 기뻐해요! 답례 🍅 + |
| 799 | ，开心地回礼 🍅 + | , and happily gave back 🍅 + | , 嬉しそうにお返しが来ました 🍅 + | , 기쁘게 답례했어요 🍅 + |
| 800 | ，第二页  | , page two  | , 2 ページ目  | , 2페이지  |
| 801 | ；皮肤  | ; skins  | ；スキン  | ; 스킨  |
| 802 |  · 全部通关！ |  · All cleared! |  · 全クリア！ |  · 전부 클리어! |
| 803 |  · 已通关（可反复刷最短用时） |  · Cleared (replay to beat your best time) |  · クリア済み（最短タイムを更新できます） |  · 클리어함 (최단 기록 갱신 가능) |
| 804 |  · 最快 <b> |  · Best <b> |  · 最速 <b> |  · 최고 <b> |
| 805 |  · 还剩  |  ·  |  · 残り  |  · 남은  |
| 806 |  个 🍅 |  🍅 |  個の 🍅 |  🍅 |
| 807 |  关 |  to go |  関 |  관 |
| 808 |  关「 |  : " |  関「 |  관 " |
| 809 |  关「<b> |  : "<b> |  関「<b> |  관 "<b> |
| 810 |  呢。」 |  ?" |  呢。」 |  ?" |
| 811 |  封必得新信 |  guaranteed new letter |  通で必ず新しい手紙 |  통이면 새 편지 보장 |
| 812 |  次来访） |  visit) |  回目の訪問） |  번째 방문) |
| 813 | </b> 根就通关了 | </b> posts to clear | </b> 本でクリア | </b>개 통과하면 클리어 |
| 814 | </b> 根柱子<br> | </b> posts<br> | </b> 本の柱<br> | </b>개 기둥<br> |
| 815 | </b> 根柱子，还差 <b> | </b> posts, <b> | </b> 本の柱、あと <b> | </b>개 기둥, <b> |
| 816 | </b>　最高 <b> | </b> · Best <b> | </b>　最高 <b> | </b>　최고 <b> |
| 817 | </b>」 · 目标穿过 <b> | </b>" · Goal: pass <b> | </b>」 · 目標は <b> | </b>" · 목표 <b> |
| 818 | </div></div><p id="tvSlotResult" style="text-align:center;min-height:20px;color:var(--gold);font-weight:700"></p><div style="text-align:center;margin-top:6px"><button class="btn cta" id="tvSpinBtn" onclick="tvSpin()">🕹 拉杆！</button></div><p style="text-align:center;margin-top:4px"><button class="btn" onclick="closeModal()">收下离开</button></p> | </div></div><p id="tvSlotResult" style="text-align:center;min-height:20px;color:var(--gold);font-weight:700"></p><div style="text-align:center;margin-top:6px"><button class="btn cta" id="tvSpinBtn" onclick="tvSpin()">🕹 Pull!</button></div><p style="text-align:center;margin-top:4px"><button class="btn" onclick="closeModal()">Take it and leave</button></p> | </div></div><p id="tvSlotResult" style="text-align:center;min-height:20px;color:var(--gold);font-weight:700"></p><div style="text-align:center;margin-top:6px"><button class="btn cta" id="tvSpinBtn" onclick="tvSpin()">🕹 レバー！</button></div><p style="text-align:center;margin-top:4px"><button class="btn" onclick="closeModal()">受け取って離開</button></p> | </div></div><p id="tvSlotResult" style="text-align:center;min-height:20px;color:var(--gold);font-weight:700"></p><div style="text-align:center;margin-top:6px"><button class="btn cta" id="tvSpinBtn" onclick="tvSpin()">🕹 레버 당기기!</button></div><p style="text-align:center;margin-top:4px"><button class="btn" onclick="closeModal()">받고 나가기</button></p> |
| 819 | </div><p style="text-align:center;margin-top:6px"><button class="btn" onclick="closeModal()">让它再等等</button> <button class="btn" onclick="tvTurnAway()">请回吧</button></p> | </div><p style="text-align:center;margin-top:6px"><button class="btn" onclick="closeModal()">Let it wait</button> <button class="btn" onclick="tvTurnAway()">Please go</button></p> | </div><p style="text-align:center;margin-top:6px"><button class="btn" onclick="closeModal()">もう少し待たせる</button> <button class="btn" onclick="tvTurnAway()">帰ってもらう</button></p> | </div><p style="text-align:center;margin-top:6px"><button class="btn" onclick="closeModal()">조금 더 기다리게</button> <button class="btn" onclick="tvTurnAway()">돌아가 달라기</button></p> |
| 820 | <br>用时 <b> | <br>Time <b> | <br>タイム <b> | <br>기록 <b> |
| 821 | <div class="sh-want">💛 更想要</div> | <div class="sh-want">💛 Wants most</div> | <div class="sh-want">💛 一番ほしい</div> | <div class="sh-want">💛 가장 원함</div> |
| 822 | <div class="t">🕊 自由</div><div class="s">无限模式</div> | <div class="t">🕊 Free</div><div class="s">Endless mode</div> | <div class="t">🕊 フリー</div><div class="s">無限モード</div> | <div class="t">🕊 자유</div><div class="s">무한 모드</div> |
| 823 | <div class="tv-pity" id="tvPity"><div class="tv-pity-head"><span class="tv-pity-lbl" id="tvPityLbl">✉️ 重复累计  | <div class="tv-pity" id="tvPity"><div class="tv-pity-head"><span class="tv-pity-lbl" id="tvPityLbl">✉️ Duplicates  | <div class="tv-pity" id="tvPity"><div class="tv-pity-head"><span class="tv-pity-lbl" id="tvPityLbl">✉️ 重複累計  | <div class="tv-pity" id="tvPity"><div class="tv-pity-head"><span class="tv-pity-lbl" id="tvPityLbl">✉️ 중복 누적  |
| 824 | <p style="text-align:center;color:var(--text);font-size:13px">月巴们为你攒好了惊喜，拉杆收获 🍅！</p><div class="tvg-slot"><div class="tvg-reels"> | <p style="text-align:center;color:var(--text);font-size:13px">The Bannies saved up a surprise for you — pull the lever for 🍅!</p><div class="tvg-slot"><div class="tvg-reels"> | <p style="text-align:center;color:var(--text);font-size:13px">バニーたちがサプライズを用意しました。レバーを引いて 🍅 を！</p><div class="tvg-slot"><div class="tvg-reels"> | <p style="text-align:center;color:var(--text);font-size:13px">버니들이 깜짝 선물을 준비했어요. 레버를 당겨 🍅 을!</p><div class="tvg-slot"><div class="tvg-reels"> |
| 825 | <span class="nm">🔒 未解锁</span><span class="sc">—</span></div> | <span class="nm">🔒 Locked</span><span class="sc">—</span></div> | <span class="nm">🔒 未解放</span><span class="sc">—</span></div> | <span class="nm">🔒 잠김</span><span class="sc">—</span></div> |
| 826 | \')">招待</button></div> | ")>Serve</button></div> | ")>招待</button></div> | ")>대접</button></div> |
| 827 | ✅ 已通关 | ✅ Cleared | ✅ クリア済み | ✅ 클리어 |
| 828 | ✅ 最快  | ✅ Best  | ✅ 最速  | ✅ 최고  |
| 829 | ✉️ 重复累计  | ✉️ Duplicates  | ✉️ 重複累計  | ✉️ 중복 누적  |
| 830 | 　最快 <b> | 　Best <b> | 　最速 <b> | 　최고 <b> |
| 831 | 　🏅 新纪录！ | 　🏅 New record! | 　🏅 新記録！ | 　🏅 신기록! |
| 832 | 　🏆 全部关卡已通关 | 　🏆 All stages cleared | 　🏆 全ステージクリア | 　🏆 모든 스테이지 클리어 |
| 833 | 　🔓 解锁第  | 　🔓 Unlocked stage  | 　🔓 解放：第  | 　🔓 해금:  |
| 834 | 」通关！ | " cleared! | 」クリア！ | " 클리어! |
| 835 | 下次必得新信 | Next one is guaranteed new | 次は必ず新しい手紙 | 다음엔 새 편지 보장 |
| 836 | 尽情飞 | Fly freely | 思う存分飛ぼう | 마음껏 날아 |
| 837 | 已通关 · 无计时 | Cleared · no timer | クリア済み · タイマーなし | 클리어 · 타이머 없음 |
| 838 | 收获  | Harvest  | 収穫  | 수확  |
| 839 | 最佳  | Best  | ベスト  | 최고  |
| 840 | 未解锁 | Locked | 未解放 | 잠김 |
| 841 | 未通关 | Not cleared | 未クリア | 미클리어 |
| 842 | 本关最佳 <b> | Stage best <b> | このステージのベスト <b> | 이 스테이지 최고 <b> |
| 843 | 本次得分 <b> | Score <b> | 今回のスコア <b> | 이번 점수 <b> |
| 844 | 满  | Full  | 満  | 가득  |
| 845 | 目标  | Goal  | 目標  | 목표  |
| 846 | 穿过 <b> | Pass <b> | <b> | <b> |
| 847 | 第  | Stage  | 第  |   |
| 848 | 🍅 番茄成对加成！ | 🍅 Tomato pair bonus! | 🍅 トマトのペアボーナス！ | 🍅 토마토 페어 보너스! |
| 849 | 🎉 收获  | 🎉 Harvest  | 🎉 収穫  | 🎉 수확  |
| 850 | 🎉 通关啦 | 🎉 Cleared! | 🎉 クリア！ | 🎉 클리어! |
| 851 | 🎉🎉 三连大奖！ | 🎉🎉 Triple jackpot! | 🎉🎉 トリプル大当たり！ | 🎉🎉 트리플 잭팟! |
| 852 | 🎉🎉 三连番茄大奖！ | 🎉🎉 Triple Tomato jackpot! | 🎉🎉 トマト三連大当たり！ | 🎉🎉 토마토 트리플 잭팟! |
| 853 | 🎉🎉 三连罐头大奖！ | 🎉🎉 Triple Can jackpot! | 🎉🎉 缶詰三連大当たり！ | 🎉🎉 통조림 트리플 잭팟! |
| 854 | 🎯 关卡 · 最短用时榜 | 🎯 Stages · Best time | 🎯 ステージ · 最短タイム | 🎯 스테이지 · 최단 기록 |
| 855 | 🏆 自由模式 · 分数榜 | 🏆 Free Mode · High scores | 🏆 フリーモード · スコア | 🏆 자유 모드 · 점수 |
| 856 | 💬 「今天就是路过看看你呀。」 | 💬 "Just passing by to see you today." | 💬 「今日はちょっと通りがかりに寄ってみたよ。」 | 💬 "오늘은 그냥 지나가다 들렀어." |
| 857 | 💬 「今天我特别想要  | 💬 "Today I really want  | 💬 「今日は特にほしいのは  | 💬 "오늘은 특히 갖고 싶은 건  |
| 858 | 💬 「我今天想要的一样特产，你好像还没收着呢。」 | 💬 "I’m after a certain souvenir today — I don’t think you have it yet." | 💬 「今日ほしい特産品があるんだけど、まだ持ってないみたい。」 | 💬 "오늘 원하는 특산품이 있는데, 아직 없는 것 같아." |
| 859 | 🕹 已收获 · 月巴们去攒番茄啦 | 🕹 Collected · the Bannies are off gathering Tomatoes | 🕹 収穫済み · バニーたちはトマトを集めに行きました | 🕹 수확 완료 · 버니들이 토마토를 모으러 갔어요 |
| 860 | 🕹 月巴们去攒番茄啦 | 🕹 The Bannies are off gathering Tomatoes | 🕹 バニーたちはトマトを集めに行きました | 🕹 버니들이 토마토를 모으러 갔어요 |
| 861 | 😳 好像番茄被月巴偷偷拿走了……（+ | 😳 Looks like a Banny snuck off with your Tomatoes... (+ | 😳 トマトがバニーにこっそり持っていかれたみたい……（+ | 😳 버니가 토마토를 몰래 가져간 것 같아요…… (+ |
| 862 | 🥫 罐头成对加成！ | 🥫 Can pair bonus! | 🥫 缶詰のペアボーナス！ | 🥫 통조림 페어 보너스! |
| 863 | （第  |  (  | （第  |  (  |
| 864 | （第一次来访） |  (first visit) | （初めての訪問） |  (첫 방문) |
