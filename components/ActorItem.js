function ActorItem({ actorName, characterName, profilePic }) {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${profilePic}`} />
      <p>{actorName}</p>
      <p>{characterName}</p>
    </div>
  );
}

export default ActorItem;
