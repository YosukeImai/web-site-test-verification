# Chrome DevTools MCP 検証プロジェクト

Chrome DevTools MCPを使用したブラウザ自動化テストの検証環境です。

## プロジェクト構成

```
web-site-test-verification/
├── sample-site/                      # テスト対象のサンプルWebアプリケーション
│   ├── index.html                   # メインHTML
│   ├── styles.css                   # スタイルシート
│   └── app.js                       # JavaScriptロジック
├── test-cases/                      # テストケースファイル（テキスト形式）
│   ├── HOW_TO_USE.md                # 使い方ガイド
│   ├── boundary-value-testcases.txt # 境界値テスト（7件）
│   └── form-validation-testcases.txt # フォームバリデーションテスト（22件）
├── chrome-devtools-mcp-guide/       # Chrome DevTools MCPガイド
│   ├── README.md                    # 目次
│   ├── CHROME_DEVTOOLS_MCP_GUIDE.md # 基本ガイド
│   └── PERFORMANCE_TEST_INSTRUCTIONS.md # パフォーマンステスト指示例
├── .mcp.json                        # MCP設定ファイル
├── verification-issue.md            # 検証タスク定義
├── TEST_SCENARIOS.md                # 詳細テストシナリオと指示例
└── README.md                        # このファイル
```

## セットアップ

### 前提条件

- Node.js (v18以上)
- Google Chrome / Chromium

### 1. 依存関係のインストール

```bash
npm install
```

### 2. サンプルサイトの起動

Webサーバーを起動（例：Live Server、http-server等）：

```bash
# http-serverを使用する場合
npx http-server sample-site -p 5500

# または VSCodeのLive Server拡張機能を使用
# sample-site/index.html を開いて Live Server で起動
```

アクセスURL: `http://127.0.0.1:5500/sample-site/index.html`

## サンプルサイトの機能

シンプルなデータ管理アプリケーション：

- **フォーム入力**：名前、メール、年齢、部署
- **リアルタイムバリデーション**：入力エラーの即時表示
- **データ表示**：テーブル形式での一覧
- **ページング機能**：20件/ページ、21件以上で表示
- **データ操作**：追加・削除

## 検証方法

### Claudeへの指示例

```
Chrome DevTools MCPを使用して、
http://127.0.0.1:5500/sample-site/index.html にアクセスし、
test-cases/boundary-value-testcases.txt に記載されているテストケースを実行してください。
```

詳細は [verification-issue.md](verification-issue.md) を参照

## ドキュメント

- **[verification-issue.md](verification-issue.md)** - 検証タスク定義
- **[TEST_SCENARIOS.md](TEST_SCENARIOS.md)** - 詳細テストシナリオと指示例
- **[test-cases/](test-cases/)** - テストケースファイル
  - [HOW_TO_USE.md](test-cases/HOW_TO_USE.md) - 使い方ガイド
  - [boundary-value-testcases.txt](test-cases/boundary-value-testcases.txt) - 境界値テスト
  - [form-validation-testcases.txt](test-cases/form-validation-testcases.txt) - フォームバリデーションテスト
- **[chrome-devtools-mcp-guide/](chrome-devtools-mcp-guide/)** - Chrome DevTools MCP完全ガイド

## 参考資料

- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

**作成日**: 2025年10月26日
