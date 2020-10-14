import React from "react";
import "./List.css";
import { Link } from "react-router-dom";

const HistoryList = (props) => {
  return (
    <div>
      {(props.borrows.length && (
        <>
          <h3>
            <span className="orange">Things</span> you borrowed
          </h3>
          <ul>
            {props.borrows.map((borrow) => (
              <li key={borrow._id}>
                <hr />
                <div className="card">
                  <img src={borrow.thing.photoUrl} className="card-img-top" alt={borrow.thing.name} />
                  <div className="card-body">
                    <h5 className="card-title">{borrow.thing.name}</h5>
                    <p className="card-text">Borrowed from {borrow.lender.name}</p>
                    <p className="card-text">
                      Requested on {borrow.createdAt.replace(/\T[^T]+$/, "")} returned on{" "}
                      {borrow.updatedAt.replace(/\T[^T]+$/, "")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>You haven't borrowed anything</h3>
          <h3>
            <Link to="/">Discover</Link> what folks have up for grabs
          </h3>
        </div>
      )}
      <hr className="thick" />
      {(props.lends.length && (
        <>
          <h3>
            <span className="orange">Things</span> you lended
          </h3>
          <ul>
            {props.lends.map((lend) => (
              <li key={lend._id}>
                <hr />
                <div className="card">
                  <img src={lend.thing.photoUrl} className="card-img-top" alt={lend.thing.name} />
                  <div className="card-body">
                    <h5 className="card-title">{lend.thing.name}</h5>
                    <p className="card-text">Lended to {lend.borrower.name}</p>
                    <p className="card-text">
                      Requested on {lend.createdAt.replace(/\T[^T]+$/, "")} returned on{" "}
                      {lend.updatedAt.replace(/\T[^T]+$/, "")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )) || (
        <div className="no-data">
          <h3>You haven't lended anything</h3>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
