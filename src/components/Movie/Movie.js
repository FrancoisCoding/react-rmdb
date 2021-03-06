import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

export default class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    const { match } = this.props;
    if (localStorage.getItem(`${match.params.movieId}`)) {
      const state = JSON.parse(localStorage.getItem(`${match.params.movieId}`));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      // Movie Data
      const endpoint = `${API_URL}movie/${
        match.params.movieId
      }?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        if (res.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: res }, () => {
            // Actors Data In SetState Callback Function
            const endpoint = `${API_URL}movie/${
              this.props.match.params.movieId
            }/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(res => res.json())
              .then(res => {
                const directors = res.crew.filter(
                  member => member.job === "Director"
                );
                this.setState(
                  { actors: res.cast, directors, loading: false },
                  () => {
                    localStorage.setItem(
                      `${this.props.match.params.movieId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          });
        }
      })
      .catch(err => console.error("Error:", err));
  };

  render() {
    const { movie, directors, actors, loading } = this.state;
    return (
      <div className="rmdb-movie">
        {movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </div>
        ) : null}
        {actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!actors && !loading ? <h1>No Movie Found</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}
