import React from 'react';


const About = () => {
  return (
    <section
      className="about-section bg-dark text-light p-5"
      style={{ backgroundColor: 'rgb(52, 58, 64)' }}
    >
      <div className="container">
        <div
          className="row justify-content-center align-items-center"
          style={{ animation: 'sway 2s infinite' }}
        >
          <div className="col-12 col-md-8 text-center">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes sway {
            0% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
            100% { transform: rotate(-1deg); }
          }
        `}
      </style>
    </section>
  );
};

export default About;
