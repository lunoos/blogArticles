const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/articles');
const app = express();
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');




mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/blog' ,{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex : true})

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }))

app.get('/',  async (req, res) => {
     const articles = await Article.find().sort({
     	createdAt: 'desc'
    //res.send("nodemon is working");
    }); 
	res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 5000 , console.log("running on port 5000"));