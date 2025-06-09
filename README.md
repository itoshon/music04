# Music04 ミュージックスクールサイト

このリポジトリは、ミュージックスクールサイトのサンプルプロジェクトです。

## 構成
- `css/`：スタイルシート
- `src/`：HTML や画像などソース一式
- `gulpfile.mjs`：ビルド設定
- `package.json`：依存パッケージ定義

## 使い方
1. `npm install` で依存をインストール  
2. `npm run build` でビルド
3. rsync -av --delete src/images/ dist/images/で画像ファイルをdistファイルへコピー。
4. npx gulp で表示  
