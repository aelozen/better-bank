import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "./components/Navbar";
import { Home } from "./pages/Home.jsx";
import { CreateAccount } from "./pages/CreateAccount";
import { Deposit } from "./pages/Deposit";
import { Withdraw } from "./pages/Withdraw";
import { Login } from "./pages/Login";
import { UserData } from "./pages/UserData";
import { Balance } from "./pages/Balance.jsx";
import { Transfer } from "./pages/Transfer.jsx";
import { MDBFooter, MDBContainer, MDBBtn} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<CreateAccount />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/balance" element={<Balance />} />                    
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/userdata" element={<UserData />} />
                </Routes>
                <MDBFooter className='bg-light text-center text-white'>
                <div className='text-center p-3' style={{ backgroundColor: 'seashell', color:'black' }}>
        Linked below are my Youtube tutorial, LinkedIn, and Github Repository for this project. 
      </div>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
        <MDBBtn
          floating
          className="m-1"
          style={{ backgroundColor: 'red' }}
          href="#!"
          role="button"
          disableRipple
        >
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </MDBBtn>

        <MDBBtn
          floating
          className="m-1"
          style={{ backgroundColor: '#0082ca' }}
          href="https://www.linkedin.com/in/alexandra-gross-612702274/"
          role="button"
          disableRipple
        >
          <a href="https://www.linkedin.com/in/alexandra-gross-612702274/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </MDBBtn>

        <MDBBtn
          floating
          className="m-1"
          style={{ backgroundColor: '#333333' }}
          href="https://github.com/aelozen/better-bank"
          role="button"
          disableRipple
        >
          <a href="https://github.com/aelozen/better-bank" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'indianred' }}>
        © 2023 Copyright: aelozen
        {/* <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com remember to add opening in another page
        </a> */}
      </div>
    </MDBFooter>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
