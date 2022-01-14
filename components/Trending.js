import { MovieItem } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";
import { useContext } from "react";
import Slider from "react-slick";

function FanFavorites() {
  const { trending } = useContext(MovieContext);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[70rem]">
      <div className="flex pl-10 py-3 items-center">
        <div className="border border-l-2 rounded-full border-yellow-500 h-8" />
        <h1 className="text-white text-2xl pl-2 font-semibold">
          Fan favorites
        </h1>
      </div>
      <Slider {...settings}>
        {trending?.results?.map((movie) => (
          <MovieItem
            rating={movie.vote_average}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        ))}
      </Slider>
    </div>
  );
}

export default FanFavorites;
