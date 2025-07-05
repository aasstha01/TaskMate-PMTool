// src/components/KanbanBoard.jsx
import TaskCard from './TaskCard';

const tasks = {
  todo: [
    { title: "Set up backend", description: "Initialize Express + MongoDB" },
    { title: "Design database schema", description: "Tasks, users, statuses" }
  ],
  inProgress: [
    { title: "Login page", description: "Basic email/password login" }
  ],
  done: [
    { title: "Landing page UI", description: "Dark theme + layout" }
  ]
};

const KanbanBoard = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      padding: '2rem',
      background: '#121212',
      minHeight: '100vh',
      color: '#fff'
    }}>
      {['todo', 'inProgress', 'done'].map((status) => (
        <div key={status} style={{ flex: 1 }}>
          <h2 style={{ color: '#d16ba5' }}>
            {status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}
          </h2>
          {tasks[status].map((task, index) => (
            <TaskCard key={index} title={task.title} description={task.description} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
