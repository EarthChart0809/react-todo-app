import { useState, useEffect,type ChangeEvent } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { TaskItem } from "./task_management";

type Task = {
  id: number;
  title: string;
  team: string;
  progress: number;
  deadline: Date | null;
  priority: number;
  comment: string;
};

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

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "カメラ制御プログラム", team: "プログラム班", progress: 40, deadline: null, priority: 2 ,comment: ""},
    { id: 2, title: "電源基板設計", team: "回路班", progress: 70, deadline: null, priority: 1 ,comment: "基盤待ち"},
    { id: 3, title: "アーム設計", team: "機構班", progress: 50, deadline: null, priority: 3 ,comment: ""},
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTeam, setNewTeam] = useState("");
  const [newDeadline, setNewDeadline] = useState<Date | null>(null);
  const [newTodoPriority, setNewTodoPriority] = useState<number>(3); 

  const localStorageKey = "todoapp-tasks-v1"; // ◀◀ 追加

  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as (Omit<Task, "deadline"> & { deadline: string | null })[];
      const converted = parsed.map((p) => ({ ...p, deadline: p.deadline ? new Date(p.deadline) : null }));
      setTasks(converted);
    } catch (e) {
      console.error("localStorage load failed:", e);
    }
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    try {
      const toStore = tasks.map((t) => ({ ...t, deadline: t.deadline ? t.deadline.toISOString() : null }));
      localStorage.setItem(localStorageKey, JSON.stringify(toStore));
    } catch (e) {
      console.error("localStorage save failed:", e);
    }
  }, [tasks]);

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
    const newItem: Task = {
      id: Date.now(),
      title: newTask,
      team: newTeam,
      progress: 0,
      deadline: newDeadline,
      priority: newTodoPriority,
      comment: "",
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
    setNewTeam("");
    setNewDeadline(null);
    setNewTodoPriority(3);
  };

  const updateProgress = (id: number, progress: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, progress } : task)));
  };

  const updateDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
    setNewDeadline(dt === "" ? null : new Date(dt));
  };

  // 班ごとの進捗を計算
  const teams = ["機構班", "プログラム班", "回路班"];
  const teamProgress: Record<string, number> = {};
  teams.forEach((t) => {
    const teamTasks = tasks.filter((task) => task.team === t);
    const avg = teamTasks.length
      ? Math.round(teamTasks.reduce((sum, tt) => sum + tt.progress, 0) / teamTasks.length)
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

  const updateNewTodoPriority = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const handleCommentChange = (id: number, newComment: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, comment: newComment } : t))
    );
  };

  const handleProgressChange = (id: number, newProgress: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, progress: newProgress } : t))
    );
  };

  // 初回会議日（例: 2025年10月8日 を初回とする）
  const meetingStart = new Date(2025, 9, 8); // 月は0始まり（9 = 10月）

  // 日付が隔週水曜の会議日に該当するか
  const isBiweeklyWednesday = (date: Date) => {
    // 水曜日かチェック（0=日曜, 3=水曜）
    if (date.getDay() !== 3) return false;
    // 日付差を週単位で計算（UTC に寄せる）
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const startUtc = Date.UTC(meetingStart.getFullYear(), meetingStart.getMonth(), meetingStart.getDate());
    const dUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const weeks = Math.floor((dUtc - startUtc) / msPerWeek);
    return weeks >= 0 && weeks % 2 === 0;
  };

  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  const archiveTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    // 安全に更新（関数型アップデート）
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setArchivedTasks((prev) => [...prev, task]);
  };

  // アーカイブから復元
  const restoreTask = (id: number) => {
    const task = archivedTasks.find((t) => t.id === id);
    if (!task) return;
    setArchivedTasks((prev) => prev.filter((t) => t.id !== id));
    setTasks((prev) => [...prev, task]);
  };

  // アーカイブから完全削除
  const deleteArchived = (id: number) => {
    const task = archivedTasks.find((t) => t.id === id);
    if (!task) return;
    // フールプルーフ：確認ダイアログを表示
    const confirmed = window.confirm(
      `アーカイブ済みタスク「${task.title}」を完全に削除しますか？この操作は取り消せません。`
    );
    if (!confirmed) return;
    setArchivedTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Fukaken 進捗管理</h1>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="calendar-container bg-white shadow p-4 rounded-xl">
        <Calendar
          tileClassName={({ date }) => {
            const color = getScheduleColor(date);
            return color ? "highlight" : "";
          }}
          tileContent={({ date }) => {
            const color = getScheduleColor(date);
            return (
              <div className="flex flex-col items-center">
                {color ? <div className="dot" style={{ background: color }}></div> : null}
                {isBiweeklyWednesday(date) ? (
                  <div className="text-xs text-blue-600 mt-1">会議</div>
                ) : null}
              </div>
            );
          }}
        />
      </div>

      {/* 全体スケジュール */}
      <div className="bg-white shadow p-4 rounded-xl w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-3">全体スケジュール目安</h2>
        <ul className="space-y-3">
          {schedule.map((s, index) => (
            <li
              key={index}
              className="pl-3"
              style={{ borderLeft: `4px solid ${s.color}`, paddingLeft: "0.75rem" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: s.color }}
                  aria-hidden
                />
                <p className="font-semibold m-0">{s.period}</p>
              </div>
              <ul className="text-gray-700 list-disc ml-6">
                {s.tasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      {/* タスク管理 */}
      <div className="bg-white shadow p-4 rounded-xl w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">班ごとのタスク管理</h2>
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

        <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onProgressChange={handleProgressChange}
            onCommentChange={handleCommentChange}
          />
        ))}
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
            <div className="flex items-center gap-2">
              <button
                disabled
                className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm cursor-not-allowed"
              >
                完了済み
              </button>
              <button
                onClick={() => archiveTask(task.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                アーカイブ
              </button>
            </div>
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
{archivedTasks.length > 0 && (
  <div className="bg-white shadow p-4 rounded-xl w-full max-w-2xl mt-8">
    <h2 className="text-lg font-semibold mb-2">📦 アーカイブされたタスク</h2>
    <ul className="space-y-2">
      {archivedTasks.map((task) => (
        <li key={task.id} className="p-2 border rounded-md bg-gray-100 text-gray-500 flex justify-between items-center">
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="text-sm">{task.team}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => restoreTask(task.id)}
              className="text-blue-600 hover:underline text-sm"
            >
              元に戻す
            </button>
            <button
              onClick={() => deleteArchived(task.id)}
              className="text-red-600 hover:underline text-sm"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}


export default App;
