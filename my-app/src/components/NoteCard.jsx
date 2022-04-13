import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { EditOutlined, DeleteOutline, RemoveRedEye } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../features/notes/noteSlice";

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/update", { state: { note: note } });
  };
  const handleDetails = () => {
    navigate("/details", { state: { note: note } });
  };
  const handleDelete = () => {
    dispatch(deleteNote(note._id));
  };

  return (
    <Card elevation={5}>
      <CardHeader
        action={
          <>
            <IconButton onClick={handleEdit}>
              <EditOutlined />
            </IconButton>
            <IconButton onClick={handleDetails}>
              <RemoveRedEye />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
          </>
        }
        title={note.title}
        subheader={new Date(note.createdAt).toLocaleString("en-US")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
