import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = createContext(null);

const MovieProvider = (props) => {
  const [trending, setTrending] = useState();
  const [inTheaters, setInTheaters] = useState();
  useEffect(() => {
    const fetchTrending = async () => {
      const trendingMovies = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            Accept: "application/json;charset=utf-8",
          },
        }
      ).then((res) => res.json());
      setTrending(trendingMovies);
    };

    fetchTrending();
  }, []);
  useEffect(() => {
    const fetchInTheaters = async () => {
      const moviesInTheaters = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            Accept: "application/json;charset=utf-8",
          },
        }
      ).then((res) => res.json());
      setInTheaters(moviesInTheaters);
    };

    fetchInTheaters();
  }, []);

  const movieContextValue = { trending, inTheaters };

  return <MovieContext.Provider value={movieContextValue} {...props} />;
};

const useMovie = () => movieContext(MovieVontext);

export { MovieProvider, useMovie };
