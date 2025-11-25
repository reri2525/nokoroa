# Google認証の設定ガイド

## 1. Google Cloud Consoleでプロジェクトを設定

### 1.1 Google Cloud Consoleにアクセス
1. https://console.cloud.google.com/ にアクセス
2. Googleアカウントでログイン

### 1.2 新しいプロジェクトを作成（既存プロジェクトがない場合）
1. 上部のプロジェクトセレクターをクリック
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を入力（例：「Nokoroa」）
4. 「作成」をクリック

## 2. OAuth 2.0 認証情報の設定

### 2.1 OAuth同意画面の設定
1. 左側のメニューから「APIとサービス」→「OAuth同意画面」を選択
2. ユーザータイプで「外部」を選択
3. 「作成」をクリック
4. 必要な情報を入力：
   - アプリ名: Nokoroa
   - ユーザーサポートメール: あなたのメールアドレス
   - デベロッパー連絡先情報: あなたのメールアドレス
5. 「保存して次へ」をクリック
6. スコープの設定で以下を追加：
   - `email`
   - `profile`
   - `openid`
7. テストユーザーは必要に応じて追加
8. 設定を確認して「保存」

### 2.2 OAuth 2.0 クライアントIDの作成
1. 「APIとサービス」→「認証情報」を選択
2. 「認証情報を作成」→「OAuth クライアント ID」をクリック
3. アプリケーションの種類で「ウェブ アプリケーション」を選択
4. 名前を入力（例：「Nokoroa Web Client」）
5. 承認済みのリダイレクトURIに以下を追加：
   - 開発環境: `http://localhost:4000/auth/google/callback`
   - 本番環境: `https://your-domain.com/auth/google/callback`
6. 「作成」をクリック
7. 表示されたクライアントIDとクライアントシークレットをコピー

## 3. 環境変数の設定

### 3.1 バックエンド（nokoroa-backend/.env）
```env
# Google OAuth
GOOGLE_CLIENT_ID=あなたのクライアントID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=あなたのクライアントシークレット
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3.2 フロントエンド（nokoroa-frontend/.env.local）
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 4. データベースマイグレーション

バックエンドのディレクトリで以下を実行：

```bash
cd nokoroa-backend
npx prisma migrate dev --name add-google-auth
npx prisma generate
```

## 5. サーバーの再起動

### バックエンド
```bash
cd nokoroa-backend
npm run start:dev
```

### フロントエンド
```bash
cd nokoroa-frontend
npm run dev
```

## 6. 動作確認

1. ブラウザで http://localhost:3000 にアクセス
2. 「ログイン」または「新規登録」をクリック
3. 「Googleでログイン」ボタンをクリック
4. Googleアカウントを選択
5. 権限を許可
6. Nokoroaにリダイレクトされ、ログイン完了

## トラブルシューティング

### エラー: "Error 400: redirect_uri_mismatch"
- Google Cloud ConsoleでリダイレクトURIが正しく設定されているか確認
- URLの末尾のスラッシュ有無も含めて完全一致する必要があります

### エラー: "認証に失敗しました"
- 環境変数が正しく設定されているか確認
- サーバーを再起動してみてください

### データベースエラー
- PostgreSQLが起動しているか確認
- マイグレーションが正しく実行されたか確認

## セキュリティに関する注意

- **本番環境では必ずHTTPSを使用してください**
- クライアントシークレットは絶対に公開しないでください
- .envファイルは.gitignoreに追加されていることを確認してください