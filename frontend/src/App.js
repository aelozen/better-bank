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
// import { Footer } from "./components/partials/footer.jsx";
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
                    <Route path="/userdata" element={<UserData />} />
                </Routes>
                <MDBFooter className='bg-light text-center text-white'>
                <div className='text-center p-3' style={{ backgroundColor: 'seashell', color:'black' }}>
        Linked below are my Youtube tutorial, LinkedIn, and Github Repository for this project. 
        {/* <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com remember to add opening in another page
        </a> */}
      </div>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: 'red' }}
            href='#!'
            role='button'
          >
        <FontAwesomeIcon icon={faYoutube} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='https://www.linkedin.com/in/alexandra-gross-612702274/'
            role='button'
          >
    <FontAwesomeIcon icon={faLinkedinIn} />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='https://github.com/aelozen/better-bank'
            role='button'
          >
         <FontAwesomeIcon icon={faGithub} />
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
