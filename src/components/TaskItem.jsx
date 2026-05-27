export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Видалити</button>
    </li>
  );
}