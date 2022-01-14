import "../styles/globals.css";
// import type { AppProps } from 'next/app'
import { MovieProvider } from "../context/movieContext";

function MyApp({ Component, pageProps }) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}

export default MyApp;
