import http from "./httpService";

export function register(user) {
  return http.post("http://localhost:3900/api/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
export function auth(user) {
  return http.post("http://localhost:3900/api/auth", {
    email: user.username,
    password: user.password,
  });
}
