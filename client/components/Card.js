import React from "react";

function Card(props) {
  return (
    <>
      <div className="col-6">
        <div className="card shadow-sm">
          <div className="row g-0">
            <div className="col-md-4">
              {/* FIXME: Change to next.js Image element */}
              <img
                src={props.img}
                className="img-fluid rounded-start"
                alt="..."
              ></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title p-0 m-0">{props.title}</h5>
                <p className="card-text">{props.author}</p>
                <p className="card-text">{props.desc}</p>
                <p className="card-text p-0 m-0">
                  <small className="text-muted">
                    Last updated {props.date.toLocaleDateString()}
                  </small>
                </p>
                <p className="card-text p-0 m-0">
                  <small className="text-muted">
                    {props.full ? "Full" : "Not full"}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
