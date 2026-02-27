import StudyMindPage from './pages/StudyMindPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'StudyMind',
    path: '/',
    element: <StudyMindPage />
  }
];

export default routes;
