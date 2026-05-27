import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
    <div className="app-container">
      <h1>Мій То-Do List на React</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      <div className="counter-section">
        <h2>Віджет Лічильника</h2>
        <h1 className={`counter-value ${isRed ? 'red' : ''}`}>{count}</h1>
        <div className="counter-buttons">
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
        </div>
        <div className="counter-step">
          <label htmlFor="step-input">Крок лічильника: </label>
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