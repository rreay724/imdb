import { useRouter } from "next/dist/client/router";

function MovieListItem({ title, description, year, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/moviePage",
      query: {
        id: id,
      },
    });
  };
  return (
    <div className="py-1  w-full my-2 bg-black-light px-2 rounded-md">
      <div className="grid grid-cols-2 items-center">
        <h2
          className="text-white text-md hover:text-gray-300 cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </h2>
        <p className="text-gray-400 text-sm text-right">{year}</p>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}

export default MovieListItem;
