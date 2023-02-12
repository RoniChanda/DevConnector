import React, { Fragment } from "react";
import Moment from "react-moment";
import useProfileRequests from "../../hooks/useProfileRequests";

function ExpOrEdu({ dataList, type }) {
  const { deleteExpOrEdu } = useProfileRequests();

  const allData = dataList.map((data) => (
    <tr key={data._id}>
      <td>{type === "exp" ? data.company : data.school}</td>
      <td className="hide-sm">{type === "exp" ? data.title : data.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{data.from}</Moment> -{" "}
        {data.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{data.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            deleteExpOrEdu(
              data._id,
              type === "exp" ? "experience" : "education"
            )
          }
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">
        {type === "exp" ? "Experience" : "Education"} Credentials
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>{type === "exp" ? "Company" : "School"}</th>
            <th className="hide-sm">{type === "exp" ? "Title" : "Degree"}</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{allData}</tbody>
      </table>
    </Fragment>
  );
}

export default ExpOrEdu;
