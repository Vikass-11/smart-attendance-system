import type { ReactNode } from 'react';

// 1. Define the props interface to include children
interface LayoutProps {
  children: ReactNode;
}

// 2. Apply the interface to the component
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Your Sidebar / Navbar UI goes here */}
      <main className="p-6">
        {children} {/* This is where your page content is rendered */}
      </main>
    </div>
  );
};

export default Layout;