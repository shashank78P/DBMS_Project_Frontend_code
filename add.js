import axios from "axios"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Add_Student from "./add_user_component/add_student"
import Parent from "./add_user_component/parents_details"
import Other from "./add_user_component/other_details"
import "./add.css"

const Add = () => {
    let [name, setName] = useState("")
    let [id, setid] = useState("")
    let [lname, setLNmae] = useState("")
    let [DOB, setDOB] = useState("")
    let [address, setAddress] = useState("")
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let [fatherName, setFatherName] = useState("")
    let [fatherPhone, setFatherPhone] = useState("")
    let [motherName, setMotherName] = useState("")
    let [MotherPhone, setMotherPhone] = useState("")
    let [parentEmail, setParentEmail] = useState("")
    let [PrevPerformance, setPrevPerformance] = useState("")
    let [parentIncome, setParentIncome] = useState("")
    let [batch, setbatch] = useState("")
    let [totalFee, setTotalFee] = useState("")
    let [PaidFee, setPaidFee] = useState("")
    let [BalanceFee, setBalanceFee] = useState("")
    let [deadline_pay, setDeadlinePay] = useState("")
    let [message, setMessage] = useState("")
    
    let [page, setPage] = useState(0);
    let [formData, setFormData] = useState({
        form_datails: {
            sid: "",
            name: "",
            lname: "",
            DOB: "",
            address: "",
            email: "",
            phone: 0,
            password: "",
            pid: "",
            fatherName: '',
            fatherPhone: 0,
            motherName: '',
            MotherPhone: 0,
            parentEmail: '',
            fid: "",
            parentIncome:"",
            PrevPerformance: "",
            batch: "",
            totalFee: 0,
            PaidFee: 0,
            BalanceFee: 0,
            deadline_pay: ""
        }
    })
    
    let [form_action,setFrmAction] = useState({
        first_form : false,
        second_form:false,
        other_form : false
    })
    console.log(formData)
    const table = useParams();
    console.log(table)
    const form_title = ['Student details', 'Parent details', 'other Details']
    function PageDisplay() {
        if (page === 0) {
            return <Add_Student formData={formData} setFormData={setFormData} table={table} setPage={setPage}/>;
        }
        if (page == 1) {
            return <Parent formData={formData} setFormData={setFormData} table={table} setPage={setPage}/>
        }
        if (page == 2) {
            return <Other formData={formData} setFormData={setFormData} table={table} setPage={setPage}/>
        }
    }
    return (
        <>
            <div className="student_frame">
                <div className="header">{form_title[page]}</div>
                <div className="body">
                    {PageDisplay()}
                </div>
                {/* <div className="footer">
                    <button onClick={() => {
                        setPage(page + 1);
                    }}>Submit</button>
                </div> */}
            </div>



        </>
    )
}

export default Add;