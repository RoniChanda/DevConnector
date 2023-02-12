import React from "react";
import Moment from "react-moment";

function ProfileExpOrEdu({ dataList, type }) {
  return (
    <div className={`profile-${type} bg-white p-2`}>
      <h2 className="text-primary">
        {type === "exp" ? "Experience " : "Education"}
      </h2>
      {dataList.length > 0 ? (
        dataList.map((data) => (
          <div key={data._id}>
            <h3 className="text-dark">
              {type === "exp" ? data.company : data.school}
            </h3>
            <p>
              <Moment format="YYYY/MM/DD">{data.from}</Moment> -{" "}
              {!data.to ? (
                " Now"
              ) : (
                <Moment format="YYYY/MM/DD">{data.to}</Moment>
              )}
            </p>
            <p>
              <strong>{type === "exp" ? "Position: " : "Degree: "}</strong>
              {type === "exp" ? data.title : data.degree}
            </p>
            {type !== "exp" && (
              <p>
                <strong>Field of Study: </strong>
                {data.fieldofstudy}
              </p>
            )}
            <p>
              <strong>Description: </strong>
              {data.description}
            </p>
          </div>
        ))
      ) : (
        <h4>No {type === "exp" ? "experience" : "education"} credentials</h4>
      )}
    </div>
  );
}

export default ProfileExpOrEdu;
