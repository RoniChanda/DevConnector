import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import Spinner from "../../components/ui/Spinner";
import useProfileRequests from "../../hooks/useProfileRequests";
import ProfileAbout from "./ProfileAbout";
import ProfileExpOrEdu from "./ProfileExpOrEdu";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

function ProfileByUserId() {
  const { user_id } = useParams();
  const { profile, isLoading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const {
    isAuthenticated,
    user,
    isLoading: authLoading,
  } = useSelector((state) => state.auth);
  const { loadProfileById } = useProfileRequests();

  useEffect(() => {
    loadProfileById(user_id);
  }, [loadProfileById, user_id]);

  return (
    <Container>
      {profile === null || profileLoading === "pending" ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated && !authLoading && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExpOrEdu dataList={profile.experience} type="exp" />
            <ProfileExpOrEdu dataList={profile.education} type="edu" />
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Container>
  );
}

export default ProfileByUserId;
