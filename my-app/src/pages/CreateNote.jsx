import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createNote } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";

const useStyles = makeStyles({
  container: {
    marginTop: "50px",
  },
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
  form: {
    width: "700px",
    margin: "0 auto",
  },
  button: {
    marginRight: "10px",
  },
});

const CreateNote = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    description: "",
    language: "",
  });
  const { title, text, description, language } = formData;
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const noteData = {
      title,
      text,
      description,
      language,
    };
    dispatch(createNote(noteData));
    navigate("/");
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
        <TextField
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="Title"
          fullWidth
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <TextField
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="Codes"
          multiline
          minRows={4}
          fullWidth
          name="text"
          value={text}
          onChange={onChange}
          required
        />
        <TextField
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="Description"
          fullWidth
          name="description"
          value={description}
          onChange={onChange}
          required
        />
        <TextField
          className={classes.field}
          variant="outlined"
          color="secondary"
          label="Language"
          fullWidth
          name="language"
          value={language}
          onChange={onChange}
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Cansel
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Add Note
        </Button>
      </form>
    </Container>
  );
};

export default CreateNote;
