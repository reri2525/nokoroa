# Nokoroa プロジェクト開発ルール

## 基本原則
1. **既存のコードパターンに従う** - 新しいパターンを導入する前に、既存のコード規約を確認
2. **日本語優先** - UIテキスト、コメント、コミットメッセージは日本語で記載
3. **エラーハンドリング** - すべてのエラーはユーザーフレンドリーなメッセージで表示

## コーディング規約

### Frontend (Next.js/React)
- Material-UI コンポーネントを優先使用
- sx propでスタイリング（styled-componentsは使わない）
- すべてのChipコンポーネントにonClickハンドラーを追加（エラー防止）
- タグの色は必ず`getTagColor`ユーティリティを使用
- 画像はpublic/またはS3から配信
- ナビゲーションは`router.push()`を使用

### Backend (NestJS)
- DTOで入力検証を必ず行う
- Prismaのincludeで関連データを取得
- JWTトークンでの認証を維持
- RESTful API設計に従う
- エラーはNestJSのExceptionFilterで処理

## 開発フロー

### 新機能追加時
1. まず要件を整理
2. 必要に応じてデータベーススキーマを更新
3. バックエンドAPIを実装
4. フロントエンドUIを実装
5. Lintエラーを修正
6. 動作確認

### バグ修正時
1. エラーの再現方法を確認
2. 原因を特定
3. 修正を実装
4. 関連箇所も確認
5. Lintエラーを修正

## よくある問題と対処法

### onClick is not a function エラー
```tsx
// すべてのChipに以下を追加
onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
}}
```

### ポート競合 (3000, 4000)
```bash
lsof -i :3000  # 使用中のプロセスを確認
kill -9 <PID>  # プロセスを終了
```

### Dockerコンテナの問題
```bash
docker-compose down
docker-compose up -d --build
```

## デプロイ前チェックリスト
- [ ] Lintエラーがないこと
- [ ] TypeScriptエラーがないこと
- [ ] 環境変数が正しく設定されていること
- [ ] 不要なconsole.logが削除されていること
- [ ] APIエンドポイントが本番用URLになっていること

## 重要なファイルパス
- Frontend: `/Users/sugitayuuki/nokoroa/nokoroa-frontend`
- Backend: `/Users/sugitayuuki/nokoroa/nokoroa-backend`
- Database Schema: `/nokoroa-backend/prisma/schema.prisma`
- Environment Variables: `.env.local` (frontend), `.env` (backend)