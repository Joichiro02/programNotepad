import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import Spinner from "../components/Spinner";
import { getNotes, reset } from "../features/notes/noteSlice";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes, isError, isLoading, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getNotes());
    return () => dispatch(reset()); // in first render it will not be rendered, it the useEffect change it will run first
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container>
      {notes.length > 0 ? (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid key={note._id} item lg={6}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" color="testSecondary" align="center">
          You have not set any notes!!!
        </Typography>
      )}
    </Container>
  );
};

export default DashBoard;
