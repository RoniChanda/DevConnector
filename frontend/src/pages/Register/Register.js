import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/ui/AuthForm";
import Container from "../../components/ui/Container";
import { useAlert } from "../../hooks/useAlert";
import useUserRequests from "../../hooks/useUserRequests";

function Register() {
  const [createAlert] = useAlert();
  const { registerUser } = useUserRequests();
  const navigate = useNavigate();

  const registerHandler = (formData) => {
    if (formData.password === formData.confirmPassword) {
      registerUser(formData).then((data) => {
        if (data) {
          navigate("/dashboard");
        }
      });
    } else {
      createAlert([{ alertType: "danger", msg: "Passwords do not match" }]);
    }
  };

  return (
    <Container>
      <AuthForm isRegister onSubmit={registerHandler} />
    </Container>
  );
}

export default Register;
