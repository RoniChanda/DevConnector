import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import useProfileRequests from "../../hooks/useProfileRequests";
import DashActions from "./DashActions";
import ExpOrEdu from "./ExpOrEdu";

function DashContent() {
  const { profile } = useSelector((state) => state.profile);
  const { deleteAccount } = useProfileRequests();

  return (
    <Fragment>
      <DashActions />
      {profile.experience.length !== 0 && (
        <ExpOrEdu dataList={profile.experience} type="exp" />
      )}
      {profile.education.length !== 0 && (
        <ExpOrEdu dataList={profile.education} />
      )}
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </Fragment>
  );
}

export default DashContent;
