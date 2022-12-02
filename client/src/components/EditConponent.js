import {useState,useEffect} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getToken} from "../services/authorize";


const EditConponent = (props)=>{
    const [State,setState] = useState({
      title:"",
      author:"",
        slug:""
    })
    const {title,author,slug} = State
    const [content,setContent] = useState("")

    //ดึงบทความที่ต้องการแก้ไข
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`).then(response=>{
            const {title,content,author,slug} = response.data
            setState({...State,title,author,slug})
            setContent(content)
        }).catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm = ()=> (
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
                  style={{border:"1 px solid #666"}}
                  >
                  </ReactQuill>
            </div>
            <div className="form group">
                <label>ผู้แต่ง</label>
                <input className="form-control" type="text" value={author} onChange={InputValue("author")}></input>
            </div>
            <br></br>
            <input className="btn btn-primary" type="submit" value="อัพเดท" ></input>

          </form>
    )

//     //กำหนดค่าให้กับ state
    const InputValue=name=>event=>{
      setState({...State,[name]:event.target.value})
    }
    const submitContent =(event)=>{
      setContent(event)
  }

    const submitForm=(event)=>{
      event.preventDefault();

      console.log("API URL",process.env.REACT_APP_API);

      axios.put(process.env.REACT_APP_API+"/blog/"+slug,{title,content,author},
      {headers:{authorization:"Bearer "+getToken()}}
      ).then(res=>{
        Swal.fire({
          icon: 'warning' ,
          title: 'แจ้งเตือน',
          text: 'ต้องการอัพเดทบทความหรือไม่',
          showCancelButton: true,
          confirmButtonText: 'บันทึก',
          cancelButtonText: `ยกเลิก`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'แจ้งเตือน!',
              text: 'อัพเดทบทความเรียบร้อย',
              showConfirmButton: false,
              timer:2500
            })
            const {title,content,author,slug} = res.data
            setState ({...setState,title,author,slug})
            setContent(content)
            return setTimeout(() => {
              window.location.href ="/"
            }, 2500);
          } 
        })


        // Swal.fire({
        //  title: 'แจ้งเตือน',
        //  text: 'อัพเดทบทความเรียบร้อย',
        //  icon: 'success',
        //  showConfirmButton : false,
        //  timer : 2500
        // })
        
        
      }).catch(err=>{
          Swal.fire(
          'แจ้งเตือน',
           err.response.data.error,
          'error'
        )})
    }
    return (
        <div className="container p-5">
          <NavbarComponent/>
          <h1>แก้ไขบทความ</h1>
          {showUpdateForm()}
        </div>
      );
}

export default EditConponent