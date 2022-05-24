import http from "./httpService";
import jwtDecode from "jwt-decode";

http.setJWT(getJWT());

export async function login(email, password) {
  const { data } = await http.post("http://localhost:3900/api/auth", {
    email,
    password,
  });
  localStorage.setItem("token", data);
}

export function loginWithJWT(jwt) {
  localStorage.setItem("token", jwt);
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getJWT() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
