import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a task tracker', completed: false },
    { id: 3, text: 'Eat lunch', completed: true },
  ]);

  const [newTask, setNewTask] = useState('');
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleEdit = (id, text) => {
    setEditing(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, text: editText };
        }
        return task;
      })
    );
    setEditing(null);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editing === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(event) => setEditText(event.target.value)}
                onBlur={() => handleUpdate(task.id)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleUpdate(task.id);
                  }
                }}
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
            )}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;