import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';

const OVERLAY_STYLE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  width: '80%',
  maxHeight: '80%',
  overflowY: 'auto',
  zIndex: 1000,
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export default function UserDetailsOverlay({ userData, onClose }) {
  const [score, setScore] = useState(0);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const csrftoken = getCookie("csrftoken");
    let token = "";
    if (csrftoken !== undefined) {
      token = csrftoken;
    }
    setCsrfToken(token);
  }, []);

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };


  const handleScores = async (event) => {
    event.preventDefault();

    if (score) {
      try {
        const formData = new FormData();
        formData.append("test_score", score);
        formData.append("uuid", userData.uuid);
        const access_token = Cookies.get("access_token");

        const response = await fetch("/api/user/updatescore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Score uploaded successfully");
        } else {
          console.error("Error uploading score");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div style={OVERLAY_STYLE} className="overlay">
      <div className="overlay-content">
        <button className="close-button btn btn-danger float-right" onClick={onClose}>
          X
        </button>
        <h2>User Details</h2>
        <div className="user-details">
          <p>
            <strong>Name:</strong> {userData.json_string[0].name}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.json_string[0].phone_number}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={'mailto:' + userData.json_string[0].email}>
              {userData.json_string[0].email}
            </a>
          </p>
          <p>
            <strong>Skill Score:</strong> {userData.skill_score}
          </p>
          <p>
            <strong>Completeness Score:</strong> {userData.completeness_score}
          </p>
          <p>
            <strong>Academic Score:</strong> {userData.academic_score}
          </p>
          <p>
            <strong>Overall Score:</strong> {userData.overall_score}
          </p>
          <p>
            <strong>Skills:</strong>
          </p>
          <ul>
            {userData.json_string[0].skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <p>
            <strong>Projects Summary:</strong>
          </p>
          <ul>
            {userData.json_string[0].projects.map((project, index) => (
              <li key={index}>
                <strong>Name:</strong> {project.name}
                <br />
                <strong>Organisation:</strong> {project.organisation}
                <br />
                <strong>Timeline:</strong> {project.timeline}
                <br />
                <strong>Brief Description:</strong> {project.brief_description}
                <br />
                <strong>Project Link:</strong>{' '}
                {project.project_link ? (
                  <a href={project.project_link}>{project.project_link}</a>
                ) : (
                  'N/A'
                )}
                <br />
              </li>
            ))}
          </ul>

          <div className="form-group row">
            {/* <div className="col-sm-8">
              <input
                type="email"
                className="form-control"
                id="colFormLabel"
                placeholder="Enter Score"
              />
            </div> */}

            <div className="row">
              <form onSubmit={handleScores} className="form">
                <div className="form-group">
                  <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">
                    Update Test Score
                  </label>
                  <input type="number" className="form-control col-sm-8" onChange={handleScoreChange} />
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit Test Score
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
