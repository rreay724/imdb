import { useRouter } from "next/dist/client/router";
import { StarIcon } from "@heroicons/react/solid";

function MovieCard({ poster, rating, title, id }) {
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
    <div className="px-5 hover:opacity-80 cursor-pointer" onClick={handleClick}>
      <div className="h-[30rem] bg-black-medium w-[12rem] rounded-lg">
        <img src={poster} className="object-cover " />
        <div className="pl-4 pt-2">
          <div className="flex pb-2">
            <StarIcon className="w-4 text-yellow-500" />
            <p className="text-white">{rating}</p>
          </div>
          <h3 className="text-white text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
