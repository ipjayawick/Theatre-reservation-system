import React from "react";
import { Button, Stack } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaFilm } from "react-icons/fa";

const MovieItem = ({ movie }) => {
  return (
    <React.Fragment>
      <Stack key={movie.id} id={movie.id} direction="horizontal" gap={3}>
        {/* {isLoading && <LoadingOverlay asOverlay />} */}
        <span className="mb-0 me-auto">
          <FaFilm size={20} className="me-2 mb-1" />
          {movie.title}
        </span>

        <Button variant="warning">Edit</Button>
      </Stack>
    </React.Fragment>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieItem;
