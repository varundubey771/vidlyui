import React, { Component } from "react";
import Heart from "./common/heart";

import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "genre" },
    { path: "numberInStock", label: "stock" },
    { path: "dailyRentalRate", label: "rate" },
    {
      key: "like",
      content: (movie) => (
        <Heart
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Heart>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          delete
        </button>
      ),
    },
  ];

  render() {
    const { moviess, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <TableHeader
          onSort={this.props.onSort}
          sortColumnn={this.props.sortColumnn}
          columns={this.columns}
        ></TableHeader>
        <TableBody data={moviess} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default MoviesTable;
