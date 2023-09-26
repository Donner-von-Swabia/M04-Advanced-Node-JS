const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();


const dbURI="mongodb+srv://se09242001:test4@nodetuts.g7cmzow.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result)=>{
        console.log('connected db')
        app.listen(3000);
    })
    .catch((err)=>{
        console.log(err);
    })


app.set('view engine','ejs');

//app.listen(3000);

app.use(express.static('public'));

app.use(morgan('tiny'));

app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about a newer blog',
        body: ' more aboot a bog'
    });
    blog.save()
    .then((result) =>{
        res.send(result);}
    )
    .catch((err) =>{
        console.log(err);
    })
})
app.get('/all-blogs',(req,res) =>{
    Blog.find()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err);
    })
})
app.get('/single-blog',(req,res) =>{
    Blog.findById('6512481a8f8e2bdbd6b36fff')
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err);
    })
})
app.get ('/',(req,res) =>{
    res.redirect('/blogs');
});

app.get ('/about',(req,res) =>{
    res.render('about',{title:"Aboot"});
});
app.get('/blogs', (req,res) =>{
    Blog.find().sort({createdAd: -1})
        .then((result) =>{
            res.render('index',{title: 'All Blogs',blogs:result})
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get ('/blogs/create',(req,res) =>{
    res.render('create',{title:"Create"});
});

app.get('/about-me',(req,res) =>{
    res.status(301).render('about',{title:"About"});
});

app.use((req,res)=> {
    res.status(404).render('404',{title:"404"});
})