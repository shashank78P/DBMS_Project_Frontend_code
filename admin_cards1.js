import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaGithub,FaEnvelope } from "react-icons/fa";
import Chat from "../chat";
const Cards1 = (props) => {

    let [Parents, setParents] = useState([])
    let [students, setStudents] = useState([])
    let [teachers, setteachers] = useState([])
    let [admins, setadmins] = useState([])
    let [fees, setfees] = useState([])


    let [message, setMessage] = useState("");
    let [Addclass, setAddClass] = useState({
        id: "",
        room_no: "",
        date: "",
        start_time: "",
        end_time: "",
        subject: "",
        description: ""

    })

    function Submit_Addclass() {
        console.log(Addclass)
        try {
            axios.post("http://localhost:3001/add_class", Addclass)
                .then((result) => {
                    setMessage(result.data.msg)
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    // let obtained_result


    useEffect(() => {
        async function getAll() {
            try {
                const fee = await axios.get("http://localhost:3001/api/fee")

                setfees(fee.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
        console.log(fees)
    }, [])
    useEffect(() => {
        async function getAll() {
            try {
                const Students = await axios.get("http://localhost:3001/api/student")
                console.log("student", Students.data.name);
                setStudents(Students.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])
    useEffect(() => {
        async function getAll() {
            try {
                const admin = await axios.get("http://localhost:3001/api/admin")
                console.log("admin", admin.data.name);
                setadmins(admin.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])
    useEffect(() => {
        async function getAll() {
            try {
                const teacher = await axios.get("http://localhost:3001/api/teacher")
                console.log("teacher", teacher.data.name);
                setteachers(teacher.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])
    useEffect(() => {
        async function getAll() {
            try {
                const parent = await axios.get("http://localhost:3001/api/parent")
                console.log("parent", parent.data.name);
                setParents(parent.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        getAll();
    }, [])

    return (
        <>
        <section className="envelope" style={
            (props.role == "teachers") ? { display: "block" } : {}
        } onClick={(e)=>{}}>
                <label name="" for="msg1">
                <FaEnvelope/>
                </label>
            </section>
        <input type="checkBox" id="msg1" className="msg1"></input>
            <section className="message_frame">
                <Chat />
            </section>
            <section className="cards_frame"
            // style={
            //     (props.role=="teachers") ? {display: "flex"} :{}}
            >
                <div className="cards admin "
                    style={
                        (props.role == "teachers") ? { display: "none" } : {}
                    }>
                    <div className="ctitle admin">Admins</div>
                    <div className="num">{admins.length}</div>
                    <Link to={`/details/${"admin"}`} className="btn">Know More</Link>
                </div>
                <div>
                    <div className="cards teachers"
                        style={
                            (props.role == "teachers") ? { display: "none" } : {}
                        }
                    >
                        <div className="ctitle">Teachers</div>
                        <div className="num">{teachers.length}</div>
                        <a href={`/details/${"teacher"}`} className="btn">Know More</a>
                    </div>
                </div>
                <div>
                    <div className="cards students">
                        <div className="ctitle">Students</div>
                        <div className="num">{students.length}</div>
                        <a href={`/details/${"student"}`} className="btn">Know More</a>
                    </div>
                </div>
                <div>
                    <div className="cards parents">
                        <div className="ctitle">Parents</div>
                        <div className="num">{Parents.length}</div>
                        <a  className="btn">Know More</a>
                    </div>
                </div>
            </section>

            <section className="cards_frame">
                <div>
                    <div className="cards students">
                        <div className="ctitle">Students fee Balance...</div>
                        <div className="num">{fees.length}</div>
                        <a href={`/details/fee/${"fee"}`} className="btn">Know More</a>
                    </div>
                </div>
            </section>

            
            <section className="add_class">
                <div className="add_frame">
                    <div className="ctitle" style={{ textAlign: "center" }}><h1>Add Class </h1></div>
                    <div>
                        <div className="field">
                            <label>
                                <div className="clabel">Teacher id</div>
                                <div>
                                    <input type="text" className="c_inpt"
                                        onChange={(e) => { setAddClass({ ...Addclass, id: (e.target.value) }) }}
                                    ></input>
                                    <p></p>
                                </div>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <div className="clabel">Room Number</div>
                                <div><input type="text" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, room_no: (e.target.value) }) }}
                                ></input><p></p></div>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <div className="clabel">Date</div>
                                <div><input type="text" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, date: (e.target.value) }) }}
                                ></input><p></p></div>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <div className="clabel">Start Time</div>
                                <div><input type="time" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, start_time: (e.target.value) }) }}
                                ></input><p></p></div>
                            </label>
                        </div >
                        <div className="field">
                            <label>
                                <div className="clabel">End Time</div>
                                <div><input type="time" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, end_time: (e.target.value) }) }}
                                ></input><p></p></div>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <div className="clabel">Subject</div>
                                <div><input type="text" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, subject: (e.target.value) }) }}
                                ></input><p></p></div>
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <div className="clabel">Description</div>
                                <div><textarea rows="5" column="20" type="text" className="c_inpt"
                                    onChange={(e) => { setAddClass({ ...Addclass, description: (e.target.value) }) }}
                                ></textarea><p></p></div>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="btn" style={{ position: "relative", marginLeft: "20px" }}
                            onClick={Submit_Addclass}
                        >Add</button>
                    </div>
                    <div>
                        {message}
                    </div>
                </div>
            </section>
            {/* <h1>{messages}</h1> */}
        </>
    )
}

export default Cards1;
