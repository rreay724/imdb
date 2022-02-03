import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { Header, Trending, InTheaters } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";

export default function Home() {
  const { imdbTrending, inTheaters } = useContext(MovieContext);
  console.log("IMDB", imdbTrending);
  console.log("THEATERS", inTheaters);

  return (
    <div className="min-h-screen bg-black-black">
      <Head>
        <title>iMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex justify-center pt-16">
          <InTheaters />
        </div>
      </main>
    </div>
  );
}
