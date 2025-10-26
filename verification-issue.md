# ブラウザ自動化MCPツール検証タスク

## 目的

以下の3つのMCPツールを使用して、sample-site（データ管理アプリケーション）を検証し、探索的テスト自動化への適用可能性を評価する：

1. **Chrome DevTools MCP** (Google)
2. **Playwright MCP** (Microsoft)
3. **Playwright Agent Mode** (Microsoft/Playwright組み込み)

## 検証項目

### 1. Chrome DevTools MCP

**特徴**: パフォーマンス分析とデバッグに特化

- ページナビゲーション
- 要素操作（クリック、フォーム入力）
- スナップショット・スクリーンショット取得
- **パフォーマンス測定**
  - Core Web Vitals
  - レンダリング時間
  - メモリ使用量
- コンソールメッセージ・ネットワークリクエストの確認

### 2. Playwright MCP

**特徴**: アクセシビリティツリーベースの軽量操作

- 基本的なブラウザ操作
- クロスブラウザ対応（Chromium、Firefox、WebKit）
- フォーム入力とバリデーション確認
- スクリーンショット取得

### 3. Playwright Agent Mode

**特徴**: 3つの専門AIエージェント（Planner、Generator、Healer）による自律的テスト生成

- **Planner**: アプリケーションの探索とテスト計画の作成
- **Generator**: テストコードの自動生成
- **Healer**: テストの自動修復
- 探索的テストの実行

## 対象URL

http://127.0.0.1:5500/sample-site/index.html

## テストケース

- [test-cases/boundary-value-testcases.txt](test-cases/boundary-value-testcases.txt) - 境界値テスト（7件）
- [test-cases/form-validation-testcases.txt](test-cases/form-validation-testcases.txt) - フォームバリデーションテスト（22件）
- [TEST_SCENARIOS.md](TEST_SCENARIOS.md) - 詳細なテストシナリオと指示例

## セットアップ

詳細は [README.md](README.md) を参照

## 検証方法

### Chrome DevTools MCP

```
Chrome DevTools MCPを使用して、
http://127.0.0.1:5500/sample-site/index.html にアクセスし、
test-cases/boundary-value-testcases.txt のテストケースを実行してください。
パフォーマンス測定も含めてください。
```

### Playwright MCP

```
Playwright MCPを使用して、
http://127.0.0.1:5500/sample-site/index.html にアクセスし、
test-cases/form-validation-testcases.txt のテストケースを実行してください。
Chromium、Firefox、WebKitの3つのブラウザで実行してください。
```

### Playwright Agent Mode

```
Playwright Agent Modeを使用して、
http://127.0.0.1:5500/sample-site/index.html を探索し、
以下のテストスイートを生成してください：
1. データ追加・削除機能
2. ページング機能
3. フォームバリデーション
4. 境界値テスト（0件、20件、21件）
```

## 期待される成果物

### 各ツール共通
- テストケースの実行結果
- スクリーンショット
- 発見された問題点

### ツール別
- **Chrome DevTools MCP**: パフォーマンス測定データ、Core Web Vitals
- **Playwright MCP**: クロスブラウザ互換性レポート
- **Playwright Agent Mode**: 生成されたテストコード、テスト計画書

## 評価軸

各ツールを以下の観点で評価：

1. **セットアップの容易性** - インストールと設定の簡単さ
2. **基本操作の安定性** - ブラウザ操作の信頼性
3. **探索的テスト適性** - 自動探索・テスト生成能力
4. **ドキュメント充実度** - 公式ドキュメントの質
5. **パフォーマンス** - 実行速度とリソース消費

## 既知の制約

- **Chrome DevTools MCP**: Chrome/Chromiumブラウザのみサポート
- **Playwright Agent Mode**: LLMの品質に依存
- すべてのツール: 非決定論的な挙動の可能性

---

**作成日**: 2025年10月26日
