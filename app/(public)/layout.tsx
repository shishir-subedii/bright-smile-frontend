import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { QueryProvider } from '@/lib/providers/QueryProvider';


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navbar />
        <main className="flex-1">
          <QueryProvider>
          {children}
          </QueryProvider>
          </main>
        <Footer />
     </>
  );
}