// Bootstrap CSS features
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
// import "../styles/globals.css";
import { useEffect } from "react";

import Header from "../components/Header.js"

export default function MyApp({ Component, pageProps }) {
  // Boostrap JS features
  useEffect(() => {
    import("../node_modules/bootstrap/dist/js/bootstrap.js");
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
