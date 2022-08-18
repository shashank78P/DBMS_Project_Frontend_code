import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./student.css"
import Menu from "../menu"
const Student = () => {
    const [find_by_id, set_find_by_id] = useState();
    const [details, setDetails] = useState([]);
    let navigate = useNavigate()
    function show_details() {
        console.log("called")
        try {
            axios.post("http://localhost:3001/Students_details", { id: find_by_id })
                .then((result) => {
                    console.log(result.data[0])
                    setDetails(result.data[0])
                    if (result.data[0] == undefined) {
                        console.log("empty")
                    }
                    else {
                        console.log("not empty")
                        document.getElementsByClassName("container1")[0].style.display = "block";
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch (err) {

        }
        document.getElementById("a_for_display").style.display = "block";
    }



    function active(n) {
        console.log(n)
        let x = document.getElementsByClassName("label");
        x[0].classList.remove("active_label");
        x[1].classList.remove("active_label");
        x[2].classList.remove("active_label");
        x[n].classList.add("active_label");
    }

    function student_info() {
        console.log(details)
        if (details == undefined) {
            return (
                <>
                    <h1>No Record Found!!!!</h1>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="container1">
                        <div className="box1">
                            <label for="profile" ><div className="label">Profile</div></label>
                            <label for="Parent" ><div className="label">Parent Details</div></label>
                            <label for="Fee"><div className="label">Fee</div></label>
                        </div>
                        <div className="box2">
                            <input type="radio" id="profile" name="choose"
                                onClick={
                                    () => {
                                        active(0)
                                    }}
                            ></input>
                            <table className="block">
                                <tr>
                                    <th>Student ID :-</th>
                                    <td>{details.sid || ""}</td>
                                </tr>
                                <tr>
                                    <th>Name :-</th>
                                    <td>{details.name + " " + details.lname || ""}</td>
                                </tr>
                                <tr>
                                    <th>DOB :-</th>

                                    <td>{(details.DOB) || ""}</td>

                                </tr>
                                <tr>
                                    <th>Address :-</th>
                                    <td>{details.address || ""}</td>
                                </tr>
                                <tr>
                                    <th>E-mail :-</th>
                                    <td>{details.email || ""}</td>
                                </tr>
                                <tr>
                                    <th>Phone no. :-</th>
                                    <td>{details.phone || ""}</td>
                                </tr>
                            </table>
                            <input type="radio" id="Parent" name="choose"
                                onClick={
                                    () => {
                                        active(1)
                                    }}
                            ></input>
                            <table className="block">
                                <tr>
                                    <th>Parent ID :-</th>
                                    <td>{details.PID || ""}</td>
                                </tr>
                                <tr>
                                    <th>Father Name :-</th>
                                    <td>{details.FATHER_NAME || ""}</td>
                                </tr>
                                <tr>
                                    <th>Mother Name :-</th>
                                    <td>{details.MOTHER_PHONE || ""}</td>
                                </tr>
                                <tr>
                                    <th>Address :-</th>
                                    <td>{details.address || ""}</td>
                                </tr>
                                <tr>
                                    <th>E-mail :-</th>
                                    <td>{details.PARENT_EMAIL || ""}</td>
                                </tr>
                                <tr>
                                    <th>Parent Income :-</th>
                                    <td>{details.parent_income || ""}</td>
                                </tr>
                            </table>
                            <input type="radio" id="Fee" name="choose"
                                onClick={
                                    () => {
                                        active(2)
                                    }}
                            ></input>
                            <table className="block">
                                <tr>
                                    <th>batch :-</th>
                                    <td>{details.batch || ""}</td>
                                </tr>
                                <tr>
                                    <th>Total Fee :-</th>
                                    <td>{details.total_fee || ""}</td>
                                </tr>
                                <tr>
                                    <th>Fee Paid :-</th>
                                    <td>{details.fee_paid || ""}</td>
                                </tr>
                                <tr>
                                    <th>Balance Fee :-</th>
                                    <td>{details.fee_balance || ""}</td>
                                </tr>
                                <tr>
                                    <th>Deadline :-</th>
                                    <td>{(details.deadline) || ""}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <Menu />
            <div className="main_frame">
                <div className="inpt_id1">
                    <div style={{
                        width: "425px",
                        height: "auto",
                        display: "flex",
                        borderRadius: "5px",
                        alignItems: "center",
                        padding: "10px 5px",
                        backgroundColor: "#30c02f",
                        border: "1px solid white"
                    }}  >
                        <div style={{ width: "300px", height: "40px" }}>
                            <input type="text" placeholder="enter id"
                                style={{
                                    fontSize: "20px",
                                    padding: "5px 10px",
                                    border: "1px solid black"
                                }}
                                onChange={(e) => {
                                    set_find_by_id(e.target.value)
                                }}
                            ></input></div>
                        <input type="button" value="Submit"
                            style={{
                                width: "100px",
                                padding: "6px",
                                fontSize: "20px",
                                marginBottom: "5px",
                                border: "2px solid white",
                                backgroundColor: "#30c02f",
                                color: "white"
                            }}

                            onClick={show_details}
                        ></input>
                        {/* <a href="/edit/student/1">Edit</a> */}
                    </div>
                </div>
                {/* <a id="a_for_display" href={`/edit/student/${find_by_id}`}>Click Here</a> */}
                {/* <h1>{details}</h1> */}
                {
                    student_info()
                }
            </div>
        </>
    )
}

export default Student;