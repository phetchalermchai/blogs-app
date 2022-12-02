import {useState,useEffect} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal  from "sweetalert2"
import { authenticate, getUser } from "../services/authorize"
import {withRouter} from "react-router-dom"

const LoginComponent =(props)=>{
    const [State,setState] = useState({
        username:"",  
        password:""
      })
      const {username,password} = State

      const InputValue=name=>event=>{
        setState({...State,[name]:event.target.value})
      }

      const submitForm=(event)=>{
        event.preventDefault();
        axios.post(process.env.REACT_APP_API+"/login",{username,password}).
        then(response=>{
          //login สำเร็จ
          authenticate(response,()=>props.history.push("/create"))
        }).catch(err=>{
          Swal.fire(
            'แจ้งเตือน',
             err.response.data.error,
            'error'
          )
        })
      }
        useEffect(()=>{
            getUser() && props.history.push("/")
        },[])
        return(
            <div className="container p-5">
          <NavbarComponent/>
          <h1>เข้าสู่ระบบ | Admin</h1>
          <form onSubmit={submitForm}>
            <div className="form group">
                <label>Username</label>
                <input className="form-control" type="text" value={username} onChange={InputValue("username")}></input>
            </div>
            <div className="form group">
                <label>Password</label>
                <input className="form-control" type="password" value={password} onChange={InputValue("password")}></input>
            </div>
            <br></br>
            <input className="btn btn-primary" type="submit" value="เข้าสู่ระบบ"></input>
          </form>
        </div>
        )
}

export default  withRouter(LoginComponent)