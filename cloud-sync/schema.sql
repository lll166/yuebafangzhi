-- 月巴放置 · 云存档 D1 表结构
-- 部署：npx wrangler d1 execute yueba-sync --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS saves (
  id   TEXT PRIMARY KEY,   -- sha256(pepper + 规范化同步码)，不存明文码
  data TEXT NOT NULL,      -- 存档正文（通常是 gzip 后的 base64）
  at   INTEGER NOT NULL,   -- 上传时间（毫秒时间戳）
  ver  INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS rl (
  ip  TEXT NOT NULL,       -- Cloudflare 看到的客户端 IP
  win INTEGER NOT NULL,    -- 分钟窗口：floor(now / 60000)
  cnt INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, win)
);

-- 上传流水：画趋势图用，只记元数据（哈希、时间、大小、版本），不记内容
CREATE TABLE IF NOT EXISTS upload_log (
  id    TEXT NOT NULL,
  at    INTEGER NOT NULL,
  bytes INTEGER NOT NULL,
  ver   INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_log_at ON upload_log(at);

-- 每日用量：看板估算免费额度剩余
CREATE TABLE IF NOT EXISTS usage (
  day TEXT PRIMARY KEY,               -- 北京时间 yyyy-mm-dd
  req INTEGER NOT NULL DEFAULT 0,     -- 通过限流的 /save 请求数
  up  INTEGER NOT NULL DEFAULT 0      -- 成功上传次数
);

-- 月巴大扫除 · 排行榜（day='all' 为总榜，否则为当日「今日大扫除」日榜）
CREATE TABLE IF NOT EXISTS board (
  day   TEXT NOT NULL,               -- 'all' 或北京时间 yyyy-mm-dd
  diff  TEXT NOT NULL,               -- 难度 id（easy/normal/hard/…）
  uid   TEXT NOT NULL,               -- 客户端生成的匿名 ID（localStorage）
  name  TEXT NOT NULL,               -- 玩家自取昵称（截断到 12 字符）
  time  INTEGER NOT NULL,            -- 通关用时（秒）
  at    INTEGER NOT NULL,            -- 上报时间（毫秒时间戳）
  PRIMARY KEY (day, diff, uid)
);
CREATE INDEX IF NOT EXISTS idx_board_rank ON board(day, diff, time);
