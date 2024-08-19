import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <section className="f-wrapper" id="Footer">
      <div className="paddings innerWidth flexCenter f-container">
        {/*left side */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />
          <span className="secondarytext">
          Our vision is to make mental health care accessible <br />and effective for everyone through a compassionate <br />telepsychiatric system enabling individual to achieve  <br />their best mental well-being from anywhere
            <br />
            
          </span>
        </div>

        {/*right side */}
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText"> Avaniyapuram,Madurai-625012</span>
          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Service</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
