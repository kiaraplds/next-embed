import React, { useState } from 'react';
import './CalendarPage.css';

const CalendarPage = () => {
  const [viewDays, setViewDays] = useState(2);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for the schedule
  const technicians = [
    { id: 1, name: 'Adams, W.', group: 'Technical Service' },
    { id: 2, name: 'Andersson, H.', group: 'Technical Service' },
    { id: 3, name: 'Durand, J.-M.', group: 'Technical Service' },
    { id: 4, name: 'Esposito, M.', group: 'Technical Service' },
    { id: 5, name: 'Garcia-Fernandez, J.', group: 'Technical Service' },
    { id: 6, name: 'Jankowski, K.', group: 'Technical Service' },
    { id: 7, name: 'Makinen, I.', group: 'Technical Service' },
    { id: 8, name: 'Marshall, A.', group: 'Technical Service' },
    { id: 9, name: 'Matthews, P.', group: 'Technical Service' },
    { id: 10, name: 'Weber, N.', group: 'Technical Service' },
    { id: 11, name: 'Nielsen, E.', group: 'Technical Service' }
  ];

  const tasks = [
    { id: 1, technicianId: 2, title: 'Problem with printing unit', day: 0, startHour: 1, duration: 23, jobNumber: '1003071', status: 'warning', category: 'General' },
    { id: 2, technicianId: 3, title: 'Flowpacker', day: 1, startHour: 1.5, duration: 2, jobNumber: '1003078', status: 'completed', category: null },
    { id: 3, technicianId: 4, title: 'Air handling unit AHU 1', day: 0, startHour: 2, duration: 22, jobNumber: '1005530', status: 'critical', category: 'Maintenance' },
    { id: 4, technicianId: 5, title: 'Lubricate drivetrain', day: 1, startHour: 1, duration: 2.5, jobNumber: '1005441', status: 'critical', category: null },
    { id: 5, technicianId: 6, title: 'Fill high-efficiency boiler', day: 0, startHour: 1, duration: 11, jobNumber: '1000198', status: 'critical', category: 'Troubleshooting services' },
    { id: 6, technicianId: 7, title: 'Production line installation', day: 0, startHour: 3, duration: 9, jobNumber: '1001532', status: 'alert', category: null },
    { id: 7, technicianId: 7, title: 'Import production line in Ultimo', day: 0, startHour: 4, duration: 8, jobNumber: '1001577', status: 'normal', category: null },
    { id: 8, technicianId: 7, title: 'Test production line', day: 1, startHour: 8, duration: 4, jobNumber: '1001584', status: 'normal', category: null },
    { id: 9, technicianId: 8, title: 'Maintenance route production lines', day: 1, startHour: 4, duration: 3, jobNumber: '1003033', status: 'completed', category: 'Maintenance' },
    { id: 10, technicianId: 8, title: 'Downtime folding machine', day: 1, startHour: 1, duration: 3, jobNumber: '1003052', status: 'warning', category: null },
    { id: 11, technicianId: 10, title: 'Troubleshooting services', day: 0, startHour: 0, duration: 24, jobNumber: null, status: 'background', category: 'Troubleshooting services' },
    { id: 12, technicianId: 10, title: 'Troubleshooting services', day: 1, startHour: 0, duration: 24, jobNumber: null, status: 'background', category: 'Troubleshooting services' },
    { id: 13, technicianId: 11, title: 'The mixer got stuck', day: 1, startHour: 1, duration: 3, jobNumber: '1003029', status: 'warning', category: 'Maintenance' }
  ];

  const jobsList = [
    { title: 'Lift intercom keeps squealing', category: 'Lift building section A' },
    { title: 'Failure', status: 'critical' },
    { title: 'Failure', status: 'critical' },
    { title: 'Failure', status: 'critical' },
    { title: 'Lubricate top', category: 'Quay crane 001' },
    { title: 'Periodical Maintenance', category: null },
    { title: 'Paper is jammed', category: 'Photocopier' },
    { title: 'Periodical Maintenance', date: '02/03/2023 11:31' },
    { title: 'Administrator - 2:00h / 2:00h', category: null },
    { title: 'Leaking tap', category: 'Project-related' },
    { title: '31/07/2023 08:00', category: null },
    { title: "Engine won't accelerate", category: 'Electric motor' },
    { title: 'Error/Repair', date: '07/08/2023 08:00' },
    { title: 'FIX: Valve broken, steam release', category: 'Project-related' },
    { title: '02/10/2023 13:17', category: null }
  ];

  const getStatusColor = (status) => {
    const colors = {
      critical: '#e74c3c',
      warning: '#f39c12',
      alert: '#f1c40f',
      completed: '#27ae60',
      normal: '#95a5a6',
      background: '#d5e8e8'
    };
    return colors[status] || '#95a5a6';
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const getDayName = (offset) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric' });
  };

  const previousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - viewDays);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + viewDays);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-page">
      {/* Header */}
      <div className="calendar-header">
        <div className="calendar-controls">
          <div className="date-navigation">
            <button className="btn-today" onClick={goToToday}>Today</button>
            <button className="btn-nav" onClick={previousDay}>‹</button>
            <button className="btn-nav" onClick={nextDay}>›</button>
            <span className="date-range">
              {formatDate(currentDate)} - {formatDate(new Date(currentDate.getTime() + (viewDays - 1) * 86400000))}
            </span>
            <span className="week-number">(w {getWeekNumber(currentDate)})</span>
          </div>

          <div className="view-controls">
            <select 
              className="view-selector" 
              value={viewDays} 
              onChange={(e) => setViewDays(Number(e.target.value))}
            >
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="7">1 week</option>
            </select>
            <button className="btn-settings">⚙</button>
            <button className="btn-info">ⓘ</button>
          </div>
        </div>

        <div className="jobs-summary">
          <button className="btn-plan">To plan ▼</button>
          <button className="btn-calendar">📅</button>
          <span className="jobs-count">Jobs: 107</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="calendar-content">
        {/* Schedule Grid */}
        <div className="schedule-container">
          <div className="schedule-grid">
            {/* Column Headers */}
            <div className="grid-header">
              <div className="header-group"></div>
              {[...Array(viewDays)].map((_, i) => (
                <div key={i} className="header-day">
                  {getDayName(i)}
                </div>
              ))}
            </div>

            {/* Group Header */}
            <div className="group-row">
              <div className="group-header">
                <span className="group-toggle">▼</span>
                <span className="group-name">Technical Service</span>
              </div>
            </div>

            {/* Technicians and their schedules */}
            {technicians.map(tech => (
              <div key={tech.id} className="schedule-row">
                <div className="tech-name">{tech.name}</div>
                <div className="timeline-container">
                  {[...Array(viewDays)].map((_, dayIndex) => (
                    <div key={dayIndex} className="timeline-day">
                      {tasks
                        .filter(task => task.technicianId === tech.id && task.day === dayIndex)
                        .map(task => (
                          <div
                            key={task.id}
                            className={`task-block ${task.status}`}
                            style={{
                              left: `${(task.startHour / 24) * 100}%`,
                              width: `${(task.duration / 24) * 100}%`,
                              backgroundColor: getStatusColor(task.status)
                            }}
                          >
                            {task.category && (
                              <div className="task-category">{task.category}</div>
                            )}
                            <div className="task-content">
                              {task.status === 'critical' && <span className="task-icon">⚠</span>}
                              {task.status === 'alert' && <span className="task-icon">⚠ ⚙</span>}
                              {task.status === 'warning' && <span className="task-icon">⚠</span>}
                              {task.status === 'completed' && <span className="task-icon">✓</span>}
                              {task.status === 'normal' && <span className="task-icon">ℹ</span>}
                              <div className="task-details">
                                <div className="task-title">{task.title}</div>
                                {task.jobNumber && (
                                  <div className="task-time">
                                    {Math.floor(task.startHour)}:00h - {task.jobNumber}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Jobs List */}
        <div className="jobs-sidebar">
          <div className="jobs-header">
            <input type="text" className="jobs-search" placeholder="Find" />
          </div>
          <div className="jobs-list">
            {jobsList.map((job, index) => (
              <div key={index} className="job-item">
                <div className={`job-indicator ${job.status || ''}`}></div>
                <div className="job-content">
                  <div className="job-title">{job.title}</div>
                  {job.category && <div className="job-category">{job.category}</div>}
                  {job.date && <div className="job-date">{job.date}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;


