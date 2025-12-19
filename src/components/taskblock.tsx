import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Sortable from "sortablejs";
import TaskForm from "./taskform";

export default function TaskBoardBlocks() {
  const pendingRef = useRef<HTMLUListElement | null>(null);
  const completedRef = useRef<HTMLUListElement | null>(null);
  const inprogressRef = useRef<HTMLUListElement | null>(null);

  const [taskform, settask] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [editTask, setEditTask] = useState<any>(null);


  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);

    if (pendingRef.current) {
      Sortable.create(pendingRef.current, {
        animation: 150,
        group: "taskList",
      });
    }

    if (inprogressRef.current) {
      Sortable.create(inprogressRef.current, {
        animation: 150,
        group: "taskList",
      });
    }

    if (completedRef.current) {
      Sortable.create(completedRef.current, {
        animation: 150,
        group: "taskList",
      });
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter
        ? task.status === statusFilter
        : true;

      const matchPriority = priorityFilter
        ? task.priority === priorityFilter
        : true;

      return matchSearch && matchStatus && matchPriority;
    });
  };

  return (
    <div>


      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-500/20">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" /><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" /></svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>


            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" /></svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {!taskform && (
          <>
            <div className="mb-4 flex justify-between">
              <h1 className="font-semibold">Task Management</h1>


              <form className="max-w-3xl mx-auto">
                <div className="flex items-center shadow-xs rounded-base overflow-hidden rounded-xl border border-gray-500/20">
                  <input
                    type="search"
                    className="flex-1 px-4 py-2.5 bg-neutral-secondary-medium text-heading text-sm focus:ring-brand focus:border-brand placeholder:text-body outline-none"
                    placeholder="Search task name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <select
                    className="px-3 py-2.5 bg-neutral-secondary-medium text-sm text-body border-l border-gray-500/20 border-default-medium focus:outline-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option>Backlog</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>

                  <select
                    className="px-3 py-2.5 bg-neutral-secondary-medium text-sm text-body border-l border-gray-500/20 border-default-medium focus:outline-none"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="">All Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>


                </div>
              </form>

              <Link to="" onClick={() => settask(true)}>
                <button className="bg-blue-500 px-4 py-2 text-white  rounded-3xl">
                  New Task
                </button>
              </Link>
            </div>

            {/* TASK COLUMNS */}
            <div className="grid grid-cols-3 gap-5 mt-10">
              {/* BACKLOG */}
              <div>
                <p className="font-semibold mb-5">Backlog</p>
                <ul ref={pendingRef} className="space-y-4">
                  {getFilteredTasks()
                    .filter((t) => t.status === "Backlog")
                    .map((task) => (
                      <li key={task.id}>
                        <div className="w-full max-w-sm bg-neutral-primary-soft p-5 border rounded-3xl border-gray-500/20 rounded-base shadow-xs">
                          <span className="text-xs uppercase text-gray-500">
                            Task Name
                          </span>
                          <h5 className="mt-1 text-lg font-semibold">
                            {task.title}
                          </h5>

                          <div className="flex justify-between mt-5">
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                              {task.priority}
                            </span>

                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setEditTask(task);
                                  settask(true);
                                }}
                                className="text-blue-600 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-gray-500">
                            Created 1 hour ago
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* IN PROGRESS */}
              <div>
                <p className="font-semibold mb-5">In Progress</p>
                <ul ref={inprogressRef} className="space-y-4">
                  {getFilteredTasks()
                    .filter((t) => t.status === "In Progress")
                    .map((task) => (
                      <li key={task.id}>
                        <div className="w-full max-w-sm bg-neutral-primary-soft p-5 rounded-3xl border border-gray-500/20 rounded-base shadow-xs">
                          <span className="text-xs uppercase text-gray-500">
                            Task Name
                          </span>
                          <h5 className="mt-1 text-lg font-semibold">
                            {task.title}
                          </h5>

                          <div className="flex justify-between mt-5">
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                              {task.priority}
                            </span>

                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setEditTask(task);
                                  settask(true);
                                }}
                                className="text-blue-600 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-gray-500">
                            Created 1 hour ago
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* DONE */}
              <div>
                <p className="font-semibold mb-5">Completed</p>
                <ul ref={completedRef} className="space-y-4">
                  {getFilteredTasks()
                    .filter((t) => t.status === "Done")
                    .map((task) => (
                      <li key={task.id}>
                        <div className="w-full max-w-sm bg-neutral-primary-soft p-5 rounded-3xl border border-gray-500/20 rounded-base shadow-xs">
                          <span className="text-xs uppercase text-gray-500">
                            Task Name
                          </span>
                          <h5 className="mt-1 text-lg font-semibold">
                            {task.title}
                          </h5>

                          <div className="flex justify-between mt-5">
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                              {task.priority}
                            </span>

                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setEditTask(task);
                                  settask(true);
                                }}
                                className="text-blue-600 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-gray-500">
                            Created 1 hour ago
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {taskform && (
          <TaskForm
            editTask={editTask}
            onClose={() => {
              setEditTask(null);
              settask(false);
              setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
            }}
          />
        )}
      </div>


    </div>
  );
}
