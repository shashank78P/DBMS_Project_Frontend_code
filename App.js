import React from "react";
import Admin from "./component/admin_folder/admin";
import Student from "./component/student/student_home";
import Teacher from "./component/teacher/teacher_home";
import Login from "./component/login";
import Student_details from "./component/details"
import Parent from "./component/add_user_component/parents_details";
import Edit from "./component/edit"
import { useNavigate } from "react-router-dom"
import { Link,BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import { prependOnceListener } from "process";
import Delete_user from "./component/delete";
import Add from "./component/add";
import Adds from "./component/add_t_a";
import Student_feeand_parent_details from "./component/get_fee_details";
// import Private from "./PrivateRoute/private";

// let authentication={
//   isLoggedIn:false,
//   onAuthentication(){
//     this.isLoggedIn=true;
//   },
//   getLogInStatus(){
//     return this.isLoggedIn;
//   }
// }

// function SecureRoute(props){
//   return(
//     <Route path="{props.path}" render={data=>authentication.getLogInStatus()?(
//       <props.component {...data}></props.component>):
//       (<Navigate to={{pathname:"/"}}></Navigate>)}></Route>
//     )
// }

const App = () => {
  return (
    <>
    <title>Tutorial Management System</title>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={
        <Admin/>
      } />
      <Route path="/teachers" element={
        <Teacher/>
      } />
      <Route path="/students" element={
        <Student/>
      } />
      <Route path="/details/:table" element={
        <Student_details/>
      } />
      <Route path="/details/fee/:table" element={
        <Student_feeand_parent_details/>
      } />
      {/* <Route path="/teacher_details/:table" element={
        <teacher_details/>
      } /> */}
      <Route path="/edit/:table/:id" element={
        <Edit/>
      } />
      <Route path="/delete/:table/:id" element={
        <Delete_user/>
      } />
      <Route path="/add/:table/" element={
        <Add />
      } />
      <Route path="/adds/:table/" element={
        <Adds />
      } />
      <Route path="/Contact" element={<h1>Contact</h1>} />
      <Route path="/*" element={<h1>error</h1>} />
    </Routes>
    </>
  )
}

export default App;