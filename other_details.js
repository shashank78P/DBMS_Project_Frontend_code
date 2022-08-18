import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../add.css"

function Other({ formData, setFormData, table ,setPage}) {
    let navigate = useNavigate();
    console.log(formData,table,setPage)
    function show_msg(x) {
        console.log(formData,table)
        if ((x.data.status)) {
            console.log("sucessfull")
            setTimeout(() => {
                document.getElementsByClassName("msg")[0].classList.remove("show_sucess_message")
                navigate("/Admin/")
            }, 5000)
            document.getElementsByClassName("msg")[0].classList.add("show_sucess_message")
            document.getElementsByClassName("msg")[0].innerText = (x.data.msg);
            document.getElementById("stud_sub").value = "Submited"
            let a = document.getElementsByClassName("form_frame1")
            for (let i = 0; i < a.length; i++) {
                a[i].style.pointerEvents = "none";
            }
        }
        else {
            console.log("un-sucessfull", x)
            setTimeout(() => {
                document.getElementsByClassName("msg")[0].classList.remove("show_failure_message")
                
            }, 5000)
            document.getElementsByClassName("msg")[0].innerText = (x.data.msg);
            document.getElementsByClassName("msg")[0].classList.add("show_failure_message")
            
        }
    }
    
    function Handle_form() {
            console.log(formData.DOB, table)
            let role={role:"other"}
            axios.post("http://localhost:3001/insert", { formData, table ,role})
                .then((result) => {
                    console.log(result,setPage)
                    show_msg(result)
                })
                .catch((errror) => {
                    console.log(errror);
                    show_msg({data:{msg:"Server Error!! log in again or refesh",status:false}})
                })
        }

        return (
            <>
                <div className="msg">Some  thins went wrong</div>
                <div className="inert_form_frame">
                    <div className="rows">
                        <div className="input">
                            <input type="text" name="id" placeholder="fid" className="form_input first_form" onChange={(e) => {
                                setFormData({ ...formData, fid: (e.target.value) })
                            }
                            } />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="input">
                            <input type="text" placeholder="Previous Performance" name=" PrevPerformance" className="form_input first_form" onChange={(e) => {
                                setFormData({ ...formData, PrevPerformance: (e.target.value) })
                            }
                            } />
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="text" placeholder="Batch" name="fatherPhone" className="form_input first_form" onChange={(e) => {
                                    setFormData({ ...formData, batch: (e.target.value) })
                                }
                                } />
                            </div>
                        </div>
                        <div className="rows" style={{ margiBottom: '30px' }}>
                            <div className="input">
                                <input type="number" placeholder="Parent Income " name="parentIncome" className="form_input first_form" onChange={(e) => {
                                    setFormData({ ...formData, parentIncome: (e.target.value) })
                                }
                                } />
                            </div>
                        </div>
                        <div className="rows" style={{ margiBottom: '30px' }}>
                            <div className="input">
                                <input type="number" placeholder="Total Fee " name="totalFee" className="form_input first_form" onChange={(e) => {
                                    setFormData({ ...formData, totalFee: (e.target.value) })
                                }
                                } />
                            </div>
                        </div>
                        <div className="rows" style={{ margiBottom: '30px' }}>
                            <div className="input">
                                <input type="number" placeholder="Paid Fee " maxLength="10" name="motherName" className="form_input first_form" onChange={(e) => {
                                    setFormData({ ...formData, PaidFee: (e.target.value) })
                                }
                                } />
                            </div>
                        </div>
                        <div className="rows flex">
                            <div className="input">
                                <input type="number" placeholder="Balance Fee" name="MotherPhone"
                                value={formData.totalFee - formData.PaidFee}
                                 className="form_input adjacent first_form" onChange={(e) => {
                                    setFormData({ ...formData, BalanceFee: (formData.totalFee - formData.PaidFee) })
                                }
                                } />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="input">
                                <input type="text" placeholder="Deadline Pay" name="parentEmail" className="form_input first_form" onChange={(e) => {
                                    setFormData({ ...formData, deadline_pay: (e.target.value) })
                                }
                                } />
                                <p style={{ color: 'red', margin: '5px 0px', fontSize: '16px' }}>Date must be in yyyy-mm-dd</p>
                            </div>
                        </div>
                       
                        <div className="submit_btn" style={{ width: "300px" }}>
                            <input type="button" id="stud_sub" value="Submit " onClick={Handle_form}></input>
                        </div>
                    </div>
                   
                </div>
            </>
        )
    }


export default Other;