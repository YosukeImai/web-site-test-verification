# Chrome DevTools MCP 使い方ガイド

## 概要

Chrome DevTools MCPは、ChromeブラウザのDevToolsプロトコルをMCP(Model Context Protocol)経由で利用できるツールです。パフォーマンス分析、ネットワーク監視、デバッグなどの機能を、AI（Claude等）から直接操作できます。

## セットアップ

### 1. MCP設定ファイルへの追加

`.vscode/mcp.json`に以下の設定を追加済みです:

```json
{
  "servers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "chrome-devtools-mcp@latest",
        "--isolated=true"
      ]
    }
  }
}
```

### 2. スタンドアロンでの起動

```bash
# 新しいChromeインスタンスを起動
npx chrome-devtools-mcp@latest --isolated=true

# ヘッドレスモードで起動
npx chrome-devtools-mcp@latest --isolated=true --headless

# 既存のChromeに接続（デバッグポート9222で起動している場合）
npx chrome-devtools-mcp@latest --browserUrl http://127.0.0.1:9222
```

## 主な機能

### 1. ページナビゲーション
- URLへの移動
- ページのリロード
- 戻る/進む操作

### 2. パフォーマンス分析
- Core Web Vitals測定
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- ページロード時間の計測
- リソース読み込みの分析

### 3. ネットワーク監視
- HTTPリクエスト/レスポンスの記録
- レスポンスタイムの測定
- ネットワークエラーの検出

### 4. デバッグ機能
- コンソールログの取得
- JavaScriptエラーの検出
- DOM要素の検査

### 5. スクリーンショット
- ページ全体のキャプチャ
- 要素単位のキャプチャ

## 使用例

### 例1: サンプルサイトのパフォーマンス測定

MCPツールが利用可能なAIアシスタント（Claude Desktop等）で以下のように指示します:

```
Chrome DevTools MCPを使って、
http://127.0.0.1:5500/sample-site/index.html のパフォーマンスを測定してください。

以下の項目を確認:
1. ページロード時間
2. Core Web Vitals (LCP, FID, CLS)
3. リソース読み込み時間
4. JavaScriptエラーの有無
```

### 例2: ネットワークトラフィックの分析

```
Chrome DevTools MCPでサンプルサイトを開き、
フォームに20件のデータを追加する際のネットワークトラフィックを監視してください。

確認項目:
- HTTPリクエスト数
- データサイズ
- レスポンスタイム
```

### 例3: 境界値テスト時のパフォーマンス

```
Chrome DevTools MCPを使用して、以下のシナリオでパフォーマンスを比較してください:

1. データ0件の状態
2. データ20件の状態（ページング境界）
3. データ50件の状態（3ページ）

各状態でのDOM要素数とレンダリング時間を測定
```

## コマンドラインオプション

### よく使うオプション

```bash
# 分離モード（一時的なユーザーデータディレクトリを使用）
--isolated=true

# ヘッドレスモード
--headless

# ビューポートサイズ指定
--viewport 1920x1080

# プロキシサーバー指定
--proxyServer http://proxy.example.com:8080

# 追加のChrome引数
--chromeArg='--no-sandbox'

# ログファイル出力
--logFile /tmp/chrome-devtools-mcp.log
```

### カテゴリの有効化/無効化

```bash
# エミュレーション機能を無効化
--no-category-emulation

# パフォーマンス機能を無効化
--no-category-performance

# ネットワーク機能を無効化
--no-category-network
```

## 既存のChromeインスタンスに接続

### 1. Chromeをデバッグモードで起動

```bash
# Linux/Mac
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=C:\temp\chrome-debug
```

### 2. Chrome DevTools MCPから接続

```bash
# HTTP経由で接続
npx chrome-devtools-mcp@latest --browserUrl http://127.0.0.1:9222

# WebSocket経由で接続（より詳細な制御が可能）
npx chrome-devtools-mcp@latest --wsEndpoint ws://127.0.0.1:9222/devtools/browser/<browser-id>
```

## 検証シナリオ例

### シナリオ1: ページロード最適化の検証

```
1. Chrome DevTools MCPでサンプルサイトを開く
2. ネットワークパフォーマンスを測定
3. 最適化のボトルネックを特定
   - CSS/JSファイルのサイズ
   - 画像の読み込み時間
   - レンダリングブロッキングリソース
4. 改善提案をレポート
```

### シナリオ2: メモリリーク検出

```
1. Chrome DevTools MCPでサンプルサイトを開く
2. 100件のデータを追加
3. メモリ使用量を測定
4. データを削除
5. メモリが解放されているか確認
```

### シナリオ3: レスポンシブデザインテスト

```
1. 複数のビューポートサイズでテスト
   - モバイル: 375x667
   - タブレット: 768x1024
   - デスクトップ: 1920x1080
2. 各サイズでのレンダリング確認
3. レイアウト崩れの検出
```

## トラブルシューティング

### Chrome DevTools MCPが起動しない

```bash
# バージョン確認
npx chrome-devtools-mcp@latest --version

# 詳細ログを有効にして起動
DEBUG=* npx chrome-devtools-mcp@latest --isolated=true --logFile /tmp/debug.log
```

### WSL環境でChromeが起動しない

WSL環境では、Chromeの直接起動に制限がある場合があります。その場合は、Windows側でChromeを起動し、WSL側から接続します。

```bash
# Windows側でChromeをデバッグモードで起動
# PowerShellで実行:
# & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=C:\temp\chrome-debug

# WSL側から接続
npx chrome-devtools-mcp@latest --browserUrl http://localhost:9222
```

### ポート競合

デフォルトではランダムなポートが使用されますが、特定のポートを使用したい場合:

```bash
# Chromeを特定のポートで起動
google-chrome --remote-debugging-port=9333
```

## MCP対応クライアントでの利用

### Claude Desktop

1. Claude Desktopの設定ファイルにMCPサーバーを追加
2. Claudeに以下のように指示:

```
Chrome DevTools MCPを使って、http://127.0.0.1:5500/sample-site/index.html を分析してください。
```

### VSCode (MCPエクステンション)

1. `.vscode/mcp.json`に設定を追加（完了済み）
2. VSCodeのコマンドパレットから「MCP: Connect to Server」を実行
3. `chrome-devtools`を選択

## 利用可能なMCPツール一覧

Chrome DevTools MCPが提供する主なツール:

1. **navigate**: ページに移動
2. **screenshot**: スクリーンショット取得
3. **evaluate**: JavaScriptコードの実行
4. **get_performance_metrics**: パフォーマンスメトリクスの取得
5. **get_network_logs**: ネットワークログの取得
6. **get_console_logs**: コンソールログの取得
7. **emulate_device**: デバイスエミュレーション
8. **set_viewport**: ビューポートサイズ変更

## 参考資料

- [Chrome DevTools MCP 公式ドキュメント](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [MCP公式サイト](https://modelcontextprotocol.io/)

## 次のステップ

1. Chrome DevTools MCPでサンプルサイトのパフォーマンス測定を実施
2. Playwright Test AgentsとChrome DevTools MCPを組み合わせた統合テスト
3. 自動探索テスト中のパフォーマンス監視

---

**最終更新**: 2025年10月25日
