import React, { useEffect, useState } from "react"
import "./details.css";
// import "./search"
import axios from "axios";
import { FaGithub, FaSearch, FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./menu";
// import Pop_msg from "./pop_message.js";
const Student_feeand_parent_details = () => {

  const Delete_user = (id) => {
    console.log("deleted", id);
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
  let [NeedToSearch, setNeedToSearch] = useState("");
  let [NeedToDelete, setNeedToDelete] = useState("");
  let [Members, setMembers] = useState([]);
  let [updateBal, setUpdateBal] = useState([])
  let [updateDeadline, setUpdateDeadline] = useState(0)
  let [updateId, setupdateId] = useState([]);
  let [balance, setbalancce] = useState([]);
  let [totalfee,settotalfee] = useState(0)
  useEffect(() => {
    async function getData() {
      try {
        const member = await axios.get(`http://localhost:3001/api/${table}`)
        console.log(member.data[0])
        setMembers(member.data[0]);

      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])
  console.log('member', Members)

  function display_edit(id, bal, deadline,fee) {
    {
      setupdateId(id);
      setbalancce(bal);
      settotalfee(fee);
      if (bal < 0) {
        document.getElementsByClassName("update_btn")[0].pointerEvents = "none";
        document.getElementsByClassName("update_btn")[0].style.backgroundColor = "rgba(255,255,255,0.5)";
      }
      console.log(bal, deadline)
      document.getElementsByClassName("edit_form")[0].classList.add("show")
      document.getElementById("bal").innerText = bal;
      document.getElementById("deadline").innerText = deadline.slice(0, 10);
    }
  }

  function update() {
    console.log("submited")
    console.log(balance-parseInt(updateBal),totalfee-(balance-parseInt(updateBal)))
    axios.post('http://localhost:3001/update/fee', { id: updateId, fee_to_pay: (balance - parseInt(updateBal)),
    paid:totalfee-(balance-parseInt(updateBal)), deadline: updateDeadline })
    .then((result) => {
      console.log(result);
      let element = document.getElementsByClassName("update_msg")[0];
      if (result.data.status) {
        element.innerText = result.data.msg;
        element.style.color="white";
        {
        setTimeout(()=>{
                  document.getElementsByClassName("edit_form")[0].classList.remove("show")
                },5000)
              }
        }
        if (!result.data.status) {
          element.innerText = result.data.msg;
          element.style.color="red";
        }
        setTimeout(()=>{
            element.innerText="";
        },5000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const show = (x) => {
    function display_data(user, table, display) {
      if (display == 1)
        return (
          <tr className="row">
            <td className="id">{user.sid || user.tid || user.aid}<span className="informer informer1">ID</span></td>
            <td>{user.name}<span className="informer informer2"> Name</span></td>
            <td>{user.batch}<span className="informer informer3">Batch</span></td>
            <td>{user.total_fee}<span className="informer informer4">Total Fee</span></td>
            <td>{user.fee_balance}<span className="informer informer5">Balance Fee</span></td>
            <td>{user.deadline}<span className="informer informer6">Deadline</span></td>
            <td className="operate">
              <a className="edits_fee" onClick={() => { display_edit(user.fid, user.fee_balance, user.deadline,user.total_fee) }}>Edit</a>
            </td>
          </tr>
        )
    }
    if (x == "") {
      return (
        Members.map((user, id) => {
          return (
            <>
              <tr className="row">
                <td className="id">{user.sid}<span className="informer informer1">ID</span></td>
                <td>{user.name}<span className="informer informer3">Name</span></td>
                <td>{user.batch}<span className="informer informer4">Batch</span></td>
                <td>{user.total_fee}<span className="informer informer5">Total Fee</span></td>
                <td>{user.fee_balance}<span className="informer informer6">Fee Balance</span></td>
                <td>{user.deadline}<span className="informer informer7">Deadline</span></td>
                <td className="operate">
                  <a className="edits_fee" onClick={() => { display_edit(user.fid, user.fee_balance, user.deadline,user.total_fee) }}>Edit</a>
                </td>
              </tr>
            </>

          )
        })
      )
    }
    else {
      let display = 0;
      return (
        Members.map((user, id) => {
          if ((String(user.sid)).includes(x)) {
            display = 1;
            return (
              display_data(user, table, display)
            )
          }
          let temp_phone = String(user.phone);
          if ((user.name).toUpperCase().includes(x.toUpperCase()) || user.batch.toUpperCase().includes(x.toUpperCase()) || String(user.total_fee).includes(String(x)) || String(user.fee_balance).includes(String(x)) || String(user.deadline).includes(String(x))) {
            display = 1;
            return (
              display_data(user, table, display)
            )
          }
        })
      )

    }
  }


  function delete_user(x) {
  }



  return (
    <>
      <Menu />
      <section className="container" style={{ position: "absolute" }}>
        {/* <Pop_msg /> */}
        <div className="tools">
          <label for="search">
            <div className="filter">
              <div className="inpt_div" ><input type="text" name="" onKeyUp={(e) => {
                setNeedToSearch(e.target.value)
              }} id="search inpt" /></div>
              <div className="icon_div"  ><p className="fa-solid fa-search"><FaSearch /></p></div>
            </div>
          </label>
          <h1 style={{ color: "#30c02f", textTransform: "capitalize" }}>{table} details</h1>
          <button onClick={() => {
            window.history.go(-1)
          }
          } className="form_btn" style={{ margin: "10px" }}>Back</button>
        </div>
        <div className="info_container">
          <table>
            <tr className="row">
              <th>ID</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Total Fee</th>
              <th>Fee Balance</th>
              <th>Deadline</th>
              <th>Action's</th>
            </tr>
            {
              show(NeedToSearch)
            }
          </table>
        </div>
        <div>
        </div>
        <div className="edit_form">
          <div className="inner_form">
            <div className="field1">
              <label>
                <div >Fee Balance :-<span id="bal"></span></div>
                <div><input type="text" placeholder="Enter paid fee" required
                  onChange={(e) => { setUpdateBal(e.target.value) }}
                ></input></div>
              </label>
              <div className="field1">
                <label>
                  <div id="bal">Deadline :-<span id="deadline"></span></div>
                  <div><input type="text" placeholder="Enter Deadline" required
                    onChange={(e) => { setUpdateDeadline(e.target.value) }}
                  ></input></div>
                </label>
              </div>
              <div className="last_field">
                <button type="submit" onClick={update} className="update_btn">Submit</button>
                <button className="update_btn" type="submit" onClick={() => {
                  document.getElementsByClassName("edit_form")[0].classList.remove("show")
                }}>Close</button>
              </div>
            </div>
          </div>
          <h1 className="update_msg"></h1>
        </div>
      </section>
    </>
  )
}

export default Student_feeand_parent_details;