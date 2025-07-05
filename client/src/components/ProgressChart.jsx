// src/components/ProgressChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffb347'];

const ProgressChart = ({ tasks }) => {
  const statusCounts = {
    todo: 0,
    'in progress': 0,
    done: 0,
  };

  tasks.forEach(task => {
    statusCounts[task.status]++;
  });

  const data = [
    { name: 'To Do', value: statusCounts.todo },
    { name: 'In Progress', value: statusCounts['in progress'] },
    { name: 'Done', value: statusCounts.done },
  ];

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>📈 Task Progress Overview</h3>
      <PieChart width={350} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ProgressChart;
