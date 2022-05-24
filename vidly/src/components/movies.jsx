import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SearchBox from "./common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: undefined,
    sortColumn: { path: "title", order: "asc" },
    searchItem: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLiked = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchItem: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    let searchItem = e.currentTarget.value;
    this.setState({ searchItem, currentPage: 1 });
  };

  render() {
    const user = this.props.user;

    if (this.state.movies.length === 0) {
      return (
        <React.Fragment>
          <br />
          <br />
          <h3>There are no movies </h3>
        </React.Fragment>
      );
    } else {
      let filtered = this.state.movies;
      if (this.state.searchItem === "") {
        filtered =
          this.state.selectedGenre && this.state.selectedGenre._id
            ? this.state.movies.filter(
                (m) => m.genre._id === this.state.selectedGenre._id
              )
            : this.state.movies;
      } else {
        this.state.selectedGenre = undefined;
        filtered = this.state.movies.filter((m) =>
          m.title.toLowerCase().startsWith(this.state.searchItem.toLowerCase())
        );
      }
      const sorted = _.orderBy(
        filtered,
        [this.state.sortColumn.path],
        [this.state.sortColumn.order]
      );
      const movies = paginate(
        sorted,
        this.state.pageSize,
        this.state.currentPage
      );
      return (
        <div className="row">
          <div className="col-2">
            <br />
            <br />
            <br />
            <br />
            <br />
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            <br />
            {user && (
              <Link to="/movies/new" className="btn btn-primary">
                New Movie
              </Link>
            )}
            <br />
            <br />
            <h3>showing {filtered.length} movies in the database</h3>
            <br />
            <SearchBox
              value={this.state.searchItem}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLiked={this.handleLiked}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />

            <Pagination
              itemsCount={filtered.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      );
    }
  }
}

export default Movies;
