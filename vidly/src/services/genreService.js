import http from "./httpService";

export async function getGenres() {
  return http.get("http://localhost:3900/api/genres");
}
