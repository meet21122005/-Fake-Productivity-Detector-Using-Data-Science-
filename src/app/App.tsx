import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Sidebar, PageType } from "./components/Sidebar";
import { DashboardPage } from "./components/pages/DashboardPage";
import { UploadCSVPage } from "./components/pages/UploadCSVPage";
import { ManualAnalysisPage } from "./components/pages/ManualAnalysisPage";
import { ReportsPage } from "./components/pages/ReportsPage";
import { HistoryPage } from "./components/pages/HistoryPage";
import { ProfilePage } from "./components/pages/ProfilePage";

interface UserData {
  name: string;
  email: string;
  photo: string;
}

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        userName={user.name}
        userPhoto={user.photo}
      />

      {/* Main Content */}
      <div className="lg:ml-72 p-4 md:p-8 pt-20 lg:pt-8 relative z-10">
        {currentPage === "dashboard" && <DashboardPage userId={user.name} />}
        {currentPage === "upload" && <UploadCSVPage userId={user.name} userName={user.name} />}
        {currentPage === "manual" && <ManualAnalysisPage userId={user.name} userName={user.name} />}
        {currentPage === "reports" && <ReportsPage userId={user.name} />}
        {currentPage === "history" && <HistoryPage userId={user.name} />}
        {currentPage === "profile" && <ProfilePage user={user} />}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
