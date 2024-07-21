import React from 'react';

export default function Home() {

    const textHighlightStyle = {
        textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: 'hsla(0, 100%, 50%, 0.1)'
    };

    return (
        <div>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={process.env.PUBLIC_URL + '/picture4.jpg'} className="d-block w-100" alt="First slide" style={{ maxHeight: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h1 style={textHighlightStyle}>Need a Cab ?</h1>
                            <p style={textHighlightStyle}>Get the cabs at lowest prices!!</p>
                            <button className='btn btn-primary'> <a href="#ride-section" style={{color:'white'}}>Book a Cab ⬇</a></button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={process.env.PUBLIC_URL + '/picture2.jpg'} className="d-block w-100" alt="Second slide" style={{ maxHeight: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 style={textHighlightStyle}>Faster and Safer</h5>
                            <p style={textHighlightStyle}>Reach within the least time.</p>
                            <button className='btn btn-primary'>
                                <a href="#ride-section" style={{color:'white'}}>Book a Cab ⬇</a>
                                </button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={process.env.PUBLIC_URL + '/picture3.jpg'} className="d-block w-100" alt="Third slide" style={{ maxHeight: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 style={textHighlightStyle}>Ready to Pick You Up</h5>
                        <button className='btn btn-primary'> <a href="#ride-section" style={{color:'white'}}>Book a Cab ⬇</a></button>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" ></span>
                </button>
            </div>
        </div>
    );
}