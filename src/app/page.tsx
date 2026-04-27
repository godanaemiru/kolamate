"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './page.module.css';
import dashboardStyles from '@/components/Dashboard.module.css';

import ProfileView from '@/components/views/ProfileView';
import JobAnalyzerView from '@/components/views/JobAnalyzerView';
import ProposalGeneratorView from '@/components/views/ProposalGeneratorView';

export default function Home() {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className={styles.container}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={dashboardStyles.main}>
        <header className={dashboardStyles.header}>
          <h1 className={dashboardStyles.title}>
            {activeTab === 'profile' && 'Freelancer Profile'}
            {activeTab === 'analyzer' && 'Job Brief Analyzer'}
            {activeTab === 'generator' && 'Proposal Generator'}
          </h1>
          <p className={dashboardStyles.subtitle}>
            {activeTab === 'profile' && 'Set up your skills and experience to get perfectly matched proposals.'}
            {activeTab === 'analyzer' && 'Paste a job description to instantly see if it is worth your time.'}
            {activeTab === 'generator' && 'Generate a winning proposal tailored exactly to the client\'s needs.'}
          </p>
        </header>
        <section className={dashboardStyles.content}>
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'analyzer' && <JobAnalyzerView />}
          {activeTab === 'generator' && <ProposalGeneratorView />}
        </section>
      </main>
    </div>
  );
}
