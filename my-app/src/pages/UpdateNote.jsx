import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../features/notes/noteSlice";

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

const EditNote = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { note } = useLocation().state;

  const [formData, setFormData] = useState({
    title: note.title,
    text: note.text,
    description: note.description,
    language: note.language,
  });
  const { title, text, description, language } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const noteData = {
      id: note._id,
      newNotes: {
        title,
        text,
        description,
        language,
      },
    };
    dispatch(updateNote(noteData));
    navigate("/");
  };

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
        />
        <Button
          className={classes.button}
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onSubmit}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditNote;
