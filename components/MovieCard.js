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
    <div
      className="px-5 hover:opacity-80 cursor-pointer shadow-xl"
      onClick={handleClick}
    >
      <div className="h-[27rem] bg-black-medium w-[12rem] rounded-lg">
        <img src={poster} className="object-fill  h-80" />
        <div className="pl-4 pt-2">
          {rating ? (
            <div className="flex pb-2 space-x-1">
              <StarIcon className="w-4 text-yellow-500" />
              <p className="text-white">{rating}</p>
            </div>
          ) : null}

          <h3 className="text-white text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
