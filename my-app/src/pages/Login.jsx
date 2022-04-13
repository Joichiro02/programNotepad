import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const useStyle = makeStyles({
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
});

const Login = () => {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login-body">
      <Container>
        <section>
          <Typography
            variant="h3"
            className="login-header"
            color="textSecondary"
          >
            <Person className="login-icon" /> Login
          </Typography>
        </section>
        <section>
          <form onSubmit={onSubmit} autoComplete="off">
            <TextField
              className={classes.field}
              variant="outlined"
              fullWidth
              label="Email"
              color="secondary"
              type="text"
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
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default Login;
