import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
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

  render() {
    if (this.state.movies.length === 0) {
      return (
        <React.Fragment>
          <br />
          <br />
          <h3>There are no movies </h3>
        </React.Fragment>
      );
    } else {
      const movies = paginate(
        this.state.movies,
        this.state.pageSize,
        this.state.currentPage
      );
      return (
        <React.Fragment>
          <br />
          <br />

          <h3>There are {this.state.movies.length} movies available</h3>
          <br />
          <br />
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-primary btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLiked(movie)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={this.state.movies.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </React.Fragment>
      );
    }
  }
}

export default Movies;
