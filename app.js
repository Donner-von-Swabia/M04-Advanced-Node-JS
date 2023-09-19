const express = require('express');

const app = express();

app.set('view engine','ejs');

app.listen(3000);

app.get ('/',(req,res) =>{
    const blogs = [
        {title:'Star Trek', snippet:'Wrath of Khan', body:'Live long and prosper'},
        {title:'Star Wars', snippet:'Revenge of the Sith', body:'May the force be with you'},
        {title:'Rick and morty', snippet:'Season 3', body:'Wabba lubba dubdub'},
    ]
    res.render('index',{title:"Homer",blogs});
});

app.get ('/about',(req,res) =>{
    res.render('about',{title:"Aboot"});
});

app.get ('/blogs/create',(req,res) =>{
    res.render('create',{title:"Create"});
});

app.get('/about-me',(req,res) =>{
    res.status(301).render('about',{title:"About"});
});

app.use((req,res)=> {
    res.status(404).render('404',{title:"404"});
})