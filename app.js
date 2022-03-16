const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public' , express.static('public'));

var port = process.env.PORT || 2100;

const blog = require('./model/post');

const dbUri = 'mongodb+srv://admin:admin@cluster0.rcfse.mongodb.net/swc?retryWrites=true&w=majority';
mongoose.connect(dbUri , {userNewUrlParser : true , userUnifiedTopology : true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));



app.get('/' , (req,res)=>{

    blog.find({}).then((result)=>{
        console.log(result);
        res.render('home' , {result:result});
    }).catch((err)=>{
        res.render('error');
    })

})

app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    blog.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
        title: post.title,
        content: post.content
    });
  });
    
});

app.get('/contact' , (req,res)=>{

    res.render('contact');

})

app.get('/about' , (req,res)=>{

    res.render('about');

})

app.get('/compose' , (req,res)=>{

    res.render('compose');

})

app.post('/compose' , (req,res)=>{

    const blogPost = new blog({
        title: req.body.title,
        content: req.body.content
      });
    

      blogPost.save()
      .then((result)=>{
        res.redirect("/");
      })
      .catch((err) => {
          console.log('error' , err);
      })

})



app.listen(port);