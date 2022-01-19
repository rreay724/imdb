import { MenuIcon, SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function Header() {
  const [searchTerm, setSearchTerm] = useState();
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: "/movieListPage",
      query: {
        searchTerm: searchTerm,
      },
    });
  };
  return (
    <div className="flex bg-black-default h-14 items-center justify-center space-x-6">
      <img
        src="/imdb-logo.png"
        className="w-18 h-8 cursor-pointer"
        onClick={() => router.push("/")}
      />
      <div className="flex text-gray-400 items-center space-x-2">
        <MenuIcon className="w-6 " />
        <p>Menu</p>
        <div className="flex bg-white rounded-md px-2 h-8 w-[50rem] flex-col-1 items-center ">
          <input
            placeholder="Search IMDb"
            className="w-full focus:outline-none"
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <SearchIcon className="w-5 text-black-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Header;
