import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/ui/AuthForm";
import Container from "../../components/ui/Container";
import useUserRequests from "../../hooks/useUserRequests";

function Login() {
  const { loginUser } = useUserRequests();
  const navigate = useNavigate();

  const loginHandler = ({ email, password }) => {
    loginUser({ email, password }).then((data) => {
      if (data) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <Container>
      <AuthForm onSubmit={loginHandler} />
    </Container>
  );
}

export default Login;
