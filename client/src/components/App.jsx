import React from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovie from './AddMovie.jsx';
import SearchedList from './SearchedList.jsx';
// const App = (props) => (
//   <div>Hello World!</div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      newMovie: '',
      oldList: [],
      watchedList: [],
      toWatchList: [],
      movieList: [],
      toWatchState: true,
      watchedState: false
    };
  }

  changeSearchState(query) {
    this.setState({
      search: query
    });
  }

  onSearchClick() {
    let q = this.state.search;
    let searchedList = this.state.movieList.filter(function (mov) {
      if (mov.title.includes(q)) {
        return mov;
      }
    });

    if (this.state.search.length !== 0) {
      let oldList = this.state.movieList;
      this.setState({
        movieList: searchedList,
        oldList: oldList
      });
    } else if (this.state.search.length === 0) {
      let oldList = this.state.oldList;
      this.setState({
        movieList: oldList,
        oldList: []
      });
    }
  }

  changeMovieState(query) {
    this.setState({
      newMovie: query
    });
  }

  onAddMovieClick() {
    if (this.state.watchedList.length === 0) {
      this.setState({
        toWatchList: this.state.toWatchList.concat([{ title: this.state.newMovie, watched: false }]),
        oldList: this.state.oldList.concat([{ title: this.state.newMovie, watched: false }]),
        movieList: this.state.movieList.concat([{ title: this.state.newMovie, watched: false }])
      });
    } else {
      this.setState({
        toWatchList: this.state.toWatchList.concat([{ title: this.state.newMovie, watched: false }]),
      });
    }
  }


  onWatchedButtonClick(clickedMovie) {
    let tempMovieList = this.state.movieList;

    tempMovieList.forEach((movie) => {
      if (movie.title === clickedMovie.title && movie.watched === false) {
        movie.watched = true;
      }
    });

    let watchedList = this.state.watchedList;

    tempMovieList.forEach((movie) => {
      if (movie.watched === true) {
        watchedList.push(movie);
        tempMovieList.splice(tempMovieList.indexOf(movie), 1);
      }
    });

    if (this.state.toWatchState === true) {
      this.setState({
        toWatchList: tempMovieList,
        watchedList: watchedList
      });
    } else if (this.state.watchedState === true) {
      this.setState({
        movieList: tempMovieList,
        watchedList: watchedList
      });
    }

  }

  onWatchedTabButtonClick() {
    if (this.state.watchedState === false) {
      this.setState({
        watchedState: true,
        toWatchState: false,
        movieList: this.state.watchedList
      });
    }
  }

  onToWatchTabButtonClick() {
    if (this.state.toWatchState === false) {
      this.setState({
        watchedState: false,
        toWatchState: true,
        movieList: this.state.toWatchList
      });
    }
  }

  render() {
    return (
      <div> My Anime List
        <div>
          <div>
            <h1>
              <em>
                <Search
                  searchResult={this.changeSearchState.bind(this)}
                  onSearch={this.onSearchClick.bind(this)} />
              </em>
            </h1>
          </div>
        </div>
        <div>
          <div>
            <h1>
              <em>
                <AddMovie
                  addMovie={this.changeMovieState.bind(this)}
                  onAddMovie={this.onAddMovieClick.bind(this)} />
              </em>
            </h1>
          </div>
        </div>
        <div>
          <div>
            <h1>
              <button className="watched"
                onClick={this.onWatchedTabButtonClick.bind(this)}>
                <span className="watched-icon-button">Watched</span>
              </button>
              <button className="to-watch"
                onClick={this.onToWatchTabButtonClick.bind(this)}>
                <span className="to-watch-icon">To Watch</span>
              </button>
              <ul>
                <MovieList
                  movies={this.state.movieList}
                  onWatchedClick={this.onWatchedButtonClick.bind(this)} />
              </ul>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;