const express = require("express")
const router = express.Router()
const models = require("../models")
const session = require("express-session")


router.get("/",function(req, res){
    models.Post.findAll().then(function(post){
       res.render("index",{
           post:post
       })
    })
})

//render the page
router.get("/like",function(req, res){
    res.render("like")
})

router.get("/post",function(req, res){
    res.render("post")
})

router.get("/login",function(req,res){
    res.render("login")
})

// set login, if not a user redirect to register page
router.get('/login',function(req,res){
    if (req.session && req.session.authenticated ){
        let user = models.User.find({
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


// get login user info to check
router.post("/login" , function (req,res){
   let username = req.body.username
   let password = req.body.password

   models.User.findOne({
       where:{
           username:username,
           password:password
       }
   }).then(user => {
       if(user.password === password){
           req.session.username = username,
           req.session.password = password,
           req.session.authenticated = true
           console.log(req.session);
           res.redirect('/')
       } else {
           res.redirect('/register')
           console.log('See login is working or not!')
       }
   })
})

router.get("/register" , function (req,res){
    res.render("register")
})


// get register page for people create account
router.post('/register',function(req, res){
    const user = models.User.build({
        username:req.body.username,
        password:req.body.password,
        confirm:req.body.confirmPassword
    })
    console.log(user.username)

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
    const post = models.Post.build({
        post:req.body.post,
        title: req.body.title
    })

    post.save()
    .then(function(post){
        res.render('index')

    })
})


router.post('/like',function(req,res){
    const like = models.Like.build({
        like : true,
        userId : req.session.userId,
        postId : req.session.postId
    })
    like.save()
    .then(function(like){
        console.log(like)
    })
})

router.get('/like',function(req,res){
    models.Like.findAll({
        include:[{
            models:models.User,
        }]
    }).then(function(like){
        console.log(like)
        res.render('like',{
            like:like

        })
    })

})

// load each single post page
router.get('/post/:id',function(req,res){
    models.Post.findOne({_id:req.params.id})
    .then(function(post){
        res.render('edit',{
            post:post
        })
    })
})

// edit each single post page
// render the post page,but can't edit yet
router.get('/post/:id/edit',function(req, res){
    models.Post.findOne({_id:req.params.id})
    .then(function(post){
        post:post
    })
})

router.post('/post/edit',function(req,res){
    
})
//not working yet
router.post('/delete',function(req,res){
    models.Post.destory({
        where:{
            id:3
        },
        truncated:true
    }).then(function(){
        res.redirect('/')
    })
})

router.get('logout',function(req,res){
    res.session.destory(function(err){
        res.render('index')
    })
})


module.exports = router
