import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

function App() {
  const schedule = [
    {
      period: "11月中旬（高専祭明け）",
      tasks: ["レスコン概要説明", "アイデア出し"],
    },
    {
      period: "12月初旬（後期中間明け）",
      tasks: ["アイデア決定", "エントリーシート作成"],
    },
    {
      period: "2月中旬",
      tasks: ["書類審査"],
    },
    {
      period: "結果判明後",
      tasks: ["部品発注", "仕様決定", "回路班・プログラム班始動"],
    },
    {
      period: "3月下旬",
      tasks: ["足回り完成", "アーム完成"],
    },
    {
      period: "4月上旬",
      tasks: ["回路班・プログラム班の調整"],
    },
  ];

  const [tasks, setTasks] = useState([
    { id: 1, title: "カメラ制御プログラム", team: "ソフト班", progress: 40 },
    { id: 2, title: "電源基板設計", team: "回路班", progress: 70 },
    { id: 3, title: "アーム設計", team: "機構班", progress: 50 },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTeam, setNewTeam] = useState("");

  const addTask = () => {
    if (!newTask || !newTeam) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask, team: newTeam, progress: 0 },
    ]);
    setNewTask("");
    setNewTeam("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">📅 ロボコン進捗管理</h1>

      {/* カレンダー表示 */}
      <div className="bg-white shadow p-4 rounded-xl mb-6">
        <Calendar />
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
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            タスク追加
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
