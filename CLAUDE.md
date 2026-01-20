# CLAUDE.md

Bunを活用したミニマルなフロントエンド開発テンプレート。

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Linting**: Biome, Stylelint, Markuplint

## Commands

```bash
bun run dev       # 開発サーバー
bun run build     # 本番ビルド
bun test          # テスト
bun run check     # リント
```

## Structure

```
src/
├── index.html        # Vanilla JS
├── scripts/          # Vanilla JS
├── tests/            # テスト
└── react/            # React アプリ
    ├── pages/          # 画面
    ├── features/       # 機能モジュール
    │   └── [feature]/
    │       ├── components/
    │       ├── hooks/
    │       ├── types.ts
    │       ├── constants.ts
    │       └── index.ts
    └── shared/         # 共通
        ├── ui/           # shadcn/ui
        ├── utils/        # cn(), id生成
        ├── types/        # 共通型定義 (TodoId等)
        └── constants/    # 共通定数
```

## Instructions

開発ガイドラインは `.claude/rules/` で自動読み込み:

| ルール     | 適用対象                            |
| ---------- | ----------------------------------- |
| react.md   | `src/react/**`                      |
| build.md   | `build.ts`, `dev.ts`, `bunfig.toml` |
| testing.md | `**/*.test.ts`                      |
