import { useState } from "react";
import styles from '../App.module.css'
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Do HW", completed: true },
    {
      id: 2,
      title: "Do research",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const newTaskObject: Task = {
        id: tasks.length + 1,
        title: newTask,
        completed: true,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleEditTask = (taskId: number) => {
    setEditingTask(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit ? taskToEdit.title : "");
  };

  const handleSaveEdit = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTask("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      setEditingTask(null);
      return updatedTasks;
    });
  };

  return (
    <>
    <fieldset className={styles.container}>
      <form onSubmit={handleAddTask} className="add - task">
        <input className ={styles.inputBox}
          type="text"
          placeholder="Enter task here"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className ={styles.editButton}>Add New Task</button>
      </form>

      <div>
        <h2>Todo List</h2>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editingTask === task.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                </div>
              ) : (
                <>
                  <span>{task.title}</span>
                  <div className="task-actions">
                    <button className ={styles.editButton} onClick={() => handleEditTask(task.id)}>
                      Edit
                    </button>
                    <button className ={styles.editButton}onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      </fieldset>
    </>
  );
};

export default TodoList;
// <input type="checkbox" checked={task.completed} />
