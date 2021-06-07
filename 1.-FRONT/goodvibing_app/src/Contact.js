import Helmet from "react-helmet";

function About() {
  return (
    <div className="about">
      <h1>About us</h1>
      <Helmet>
        <title>Rick&amp;Morty - About us</title>
      </Helmet>
      We are a team of Hack-A-Boss students...
    </div>
  );
}

export default About;
