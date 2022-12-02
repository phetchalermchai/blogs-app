//ติดต่อฐานข้อมูล/ ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');


//บันทึกข้อมูล
exports.create = (req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    // ตรวจสอบความถูกต้องข้อมูล - validate
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break
        case !content:
            return res.status(400).json({error:"กรุณาป้อนชื่อเนื้อหาบทความ"})
            break
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })
}

    //ดึงข้อมูลบทความทั้งหมด

    exports.getAllblogs=(req,res)=>{
        Blogs.find({}).exec((err,blogs)=>{
            res.json(blogs)
        })
    }

//ดึงบทความที่สนใจอิงตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//การลบข้อมูลบทความ

exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err);
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

// update
exports.update=(req,res)=>{
    const {slug} = req.params
    // ส่งข้อมูล title , content , author
    const {title ,content,author} = req.body
    //กรณี slug เป็น ภาษาไทย
    let slug1 = slugify(title)
    if(!slug1)slug1=uuidv4();
    // ตรวจสอบความถูกต้องข้อมูล - validate
        switch(true){
            case !title:
                return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
                break
            case content === "<p><br></p>":
                return res.status(400).json({error:"กรุณาป้อนชื่อเนื้อหาบทความ"})
                break
        }
    Blogs.findOneAndUpdate({slug},{title,content,author,slug:slug1 },{new:true}).exec((err,blog)=>{
        if(err) res.status(400).json({error:"มีชื่อบทความซ้ำกัน"}) 
        res.json(blog)
    })
    
}