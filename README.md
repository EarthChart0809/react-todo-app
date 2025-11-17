# TodoApp

## Todoアプリをホストしている GitHub Pages の URL

https://earthchart0809.github.io/react-todo-app/

## アプリ概要

TodoApp はロボコン製作の進捗管理を目的としたシンプルな Web アプリである。Excel の印刷スケジュールでは見えにくかった遅れや優先度を可視化し、班（機構／回路／プログラム）ごとのタスク管理を手軽に行える。Vite + React + TypeScript + Tailwind CSS で構築され、ブラウザの LocalStorage による永続化でオフラインでも動作する。
![Todoアプリの画像](/img/Todo_app.png)

## 主な機能（要点）
- カレンダー表示：隔週の水曜ミーティングを自動表示
- タスク管理：タイトル・班・進捗（スライダー）・期限・コメント・優先度を管理
- 優先度：後回し／通常／急ぎ をラベル表示（色付きバッジ）
- アーカイブ：完了タスクをアーカイブし、一覧から復元・削除可能（削除時は確認ダイアログ）
- 完了演出：タスク完了時に画像・テキストと紙吹雪アニメーションを表示
- 期限管理：
  - 期限切れタスクは視覚的に強調（赤バッジ・カードハイライト）
  - 期限切れ発生時にブラウザ通知（Notification API）を送信（許可時）
- 永続化：LocalStorage によるタスク保存

## 工夫したところ
### 1.スケジュールに対応したカレンダー
- 全体スケジュール目安の予定に対応したカレンダーにした。
- 予定の箇所に固有の色を付け、見やすくした。
![Todoアプリの画像](/img/Todo_app.png)

### 2.班ごとのタスク管理の実装
- 各班ごとにタスクの割り振りを行い、タスクごとに期限の設定やコメントを追加できる。
![タスク管理の画像](/img/task.png)

### 3.タスクごとの進捗管理
- タスクごとにスライダー機能で、進捗度の調整をできるようにした。
- 各班の全体進捗度の割り出しも表示。
![タスクの進捗度の画像](/img/progress.png)

### 4.アーカイブ機能
- 完了になったタスクにのみアーカイブできるようにした。
- アーカイブされたものは、復元と削除ができる。
![アーカイブの画像](/img/archive.png)

### 5.タスク終了メッセージ機能
- タスクを完了にするたびに、メッセージを表示させる。
![お祝いメッセージ](/img/celebration.png)

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

- 2025.10.23 ~ 2025.11.18 (約20時間)

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