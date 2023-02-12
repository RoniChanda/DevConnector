import React, { useState } from "react";
import usePostRequests from "../../hooks/usePostRequests";

function CommentForm(props) {
  const [text, setText] = useState("");
  const { addComment } = usePostRequests();

  const submitHandler = (event) => {
    event.preventDefault();
    addComment(props.postId, { text });
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={submitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-dark my-1">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
