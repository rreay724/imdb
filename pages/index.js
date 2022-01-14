import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { Header, Trending } from "../components/index";
import { MovieContext, useMovie } from "../context/movieContext";

export default function Home() {
  const { trending } = useContext(MovieContext);
  console.log(trending);

  return (
    <div className="min-h-screen bg-black-black">
      <Head>
        <title>iMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="justify-center w-full">
        <Trending />
      </main>
    </div>
  );
}
