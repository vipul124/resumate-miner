import React, { useState } from 'react';

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

export default function ProfilePage({ userData, onClose }) {
    const [score, setScore] = useState(0);

    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };

    const handleScores = async () => {
        if (score) {
            try {
                const formData = new FormData();
                formData.append("test_score", score);
                formData.append("uuid", userData.uuid);

                const response = await fetch("/api/user/updatescore", {
                    method: "POST",
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

    const parsedData = userData.json_string[0];
    return (
        <div style={OVERLAY_STYLE} className="overlay">
            <div className="overlay-content">
                <button className="close-button btn btn-danger float-right" onClick={onClose}>
                    X
                </button>
                <section style={{ backgroundColor: '#eee' }}>
                    < div className="container py-5" >
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px' }}
                                        />
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-envelope fa-lg text-warning"></i>
                                            <a href={`mailto:${parsedData.email}`} className="text-decoration-none">
                                                Email: {parsedData.email}
                                            </a>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-linkedin fa-lg text-warning"></i>
                                            <a href={parsedData.linkedin_profile_link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                LinkedIn Profile
                                            </a>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                                            <a href={parsedData.github_profile_link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                                GitHub Profile
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                </div>

                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-1">
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

                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="card-text">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="card-text text-muted">{parsedData.name}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="card-text">Department</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="card-text text-muted">{parsedData.field_of_study}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="card-text">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="card-text text-muted">{parsedData.phone_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="card-text mb-4">Skills</p>
                                                <div className="d-flex flex-wrap">
                                                    {parsedData.skills.map((skill, index) => (
                                                        <span className="border border-success m-1 p-1" key={index}>{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="card-text mb-4">Resume Scores</p>

                                                <p className="card-text mt-4 mb-1" style={{ fontSize: '0.77rem' }}>Overall Score: {userData.overall_score}</p>
                                                <div className="progress rounded">
                                                    <div className="progress-bar" role="progressbar" style={{ width: userData.overall_score + '%' }} aria-valuenow={userData.overall_score} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <p className="card-text mb-1" style={{ fontSize: '.77rem' }}>Completeness Score: {userData.completeness_score}</p>
                                                <div className="progress rounded">
                                                    <div className="progress-bar" role="progressbar" style={{ width: userData.completeness_score + '%' }} aria-valuenow={userData.completeness_score} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <p className="card-text mt-4 mb-1" style={{ fontSize: '.77rem' }}>Skills Score; {userData.skill_score}</p>
                                                <div className="progress rounded">
                                                    <div className="progress-bar" role="progressbar" style={{ width: userData.skill_score + '%' }} aria-valuenow={userData.skill_score} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <p className="card-text mt-4 mb-1" style={{ fontSize: '.77rem' }}>Academic Score: {userData.academic_score}</p>
                                                <div className="progress rounded">
                                                    <div className="progress-bar" role="progressbar" style={{ width: userData.academic_score + '%' }} aria-valuenow={userData.academic_score} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <p className="card-text mt-4 mb-1" style={{ fontSize: '.77rem' }}>Test Score: {userData.test_score}</p>
                                                <div className="progress rounded">
                                                    <div className="progress-bar" role="progressbar" style={{ width: userData.test_score + '%' }} aria-valuenow={userData.test_score} aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="card-text mb-4">Projects: </p>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="card-text mb-4">Summary: </p>
                                                <p className="card-text mb-1">
                                                    {parsedData.summary}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        </div >
    );
}