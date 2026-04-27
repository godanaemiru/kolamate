import React, { useState } from 'react';
import styles from './Views.module.css';
import { analyzeJob } from '@/app/actions/analyzeJob';

export default function JobAnalyzerView() {
  const [jobBrief, setJobBrief] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{ match: number, missing: string[], redFlags: string[] } | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setResults(null);
    try {
      const res = await analyzeJob(jobBrief);
      if (res.success && res.data) {
        setResults(res.data);
      } else {
        alert("Failed to analyze job: " + res.error);
      }
    } catch (e) {
      alert("An error occurred: " + (e as Error).message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className={`glass-panel ${styles.panel}`}>
      <h2>Analyze a Job Brief</h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Paste Client Job Description</label>
        <textarea 
          className={styles.textarea} 
          style={{ minHeight: '200px' }}
          placeholder="Looking for a React developer to build..."
          value={jobBrief}
          onChange={(e) => setJobBrief(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={handleAnalyze} disabled={analyzing || !jobBrief}>
        {analyzing ? 'Analyzing...' : 'Analyze Job'}
      </button>

      {results && (
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
          <h3>Analysis Results</h3>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <div className={`glass-panel ${styles.panel}`} style={{ flex: 1, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{results.match}%</div>
              <div>Skill Match</div>
            </div>
            <div className={`glass-panel ${styles.panel}`} style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>Missing Skills</div>
              <div>{results.missing.join(', ')}</div>
            </div>
            <div className={`glass-panel ${styles.panel}`} style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <div style={{ fontWeight: 'bold', color: '#ef4444' }}>Red Flags</div>
              <div>{results.redFlags.join(', ')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
