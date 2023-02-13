import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/slices/authSlice";

import { profileActions } from "../redux/slices/profileSlice";
import { useAlert } from "./useAlert";

function useProfileRequests() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [createAlert] = useAlert();

  //! Load Profile
  const loadProfile = useCallback(async () => {
    dispatch(profileActions.profileLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/profile/me`,
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(profileActions.getProfile(resData));
    } catch (err) {
      dispatch(profileActions.profileError({ msg: err.msg, status: err.code }));
    }
  }, [dispatch, token]);

  //! Load all profiles
  const loadAllProfiles = useCallback(async () => {
    dispatch(profileActions.clearProfile());
    dispatch(profileActions.profileLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/profile`
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(profileActions.getAllProfiles(resData));
    } catch (err) {
      dispatch(profileActions.profileError({ msg: err.msg, status: err.code }));
    }
  }, [dispatch]);

  //! Load profile by Id
  const loadProfileById = useCallback(
    async (userId) => {
      dispatch(profileActions.profileLoading());
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/profile/user/${userId}`
        );
        const resData = await response.json();

        if (!response.ok) {
          throw resData;
        }

        dispatch(profileActions.getProfile(resData));
      } catch (err) {
        dispatch(
          profileActions.profileError({ msg: err.msg, status: err.code })
        );
      }
    },
    [dispatch]
  );

  //! Get Github Repos
  const getGithubRepos = useCallback(
    async (username) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/profile/github/${username}`
        );
        const resData = await response.json();
        if (!response.ok) {
          throw resData;
        }

        dispatch(profileActions.getRepos(resData));
      } catch (err) {
        dispatch(
          profileActions.profileError({ msg: err.msg, status: err.code })
        );
      }
    },
    [dispatch]
  );

  //! Create or Edit profile
  const createOrEditProfile = async (formData, edit) => {
    dispatch(profileActions.profileLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/profile`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(profileActions.getProfile(resData));
      createAlert([
        {
          alertType: "success",
          msg: edit ? "Profile Updated" : "Profile Created",
        },
      ]);
      return "success";
    } catch (err) {
      if (err) {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(profileActions.profileError({ msg: err.msg, status: err.code }));
    }
  };

  //! Add experience or Education
  const addExpOrEdu = async (formData, dataType) => {
    dispatch(profileActions.profileLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/profile/${dataType}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(profileActions.getProfile(resData));
      createAlert([
        {
          alertType: "success",
          msg: `Added ${dataType}`,
        },
      ]);
      return "success";
    } catch (err) {
      if (err) {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(profileActions.profileError({ msg: err.msg, status: err.code }));
    }
  };

  //! Delete Experience or Education
  const deleteExpOrEdu = async (id, dataType) => {
    dispatch(profileActions.profileLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/profile/${dataType}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(profileActions.getProfile(resData));
      createAlert([
        {
          alertType: "success",
          msg: `Removed ${dataType}`,
        },
      ]);
    } catch (err) {
      dispatch(profileActions.profileError({ msg: err.msg, status: err.code }));
    }
  };

  //! Delete account and profile
  const deleteAccount = async () => {
    dispatch(profileActions.profileLoading());
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/profile`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const resData = await response.json();

        if (!response.ok) {
          throw resData;
        }

        dispatch(profileActions.clearProfile());
        dispatch(authActions.authFail());
        createAlert([{ msg: `Your account has been deleted permanently` }]);
        return "success";
      } catch (err) {
        dispatch(
          profileActions.profileError({ msg: err.msg, status: err.code })
        );
      }
    }
  };

  return {
    loadProfile,
    loadAllProfiles,
    loadProfileById,
    getGithubRepos,
    createOrEditProfile,
    addExpOrEdu,
    deleteExpOrEdu,
    deleteAccount,
  };
}

export default useProfileRequests;
