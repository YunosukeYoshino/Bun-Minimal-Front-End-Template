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
    ├── components/ui/  # shadcn/ui
    └── hooks/          # カスタムフック
```

## Instructions

詳細な開発ガイドラインは以下を参照:

- @.github/instructions/react.instructions.md - React開発
- @.github/instructions/build.instructions.md - ビルド・Dev Server
- @.github/instructions/testing.instructions.md - テスト
