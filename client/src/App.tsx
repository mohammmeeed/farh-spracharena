import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { NewGameConfigurator } from './pages/teacher/NewGameConfigurator';
import { TeacherLobby } from './pages/teacher/TeacherLobby';
import { StudentJoinPage } from './pages/student/StudentJoinPage';
import { StudentLobby } from './pages/student/StudentLobby';
import { JoinModal } from './components/JoinModal';
import { useSocket } from './hooks/useSocket';

const MainLayout: React.FC = () => {
  const { isConnected, socketId, latency, serverUrl } = useSocket();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        isConnected={isConnected}
        socketId={socketId}
        latency={latency}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      <LandingPage
        isConnected={isConnected}
        socketId={socketId}
        latency={latency}
        serverUrl={serverUrl}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        isConnected={isConnected}
      />
    </div>
  );
};

import { ToastProvider } from './context/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/join" element={<StudentJoinPage />} />
            <Route path="/student/lobby/:roomId" element={<StudentLobby />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/new-game" element={<NewGameConfigurator />} />
            <Route path="/teacher/lobby/:roomId" element={<TeacherLobby />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;



