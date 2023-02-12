import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Container from "../../components/ui/Container";
import Spinner from "../../components/ui/Spinner";
import useProfileRequests from "../../hooks/useProfileRequests";
import DashContent from "./DashContent";
import { Link } from "react-router-dom";

function Dashboard() {
  const { profile, isLoading } = useSelector((state) => state.profile);
  const { loadProfile } = useProfileRequests();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <Container>
      {isLoading === "pending" ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> {" Welcome"} {user && user.name}
          </p>
          {profile !== null ? (
            <DashContent />
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default Dashboard;
