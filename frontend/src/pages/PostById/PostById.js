import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import usePostRequests from "../../hooks/usePostRequests";
import Spinner from "../../components/ui/Spinner";
import PostItem from "../AllPosts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function PostById() {
  const { post_id } = useParams();
  const { getPost } = usePostRequests();
  const { post, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    getPost(post_id);
  }, [getPost, post_id]);

  return (
    <Container>
      {isLoading === "pending" || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post_id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post_id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Container>
  );
}

export default PostById;
