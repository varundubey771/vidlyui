import Joi from "joi-browser";
import React, { Component } from "react";
import Form from "./common/form";
import Input from "./common/input";
import { genres, getGenres } from "../services/genreService";

import { getMovie, saveMovie } from "../services/movieService";
class AddMovies extends Form {
  state = {
    data: { title: "", genreId: "", stock: "", rate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    stock: Joi.number().required(),
    rate: Joi.number().required(),
    genre: Joi.string(),
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres: genres.data });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try {
      const k = await getMovie(movieId);
      const movie = k.data;
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status == 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      stock: movie.numberInStock,
      rate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("stock", "Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AddMovies;
