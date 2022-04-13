import { Button, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";

const Note = () => {
  const dispatch = useDispatch();
  const { notes, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h3" color="primary">
        Notes
      </Typography>
    </Container>
  );
};

export default Note;
