import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { Header, ActorItem, MovieCard } from "../components/index";
import { StarIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";

function moviePage() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState();
  const [crew, setCrew] = useState();
  const [videos, setVideos] = useState();
  const [images, setImages] = useState();
  const [similar, setSimilar] = useState();
  let writers = [];

  console.log("MOVIE", movie);
  console.log("CREW", crew);

  let hours = movie?.runtime / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);

  const runTime = rhours + "h " + rminutes + "m";

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  // get movie details
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            Accept: "application/json;charset=utf-8",
          },
        }
      ).then((res) => res.json());
      setMovie(movies);
    };

    fetchMovies();
  }, [id]);

  // get cast and crew
  useEffect(() => {
    const fetchCrew = async () => {
      const cast = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            Accept: "application/json;charset=utf-8",
          },
        }
      ).then((res) => res.json());
      setCrew(cast);
    };

    fetchCrew();
  }, [id]);

  // get similar movies
  useEffect(() => {
    const similarMovieList = async () => {
      const similarMovies = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            Accept: "application/json;charset=utf-8",
          },
        }
      ).then((res) => res.json());
      setSimilar(similarMovies);
    };

    similarMovieList();
  }, [id]);

  console.log("SIMILAR", similar);

  // // get movie images
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const image = await fetch(
  //       `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  //           Accept: "application/json;charset=utf-8",
  //         },
  //       }
  //     ).then((res) => res.json());
  //     setImages(image);
  //   };

  //   fetchImages();
  // }, [id]);

  console.log("WRITERS", writers);
  // console.log("VIDEOS", videos);
  // console.log("IMAGES", images);

  return (
    <div className="min-h-screen bg-black-black min-w-screen">
      <Header />
      <div className="grid w-screen place-items-center pt-20">
        <div className="bg-black-default w-[80rem] px-5 py-10 my-10">
          {/* title and info header */}

          <div className="grid grid-cols-2 items-center w-full flex-grow">
            <div className="justify-start">
              <h1 className="text-white text-5xl">{movie?.title}</h1>
              <div className="text-gray-400 space-x-2 flex items-center">
                <p>{movie?.release_date?.split("-")[0]} </p>
                <p>•</p>
                <p></p>
                <p>{runTime}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <h4 className="text-gray-400 text-sm">IMDb RATING</h4>
                <div className="flex items-center space-x-2">
                  <StarIcon className="text-yellow-500 w-10" />
                  <div>
                    <h2 className="text-white">{movie?.vote_average}/10</h2>
                    <p className="text-gray-400">
                      {numFormatter(movie?.vote_count)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End title and info */}
          {/* Start movie poster and details */}
          <div className="pt-5 w-full">
            {movie?.backdrop_path ? (
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie?.backdrop_path}
                className="w-full object-fit"
              />
            ) : (
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
                className="max-w-full object-contain"
              />
            )}

            {/* genres */}
            <div className="flex space-x-5 pt-5">
              {movie?.genres?.map((genre) => (
                <div
                  className="border-2 border-gray-300 rounded-full w-24 
                text-gray-300 text-center py-1 px-2 hover:opacity-60 cursor-pointer"
                >
                  <p className="">
                    {genre?.name === "Science Fiction" ? "Sci-Fi" : genre?.name}
                  </p>
                </div>
              ))}
            </div>
            {/* end genres */}
            {/* start description and details */}
            <div className="w-[60rem] ">
              <div className="py-3 text-gray-300 text-lg">
                <p>{movie?.overview}</p>
              </div>
              <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5">
                {crew?.crew?.map((crewMember) => (
                  <div>
                    {crewMember?.job === "Director" ? (
                      <div className="flex space-x-3 items-center  text-lg">
                        <p className="text-gray-300 font-bold">Director</p>
                        <a className="text-blue-500 cursor-pointer hover:underline">
                          {crewMember?.name}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5">
                <div className="flex space-x-3 items-center text-lg">
                  <h3 className="text-gray-300 font-bold">Stars</h3>
                  <div className="flex space-x-3">
                    {crew?.cast?.slice(0, 3).map((castMember) => (
                      <a className="text-blue-500 cursor-pointer hover:underline">
                        {castMember?.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* end description and details */}
            {/* Cast section */}
            <div className="py-5 flex cursor-pointer">
              <div className="border-l-2 border-yellow-500 pr-2" />
              <h1 className="text-gray-300 font-bold text-3xl">Top cast</h1>
              <ChevronRightIcon className="w-8 text-white font-semibold hover:text-yellow-500 pt-1" />
            </div>
            <div className="grid grid-cols-2 space-y-5">
              {crew?.cast?.slice(0, 20).map((castMember) => (
                <ActorItem
                  actorName={castMember?.name}
                  characterName={castMember?.character}
                  profilePic={castMember?.profile_path}
                />
              ))}
            </div>
            {/* end cast section */}
            {/* director and all crew section */}
            <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5 mt-5 w-[60rem]">
              {crew?.crew?.map((crewMember) => (
                <div>
                  {crewMember?.job === "Director" ? (
                    <div className="flex space-x-3 items-center  text-lg">
                      <p className="text-gray-300 font-bold">Director</p>
                      <a className="text-blue-500 cursor-pointer hover:underline">
                        {crewMember?.name}
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {/* End director and all crew section */}
            {/* Similar movies */}
            <div className="w-[60rem] pt-5">
              <div className="flex pl-0 py-3 ">
                <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
                <div className="pl-2">
                  <h1 className="text-white text-3xl  font-semibold">
                    More like this
                  </h1>
                  <p className="text-gray-400">This week's top TV and movies</p>
                </div>
              </div>
              <div className="flex overflow-x-scroll">
                {similar?.results?.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    rating={movie.vote_average}
                    poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title={movie.title ? movie.title : movie.name}
                  />
                ))}
              </div>
            </div>
            {/* End similar movies */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default moviePage;
