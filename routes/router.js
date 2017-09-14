const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/",function(req, res){
    // models.post.findAll()
    // .then(function(posts){
       res.render("index",{
        //    console.log("post")
       })
    })
// })

router.get("/like",function(req, res){
    res.render("like")
})

router.get("/post",function(req, res){
    res.render("post")
})

router.get('/login',function(req,res){
    if (req.session && req.session.authenticated ){
        let user = models.user.find({
            where: {
                username: req.session.username,
                password: req.session.password
            }
        }).then(function(user){
            if (user) {
            req.session.username = req.body.username
            req.session.password = req.body.password
            let username = req.session.username
            let password = req.session.password

            res.render('index',{
                user: user
            })
         }
     })
 } else {
  res.redirect('register')
 }
})


router.post("/login" , function (req,res){
   let username = req.body.username
   let password = req.body.password

   models.user.findOne({
       where:{
           username:username,
           password:password
       }
   }).then(user => {
       if(user.password === password){
           req.session.username = username
           req.session.password = password
           req.session.authenticated = true;
           console.log(req.session);
           res.redirect('/')
       } else {
           res.redirect('/login')
           console.log('See login is working or not!')
       }
   })
})

router.post('/register',function(req, res){
    const user = models.user.build({
        username:req.body.username,
        password:req.body.password,
        confirm:req.body.confirmPassword
    })
    console.log(req.body)
    user.save()
    .then(function(user){
        req.username = user.username,
        req.password = user.password,
        req.confirm = user.confirmPassword

        res.redirect('login')
        console.log(res.session)
    })

})

router.post('/post',function(req,res){
    const post = models.post.build({
        title:req.body.title,
        message: req.body.message
    })
    post.save()
    .then(function(post){
        console.log(post)
    })
})

router.get('/post',function(req,res){
    models.post.find({
        where:{
            post:post,
            name:req.body,username
        }
    })
    .then(function(post){
        res.render('post',{
        })
    })
})

router.post('/',function(req,res){
    const post = models.post.build({
        title:req.body.title = req.session.title,
        message: req.body.message = req.session.message,
    })
    // console.log(req.session.post)

    post.save()
    res.redirect('/post')
})


router.post('/like',function(req,res){
    const like = models.like.build({
        like : true,
        userId : req.session.userId,
        postId : req.session.postId
    })
    like.save()
    .then(function(like){
        // console.log(like)
    })
})

router.get("/register" , function (req,res){
    res.render("register")
})






module.exports = router
