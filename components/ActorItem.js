function ActorItem({ actorName, characterName, profilePic }) {
  return (
    <div className="flex items-center">
      <img
        src={
          profilePic
            ? `https://image.tmdb.org/t/p/w500${profilePic}`
            : "/defaultProfile.png"
        }
        className="rounded-full w-24 h-24 object-cover"
      />
      <div className="pl-5">
        <p className="text-white font-semibold">{actorName}</p>
        <p className="text-gray-400">{characterName}</p>
      </div>
    </div>
  );
}

export default ActorItem;
