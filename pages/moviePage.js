import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header, ActorItem, MovieCard } from "../components/index";
import { StarIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-elastic-carousel";

export default function MoviePage({ movie, movieTrailer }) {
  const router = useRouter();
  const { id } = router.query;

  // const [movie, setMovie] = useState();
  const [images, setImages] = useState();
  const [similar, setSimilar] = useState();
  // const [movieTrailer, setMovieTrailer] = useState();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 300, itemsToShow: 2 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 6 },
  ];

  const handleClick = (id) => {
    router.push({
      pathname: "/actorPage",
      query: {
        id: id,
      },
    });
  };

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  return (
    <div className="min-h-screen bg-black-black min-w-screen">
      <Head>
        <title>iMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="grid w-screen place-items-center pt-20">
        <div className="bg-black-default w-[80rem] px-12 py-10 my-10">
          {/* title and info header */}

          <div className="grid grid-cols-2 items-center w-full flex-grow ">
            <div className="justify-start">
              <h1 className="text-white text-5xl">{movie?.title}</h1>
              <div className="text-gray-400 space-x-2 flex items-center">
                <p>{movie?.releaseDate?.split("-")[0]} </p>
                <p>???</p>
                <p>{movie?.contentRating}</p>
                <p>???</p>
                <p>{movie?.runtimeStr}</p>
              </div>
            </div>
            <div className="flex justify-end">
              {movie?.imDbRating && (
                <div>
                  <h4 className="text-gray-400 text-sm">IMDb RATING</h4>
                  <div className="flex items-center space-x-2">
                    <StarIcon className="text-yellow-500 w-10" />
                    <div>
                      <h2 className="text-white">{movie?.imDbRating}/10</h2>
                      <p className="text-gray-400">
                        {numFormatter(movie?.imDbRatingVotes)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* End title and info */}
          {/* Start movie poster and details */}
          <div className="pt-5 w-full mx-auto">
            <div className="flex space-x-1">
              <img src={movie?.image} className="w-[20rem]" />
              <iframe
                src={movieTrailer?.linkEmbed}
                frameBorder="0"
                title="video"
                width={1000}
              />
            </div>
            {/* end movie poster and details */}

            {/* genres */}
            <div className="flex space-x-5 pt-5 w-full">
              {movie?.genreList?.map((genre) => (
                <div
                  className="border-2 border-gray-300 rounded-full w-24 
                text-gray-300 text-center py-1 px-2 hover:opacity-60 cursor-pointer"
                >
                  <p className="">{genre?.value}</p>
                </div>
              ))}
            </div>
            {/* end genres */}
            {/* start description and details */}
            <div className="w-full ">
              <div className="py-3 text-gray-300 text-lg">
                <p>{movie?.plot}</p>
              </div>
              <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5">
                <div>
                  <div className="flex space-x-3 items-center  text-lg">
                    <p className="text-gray-300 font-bold">Director</p>
                    {movie?.fullCast.directors.items?.map((director) => (
                      <a
                        className="text-blue-500 cursor-pointer hover:underline space-x-3"
                        onClick={() => handleClick(director.id)}
                      >
                        {director?.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5">
                <div>
                  <div className="flex space-x-3 items-center  text-lg">
                    <p className="text-gray-300 font-bold">Writers</p>
                    {movie?.fullCast.writers.items
                      .slice(0, 3)
                      ?.map((writer) => (
                        <a
                          className="text-blue-500 cursor-pointer hover:underline space-x-3"
                          onClick={() => handleClick(writer.id)}
                        >
                          {writer?.name}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5">
                <div className="flex space-x-3 items-center text-lg">
                  <h3 className="text-gray-300 font-bold">Stars</h3>
                  <div className="flex space-x-3">
                    {movie?.starList?.map((actor) => (
                      <a
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => handleClick(actor.id)}
                      >
                        {actor?.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* end description and details */}
            {/* Start Images */}
            <div className="w-full pt-5">
              <div className="flex pl-0 py-3 ">
                <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
                <div className="pl-2">
                  <h1 className="text-white text-3xl  font-semibold">Photos</h1>
                </div>
              </div>
              <div className="flex overflow-x-scroll scrollbar-hide space-x-2">
                {movie?.images?.items.slice(0, 20).map((image) => (
                  <img
                    src={image.image}
                    className="w-40 h-40 object-cover cursor-pointer"
                  />
                ))}
              </div>
            </div>
            {/* End Images */}
            {/* Cast section */}
            <div className="py-5 flex cursor-pointer">
              <div className="border-l-2 border-yellow-500 pr-2" />
              <h1 className="text-gray-300 font-bold text-3xl">Top cast</h1>
              <ChevronRightIcon className="w-8 text-white font-semibold hover:text-yellow-500 pt-1" />
            </div>
            <div className="grid grid-cols-2 space-y-5 w-full ">
              {movie?.actorList?.slice(0, 20).map((castMember) => (
                <ActorItem
                  key={castMember?.id}
                  id={castMember?.id}
                  actorName={castMember?.name}
                  characterName={castMember?.asCharacter}
                  profilePic={castMember?.image}
                />
              ))}
            </div>
            {/* end cast section */}
            {/* director and all crew section */}
            <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5 mt-5 w-full">
              <div>
                <div className="flex space-x-3 items-center  text-lg">
                  <p className="text-gray-300 font-bold">Director</p>
                  {movie?.fullCast.directors.items?.map((director) => (
                    <a
                      className="text-blue-500 cursor-pointer hover:underline space-x-3"
                      onClick={() => handleClick(director.id)}
                    >
                      {director?.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* End director and all crew section */}
            {/* Similar movies */}
            <div className="w-[20rem] md:w-[40rem] lg:w-[70rem] xl:w-full">
              <div className="flex ml-0 py-3 mt-10 pb-10">
                <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
                <div className="pl-2">
                  <h1 className="text-white text-3xl  font-semibold">
                    More like this
                  </h1>
                </div>
              </div>
              <Carousel
                disableArrowsOnEnd={false}
                breakPoints={breakPoints}
                outerSpacing={0}
                enableSwipe={true}
                pagination={false}
              >
                {movie?.similars?.map((movie) => (
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
            {/* End similar movies */}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const movie = await fetch(
    `https://imdb-api.com/en/API/Title/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${id}/FullActor,FullCast,Ratings,Images`
  ).then((res) => res.json());

  const movieTrailer = await fetch(
    `https://imdb-api.com/en/API/Trailer/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${id}`
  ).then((res) => res.json());

  return {
    props: { movie, movieTrailer },
  };
};
