import React, { Fragment, useEffect } from "react";
import usePostRequests from "../../hooks/usePostRequests";
import Container from "../../components/ui/Container";
import { useSelector } from "react-redux";
import Spinner from "../../components/ui/Spinner";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function AllPosts() {
  const { getAllPosts } = usePostRequests();
  const { isLoading, posts } = useSelector((state) => state.post);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Container>
      {isLoading === "pending" ? (
        <Spinner />
      ) : (
        <Fragment>
          {" "}
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <PostForm />
          {posts && (
            <div className="posts">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default AllPosts;
