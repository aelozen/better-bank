import React, { useState, useEffect } from 'react';
import { UseCard } from '../components/partials/UseCard';
import { capitalize } from '../features/capitalize';
import { useSelector } from 'react-redux';
import logo from '../images/construction.gif';
import '../styles/imagebounce.css';

const BouncingImage = () => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bounceImage = () => {
      const randomX = Math.random() * (window.innerWidth - 100); 
      const randomY = Math.random() * (window.innerHeight - 100);
      setImagePosition({ x: randomX, y: randomY });
    };

    const interval = setInterval(bounceImage, 3000); // Bounce every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <img
      className="bouncing-image"
      src={logo}
      alt="Bouncing Ghost"
      style={{ left: imagePosition.x, top: imagePosition.y }}
    />
  );
};

export const Transfer = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="transfer-page">
      <BouncingImage />
      <UseCard
        bgcolor="success"
        opacity="10"
        header="Transfer"
        body={
          <>
            <h4>Hello, {capitalize(user.name)}!</h4>
            <p>
              <h3>This page is currently under development.</h3>
              <form className="transfer-form">
                <input
                  style={{ marginTop: '1rem' }}
                  type="input"
                  className="form-control"
                  id="transfer"
                  placeholder="Enter user account number"
                />
                <input
                  style={{ marginTop: '1rem' }}
                  type="input"
                  className="form-control"
                  id="transfer"
                  placeholder="Enter amount to transfer"
                />
                <button
                  style={{ marginTop: '1rem' }}
                  type="submit"
                  className="btn btn-outline-success"
                >
                  Transfer
                </button>
              </form>
            </p>
          </>
        }
      />
    </div>
  );
};
