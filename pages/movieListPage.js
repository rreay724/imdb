import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Header } from "../components/index";

function MovieListPage() {
  const router = useRouter();
  const [search, setSearch] = useState();
  const { searchTerm } = router.query;
  const [rowTitle, setRowTitle] = useState();

  useEffect(() => {
    const fetchSearch = async () => {
      const returnSearch = await fetch(
        `https://imdb-api.com/en/API/SearchAll/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${searchTerm}`
      ).then((res) => res.json());

      setSearch(returnSearch);
    };

    fetchSearch();
  }, [searchTerm]);

  const handlePush = (id) => {
    if (id.includes("tt")) {
      router.push({ pathname: "/moviePage", query: { id: id } });
    } else if (id.includes("nm")) {
      router.push({ pathname: "/actorPage", query: { id: id } });
    }
  };

  console.log("SEARCH", search);
  return (
    <div className="min-h-screen bg-black-black">
      <Head>
        <title>iMDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="space-y-3 mx-5 mt-10">
        {search?.results?.map((item) => (
          <div
            className="flex items-center bg-black-light w-full p-1 space-x-2 text-sm hover:opacity-90 cursor-pointer h-[4rem]"
            onClick={() => handlePush(item?.id)}
          >
            <img src={item.image} className="w-8 h-18 object-cover" />
            <p className="text-white">{item.title}</p>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
