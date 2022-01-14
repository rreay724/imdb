import { MenuIcon, SearchIcon } from "@heroicons/react/outline";

function Header() {
  return (
    <div className="flex bg-black-default h-14 items-center justify-center space-x-6">
      <img src="/imdb-logo.png" className="w-18 h-8 " />
      <div className="flex text-gray-400 items-center space-x-2">
        <MenuIcon className="w-6 " />
        <p>Menu</p>
        <div className="flex bg-white rounded-md px-2 h-8 w-[50rem] flex-col-1 items-center ">
          <input
            placeholder="Search IMDb"
            className="w-full focus:outline-none"
          />
          <SearchIcon className="w-5 text-black-black" />
        </div>
      </div>
    </div>
  );
}

export default Header;
