import React, { useState } from "react";

// ローカルで使う Task 型（プロジェクトに共通の types.ts があればそちらを import してください） 
type Task = {
  id: number;
  title: string;
  team: string;
  progress: number;
  comment?: string;
};

type TaskItemProps = {
  task: Task;
  onProgressChange: (id: number, newProgress: number) => void;
  onCommentChange: (id: number, newComment: string) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onProgressChange,
  onCommentChange,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempComment, setTempComment] = useState(task.comment ?? "");

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-3 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        {/* task.name -> task.title に変更 */}
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span className="text-sm text-gray-500">{task.team}</span>
      </div>

      {/* 進捗バー */}
      <div className="w-full bg-gray-200 h-2 rounded-lg mb-2">
        <div
          className="h-2 bg-blue-500 rounded-lg transition-all"
          style={{ width: `${task.progress}%` }}
        />
      </div>

      {/* コメント欄 */}
      <div className="mt-2">
        {editing ? (
          <div>
            <textarea
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
              placeholder="コメントを入力..."
            />
            <div className="flex justify-end mt-1 space-x-2">
              <button
                onClick={() => {
                  setEditing(false);
                  setTempComment(task.comment ?? "");
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  onCommentChange(task.id, tempComment);
                  setEditing(false);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setEditing(true)}
            className="text-sm text-gray-700 cursor-pointer hover:bg-gray-50 rounded-md p-1"
          >
            {task.comment || "✏ コメントを追加"}
          </div>
        )}
      </div>
    </div>
  );
};
