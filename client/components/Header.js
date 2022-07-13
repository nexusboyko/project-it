import React from "react";
import Image from "next/image";
import Link from "next/link";

function ImageLogo() {
  return (
    <div className="p-2">
      <Image
        src="/project-it-image-logo.svg"
        alt="Image Logo"
        width={40}
        height={40}
        className="p-0 m-0"
      />
    </div>
  );
}

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center border rounded-bottom mx-auto p-3" style={{ maxWidth: "90rem" }}>
          <Image
            src="/project-it-image-logo.svg"
            alt="Image Logo"
            width={40}
            height={40}
            className="p-0 m-0"
          />

          <ul
            className="nav nav-pills"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <Link href="/cards">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Cards
                </button>
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link href="/">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link href="/profile">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Profile
                </button>
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link href="/about">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  About
                </button>
              </Link>
            </li>
          </ul>

        </div>
        {/* <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            Home!
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="1"
          >
            My profile!
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex="2"
          >
            Contact me!
          </div>
        </div> */}
      </>
    );
  }
}

export default Header;
