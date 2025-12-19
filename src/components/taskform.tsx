import React, { useState } from "react";

const TaskForm = ({ editTask, onClose }: any) => {
  const [task, setTask] = useState(
    editTask || {
      title: "",
      description: "",
      status: "Backlog",
      priority: "Medium",
      assignee: "",
      tags: "",
    }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    let updatedTasks;

    if (editTask) {
      // EDIT
      updatedTasks = existingTasks.map((t: any) =>
        t.id === editTask.id ? { ...task, id: editTask.id } : t
      );
    } else {
      // CREATE
      updatedTasks = [
        ...existingTasks,
        {
          ...task,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">

      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg ">Title</label>

      </div>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border border-gray-500/20 p-2"
        required
      />

      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg ">Description</label>

      </div>

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border border-gray-500/20 p-2"
      />
      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg font-mono">Status</label>

      </div>

      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full border border-gray-500/20 p-2 "
      >
        <option>Backlog</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg ">Priority</label>

      </div>

      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full border border-gray-500/20 p-2"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg ">Assignee</label>

      </div>

      <input
        name="assignee"
        value={task.assignee}
        onChange={handleChange}
        placeholder="Assignee"
        className="w-full border border-gray-500/20 p-2"
      />
      <div className="mb-2">
        <label htmlFor="" className="font-semibold text-lg ">Tags</label>

      </div>

      <input
        name="tags"
        value={task.tags}
        onChange={handleChange}
        placeholder="Tags"
        className="w-full border border-gray-500/20 p-2"
      />

      <button className="w-full bg-green-500 text-white p-2">
        {editTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
