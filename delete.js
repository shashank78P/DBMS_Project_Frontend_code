import React from "react";
import  { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pop_msg from "./pop_message.js"

const Delete_user = () => {
    let [Message,setMessage] = useState("Do want to delete");
    const { table } = useParams();
    const { id } = useParams();
    function delete_user(table,id){
        axios.post("http://localhost:3001/deleted",{table:table,id:id}).then((res)=>{
                          console.log(res)
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
    }

    // function message_dsply(){
    //       document.getElementsByClassName("msg_sec")[0].style.display="grid";
    //       setTimeout(()=>{
    //         document.getElementsByClassName("msg_sec")[0].style.display="none";
    //       },5000) 
    //   }

      const msg_info = {operation: "delete", table:{table},id:{id} , message : Message}
    return (
        <>
            <Pop_msg info={msg_info}/>
        </>
    )
}

export default Delete_user;