// src/components/TaskCard.jsx
const TaskCard = ({ title, description }) => {
  return (
    <div style={{
      background: '#1f1f1f',
      color: '#fff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{description}</p>
    </div>
  );
};

export default TaskCard;
