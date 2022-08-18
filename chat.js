import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaGithub, FaCheck } from "react-icons/fa";
const Chat = () => {
    let [id, setId] = useState("");
    let [password, setPassword] = useState("");
    let [messages, setMessages] = useState([])
    function show_Messages() {
        console.log(id, password);
        try {
            axios.post("http://localhost:3001/get_message", { id: id, password: password })
                .then((result) => {
                    console.log(result)
                    setMessages(result.data)
                    console.log(messages)
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section>
                <div className="inpt_id">
                    <div style={{ textAlign: "center", margin: "20px", fontSize: "20px", color: "white" }}><h1>Message</h1></div>
                    <div>
                        <input type="text" placeholder="enter id to display message"
                            className="inpt1"
                            onChange={(e) => {
                                setId(e.target.value)
                            }}
                        ></input>
                    </div>
                    <div>
                        <input type="text" className="inpt1" placeholder="Enter Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </div>
                    <div >
                        <input type="button" value="Submit" className="btn" style={{ position: "relative", border: "1px solid white" }}
                            onClick={show_Messages}
                        ></input>
                    </div>
                </div>
            </section>
            <section>
                <div className="">
                    <div className="message_frame2">
                        {
                            messages.map((value, index) => {
                                return (
                                    <>
                                        <div className="messages">
                                            <span className="side_dsgn"></span>
                                            <div className="row msg_header">
                                                <div>Date:-<span>{(value.cdate).slice(0, 10)}</span></div>
                                                <div>Start Time:- <span>{value.ctime}</span> &nbsp; End Time:-<span>{value.cEndTime}</span></div>
                                            </div>
                                            <div className="row">
                                                <div>Room No. :-<span>{value.room_no}</span></div>
                                                <div>Subject :-<span>{value.subject}</span></div>
                                            </div>
                                            <div className="row">
                                                Description :- &nbsp;
                                                {value.description}
                                            </div>
                                            <div className="row" style={{ float: "right", marginRight: "10px" }}>
                                                <FaCheck />
                                            </div>
                                        </div>
                                    </>


                                )
                            })

                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Chat;