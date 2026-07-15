import "@/styles/globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer/Footer";
import Parts from "@/components/Parts/Parts";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
      {/* کامپوننت سونر در بالاترین سطح پروژه قرار گرفت */}
      <Toaster position="top-center" richColors closeButton />
      <Parts></Parts>
      <Footer></Footer>
    </>
  );
}