import { Container, Typography } from "@material-ui/core";
import { Button, makeStyles } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "700px",
    margin: "30px auto 0",
  },
  section: {
    height: "300px",
  },
  button: {
    marginTop: "20px",
    marginLeft: "10px",
  },
});

const NoteDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { note } = useLocation().state;

  return (
    <Container className={classes.container}>
      <Typography variant="h4" color="textSecondary">
        Title: {note.title}
      </Typography>
      <hr />
      <Typography variant="h6" color="textSecondary">
        Desciption: {note.description}
      </Typography>
      <hr />
      <section className={classes.section}>
        <Typography variant="h5" color="textSecondary">
          Codes: {note.text}
        </Typography>
      </section>
      <hr />
      <Typography variant="h6" color="textSecondary">
        Language: {note.language}
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
    </Container>
  );
};

export default NoteDetail;
