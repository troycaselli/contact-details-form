import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="f-wrapper">
      <p className="f-text">
        For assistance please call{" "}
        <a href="tel:555-5555" className="f-phone">
          555-5555
        </a>{" "}
        or email{" "}
        <a href="mailto:test@test.com" className="f-email">
          test@test.com
        </a>
        .
      </p>
    </div>
  );
}

export default Footer;
