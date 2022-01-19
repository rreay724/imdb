import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import { Header } from "../components/index";

function MovieListPage() {
  const router = useRouter();
  const [search, setSearch] = useState();
  const { searchTerm } = router.query;

  useEffect(() => {
    const fetchSearch = async () => {
      const returnSearch = await fetch(
        `https://imdb-api.com/en/API/Search/${process.env.NEXT_PUBLIC_IMDB_API_KEY}/${searchTerm}`
      ).then((res) => res.json());

      setSearch(returnSearch);
    };

    fetchSearch();
  }, [searchTerm]);

  console.log("SEARCH", search);
  return (
    <div className="min-h-screen bg-black-black min-w-screen">
      <div className="space-y-2">
        {search?.results?.map((item) => (
          <div
            className="flex items-center bg-black-light w-full p-1 space-x-2 text-sm hover:opacity-90 cursor-pointer h-18"
            onClick={() => {
              router.push({ pathname: "/moviePage", query: { id: item.id } });
            }}
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
