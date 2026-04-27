import React, { useState } from 'react';
import styles from './Views.module.css';

export default function ProfileView() {
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [saved, setSaved] = useState(false);

  // Load from local storage on mount
  React.useEffect(() => {
    setSkills(localStorage.getItem('kolamate_skills') || '');
    setExperience(localStorage.getItem('kolamate_exp') || '');
  }, []);

  const handleSave = () => {
    localStorage.setItem('kolamate_skills', skills);
    localStorage.setItem('kolamate_exp', experience);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={`glass-panel ${styles.panel}`}>
      <h2>Freelancer Profile Setup</h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Define your skills and experience so Kolamate can match you accurately to jobs and tailor your proposals.
      </p>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Core Skills (comma separated)</label>
        <input 
          className={styles.input} 
          placeholder="e.g. React, Next.js, Node.js, UI/UX Design"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Experience Level & Bio</label>
        <textarea 
          className={styles.textarea} 
          placeholder="I am a senior frontend developer with 5+ years of experience building high-performance web applications..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={handleSave}>
        {saved ? 'Saved!' : 'Save Profile'}
      </button>
    </div>
  );
}
