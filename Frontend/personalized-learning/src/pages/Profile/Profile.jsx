import React from 'react';
import './Profile.css';
import { FaEdit, FaEye, FaTrophy, FaStar, FaMedal, FaQuestionCircle } from 'react-icons/fa';
import { personsImgs } from '../../utils/images';


const Profile = () => {
  return (
    <div className="profile-container">
      {/* User Details */}
      <div className="profile-header">
      <div className="profile-pic">
  <img src={personsImgs.person_two} alt="profile image" />
</div>
        <div className="profile-info">
          <h2>Samaira Mehta</h2>
          <p className="rank">Rank: 1,205</p>
          <button className="edit-btn"><FaEdit /> Edit Profile</button>
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="quiz-section">
        <h3>Quiz Performance</h3>
        <div className="quiz-box">
          <div className="quiz-item easy">Quizzes Completed: 15</div>
          <div className="quiz-item medium">Ongoing Quizzes: 3</div>
          <div className="quiz-item hard">Total Quizzes Taken: 45</div>
        </div>
      </div>

      {/* Badges */}
      <div className="badges-section">
        <h3>Achievements</h3>
        <div className="badges-box">
          <div className="badge"><FaMedal className="badge-icon gold" /> Gold Quiz Master</div>
          <div className="badge"><FaMedal className="badge-icon silver" /> Silver Challenger</div>
          <div className="badge"><FaMedal className="badge-icon bronze" /> Bronze Beginner</div>
        </div>
      </div>

      {/* Activity Streak */}
      <div className="streak-section">
        <h3>Activity Streak</h3>
        <p className="streak-days">Total Active Days: 21</p>
        <p className="streak-max">Max Streak: 5</p>
      </div>

      {/* Community Stats */}
      <div className="community-stats">
        <h3>Community Stats</h3>
        <div className="stat"><FaEye /> Views: 10</div>
        <div className="stat"><FaQuestionCircle /> Quizzes Attempted: 5</div>
        <div className="stat"><FaStar /> Reputation: 120</div>
      </div>
    </div>
  );
};

export default Profile;