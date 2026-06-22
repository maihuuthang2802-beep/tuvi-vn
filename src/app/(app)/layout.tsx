import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <div className="min-h-[calc(100vh-64px)] pb-20 md:pb-0">{children}</div>
      <Footer />
      <BottomNav />
    </div>
  );
}