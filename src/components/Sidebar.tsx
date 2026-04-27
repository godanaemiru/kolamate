import React from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span role="img" aria-label="sparkles">✨</span>
        Kolamate
      </div>
      <nav className={styles.nav}>
        <div 
          className={`${styles.navItem} ${activeTab === 'profile' ? styles.navItemActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </div>
        <div 
          className={`${styles.navItem} ${activeTab === 'analyzer' ? styles.navItemActive : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          Job Analyzer
        </div>
        <div 
          className={`${styles.navItem} ${activeTab === 'generator' ? styles.navItemActive : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          Proposal Generator
        </div>
      </nav>
    </aside>
  );
}
