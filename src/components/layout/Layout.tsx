import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "../ui/WhatsAppButton";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen" id="top">
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
