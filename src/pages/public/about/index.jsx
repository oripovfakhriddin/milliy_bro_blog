import hands from "../../../assets/about/hands.png";
import people from "../../../assets/about/people.png";

import "./style.scss";
const AboutPage = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="about-home">
          <div>
            <h3>Our mision</h3>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>

          <div>
            <h3>Our Vision</h3>
            <h2>A platform that empowers individuals to improve</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
        <div className="about-centre">
          <div>
            <h4>Our team of creatives</h4>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div>
            <img src={hands} alt="" />
          </div>
        </div>
        <div className="about-down">
          <div>
            <img src={people} alt="" />
          </div>
          <div>
            <h4>Why we started this Blog</h4>
            <h5>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
