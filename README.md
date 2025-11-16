# TodoApp

https://earthchart0809.github.io/react-todo-app/

## アプリ概要

TodoApp はロボコン製作の進捗管理を目的としたシンプルな Web アプリです。Excel の印刷スケジュールでは見えにくかった遅れや優先度を可視化し、班（機構／回路／プログラム）ごとのタスク管理を手軽に行えます。Vite + React + TypeScript + Tailwind CSS で構築され、ブラウザの LocalStorage による永続化でオフラインでも動作します。

## 主な機能（要点）
- カレンダー表示：隔週の水曜ミーティングを自動表示
- タスク管理：タイトル・班・進捗（スライダー）・期限・コメント・優先度を管理
- 優先度：急ぎ／通常／後回し をラベル表示
- アーカイブ：完了タスクをアーカイブし、一覧から復元・削除可能（フールプルーフ対応）
- 永続化：LocalStorage により追加・編集内容をブラウザに保存
- デプロイ：GitHub Pages で公開可能（vite の base 設定に対応）

## 使い方（ローカル）
1. 依存インストール:
   npm install
2. 開発サーバ起動:
   npm run dev
3. ビルド:
   npm run build
4. デプロイ（gh-pages を利用）:
   npm run deploy

## 開発履歴

- 2025.10.23 ~ 2025.11.18 (約17時間)

## ライセンス

MIT License

Copyright (c) 2025 K.EarthChart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.