import React, { useEffect, useState } from "react"
import "./details.css";
import axios from "axios";
import { FaGithub, FaSearch, FaTrash, FaEdit,FaPlusCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./menu";
// import Pop_msg from "./pop_message.js";
const Students_details = () => {

  const Delete_user = (id)=>{
    console.log("deleted",id);
    // axios.post("http://localhost:3001/deleted",{name:"name"}).then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

  }
const navigate = useNavigate();

  // let x = "shashi";
  let { table } = useParams();
  console.log("table",table)
  let [NeedToSearch, setNeedToSearch] = useState("");
  let [NeedToDelete,setNeedToDelete] = useState("");
  let [Members, setMembers] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const member = await axios.get(`http://localhost:3001/api/${table}`)
        setMembers(member.data.name);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  const show = (x) => {
    function display_data(user,table) {
      return (
        <tr className="row">
          <td className="id">{user.sid || user.tid || user.aid}<span className="informer informer1">ID</span></td>
          <td>{user.name}<span className="informer informer2">First Name</span></td>
          <td>{user.lname}<span className="informer informer3">Last Name</span></td>
          <td>{user.DOB}<span className="informer informer4">DOB</span></td>
          <td>{user.phone}<span className="informer informer5">Phone No.</span></td>
          <td>{user.email}<span className="informer informer6">E-mail</span></td>
          <td>{user.address}<span className="informer informer7">Address</span></td>
          <td className="operate">
            <a href={`/edit/${table}/${user.sid || user.tid || user.aid}`}>Edit</a>
            <a onClick={Delete_user}>Delete</a>
          </td>
        </tr>
      )
    }
    if (x == "") {
      return (
        Members.map((user, id) => {
          return (
            <tr className="row">
              <td className="id">{user.sid || user.tid || user.aid}<span className="informer informer1">ID</span></td>
              <td>{user.name}<span className="informer informer2">First Name</span></td>
              <td>{user.lname}<span className="informer informer3">Last Name</span></td>
              <td>{user.DOB}<span className="informer informer4">DOB</span></td>
              <td>{user.phone}<span className="informer informer5">Phone No.</span></td>
              <td>{user.email}<span className="informer informer6">E-mail</span></td>
              <td>{user.address}<span className="informer informer7">Address</span></td>
              <td className="operate">
              <a href={`/edit/${table}/${user.sid || user.tid || user.aid}`}>Edit</a>
              <a href={`/delete/${table}/${user.sid || user.tid || user.aid}`} >Delete</a>
              </td>
            </tr>
          )
        })
      )
    }
    else {
      let display = 0;
      return (
          Members.map((user, id) => {
            if ((String(x) == (user.sid || user.tid || user.aid)) || (String(user.sid || user.tid || user.aid).includes(String(x)))) {
              display=1;
            return (
              display_data(user,table)
              )
            }
            let temp_phone = String(user.phone);
            if (user.name.includes(x) || user.address.includes(x) || user.lname.includes(x) || user.DOB.includes(x) || String(user.phone).includes(x) || user.email.includes(x) ) {
              display=1;
              return (
              display_data(user,table)
            )
          }
          if (!user.name.includes(x) || !user.address.includes(x) || !user.lname.includes(x) || !user.DOB.includes(x) || !String(user.phone).includes(x) || !user.email.includes(x)) {
            display=0;
          }
        })
        )
      
    }
  }

  return (
    <>
      <Menu />
      <section className="container details" >
        {/* <Pop_msg /> */}
        <div className="tools">
          <label for="search">
            <div className="filter">
              <div className="inpt_div" ><input type="text" name="" onKeyUp={(e) => {
                setNeedToSearch(e.target.value)
              }} id="search inpt" /></div>
              <div className="icon_div"><p className="fa-solid fa-search"><FaSearch /></p></div>
            </div>
          </label>
          <h1 style={{color:"#30c02f",textTransform:"capitalize"}}>{table} details</h1>
            <button onClick={()=>{
                    window.history.back()
            }
              } className="form_btn" style={{margin:"10px"}}>Back</button>
        </div>
        <div className="info_container">
          <table>
            <tr className="row">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Phone Number</th>
              <th>E-mail</th>
              <th>Address</th>
              <th>Actions(s)</th>
            </tr>
            {

              show(NeedToSearch)
            }
          </table>
        </div>
        <div>
        </div>
        <div className="add_btn" onClick={()=>{
          if(table === 'student'){
            navigate(`/add/${table}`);
          }
          if(table === 'teacher'){
            navigate(`/adds/${table}`);
          }
          if(table === 'admin'){
            navigate(`/adds/${table}`);
          }
        }} ><FaPlusCircle /></div>
        <span className="add_info">Add More {table}</span>
       
      </section>
    </>
  )
}

export default Students_details;