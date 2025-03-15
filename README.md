# Bun フロントエンド開発テンプレート

このリポジトリは、Viteの代わりに[Bun](https://bun.sh/)をフロントエンドのビルドツールとして使用し、HTML、CSS（Tailwind CSS）、TypeScriptを統合した最小限の開発環境テンプレートです。

## 特徴

- **Bun**: 高速なJavaScriptランタイム、バンドラー、パッケージマネージャー、テストランナーをオールインワンで提供
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワークによる効率的なスタイリング
- **TypeScript**: 型安全な開発環境
- **happy-dom**: ブラウザ環境に依存しないDOMテスト環境

## プロジェクト構造

```
src/
├── index.html          # メインのHTMLファイル
├── scripts/
│   ├── domUtils.ts    # DOM操作ユーティリティ
│   └── index.ts       # メインのTypeScriptファイル
├── styles/
│   └── style.css      # スタイルシート
└── tests/
    └── domUtils.test.ts # ユーティリティのテストファイル
```

## 使用技術

- **Bun** v1.0.0以降
- **TypeScript** v5.x
- **Tailwind CSS** v4.x
- **happy-dom** v17.x（テスト環境用）

## 機能

### DOM操作ユーティリティ

`domUtils.ts`には以下の機能が実装されています：

- `addButtonClass`: 要素にクラスを追加
- `toggleElementVisibility`: 要素の表示/非表示を切り替え
- `handleClickEvent`: クリックイベントハンドラの設定

これらの機能は全て、ユニットテストによって動作が検証されています。

## 開発方法

### 前提条件

- Bunがインストールされていること

Bunのインストール方法は、[公式ドキュメント](https://bun.sh/docs/installation)を参照してください。

### セットアップ

```bash
# 依存パッケージのインストール
bun install
```

### 開発コマンド

```bash
# 開発サーバーの起動
bun dev

# プロダクションビルド
bun build

# テストの実行
bun test
```

## テスト

テストは`happy-dom`を使用してブラウザ環境をシミュレートし、DOM操作の機能をテストしています。テストファイルは`src/tests`ディレクトリに配置されています。

各コンポーネントのテストは以下のような観点で実装されています：

- クラス追加の検証
- 要素の表示/非表示の切り替え検証
- イベントハンドリングの検証
