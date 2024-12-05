
import Footer from "./footer";
import Navbar from "./navbar";
import { ReactQueryClientProvider } from "./react-query-provider";
function GlobalRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      <Footer />
    </>
  );
}

export default GlobalRootLayout;
