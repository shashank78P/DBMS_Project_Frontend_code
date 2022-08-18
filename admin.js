import React from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "../menu";
import { FaGithub } from "react-icons/fa";
import Cards1 from "./admin_cards1";
import "./style.css"

const Admin =() =>{
    return(
        <div style={{width:"100vw",height:"auto",overflow:"none"}}>
          <Menu />
          <Cards1 />
        </div>
    )
}

export default Admin;