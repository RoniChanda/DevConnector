import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import usePostRequests from "../../hooks/usePostRequests";

function CommentItem({ postId, comment }) {
  const { _id, text, name, avatar, user, date } = comment;
  const { isLoading, user: authUser } = useSelector((state) => state.auth);
  const { deleteComment } = usePostRequests();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="User Gravatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!isLoading && authUser._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
