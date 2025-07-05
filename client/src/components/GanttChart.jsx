import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';


const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (!ganttRef.current) return;

    // Format tasks for frappe-gantt
    const formattedTasks = tasks.map((task) => ({
      id: task._id || task.id,
      name: task.title,
      start: task.start || new Date().toISOString().split('T')[0],
      end: task.end || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: task.progress || 0,
      custom_class: task.status.replace(' ', '-')
    }));

    // eslint-disable-next-line no-new
    new Gantt(ganttRef.current, formattedTasks, {
      view_mode: 'Day',
      date_format: 'YYYY-MM-DD',
    });
  }, [tasks]);

  return <div ref={ganttRef} />;
};

export default GanttChart;
