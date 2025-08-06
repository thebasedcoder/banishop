import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';

// This is a Server Component by default
export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // In a real app, you would fetch user data here and pass it to the nav
  const user = { name: 'Reza' };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container flex-1 my-8 md:my-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3 lg:col-span-2">
            <DashboardNav />
          </aside>
          <main className="md:col-span-9 lg:col-span-10 mx-8">
            {children}
          </main>
        </div>
      </div>
      {modal}
      <Footer />
    </div>
  );
}