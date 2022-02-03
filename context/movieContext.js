import { createContext, useState, useEffect, useContext } from "react";

export const MovieContext = createContext(null);

const MovieProvider = (props) => {
  const [trending, setTrending] = useState();
  const [inTheaters, setInTheaters] = useState();
  const [imdbTrending, setImdbTrending] = useState();
  const [comingSoon, setComingSoon] = useState();
  const [tv, setTv] = useState();

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
        `https://imdb-api.com/en/API/BoxOffice/${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
      ).then((res) => res.json());

      setInTheaters(moviesInTheaters);
    };

    fetchInTheaters();
  }, []);
  useEffect(() => {
    const fetchImdbTrending = async () => {
      const imdbTrendingMovies = await fetch(
        `https://imdb-api.com/en/API/MostPopularMovies/${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
      ).then((res) => res.json());
      setImdbTrending(imdbTrendingMovies);
    };

    fetchImdbTrending();
  }, []);
  useEffect(() => {
    const fetchTv = async () => {
      const tvs = await fetch(
        `https://imdb-api.com/en/API/MostPopularTVs/${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
      ).then((res) => res.json());
      setTv(tvs);
    };

    fetchTv();
  }, []);
  useEffect(() => {
    const fetchComingSoon = async () => {
      const coming = await fetch(
        `https://imdb-api.com/en/API/ComingSoon/${process.env.NEXT_PUBLIC_IMDB_API_KEY}`
      ).then((res) => res.json());
      setComingSoon(coming);
    };

    fetchComingSoon();
  }, []);

  const movieContextValue = {
    trending,
    inTheaters,
    imdbTrending,
    tv,
    comingSoon,
  };

  return <MovieContext.Provider value={movieContextValue} {...props} />;
};

const useMovie = () => movieContext(MovieContext);

export { MovieProvider, useMovie };
