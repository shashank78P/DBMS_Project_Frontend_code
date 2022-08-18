import axios from "axios";
import React, { useState } from "react";
import "./add.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Adds() {
    let navigate = useNavigate();
    const { table } = useParams()
    const [details, setDetails] = useState(
        {info: {
                id: "",
                name: "",
                lname: "",
                password: "",
                address: "",
                email: "",
                phone: "",
                DOB: "",
                role: ""
        }}
    )

    // function show_msg(x) {
    //     console.log(x,setPage)
    //     if ((x.data.status)) {
    //         console.log("sucessfull")
    //         setTimeout(() => {
    //             document.getElementsByClassName("msg")[0].classList.remove("show_sucess_message")
    //             setPage(1);
    //         }, 5000)
    //         document.getElementsByClassName("msg")[0].classList.add("show_sucess_message")
    //         document.getElementsByClassName("msg")[0].innerText = (x.data.msg);
    //         document.getElementById("stud_sub").value = "Submited"
    //         let a = document.getElementsByClassName("form_frame1")
    //         for (let i = 0; i < a.length; i++) {
    //             a[i].style.pointerEvents = "none";
    //         }
    //     }
    //     else {
    //         console.log("un-sucessfull", x)
    //         setTimeout(() => {
    //             document.getElementsByClassName("msg")[0].classList.remove("show_failure_message")

    //         }, 5000)
    //         document.getElementsByClassName("msg")[0].innerText = (x.data.msg);
    //         document.getElementsByClassName("msg")[0].classList.add("show_failure_message")

    //     }
    // }

    //     function Handle_form() {
    //         console.log(formData.DOB, table)
    //         let role={role:"student"}
    //         axios.post("http://localhost:3001/insert", { formData, table ,role })
    //             .then((result) => {
    //                 console.log(result)
    //                 show_msg(result)
    //             })
    //             .catch((errror) => {
    //                 console.log(errror);
    //                 show_msg({data:{msg:"Server Error!! log in again or refesh",status:false}})
    //             })
    //     }

     function  Handle_form() {
        console.log("clicked",details)
        axios.post("http://localhost:3001/adds/teacheroradmin",{details , table})
        .then((result)=>{
            console.log(result.data.msg,result.data.status)
            if ((result.data.status)) {
                console.log("sucessfull")
                setTimeout(() => {
                    document.getElementsByClassName("msg")[0].classList.remove("show_sucess_message")
                    navigate(`/details/${table}`);
                }, 5000)
                document.getElementsByClassName("msg")[0].classList.add("show_sucess_message")
                document.getElementsByClassName("msg")[0].innerText = (result.data.msg);
                document.getElementById("stud_sub").value = "Submited"
                let a = document.getElementsByClassName("form_frame1")
                for (let i = 0; i < a.length; i++) {
                    a[i].style.pointerEvents = "none";
                }
            }
            else {
                console.log("un-sucessfull", result.data.msg)
                setTimeout(() => {
                    document.getElementsByClassName("msg")[0].classList.remove("show_failure_message")
                    
                }, 5000)
                document.getElementsByClassName("msg")[0].innerText = (result.data.msg);
                document.getElementsByClassName("msg")[0].classList.add("show_failure_message")
                
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
            <>
            <div className="student_frame">
                <div className="header">Add {table} </div>
                <div className="body">
                    <div className="msg">Some  thins went wrong</div>
                    <div className="inert_form_frame">
                        <div className="rows">
                            <div className="input">
                                <input type="text" name="id" placeholder="id" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, id: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="text" placeholder="First Name" name="name" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, name: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="text" placeholder="Last Name" name="lname" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, lname: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows" style={{ margiBottom: '30px' }}>
                            <div className="input">
                                <input type="text" placeholder="DOB" maxLength="10" name="DOB" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, DOB: (e.target.value) });
                                }} />
                                <p style={{ color: 'red', margin: '5px 0px', fontSize: '16px' }}>Date must be in yyyy-mm-dd</p>
                            </div>
                        </div>
                        <div className="rows flex">
                            <div className="input">
                                <input type="text" placeholder="Address" name="address" className="form_input adjacent first_form" onChange={(e) => {
                                    setDetails({...details, address: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="email" placeholder="Email" name="email" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, email: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="number" maxLength="10" placeholder="Phone no." name="phone" className="form_input first_form" onChange={(e) => {
                                    setDetails({...details, phone: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="text" placeholder="Password" name="password" className="form_input adjacent first_form" onChange={(e) => {
                                    setDetails({...details, password: (e.target.value) });
                                }} />
                            </div>
                        </div>
                        <div className="submit_btn" style={{ width: "300px" }}>
                            <input type="button" id="stud_sub" value="Submit " onClick={Handle_form}></input>
                        </div>
                    </div>
                </div>
                </div>
            </>

            )
}

            export default Adds;