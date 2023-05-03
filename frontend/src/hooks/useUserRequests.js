import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/slices/authSlice";
import { useAlert } from "./useAlert";

function useUserRequests() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [createAlert] = useAlert();

  //! Load User
  const loadUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/auth`,
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(authActions.userLoaded(resData));
    } catch (error) {
      dispatch(authActions.authFail());
    }
  }, [dispatch, token]);

  //! Login User
  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/auth`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData.errors;
      }

      dispatch(authActions.authSuccess(resData));
      dispatch(authActions.userLoaded(resData));
      return "success";
    } catch (err) {
      if (err) {
        let errors = [];
        err.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(authActions.authFail());
    }
  };

  //! Register User
  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/users`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData.errors;
      }
      dispatch(authActions.authSuccess(resData));
      dispatch(authActions.userLoaded(resData));
      return "success";
    } catch (err) {
      if (err) {
        let errors = [];
        err.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(authActions.authFail());
    }
  };

  return { loadUser, loginUser, registerUser };
}

export default useUserRequests;
