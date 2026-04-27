import React, { useState } from 'react';
import styles from './Views.module.css';
import { generateProposal } from '@/app/actions/generateProposal';

export default function ProposalGeneratorView() {
  const [jobBrief, setJobBrief] = useState('');
  const [generating, setGenerating] = useState(false);
  const [proposal, setProposal] = useState('');

  const handleGenerate = async () => {
    setGenerating(true);
    setProposal('');
    try {
      const skills = localStorage.getItem('kolamate_skills') || '';
      const exp = localStorage.getItem('kolamate_exp') || '';
      const res = await generateProposal(jobBrief, skills, exp);
      if (res.success && res.proposal) {
        setProposal(res.proposal);
      } else {
        alert("Failed to generate proposal: " + res.error);
      }
    } catch (e) {
      alert("An error occurred: " + (e as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
      <div className={`glass-panel ${styles.panel}`}>
        <h2>Generate a Winning Proposal</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Job Description</label>
          <textarea 
            className={styles.textarea} 
            placeholder="Paste the job description here..."
            value={jobBrief}
            onChange={(e) => setJobBrief(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleGenerate} disabled={generating || !jobBrief}>
          {generating ? 'Drafting Proposal with AI...' : 'Generate Proposal'}
        </button>
      </div>

      {proposal && (
        <div className={`glass-panel ${styles.panel}`}>
          <h3>Drafted Proposal</h3>
          <textarea 
            className={styles.textarea} 
            style={{ minHeight: '300px' }}
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />
          <button className={styles.button} onClick={() => navigator.clipboard.writeText(proposal)}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
