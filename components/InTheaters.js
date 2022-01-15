import { MovieCard } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";
import { useContext } from "react";
import Slider from "react-slick";

function InTheaters() {
  const { inTheaters } = useContext(MovieContext);
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
    <div className="w-[75rem]">
      <div className="flex pl-10 py-3 ">
        <div className="border border-l-2 rounded-full border-yellow-500  h-9" />
        <div className="pl-2">
          <h1 className="text-white text-3xl  font-semibold">In theaters</h1>
          <p className="text-gray-400">This week's top TV and movies</p>
        </div>
      </div>
      {/* <Slider {...settings}> */}
      <div className="flex overflow-x-scroll scrollbar-hide pb-20">
        {inTheaters?.results?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            rating={movie.vote_average}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title ? movie.title : movie.name}
          />
        ))}
      </div>

      {/* </Slider> */}
    </div>
  );
}

export default InTheaters;
