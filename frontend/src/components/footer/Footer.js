import React from 'react'
import { FaGithub, FaLinkedinIn, FaTwitterSquare, FaFacebook } from 'react-icons/fa'

export default function Footer() {
    return (

        <footer className="footer">
            <div className="footer-container">
                <div className="footer-container-top">

                    <div className="footer-container-top__section">

                        <div className="footer-container-top__section--title">
                            CONTACT
                        </div>

                        <div className="footer-container-top__section--text">
                            Somewherer In Monterey Park, CA
                        </div>

                        <div className="footer-container-top__section--text">
                            Yilinruan@gmail.com
                        </div>

                        <div className="footer-container-top__section--text">
                            (626)666-8888
                        </div>

                        <div className="footer-container-top__section--icons">
                            <div className="footer-container-top__section--icons-facebook" ><FaFacebook className="facebook" /></div>
                            <div className="footer-container-top__section--icons-twitter"><FaTwitterSquare className="twitter" /></div>
                            <div className="footer-container-top__section--icons-github" ><FaGithub className="github" /></div>
                            <div className="footer-container-top__section--icons-linkedin" ><FaLinkedinIn className="linkedin" /></div>
                        </div>

                    </div>

                    <div className="footer-container-top__section">
                        <div className="footer-container-top__section--title">
                            NAVIGATION
                        </div>

                        <div className="footer-container-top__section--text">
                            Home
                        </div>

                        <div className="footer-container-top__section--text">
                            Shop
                        </div>

                        <div className="footer-container-top__section--text">
                            About
                        </div>

                        <div className="footer-container-top__section--text">
                            Login
                        </div>
                    </div>

                    <div className="footer-container-top__section">
                        <div className="footer-container-top__section--title">
                            RECENT NEWS
                        </div>

                        <div className="footer-container-top__section--text">
                            February 23, 2021
                        </div>

                        <div className="footer-container-top__section--text">
                            OPEN NOW
                        </div>

                        <div className="footer-container-top__section--text">
                            February 30, 2021

                        </div>
                    </div>


                    <div className="footer-container-top__section">
                        <div className="footer-container-top__section--title">
                            CAREER
                        </div>

                    </div>


                </div>

            </div>


            <div className="footer-container2">
                <div className="footer-container2-top">
                    <p className="footer-container2-top-copyright">
                        Copyright &copy; Yilin Ruan ·  All Rights Reserved
                    </p>



                </div>
            </div>

        </footer>
    )
}
