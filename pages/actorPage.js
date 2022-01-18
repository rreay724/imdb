import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header, ActorItem, MovieCard } from "../components/index";
import { StarIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";

export default function ActorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState();
  const [movieTrailer, setMovieTrailer] = useState();
  const [actor, setActor] = useState();

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
    const fetchActor = async () => {
      const star = await fetch(
        `https://imdb-api.com/en/API/Name/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${id}`
      ).then((res) => res.json());

      setActor(star);
    };

    fetchActor();
  }, [id]);

  console.log("Actor", actor);

  const birthday = actor?.birthDate.toLocaleString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let date = new Date(actor?.birthDate); // 2020-06-21
  let month = date.toLocaleString("en-us", { month: "long" }); /* June */
  let day = date.toLocaleString("en-us", { day: "numeric" }); /* June */
  let year = date.toLocaleString("en-us", { year: "numeric" }); /* June */

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

          <div className="grid grid-cols-2 items-center w-full flex-grow">
            <div className="justify-start">
              <h1 className="text-white text-5xl">{actor?.name}</h1>
              <p className="text-blue-500 text-xs pt-2">
                {actor?.role.replaceAll(",", "  |  ")}
              </p>
            </div>
            <div className="flex justify-end"></div>
          </div>
          {/* End title and info */}
          {/* Start movie poster and details */}
          <div className="pt-5 w-full mx-auto">
            <div className="flex space-x-1">
              <img src={actor?.image} className="w-[10rem]" />
              <iframe
                src={movieTrailer?.linkEmbed}
                frameBorder="0"
                title="video"
                width={1000}
              />
            </div>
            {/* end movie poster and details */}

            {/* start description and details */}
            <div className="w-[50rem] py-4">
              <p className="text-white text-sm">{actor?.summary}</p>
              <div className="flex pt-4 items-center space-x-3">
                <p className="text-white font-semibold">Born: </p>
                <p className="text-blue-500 text-sm">
                  {month + " " + day + ", " + year}
                </p>
              </div>
            </div>
            {/* end description and details */}
            {/* Start Images */}
            <div className="w-[60rem] pt-5">
              <div className="flex pl-0 py-3 ">
                <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
                <div className="pl-2">
                  <h1 className="text-white text-3xl  font-semibold">Photos</h1>
                </div>
              </div>
              <div className="flex overflow-x-scroll scrollbar-hide space-x-2">
                {movie?.images?.items.map((image) => (
                  <img
                    src={image.image}
                    className="w-40 h-40 object-cover cursor-pointer"
                  />
                ))}
              </div>
            </div>
            {/* End Images */}

            {/* director and all crew section */}
            <div className="border border-t border-b border-l-0 border-r-0 border-gray-500 py-5 mt-5 w-[60rem]">
              <div>
                <div className="flex space-x-3 items-center  text-lg">
                  <p className="text-gray-300 font-bold">Director</p>
                  {movie?.directorList?.map((director) => (
                    <a className="text-blue-500 cursor-pointer hover:underline space-x-3">
                      {director?.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* End director and all crew section */}
          </div>
        </div>
      </div>
    </div>
  );
}
