import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/slices/postSlice";
import { useAlert } from "./useAlert";

function usePostRequests() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [createAlert] = useAlert();

  //! get all posts
  const getAllPosts = useCallback(async () => {
    dispatch(postActions.postLoading());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts`,
        { headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(postActions.getPosts(resData));
    } catch (err) {
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  }, [token, dispatch]);

  //! Add like
  const addLike = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts/like/${postId}`,
        { method: "PUT", headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(postActions.updateLikes({ postId, likes: resData }));
    } catch (err) {
      if (err) {
        createAlert([{ alertType: "danger", msg: err.msg }]);
      }
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  //! Remove like
  const removeLike = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts/unlike/${postId}`,
        { method: "PUT", headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(postActions.updateLikes({ postId, likes: resData }));
    } catch (err) {
      if (err) {
        createAlert([{ alertType: "danger", msg: err.msg }]);
      }
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  //! Delete post
  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts/${postId}`,
        { method: "DELETE", headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(postActions.deletePost(postId));
      createAlert([{ alertType: "success", msg: "Post removed" }]);
    } catch (err) {
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  //! Add post
  const addPost = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts`,
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

      dispatch(postActions.addPost(resData));
      createAlert([{ alertType: "success", msg: "Post created" }]);
    } catch (err) {
      if (err) {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  //! get Post
  const getPost = useCallback(
    async (postId) => {
      dispatch(postActions.postLoading());
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/api/posts/${postId}`,
          { headers: { Authorization: "Bearer " + token } }
        );
        const resData = await response.json();

        if (!response.ok) {
          throw resData;
        }

        dispatch(postActions.getPost(resData));
      } catch (err) {
        dispatch(postActions.postError({ msg: err.msg, status: err.code }));
      }
    },
    [token, dispatch]
  );

  //! Add comment
  const addComment = async (postId, formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts/comment/${postId}`,
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

      dispatch(postActions.addComment(resData));
      createAlert([{ alertType: "success", msg: "Comment added" }]);
    } catch (err) {
      if (err) {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push({ alertType: "danger", msg: error.msg });
        });
        createAlert(errors);
      }
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  //! Delete comment
  const deleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/api/posts/comment/${postId}/${commentId}`,
        { method: "DELETE", headers: { Authorization: "Bearer " + token } }
      );
      const resData = await response.json();

      if (!response.ok) {
        throw resData;
      }

      dispatch(postActions.removeComment(commentId));
      createAlert([{ alertType: "success", msg: "Comment removed" }]);
    } catch (err) {
      dispatch(postActions.postError({ msg: err.msg, status: err.code }));
    }
  };

  return {
    getAllPosts,
    addLike,
    removeLike,
    deletePost,
    addPost,
    getPost,
    addComment,
    deleteComment,
  };
}

export default usePostRequests;
