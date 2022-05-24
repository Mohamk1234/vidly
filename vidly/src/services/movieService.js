import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export async function getMovie(movieId) {
  const { data } = await http.get("http://localhost:3900/api/movies");
  return data.find((d) => (d._id = movieId));
}

export function deleteMovie(movieId) {
  http.delete("http://localhost:3900/api/movies" + "/" + movieId);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(
      "http://localhost:3900/api/movies" + "/" + movie._id,
      body
    );
  }
  return await http.post("http://localhost:3900/api/movies", movie);
}
