import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveboardEmbed, EmbedEvent } from '@thoughtspot/visual-embed-sdk';
import { initializeThoughtSpot, THOUGHTSPOT_CONFIG } from '../services/thoughtSpotConfig';
import './ScenarioPage.css';

const ScenarioPage = () => {
  const navigate = useNavigate();
  const budgetChartRef = useRef(null);
  const skillsChartRef = useRef(null);
  const gradeChartRef = useRef(null);
  const staffingChartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initEmbeds = async () => {
      try {
        setIsLoading(true);
        await initializeThoughtSpot();
        
        // Budget vs Cost Chart - First visualization
        if (budgetChartRef.current) {
          budgetChartRef.current.innerHTML = '';
          const budgetEmbed = new LiveboardEmbed(budgetChartRef.current, {
            frameParams: {
              width: '100%',
              height: '100%',
            },
            liveboardId: THOUGHTSPOT_CONFIG.liveboardId,
            vizId: 'viz1', // You'll need to get the actual viz IDs from ThoughtSpot
            hideActions: true,
            disabledActions: [],
            disabledActionReason: '',
            isLiveboardStylingAndGroupingEnabled: true,
          });
          budgetEmbed.on(EmbedEvent.Load, () => setIsLoading(false));
          await budgetEmbed.render();
        }

        // Skills Chart - Second visualization
        if (skillsChartRef.current) {
          skillsChartRef.current.innerHTML = '';
          const skillsEmbed = new LiveboardEmbed(skillsChartRef.current, {
            frameParams: {
              width: '100%',
              height: '100%',
            },
            liveboardId: THOUGHTSPOT_CONFIG.liveboardId,
            vizId: 'viz2',
            hideActions: true,
            isLiveboardStylingAndGroupingEnabled: true,
          });
          await skillsEmbed.render();
        }

        // Grade Chart - Third visualization
        if (gradeChartRef.current) {
          gradeChartRef.current.innerHTML = '';
          const gradeEmbed = new LiveboardEmbed(gradeChartRef.current, {
            frameParams: {
              width: '100%',
              height: '100%',
            },
            liveboardId: THOUGHTSPOT_CONFIG.liveboardId,
            vizId: 'viz3',
            hideActions: true,
            isLiveboardStylingAndGroupingEnabled: true,
          });
          await gradeEmbed.render();
        }

        // Staffing Chart - Fourth visualization
        if (staffingChartRef.current) {
          staffingChartRef.current.innerHTML = '';
          const staffingEmbed = new LiveboardEmbed(staffingChartRef.current, {
            frameParams: {
              width: '100%',
              height: '100%',
            },
            liveboardId: THOUGHTSPOT_CONFIG.liveboardId,
            vizId: 'viz4',
            hideActions: true,
            isLiveboardStylingAndGroupingEnabled: true,
          });
          await staffingEmbed.render();
        }
      } catch (error) {
        console.error('Error initializing embeds:', error);
        setIsLoading(false);
      }
    };

    initEmbeds();
  }, []);

  const teamMembers = [
    {
      name: 'John Spencer',
      role: 'Project Manager Lead',
      email: 'john.spencer@profinda.com',
      grade: 'Grade 5',
      location: 'Location 1',
      roleType: 'Project Manager Lead',
      status: 'Onshore',
      avatar: '👨‍💼'
    },
    {
      name: 'Shanty Smith',
      role: 'Senior Project Manager',
      email: 'shanty.smith@profinda.com',
      grade: 'Grade 5',
      location: 'Location 1',
      roleType: 'Senior Project Manager',
      status: 'Onshore',
      avatar: '👩‍💼'
    },
    {
      name: 'Peter Green',
      role: 'Project Manager',
      email: 'peter.green@profinda.com',
      grade: 'D',
      location: 'Location 1',
      roleType: 'Project Manager',
      status: 'Offshore',
      avatar: '👨‍💻'
    },
    {
      name: 'Hayley Goose',
      role: 'Associate Project Manager',
      email: 'hayley.goose@profinda.com',
      grade: 'D',
      location: 'Location 1',
      roleType: 'Associated Project Manager',
      status: 'Contractor',
      avatar: '👩‍💻'
    }
  ];

  return (
    <div className="scenario-page">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate('/scenarios')}>
        <span className="back-arrow">←</span> Back to Scenarios
      </button>

      {/* Header */}
      <div className="scenario-header">
        <h1>Automatic scenario</h1>
      </div>

      {/* Main Content Grid */}
      <div className="scenario-content">
        {/* Top Row - Charts and Metrics */}
        <div className="top-row">
          {/* Budget vs Cost - ThoughtSpot Embed */}
          <div className="card budget-card">
            <h3>Resource Utilization</h3>
            {isLoading && <div className="loading-embed">Loading chart...</div>}
            <div ref={budgetChartRef} className="thoughtspot-embed-container" style={{ height: '300px' }} />
          </div>

          {/* Hours Metric */}
          <div className="card hours-card">
            <h4>Hours</h4>
            <div className="hours-display">
              <span className="hours-value">110</span>
              <span className="hours-total">/120 h</span>
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="middle-row">
          {/* Workflow Members */}
          <div className="card team-card">
            <h3>Workflow Member</h3>
            <div className="team-list">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">{member.avatar}</div>
                  <div className="member-info">
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                    <div className="member-email">{member.email}</div>
                  </div>
                  <div className="member-details">
                    <span className="member-grade">{member.grade}</span>
                    <span className="member-location">{member.location}</span>
                  </div>
                  <div className="member-role-type">
                    <div className="role-badge">
                      <span className="role-icon">●</span> {member.roleType}
                    </div>
                    <span className={`status-badge ${member.status.toLowerCase()}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills - ThoughtSpot Embed */}
          <div className="card skills-card">
            <h3>Skills Distribution</h3>
            <div ref={skillsChartRef} className="thoughtspot-embed-container" style={{ height: '400px' }} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          {/* Grade Distribution - ThoughtSpot Embed */}
          <div className="card grade-card">
            <h3>Project Allocation</h3>
            <div ref={gradeChartRef} className="thoughtspot-embed-container" style={{ height: '300px' }} />
          </div>

          {/* Staffing Ratio - ThoughtSpot Embed */}
          <div className="card staffing-card">
            <h3>Team Composition</h3>
            <div ref={staffingChartRef} className="thoughtspot-embed-container" style={{ height: '300px' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-secondary">Recreate</button>
          <button className="btn-primary">Fill & Book</button>
          <button className="btn-secondary">Share scenario</button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;

