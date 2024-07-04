
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/Clean Modern Music Studio Logo.svg";
const Footer = () => {
    return (
        <div>

            <footer className="relative mt-11 footer p-10 bg-base-200 text-base-content">
                <div>
                    <img src={logo} alt="" className='w-40 ' />
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <Link to="/" className="link link-hover">Guitar</Link>
                    <Link to="/" className="link link-hover">Piano</Link>
                    <Link to="/" className="link link-hover">Violin</Link>
                    <Link to="/" className="link link-hover">Drum</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>

                    <Link to="/" className="link link-hover">Contact us</Link>
                    <Link to="/" className="link link-hover">About us</Link>
                    <Link to="/" className="link link-hover">Blogs</Link>
                    <Link to="/" className="link link-hover">Jobs</Link>
                </div>
                <div>
                    <span className="footer-title">Terms and Policy</span>
                    <Link to="/" className="link link-hover">Terms of us</Link>
                    <Link to="/" className="link link-hover">Privacy policy</Link>
                    <Link to="/" className="link link-hover">Cookie policy</Link>
                    <h3 className='footer-title'>&copy; 2023 String Symphony. All rights reserved.</h3>
                </div>
                
            </footer>
        </div>
    );
};

export default Footer;

