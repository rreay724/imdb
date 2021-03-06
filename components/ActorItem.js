import { useRouter } from "next/dist/client/router";

function ActorItem({ actorName, characterName, profilePic, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/actorPage",
      query: {
        id: id,
      },
    });
  };
  return (
    <div className="flex items-center">
      <img
        src={profilePic ? profilePic : "/defaultProfile.png"}
        className="rounded-full w-24 h-24 object-cover cursor-pointer hover:opacity-70"
        onClick={handleClick}
      />
      <div className="pl-5">
        <p
          onClick={handleClick}
          className="text-white font-semibold cursor-pointer hover:text-gray-300"
        >
          {actorName}
        </p>
        <p className="text-gray-400">{characterName}</p>
      </div>
    </div>
  );
}

export default ActorItem;
