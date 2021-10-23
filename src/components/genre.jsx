import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import http from "../services/httpService";

class GenreList extends Component {
  state = {};
  render() {
    const genres = getGenres();
    return (
      <ul className="list-group">
        <li
          className="list-group-item"
          onClick={() => this.props.genreChange("All Genres")}
        >
          All Genres
        </li>
        {genres.map((g) => (
          <li
            key={g._id}
            className="list-group-item"
            onClick={() => this.props.genreChange(g.name)}
          >
            {g.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default GenreList;
