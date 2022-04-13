import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";
import NoteDetail from "./pages/NoteDetail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/update" element={<UpdateNote />} />
            <Route path="/details" element={<NoteDetail />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
