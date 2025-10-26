# Chrome DevTools MCP ガイド

このフォルダには、Chrome DevTools MCPの使用方法とパフォーマンステストの指示例がまとまっています。

## 📁 ファイル構成

```
chrome-devtools-mcp-guide/
├── README.md                           # このファイル
├── CHROME_DEVTOOLS_MCP_GUIDE.md       # Chrome DevTools MCPの基本ガイド
├── PERFORMANCE_TEST_INSTRUCTIONS.md   # パフォーマンステストの指示例集
└── demo-chrome-devtools.sh            # デモスクリプト
```

## 🚀 クイックスタート

### 1. Chrome DevTools MCPの起動

```bash
# 基本的な起動
npx chrome-devtools-mcp@latest --isolated=true

# ヘッドレスモードで起動
npx chrome-devtools-mcp@latest --isolated=true --headless

# デモスクリプトの実行
./demo-chrome-devtools.sh
```

### 2. MCP設定ファイル

プロジェクトルートの `.vscode/mcp.json` に設定済みです。

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

## 📖 ドキュメント

### [CHROME_DEVTOOLS_MCP_GUIDE.md](./CHROME_DEVTOOLS_MCP_GUIDE.md)

Chrome DevTools MCPの基本的な使い方を解説:

- セットアップ方法
- 主な機能一覧
- 使用例
- コマンドラインオプション
- トラブルシューティング

### [PERFORMANCE_TEST_INSTRUCTIONS.md](./PERFORMANCE_TEST_INSTRUCTIONS.md)

パフォーマンステストの具体的な指示例:

1. 基本的なパフォーマンス測定
2. 境界値でのパフォーマンス比較
3. ネットワークパフォーマンス測定
4. メモリリーク検出
5. レスポンシブデザインのパフォーマンス
6. JavaScript実行パフォーマンス
7. 長時間使用時のパフォーマンス劣化
8. 統合パフォーマンステスト

## 💡 よくある使用例

### 例1: サンプルサイトのパフォーマンス測定

```
Chrome DevTools MCPを使用して、
http://127.0.0.1:5500/sample-site/index.html の
パフォーマンスを測定してください。

測定項目:
- ページロード時間
- Core Web Vitals (LCP, FID, CLS)
- DOM要素数
- メモリ使用量
```

### 例2: 境界値でのパフォーマンス比較

```
データ件数の違い（0件、20件、50件）で
パフォーマンスを比較してください。

各状態で:
- メモリ使用量
- レンダリング時間
- DOM要素数
を測定し、比較レポートを作成してください。
```

### 例3: メモリリーク検出

```
100件のデータを追加して削除する操作を10回繰り返し、
メモリリークがないか確認してください。

各操作後のメモリ使用量を記録し、
ガベージコレクション後にメモリが解放されているか確認してください。
```

## 🎯 サンプルサイトのテストポイント

### パフォーマンステストに適した機能

1. **境界値（20件、21件）**
   - ページング表示の有無によるパフォーマンス変化

2. **データ追加操作**
   - バリデーション処理の実行時間
   - DOM更新の速度

3. **ページ遷移**
   - 再レンダリングのパフォーマンス

4. **データ削除**
   - メモリ解放の確認

## 🔧 トラブルシューティング

### Chrome DevTools MCPが起動しない

```bash
# バージョン確認
npx chrome-devtools-mcp@latest --version

# デバッグログを有効にして起動
DEBUG=* npx chrome-devtools-mcp@latest --isolated=true --logFile /tmp/debug.log
```

### WSL環境での問題

WSL環境では、Windowsホスト側でChromeを起動し、WSLから接続する方法が推奨されます。

```bash
# Windows側でChromeをデバッグモードで起動（PowerShell）
# & "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

# WSL側から接続
npx chrome-devtools-mcp@latest --browserUrl http://localhost:9222
```

## 📊 パフォーマンス測定の指標

### Core Web Vitals

| 指標 | 良好 | 改善が必要 | 不良 |
|------|------|----------|------|
| LCP  | ≤2.5s | ≤4.0s | >4.0s |
| FID  | ≤100ms | ≤300ms | >300ms |
| CLS  | ≤0.1 | ≤0.25 | >0.25 |

### その他の推奨値

- ページロード時間: 3秒以内
- メモリ使用量: 50MB以内
- DOM要素数: 1500個以内

## 🔗 関連リンク

- [Chrome DevTools MCP 公式ドキュメント](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [プロジェクトルートのREADME](../README.md)
- [テストシナリオ集](../TEST_SCENARIOS.md)

---

**最終更新**: 2025年10月25日
