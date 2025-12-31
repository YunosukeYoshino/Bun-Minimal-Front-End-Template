---
description: Context7でライブラリのドキュメントを取得し、コードベースの改善点を提案
argument-hint: "[library-name]"
allowed-tools: ["mcp__context7__resolve-library-id", "mcp__context7__query-docs", "Read", "Glob", "Grep", "Task"]
---

# ライブラリドキュメントによるコードベース改善提案

## 手順

1. **ライブラリIDの解決**
   - Context7の`resolve-library-id`で「$ARGUMENTS」のライブラリIDを取得

2. **ドキュメントの取得**
   - `query-docs`で最新のベストプラクティス、API変更、新機能を取得

3. **コードベースの調査**
   - 現在のコードベースで「$ARGUMENTS」がどのように使われているか調査

4. **改善提案**
   - 非推奨APIの検出
   - 新しいベストプラクティスへの移行提案
   - パフォーマンス改善の機会
   - 新機能の活用提案

## 出力形式

改善点があれば、以下の形式で計画を立てる：
- 変更対象ファイル
- 変更内容の説明
- 優先度（高/中/低）
