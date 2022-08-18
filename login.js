import React, { useState , Route , userContext, createContext} from "react";
import ReactDOM from 'react-dom/client';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import "./login.css";
import Admin from "./admin_folder/admin";
import Loader from "../loader"

const Login = (props) => {
    console.log(props)
    const navigate = useNavigate();
    let [role,setrole] = useState("admin");
    let [user_name,setuser_name] = useState("");
    let [password,setpassword] = useState("");
    let [LoginStatus,setLoginStatus] = useState("");
    let [loader,setloader] = useState("false");
    
    
    const handelClick = (product) => {
        Axios.post("http://localhost:3001/get", {
            name: "product",
            desc: "good product",
            price: 10
        }).then(res => console.log(res))
            .catch(err => { console.log(err) })
    }

    const handel_Login = (event) => {
        setloader(loader="true");
        console.log(loader)
        if(loader){
            setInterval(()=>{
                <Loader />
            },5000);
        }
        event.preventDefault();
        Axios.post("http://localhost:3001/login", {
            role : role,
            user_name: user_name,
            password: password
        }).then((res) => {
            console.log(res.data)
            if(res.data.message === "true")
            {
                setLoginStatus("login sucessfull");
                console.log("sdffdsdsffffffff",role)
                navigate("../"+role)
                                }
                else{
                    LoginStatus="invalid login"
                    setLoginStatus("invalid login");
                }
        })
            .catch(err => { console.log("err",err) })
    }


    const set_text = ()=>{
        setuser_name()
    }
    console.log(role)
    return (  
        <>
        <section className="form_container">
            <h1 className="title" style={{position :"absolute" , top : "30px"}}>Tutorial Management System</h1>
                <div className="form_frame">
                    <form method="">
                        <div className="select_sec" >
                            <input type="radio" name="role" id="admin1" />
                            <label for="admin1" className="select_btn" onClick={()=>{setrole("admin")}}>
                                <div>
                                    Admin
                                </div>
                            </label>
                            <input type="radio"  name="role" id="teachers" />
                            <label for="teachers" className="select_btn" onClick={()=>{setrole("teachers")}}>
                                <div >
                                    Teachers
                                </div>
                            </label>
                            <input type="radio" name="role" id="students" />
                            <label for="students" className="select_btn" onClick={()=>{setrole("students")}}>
                                <div >
                                    Students
                                </div>
                            </label>
                        </div>
                         <div className="text_inpt">
                            <input onChange={(e)=>{setuser_name(e.target.value)}} type="text" name="" id="" placeholder="User Name" required />
                        </div>
                        <div className="text_inpt">
                            <input onChange={(e)=>{setpassword(e.target.value)}} type="password" name="" id="" placeholder="Password" required />
                        </div>
                        <div className="text_inpt">
                            <button className="submit" onClick={handel_Login}>Submit</button>
                        </div> 
                            <h1 className="msg_login">{LoginStatus}</h1>
                    </form>
                </div>
            </section>
        </>     
            
    )
}

export default Login;
