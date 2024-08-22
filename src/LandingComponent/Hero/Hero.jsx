import React from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="hero-wrapper" id="Home">
      <div className="paddings innerWidth flexCenter hero-container">
        {/*left side*/}
        <div className=" flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle"></div>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
            >
              Transforming <br />
              Mental Health Care <br />
              with Technology
            </motion.h1>
          </div>
          <div className=" flexColStart hero-des">
            <span className="secondaryText">
            Discover how our telepsychiatry services management system <br />revolutionizes psychiatric care by enabling remote consultations and <br/>streamlining administrative tasks.
            </span>
            {/* <span className="secondaryText">
              Forget all difficulties in finding a residence for you
            </span> */}
          </div>
          {/* <div className=" flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div> */}

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={400} end={408} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText" role="H1">Consultations Provided</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={350} end={357} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText" role="H2">Satisfied Clients</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={7} />
                <span>+</span>
              </span>
              <span className="secondaryText" role="H3">Award Winning</span>
            </div>
          </div>
        </div>

        {/*right side*/}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="image-container"
          >
            <img src="./one.jpg" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
