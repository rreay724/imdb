import "../styles/globals.css";
import { MovieProvider } from "../context/movieContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}

export default MyApp;
