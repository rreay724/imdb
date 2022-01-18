function MovieListItem({ title, description, year }) {
  return (
    <div className="py-2  w-full border border-gray-500 px-2">
      <div className="grid grid-cols-2 items-center">
        <h2 className="text-blue-800 text-md">{title}</h2>
        <p className="text-white text-sm text-right">{year}</p>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}

export default MovieListItem;
