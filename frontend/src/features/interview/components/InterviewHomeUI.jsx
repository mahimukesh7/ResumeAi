import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import "../style/home.scss";

const InterviewHomeUI = () => {
  const { loading, generateReport, report,GetReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
   if (data?.interviewReport?._id) {

  navigate(`/interview/${data.interviewReport._id}`);
}
  };

  if (loading) {
    return (
      <div className="loading-state">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="home-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Interview Strategy Builder</p>
          <h1>Build your personalized <span>interview preparation plan</span> instantly.</h1>
          <p className="page-description">
            Upload your resume or describe your strengths, and our AI will generate a tailored interview plan with key talking points, practice questions, and role alignment guidance.
          </p>
        </div>

        <div className="report-preview-card">
          <div className="report-preview-card__header">
            <div>
              <h2>{report?.name || "Your Name"}</h2>
              <p className="report-role">{report?.designation || "Full Stack Developer"}</p>
            </div>
            <span className="badge">AI Generated</span>
          </div>
          <div className="report-preview-card__body">
            <p>
              Your interview plan will include role-specific preparation, strengths alignment, and question practice for the most likely topics.
            </p>
            <div className="report-preview-card__stats">
              <div>
                <strong>5+</strong>
                <span>Custom interview paths</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Role relevance score</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="interview-card">
        <div className="interview-card__body">
          <div className="panel panel--left">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Tell us the role</p>
                <h2>Target job details</h2>
              </div>
              <span className="badge badge--required">Required</span>
            </div>
            <p className="panel__description">
              Paste the job description or core responsibilities from the listing so the AI can identify the technical and behavioral themes most relevant to this role.
            </p>
            <textarea
              className="panel__textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
            <div className="char-counter">0 / 1200 characters</div>
          </div>

          <div className="panel panel--right">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Add your background</p>
                <h2>Resume or self-summary</h2>
              </div>
              <span className="badge badge--secondary">Optional</span>
            </div>

            <div className="upload-section">
              <p className="section-label">Upload your resume</p>
              <label className="dropzone" htmlFor="resume-file">
                <span className="dropzone__icon">📁</span>
                <span className="dropzone__title">Drag & drop your resume</span>
                <span className="dropzone__subtitle">PDF or DOCX, up to 5MB</span>
              </label>
              <input ref={resumeInputRef} hidden id="resume-file" type="file" accept=".pdf,.docx" />
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="self-description">
              <p className="section-label">Self description</p>
              <textarea
                className="panel__textarea"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Briefly describe your experience, key skills, and goals if you don't have a resume available."
              />
            </div>

            <div className="info-box">
              <span className="info-box__icon">💡</span>
              <p>
                Providing a resume or summary helps the AI generate a stronger plan, but you only need one to get started.
              </p>
            </div>
          </div>
        </div>

        <div className="interview-card__footer">
          <div className="footer-info">
            <p>Generated plans are optimized for role alignment and coaching confidence.</p>
          </div>
          <button type="button" className="generate-btn" onClick={handleGenerateReport}>
            Generate interview plan
          </button>
        </div>
      </section>

       {GetReports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {GetReports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

      <footer className="page-footer">
        <p>Need help? Reach out to support for interview coaching and review.</p>
      </footer>
    </main>
  );
};

export default InterviewHomeUI;

