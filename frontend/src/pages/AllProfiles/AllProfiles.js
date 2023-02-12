import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../components/ui/Container";
import Spinner from "../../components/ui/Spinner";
import useProfileRequests from "../../hooks/useProfileRequests";
import ProfileItem from "./ProfileItem";

function AllProfiles() {
  const { profiles, isLoading } = useSelector((state) => state.profile);
  const { loadAllProfiles } = useProfileRequests();

  useEffect(() => {
    loadAllProfiles();
  }, [loadAllProfiles]);

  const displayProfiles = (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </Fragment>
  );

  return (
    <Container>
      {isLoading === "pending" ? <Spinner /> : displayProfiles}
    </Container>
  );
}

export default AllProfiles;
