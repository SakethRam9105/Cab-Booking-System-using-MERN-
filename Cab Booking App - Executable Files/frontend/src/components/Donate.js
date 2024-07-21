import React from 'react';

const Donate = () => {
  return (
    <section
      className="donate-section bg-light text-dark p-5"
      style={{ backgroundColor: 'rgb(240, 240, 240)' }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-8 text-center">
            <h2 className="mb-4">Support Our Cause</h2>
            <p className="mb-4">
              Your generous support helps us continue our mission to make a positive impact. We believe in creating a better world through our various initiatives, and every contribution counts. By donating, you are helping us provide resources, support, and opportunities to those in need. 
            </p>
            <p className="mb-4">
              <strong>How to Donate:</strong> You can make a contribution through our secure online payment system. Simply click the "Donate Now" button below to proceed. We appreciate every donation, large or small, and your support makes a real difference.
            </p>
            <a
              href="#"
              className="btn btn-primary btn-lg"
              style={{ backgroundColor: 'rgb(0, 123, 255)', borderColor: 'rgb(0, 123, 255)' }}
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;

