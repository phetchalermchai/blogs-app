import {useState} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUser,getToken } from "../services/authorize";



const FormConpoment = ()=>{
    const [State,setState] = useState({
      title:"",  
      author:getUser()
    })
    const {title,author} = State

    const [content,setContent] = useState("")

    //กำหนดค่าให้กับ state
    const InputValue=name=>event=>{
      setState({...State,[name]:event.target.value})
    }

    const submitContent =(event)=>{
        setContent(event)
    }

    const submitForm=(event)=>{
      event.preventDefault();
      console.log("API URL",process.env.REACT_APP_API);
      // url ที่ ส่งไปหา API
      axios.post(process.env.REACT_APP_API+"/create",
      //ข้อมูลที่ส่งไป
      {title,content,author},
      // header ที่ส่งไป (token)
      {headers:{authorization:"Bearer "+getToken()}}
      ).then(res=>{
        Swal.fire('แจ้งเตือน','บันทึกข้อมูลบทความเรียบร้อย','success')
        setState({...State,title:"",author:""})
        setContent("")
        
      }).catch(err=>{
        Swal.fire(
          'แจ้งเตือน',
           err.response.data.error,
          'error'
        )
      })
    }

 
    return (
        <div className="container p-5">
          <NavbarComponent/>
          <h1>เขียนบทความ</h1>
          <form onSubmit={submitForm}>
            <div className="form group">
                <label>ชื่อบทความ</label>
                <input className="form-control" type="text" value={title} onChange={InputValue("title")}></input>
            </div>
            <div className="form group">
                <label>รายละเอียด</label>
                <ReactQuill value={content}
                  onChange={submitContent}
                  theme="snow"
                  className="pb-3 mb-3"
                  placeholder="เขียนรายละเอียดบทความของคุณ"
                  style={{border:"1 px solid #666"}}>
                  </ReactQuill>
            </div>
            <div className="form group">
                <label>ผู้แต่ง</label>
                <input className="form-control" type="text" value={author} onChange={InputValue("author")}></input>
            </div>
            <br></br>
            <input className="btn btn-primary" type="submit" value="บันทึก"></input>
          </form>
        </div>
      );
}

export default FormConpoment