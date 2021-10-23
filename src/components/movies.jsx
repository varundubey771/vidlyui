import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Heart from "./common/heart";
import Paginate from "./common/pagination";
import GenreList from "./genre";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";
import SearchBox from "./common/searchBox";
import Input from "./common/input";
class movies extends Component {
  state = {
    movieAll: [],
    pageSize: 4,
    currentPage: 1,
    genreAll: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };
  async componentDidMount() {
    const resp = await getGenres();
    console.log(resp);
    const genreAll = [{ name: "All Genres", _id: "" }, ...resp.data];
    const respa = await getMovies();
    this.setState({ movieAll: respa.data, genreAll });
  }

  handleDelete = async (movie) => {
    if (this.state.movieAll.length === 0) {
      return;
    }
    const movieAllCopy = this.state.movieAll;

    const movies = this.state.movieAll.filter((m) => m._id !== movie._id);
    this.setState({ movieAll: movies });
    try {
      const del = await deleteMovie(movie._id);
      console.log(del);
    } catch (ex) {
      console.log("error ??", ex);
      toast.error("error deleting");
      this.setState({ movieAll: movieAllCopy });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movieAll];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };

    movies[index].liked = !movies[index].liked;

    this.setState({ movieAll: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  genreChange = (g) => {
    this.setState({ currentGenre: g, searchQuery: "", currentPage: 1 });
    console.log("lmao", this.state.currentGenre);
  };

  handleOnSort = (s) => {
    this.setState({ sortColumn: s });
  };

  handleSearch = (query) => {
    console.log(query);
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1 });
  };

  render() {
    if (this.state.movieAll.length === 0) {
      return <p>No movies lmao</p>;
    }
    const filtered =
      this.state.currentGenre && this.state.currentGenre._id
        ? this.state.movieAll.filter(
            (m) => m.genre._id === this.state.currentGenre._id
          )
        : this.state.movieAll;

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const searchedMovies = sorted.filter((val) => {
      if (this.state.searchQuery === "") return val;
      else if (
        val.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      ) {
        return val;
      }
    });
    const moviess = paginate(
      searchedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        {console.log(sorted[0].title)}
        <div className="col-2">
          <ListGroup
            items={this.state.genreAll}
            onItemSelect={this.genreChange}
            selectedItem={this.state.currentGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <button
            className="btn m-2"
            onClick={() => {
              this.props.history.push("/movies/new");
            }}
          >
            Add Movies
          </button>
          <input
            onChange={(e) => {
              this.handleSearch(e.target.value);
            }}
          ></input>
          <MoviesTable
            moviess={moviess}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleOnSort}
            sortColumnn={this.state.sortColumn}
          ></MoviesTable>
          <Paginate
            currentPage={this.state.currentPage}
            itemCount={filtered.length}
            pageSize={this.state.pageSize}
            pageChange={this.handlePageChange}
          ></Paginate>
        </div>
      </div>
    );
  }
}

export default movies;
