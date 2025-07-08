import React from 'react';
import { Layout } from '../components/Layout';
import { GameDashboard } from '../components/GameDashboard';

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <GameDashboard />
    </Layout>
  );
};