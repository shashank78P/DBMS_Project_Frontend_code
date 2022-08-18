import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub , FaEnvelope , FaUser ,FaChartLine, FaBars ,FaMale, FaHome , FaEnvelopeOpen ,FaChalkboardTeacher,FaCalendar} from "react-icons/fa"
import "../component/menu.css"
const Menu = () => {
    return (
        <>
            <section className="menu_sec">
                <div className="title">Tutorial Management System</div>
                <div className="menu">
                    <input type="checkbox" name="" id="inpt_menu" />
                    <div className="icon">
                        <label for="inpt_menu">
                            <FaBars/>
                        </label>
                    </div>
                    <ul className="menu_lst">
                        <li>
                            <p className="fa-solid"><FaHome/></p>
                            <NavLink to="/Admin">Home</NavLink>
                        </li>
                        <li>
                        <p className="fa-solid"><FaChalkboardTeacher/></p>
                            <NavLink to={`/details/${"teacher"}`}>Teachers </NavLink>
                        </li>
                        <li>
                        <p className="fa-solid"><FaUser /></p>
                            <NavLink to={`/details/${"student"}`}>Students </NavLink>
                        </li>
                        <li>
                            <p className="fa-solid"><FaMale /></p>
                            <NavLink to="/details">Parents </NavLink>
                        </li >
                    </ul >
                </div >
            </section >
        </>
    )
}

export default Menu;