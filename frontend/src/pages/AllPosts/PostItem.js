import React, { Fragment } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import usePostRequests from "../../hooks/usePostRequests";

function PostItem({ post, showActions = true }) {
  const { _id, text, name, avatar, user, likes, comments, date } = post;
  const { user: authUser, isLoading } = useSelector((state) => state.auth);
  const { addLike, removeLike, deletePost } = usePostRequests();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="User Gravatar" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => addLike(_id)}
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!isLoading && user === authUser._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deletePost(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default PostItem;
