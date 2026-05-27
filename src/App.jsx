import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleIncrement = () => {
    setCount(count + step);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - step));
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value);
    setStep(isNaN(value) || value < 1 ? 1 : value);
  };

  const isRed = count >= 50;

  return (
    <div className="container">
      <div className="app-block">
        <h2>Завдання по кроках: To-Do List</h2>
        <TaskForm onAddTask={addTask} />
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>

      <div className="app-block">
        <h2>Самостійне завдання: Лічильник</h2>
        <h1 className={`counter-value ${isRed ? 'red' : ''}`}>{count}</h1>
        <div className="controls">
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
        </div>
        <div className="step-setting">
          <label htmlFor="step-input">Крок: </label>
          <input
            id="step-input"
            type="number"
            value={step}
            onChange={handleStepChange}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}

export default App;