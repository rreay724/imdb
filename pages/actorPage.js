import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header, MovieListItem } from "../components/index";

export default function ActorPage({
  actor,
  images,
  movies,
  directorMovies,
  producerMovies,
}) {
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

          <div className="grid grid-cols-2 items-center mx-auto w-[60rem] flex-grow ">
            <div className="justify-start">
              <h1 className="text-white text-5xl">{actor?.name}</h1>
              <p className="text-blue-500 text-xs pt-2">
                {actor?.role?.replaceAll(",", "  |  ")}
              </p>
            </div>
            <div className="flex justify-end"></div>
          </div>
          {/* End title and info */}
          {/* Start movie poster and details */}
          <div className="pt-5 mx-auto w-[60rem]">
            {/* end movie poster and details */}
            <div className="border border-gray-600 p-3 rounded-md mb-2">
              <div className="flex space-x-1">
                <img src={actor?.image} className="w-[20rem]" />
              </div>
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
            </div>

            {/* end description and details */}
            {/* Start Images */}
            <div className="w-[60rem]  border border-gray-600 p-3 rounded-md">
              <div className="flex pl-0 py-3 ">
                <div className="border border-l-2 rounded-full border-yellow-500 h-9" />
                <div className="pl-2">
                  <h1 className="text-white text-3xl  font-semibold">Photos</h1>
                </div>
              </div>
              <div className="flex overflow-x-scroll scrollbar-hide space-x-2">
                {images?.items.slice(0, 20).map((image) => (
                  <img
                    src={image.image}
                    className="w-40 h-40 object-cover cursor-pointer"
                  />
                ))}
              </div>
            </div>
            {/* End Images */}

            {/* director and all crew section */}
            <div className="py-5 mt-5 w-[60rem]">
              <div>
                <div className="items-center  text-lg border border-gray-600 p-3 rounded-md">
                  <p className="text-white text-2xl">Filmography</p>
                  {movies.length ? (
                    <div>
                      <div className="w-full bg-gradient-to-t from-black-light to-black-extraLight rounded-lg mt-7 flex">
                        <h3 className="text-white font-semibold pl-2 shadow-lg">
                          Actor
                        </h3>
                        <p className="text-gray-300 pl-1">{`(${movies.length} credits)`}</p>
                      </div>
                      {movies.map((movie) => (
                        <MovieListItem
                          id={movie?.id}
                          year={movie?.year}
                          title={movie?.title}
                          description={movie?.description}
                          role={movie?.role}
                        />
                      ))}
                    </div>
                  ) : null}
                  {directorMovies && (
                    <div>
                      <div className="w-full bg-gradient-to-t from-black-light to-black-extraLight rounded-lg mt-7 flex">
                        <h3 className="text-white font-semibold pl-2 shadow-lg">
                          Director
                        </h3>
                        <p className="text-gray-300 pl-1">{`(${directorMovies.length} credits)`}</p>
                      </div>
                      {directorMovies.map((movie) => (
                        <MovieListItem
                          id={movie?.id}
                          year={movie?.year}
                          title={movie?.title}
                          description={movie?.description}
                          role={movie?.role}
                        />
                      ))}
                    </div>
                  )}

                  {producerMovies && (
                    <div>
                      <div className="w-full bg-gradient-to-t from-black-light to-black-extraLight rounded-lg mt-7 flex">
                        <h3 className="text-white font-semibold pl-2 shadow-lg">
                          Producer
                        </h3>
                        <p className="text-gray-300 pl-1">{`(${producerMovies.length} credits)`}</p>
                      </div>
                      {producerMovies.map((movie) => (
                        <MovieListItem
                          id={movie?.id}
                          year={movie?.year}
                          title={movie?.title}
                          description={movie?.description}
                          role={movie?.role}
                        />
                      ))}
                    </div>
                  )}
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

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const movies = [];
  const directorMovies = [];
  const producerMovies = [];

  const actor = await fetch(
    `https://imdb-api.com/en/API/Name/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${id}`
  ).then((res) => res.json());

  actor.castMovies.map((movie) => {
    if (movie.role === "Actor" || movie.role === "Actress") {
      movies.push(movie);
    }
  });

  actor.castMovies.map((producer) => {
    if (producer.role === "Producer") {
      producerMovies.push(producer);
    }
  });

  actor.castMovies.map((director) => {
    if (director.role === "Director") {
      directorMovies.push(director);
    }
  });

  const images = await fetch(
    `https://imdb-api.com/en/API/Images/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${id}/Full`
  ).then((res) => res.json());

  return { props: { actor, images, movies, directorMovies, producerMovies } };
};
