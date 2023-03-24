import React from "react";
const NotFound = () => (
  <div className="body_wrapper">
    <section className="error_two_area">
      <div className="container flex">
        <div className="error_content_two text-center">
          <h2>Error. We can’t ftind the page you’re looking for.</h2>
          <p>
            Sorry for the inconvenience. Go to our homepage or check out our
            latest collections for Fashion, Chair, Decoration...{" "}
          </p>
          <form action="#" className="search">
            <input type="text" className="form-control" placeholder="search" />
          </form>
          <a href="/" className="about_btn btn_hover">
            Back to Home Page <i className="arrow_right"></i>
          </a>
        </div>
      </div>
    </section>
  </div>
);
export default NotFound;
