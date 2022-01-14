import { MovieItem } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";
import { useContext } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function FanFavorites() {
  const { trending } = useContext(MovieContext);

  const responsive = {
    0: { items: 0 },
    568: { items: 2 },
    1024: { items: 3 },
    1592: { items: 4 },
    2160: { items: 5 },
  };
  return (
    <div className="grid grid-cols-5 gap-y-3 ">
      {/* {trending?.results?.map((movie) => (
        <MovieItem
          rating={movie.vote_average}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
      ))} */}
      {trending?.results?.map((movie) => (
        <MovieItem
          rating={movie.vote_average}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
      ))}
    </div>
  );
}

export default FanFavorites;
