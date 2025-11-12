import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

function App() {
  const schedule = [
  {
    period: "11月中旬（高専祭明け）",
    tasks: ["レスコン概要説明", "アイデア出し"],
    range: [new Date(2025, 10, 10), new Date(2025, 10, 17)], // 11月10〜17日
    color: "#60a5fa", // blue-400
  },
  {
    period: "12月初旬（後期中間明け）",
    tasks: ["アイデア決定", "エントリーシート作成"],
    range: [new Date(2025, 11, 1), new Date(2025, 11, 10)],
    color: "#34d399", // green-400
  },
  {
    period: "2月中旬",
    tasks: ["書類審査"],
    range: [new Date(2026, 1, 10), new Date(2026, 1, 20)],
    color: "#facc15", // yellow-400
  },
  {
    period: "結果判明後",
    tasks: ["部品発注", "仕様決定", "回路班・プログラム班始動"],
    range: [new Date(2026, 1, 21), new Date(2026, 2, 15)],
    color: "#f97316", // orange-400
  },
  {
    period: "3月下旬",
    tasks: ["足回り完成", "アーム完成"],
    range: [new Date(2026, 2, 20), new Date(2026, 2, 31)],
    color: "#fb7185", // rose-400
  },
  {
    period: "4月上旬",
    tasks: ["回路班・プログラム班の調整"],
    range: [new Date(2026, 3, 1), new Date(2026, 3, 10)],
    color: "#a78bfa", // purple-400
  },
  {
    period: "5月初旬",
    tasks: ["最終調整", "動画撮影準備"],
    range: [new Date(2026, 4, 1), new Date(2026, 4, 10)],
    color: "#f472b6", // pink-400
  },
  {
    period: "5月中旬",
    tasks: ["動画提出"],
    range: [new Date(2026, 4, 11), new Date(2026, 4, 20)],
    color: "#4ade80", // emerald-400
  },
];

  const [tasks, setTasks] = useState([
    { id: 1, title: "カメラ制御プログラム", team: "ソフト班", progress: 40,deadline : null , priority: 2 },
    { id: 2, title: "電源基板設計", team: "回路班", progress: 70 ,deadline : null , priority: 1 },
    { id: 3, title: "アーム設計", team: "機構班", progress: 50 ,deadline : null ,priority: 3},
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTeam, setNewTeam] = useState("");
  const [newDeadline, setNewDeadline] = useState<Date | null>(null);

  // 優先度マッピング
  const PRIORITY_LABEL: Record<number, string> = { 1: "急ぎ", 2: "通常", 3: "後回し" };
  const PRIORITY_COLOR: Record<number, string> = { 1: "#ef4444", 2: "#f59e0b", 3: "#6b7280" };

  const formatDateForInput = (d: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  };

  const addTask = () => {
    if (!newTask || !newTeam) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask, team: newTeam, progress: 0 , deadline: newDeadline, priority: newTodoPriority },
    ]);
    setNewTask("");
    setNewTeam("");
    setNewDeadline(null);
    setNewTodoPriority(3);
  };

   const updateProgress = (id, progress) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, progress } : task
    ));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewDeadline(dt === "" ? null : new Date(dt));
  };

  // 班ごとの進捗を計算
  const teams = ["機構班", "プログラム班", "回路班"];
  const teamProgress = {};
  teams.forEach(t => {
    const teamTasks = tasks.filter(task => task.team === t);
    const avg = teamTasks.length
      ? Math.round(teamTasks.reduce((sum, t) => sum + t.progress, 0) / teamTasks.length)
      : 0;
    teamProgress[t] = avg;
  });

   // 日付が範囲に含まれるか判定
  const getScheduleColor = (date: Date) => {
    for (const s of schedule) {
      if (date >= s.range[0] && date <= s.range[1]) return s.color;
    }
    return null;
  };

   const [newTodoPriority, setNewTodoPriority] = useState(3); // ◀◀ 追加

    const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value)); // 数値型に変換
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">📅 ロボコン進捗管理</h1>

       <div className="calendar-container bg-white shadow p-4 rounded-xl">
        <Calendar
          tileClassName={({ date }) => {
            const color = getScheduleColor(date);
            return color ? "highlight" : "";
          }}
          tileContent={({ date }) => {
            const color = getScheduleColor(date);
            return color ? <div className="dot" style={{ background: color }}></div> : null;
          }}
        />
      </div>

      {/* 全体スケジュール */}
      <div className="bg-white shadow p-4 rounded-xl w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-3">🗓️ 全体スケジュール目安</h2>
        <ul className="space-y-3">
          {schedule.map((s, index) => (
            <li key={index} className="border-l-4 border-blue-500 pl-3">
              <p className="font-semibold">{s.period}</p>
              <ul className="text-gray-700 list-disc ml-6">
                {s.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* タスク管理 */}
      <div className="bg-white shadow p-4 rounded-xl w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">🧩 班ごとのタスク管理</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-2 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.team}</p>
                <div className="flex items-center gap-2 mt-1">
                  {task.deadline ? (
                    <p className="text-sm text-gray-400">期限: {formatDateForInput(new Date(task.deadline))}</p>
                  ) : null}
                  {/* 優先度バッジ */}
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: PRIORITY_COLOR[task.priority ?? 3],
                      color: "#fff",
                    }}
                  >
                    {PRIORITY_LABEL[task.priority ?? 3]}
                  </span>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">
                進捗: {task.progress}%
              </span>
            </li>
          ))}
        </ul>

        {/* タスク追加フォーム */}
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            placeholder="タスク名"
            className="border p-2 rounded-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="班名（例：ソフト班）"
            className="border p-2 rounded-md"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
          />
          <select
            className="border p-2 rounded-md"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
          >
            <option value="機構班">機構班</option>
            <option value="回路班">回路班</option>
            <option value="プログラム班">プログラム班</option>
          </select>

          <input
            type="datetime-local"
            className="border p-2 rounded-md"
            value={newDeadline ? formatDateForInput(newDeadline) : ""}
            onChange={updateDeadline}
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            タスク追加
          </button>
           {/* ラジオボタンの実装 ここから... */}
        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
          {[1, 2, 3].map((value) => (
            <label key={value} className="flex items-center space-x-1">
              <input
                id={`priority-${value}`}
                name="priorityGroup"
                type="radio"
                value={value}
                checked={newTodoPriority === value}
                onChange={updateNewTodoPriority}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
        </div>
      </div>
       {/* 各班の進捗まとめ */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {teams.map(t => (
          <div key={t} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-semibold mb-2">{t}</h2>
            <p className="text-sm text-gray-600 mb-1">全体進捗: {teamProgress[t]}%</p>
            <div className="h-3 bg-gray-200 rounded">
              <div
                className="h-3 bg-green-500 rounded"
                style={{ width: `${teamProgress[t]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* タスクリスト */}
<div className="space-y-4">
  {tasks.map((task) => (
    <div
      key={task.id}
      className="p-4 border rounded shadow-sm bg-white"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="font-semibold">{task.title}</p>
          <p className="text-sm text-gray-500">{task.team}</p>
        </div>

        {/* 進捗＋完了ボタン */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700 w-14 text-right">
            {task.progress}%
          </p>
          {task.progress < 100 ? (
            <button
              onClick={() => updateProgress(task.id, 100)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              完了
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm cursor-not-allowed"
            >
              完了済み
            </button>
          )}
        </div>
      </div>

      {/* スライダーで調整 */}
      <input
        type="range"
        min="0"
        max="100"
        value={task.progress}
        onChange={(e) =>
          updateProgress(task.id, Number(e.target.value))
        }
        className="w-full"
      />
      <div className="h-2 bg-gray-200 rounded mt-2">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}


export default App;
