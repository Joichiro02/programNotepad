import axios from "axios";

const API_URL = "/api/notes/";

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);
  return response.data;
};

const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteNote = async (noteID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + noteID, config);

  return response.data;
};

const updateNote = async (newData, token) => {
  const { id, newNotes } = newData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + id, newNotes, config);
  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
};

export default noteService;
