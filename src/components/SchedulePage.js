import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext.js';
import './SchedulePage.css';

const SchedulePage = ({ onBack }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const handleSchedule = () => {
    // TODO: Implement scheduling logic
    console.log('Scheduling post for:', {
      date: selectedDate,
      time: selectedTime,
      timezone: selectedTimezone
    });
  };

  return (
    <div className="schedule-page" style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="schedule-container">
        <div className="schedule-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h1>Schedule Post</h1>
        </div>

        <div className="schedule-content">
          <div className="schedule-section">
            <h2>Select Date and Time</h2>
            <div className="schedule-inputs">
              <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="input-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="schedule-preview">
            <h3>Preview</h3>
            <p>
              Post will be scheduled for:{' '}
              {selectedDate && selectedTime
                ? new Date(`${selectedDate}T${selectedTime}`).toLocaleString('en-US', {
                    timeZone: selectedTimezone,
                    dateStyle: 'full',
                    timeStyle: 'long'
                  })
                : 'Select date and time'}
            </p>
          </div>

          <div className="schedule-actions">
            <button 
              className="schedule-button"
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime}
            >
              Schedule Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage; 