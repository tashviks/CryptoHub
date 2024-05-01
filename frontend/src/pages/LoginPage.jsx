import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import styled from "styled-components";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData);
    dispatch(login(userData));
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Loginn>
    <main className="reg_page">
      <section className="reg_section">
        <div className="container">
          <div className="req_wrapper wrapper ver">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="reg_form">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </main>
    </Loginn>
  );
};

const Loginn = styled.div`


.reg-page{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reg_section {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.reg_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reg_form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reg_form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reg_form button:hover {
  background-color: #0056b3;
}
`;

export default LoginPage;