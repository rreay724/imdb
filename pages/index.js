import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { Header, Trending, InTheaters } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";

export default function Home() {
  const { imdbTrending, inTheaters } = useContext(MovieContext);
  console.log("IMDB", imdbTrending);
  console.log("THEATERS", inTheaters);

  return (
    <div className="min-h-screen bg-black-black overflow-y-scroll scrollbar-hide">
      <Head>
        <title>iMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex items-center justify-center pt-16">
          <Trending />
        </div>
        <div className="flex items-center justify-center pt-16">
          <InTheaters />
        </div>
      </main>
    </div>
  );
}
