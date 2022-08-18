import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "./edit.css"
import Pop_msg from "./pop_message.js"


function sleep(){
  setTimeout(() => {
    document.getElementsByClassName("sucess_msg")[0].style.display = "none";
  }, 10000)
}

function dsply_message(msg){
  if (msg == "Updated sucessfully !!!") {
    document.getElementsByClassName("message_box")[0].innerHTML = msg;
    document.getElementsByClassName("message_box")[0].style.color = "white";
    document.getElementsByClassName("message_box")[0].style.backgroundColor = "green";
    document.getElementsByClassName("message_box")[0].style.border = "2px solid white";
    document.getElementsByClassName("message_box")[0].style.fontWeight = "500";
    document.getElementsByClassName("sucess_msg")[0].style.display = "grid";
    sleep();
  }
  else {
    document.getElementsByClassName("sucess_msg")[0].style.display = "grid";
    document.getElementsByClassName("message_box")[0].innerHTML = msg;
    document.getElementsByClassName("message_box")[0].style.color = "white";
    document.getElementsByClassName("message_box")[0].style.fontWeight = "500";
    document.getElementsByClassName("message_box")[0].style.backgroundColor = "red";
    document.getElementsByClassName("message_box")[0].style.border = "2px solid white";
    sleep();
  }
  
}

function Edit(props) {

  let navigate = useNavigate();
  let [Member, setMember] = useState([]);
  let [sMember, setsMember] = useState();
  let [MemberId, setMemberId] = useState();
  let [name, setName] = useState("");
  let [old_name, set_old_Name] = useState("");
  let [lname, setLname] = useState("");
  let [old_lname, set_old_Lname] = useState("");
  let [DOB, setDOB] = useState("");
  let [old_DOB, set_old_DOB] = useState("");
  let [address, setAddress] = useState("");
  let [old_address, set_old_Address] = useState("");
  let [phone, setPhone] = useState("");
  let [old_phone, set_old_Phone] = useState("");
  let [email, setemail] = useState("");
  let [old_email, set_old_email] = useState("");
  let [update_status, setUpdate_status] = useState("Submit Agian....");
  const { id } = useParams();
  console.log("id", id)
  MemberId = id;

  const { table } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const member = await Axios.post("http://localhost:3001/getById", { table: table, id: id })
          .then((res) => {
            Member = res.data[0];
          })
          .catch((error) => {
            console.log(error);
          })
        console.log("member", Member)
        // setMember(Member);
        setsMember(Member)
        console.log(sMember)
        set_old_Name(Member.name)
        set_old_Lname(Member.lname);
        set_old_DOB(Member.DOB);
        set_old_Phone(Member.phone);
        set_old_email(Member.email);
        set_old_Address(Member.address);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])
  let [display_msg, Setdisplay_msg] = useState("true");
  
  function handel_edit() {
    console.log("called", table, Element);
    console.log({ DOB } || { old_DOB })
    console.log({ name } || { old_name })
    console.log({ lname } || { old_name })
    console.log({ address } || { old_address })
    console.log({ phone } || { old_phone })
    console.log({ email } || { old_email })
    if (DOB.length == 10) {
      let updating_data = {
        name: (name == "") ? (old_name) : (name),
        lname: (lname == "") ? (old_lname) : (lname),
        DOB: DOB,
        address: (address == "") ? (old_address) : (address),
        phone: (phone == "") ? (old_phone) : (phone),
        email: (email == "") ? (old_email) : (email)
      }
      console.log(updating_data)
      Axios.post("http://localhost:3001/update", { updating_data: updating_data, table: table, id: id })
        .then((res) => {
          setUpdate_status(res.data);
          dsply_message((update_status == "")? "Re-submit the form agian" : "Updated sucessfully !!!")
          window.history.replaceState('','',`/details/${table}`)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    else {
      document.getElementsByClassName("sucess_msg")[0].style.display = "grid";
      document.getElementsByClassName("message_box")[0].innerHTML = "Not updated !!!! Try again (enter DOB value in YYYY-MM-DD)";
      document.getElementsByClassName("message_box")[0].style.color = "white";
      document.getElementsByClassName("message_box")[0].style.fontWeight = "500";
      document.getElementsByClassName("message_box")[0].style.backgroundColor = "red";
      document.getElementsByClassName("message_box")[0].style.border = "2px solid white";
      sleep();
    }
    // dsply_message(update_status)
  }
  return (
    <>

      <form method="post">
        <div className="sucess_msg" style={{ position: "absolute" }}>
          <div className="message_box">
            something went wrong
          </div>
        </div>
        <section className="edit_sec">
          <div className="second">
            <div className="row">
              <label>
                <div className="form_header">First Name</div>
                <div><input type="text" value={old_name} /></div>

                <div><input type="text" onChange={(e) => {
                  setName(e.target.value)
                }}
                  placeholder="New data Here" /></div>
              </label></div>
            <div className="row">
              <label>
                <div className="form_header">Last Name</div>
                <div><input type="text" value={old_lname} /></div>
                <div><input type="text" onChange={(e) => {
                  setLname(e.target.value)
                }}
                  placeholder="New data Here" /></div>
              </label>
            </div>
            <div className="row">
              <label>
                <div className="form_header">DOB</div>
                <div><input type="text" maxLength="10" value={old_DOB} /></div>
                <div><input type="text" onChange={(e) => {
                  setDOB(e.target.value)
                }}
                  placeholder="Re-write*" maxLength="10" /></div>
                <div style={(DOB == "") ? { color: "red" } : { display: "none" }} >Re-write data in YYYY-MM-DD*</div>
              </label>
            </div>
            <div className="row">
              <label>
                <div className="form_header">address</div>
                <div><input type="text" value={old_address} /></div>
                <div><input type="text" onChange={(e) => {
                  setAddress(e.target.value)
                }}
                  placeholder="New data Here" /></div>
              </label>
            </div>
            <div className="row">
              <label>
                <div className="form_header">Phone No</div>
                <div><input type="number" value={old_phone} /></div>
                <div><input type="number" onChange={(e) => {
                  setPhone(e.target.value)
                }}
                  placeholder="New data Here" /></div>
              </label>
            </div>
            <div className="row">
              <label>
                <div className="form_header">Email</div>
                <div><input type="email" value={old_email} /></div>
                <div><input type="email" onChange={(e) => {
                  setemail(e.target.value)
                }}
                  placeholder="New data Here" /></div>
              </label>
            </div>
            <div className="div_btn">
              <div className="form_btn" onClick={handel_edit}>Submit</div>
              <div className="form_btn" onClick={() => {
                navigate(`/details/${table}`)
                console.log("canceled")
              }}>Cancel</div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default Edit;