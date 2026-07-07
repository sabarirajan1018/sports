import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  showSidebar?: boolean;
  isAdmin?: boolean;
}

export function Layout({ showSidebar = true, isAdmin = false }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {isAuthenticated && showSidebar && <Sidebar isAdmin={isAdmin} />}
        <main className={`flex-1 ${isAuthenticated && showSidebar ? 'ml-64' : ''} transition-all duration-300`}>
          <div className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
