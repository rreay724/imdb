import "../styles/globals.css";
import { MovieProvider } from "../context/movieContext";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}

export default MyApp;
