import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

export function deleteMovie(id) {
  return http.delete("http://localhost:3900/api/movies" + "/" + id);
}

export function getMovie(id) {
  return http.get("http://localhost:3900/api/movies" + "/" + id);
}

export function saveMovie(data) {
  if (data._id) {
    const body = { ...data };
    delete body._id;

    var json = body;

    var str = JSON.stringify(json);
    str = str.replace(/\"stock\":/g, '"numberInStock":');
    str = str.replace(/\"rate\":/g, '"dailyRentalRate":');
    json = JSON.parse(str);

    return http.put("http://localhost:3900/api/movies" + "/" + data._id, json);
  }
  var json = data;
  var str = JSON.stringify(json);
  str = str.replace(/\"stock\":/g, '"numberInStock":');
  str = str.replace(/\"rate\":/g, '"dailyRentalRate":');
  json = JSON.parse(str);
  return http.post("http://localhost:3900/api/movies", json);
}
