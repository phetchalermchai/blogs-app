const express = require('express')
const router = express.Router()
const {create,getAllblogs,singleBlog,remove,update} = require("../controllers/blogController")
// เรียกใช้ แบบใหม่ expressjwt
const {expressjwt} = require("express-jwt");

// กำหนด การเข้าถึง API ผ่าน Token JWT (admin)
router.post("/create",
    expressjwt({ secret:process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty:"auth" }),
    create)

// บุคคลธรรมดาเข้าถึงได้โดยไม่ต้อง มี token
router.get("/blogs",getAllblogs)
router.get("/blog/:slug",singleBlog)

// กำหนด การเข้าถึง API ผ่าน Token JWT (admin)
router.delete("/blog/:slug",
    expressjwt({ secret:process.env.JWT_SECRET, 
    algorithms: ["HS256"],
    userProperty:"auth" }),
    remove)

router.put("/blog/:slug",
    expressjwt({ secret:process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty:"auth" }),
    update)


module.exports=router