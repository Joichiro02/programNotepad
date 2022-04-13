import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAdd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const useStyle = makeStyles({
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
});

const Register = () => {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="register-body">
      <Container>
        <section>
          <Typography
            variant="h3"
            className="register-header"
            color="textSecondary"
          >
            <PersonAdd className="register-icon" />
            Register
          </Typography>
        </section>
        <section>
          <form onSubmit={onSubmit} autoComplete="off">
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              label="Name"
              color="secondary"
              type="text"
              required
              name="name"
              value={name}
              onChange={onChange}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              label="Email"
              color="secondary"
              type="email"
              required
              name="email"
              value={email}
              onChange={onChange}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              label="Password"
              color="secondary"
              type="password"
              required
              name="password"
              value={password}
              onChange={onChange}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              label="Confirm Password"
              color="secondary"
              type="password"
              required
              name="password2"
              value={password2}
              onChange={onChange}
            />
            <Button type="submit" variant="contained" color="secondary">
              Register
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default Register;
