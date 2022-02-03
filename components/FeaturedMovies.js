import { MovieCard } from "./index";
import { MovieContext, useMovie } from "../context/movieContext";
import { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-elastic-carousel";

function FeaturedMovies() {
  const { inTheaters, comingSoon, imdbTrending, tv } = useContext(MovieContext);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 2 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 6 },
  ];

  return (
    <div className="w-[20rem] md:w-[40rem] lg:w-[70rem] xl:w-[80rem]">
      <div className="my-10">
        <div className="flex ml-20 py-3 mt-10">
          <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
          <div className="pl-2">
            <h1 className="text-white text-3xl  font-semibold">Top movies</h1>
            <p className="text-gray-400">This week's top movies</p>
          </div>
        </div>
        <Carousel
          disableArrowsOnEnd={true}
          breakPoints={breakPoints}
          className="px-0 "
          outerSpacing={0}
          enableSwipe={true}
          pagination={false}
        >
          {imdbTrending?.items?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              rating={movie.vote_average}
              poster={movie.image}
              title={movie.title}
            />
          ))}
        </Carousel>
      </div>
      <div className="my-10">
        <div className="flex ml-20 py-3 mt-10">
          <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
          <div className="pl-2">
            <h1 className="text-white text-3xl  font-semibold">Top TV shows</h1>
            <p className="text-gray-400">This week's top TV shows</p>
          </div>
        </div>
        <Carousel
          disableArrowsOnEnd={true}
          breakPoints={breakPoints}
          className="px-0 "
          outerSpacing={0}
          enableSwipe={true}
          pagination={false}
        >
          {tv?.items?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              rating={movie.vote_average}
              poster={movie.image}
              title={movie.title}
            />
          ))}
        </Carousel>
      </div>
      <div className="my-10">
        <div className="flex ml-20 py-3 mt-10">
          <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
          <div className="pl-2">
            <h1 className="text-white text-3xl  font-semibold">In theaters</h1>
            <p className="text-gray-400">Now playing in theaters</p>
          </div>
        </div>
        <Carousel
          disableArrowsOnEnd={true}
          breakPoints={breakPoints}
          className="px-0 "
          outerSpacing={0}
          enableSwipe={true}
          pagination={false}
        >
          {inTheaters?.items?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              rating={movie.vote_average}
              poster={movie.image}
              title={movie.title}
            />
          ))}
        </Carousel>
      </div>
      <div className="my-10">
        <div className="flex ml-20 py-3 mt-10">
          <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
          <div className="pl-2">
            <h1 className="text-white text-3xl  font-semibold">Coming soon</h1>
            <p className="text-gray-400">Upcoming movies</p>
          </div>
        </div>
        <Carousel
          disableArrowsOnEnd={true}
          breakPoints={breakPoints}
          className="px-0 "
          outerSpacing={0}
          enableSwipe={true}
          pagination={false}
        >
          {comingSoon?.items?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              rating={movie.vote_average}
              poster={movie.image}
              title={movie.title}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default FeaturedMovies;
