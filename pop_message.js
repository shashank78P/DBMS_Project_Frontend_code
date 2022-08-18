import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pop_msg.css"
import { FaGithub,FaPlus} from "react-icons/fa";


const Pop_msg = (props) => {
    const navigate = useNavigate();
    let [Message,setMessage] = useState("Do want to delete");
    let [color,setColor] = useState(false);
    function Handel_opartion(){
        if(props.info.operation === "delete"){
            axios.post("http://localhost:3001/deleted",{table:props.info.table.table,id:props.info.id.id})
            .then((res)=>{
                setColor(true);
                setMessage("Deleted Sucessfully!!")
                console.log(res);
            })
            .catch((error)=>{
                setColor(false);
                setMessage("Record not deleted!!")
            });
            console.log("delete operration")
            console.log(props)
            console.log(props.info.operation)
            console.log(props.info.id.id)
            console.log(props.info.table.table)
        }

    }
    return (
        <>
            <section className="msg_sec">
                <div className="msg_frame" style={(color) ? {backGround: "red"} : {backGround: "green"}}>
                    <div className="msg_info">{Message} {props.info.table.table} with id {props.info.id.id}</div>
                    <div className="close_msg" style={{transform:"rotateZ(45deg)",color:"red",marginLeft:"10px"}}  onClick={()=>{
                            navigate(`/details/${props.info.table.table}`)
                    }}><FaPlus/></div>
                    <div className="msg_ok_btn" onClick={Handel_opartion}>OK</div>
                </div>
            </section>
        </>
    )
}

export default Pop_msg;