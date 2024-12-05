import Footer from "./footer";
import Navbar from "./navbar";

function GlobalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default GlobalRootLayout;
