import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">

            <p>
              We are committed to providing the best cab services. Our goal is to make your travel experience seamless and enjoyable.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@ecab.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <a href="#" className="text-light me-2">Facebook</a>
            <a href="#" className="text-light me-2">Twitter</a>
            <a href="#" className="text-light">Instagram</a>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-0">© e-cab 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
