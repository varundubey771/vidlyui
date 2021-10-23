import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>MoviesForm {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        saves
      </button>
    </div>
  );
};

export default MovieForm;
