const express = require('express');
const bodyParser = require('body-parser');
const mongoouse = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoouse.connect('mongodb+srv://alexia:OQ6iePmy0CwGyGpE@cluster0-abrvj.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('connect to database');
  })
  .catch(() => {
    console.log('connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Método responsável por setar os headers para evitar erro de cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

//Método responsável pelo post dos posts
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //save() é um método do mongoose que quando declarado irá criar a query adequada para se conectar com o banco por de baixo dos panos
  post.save();
  res.status(201).json({
    message: 'Post added successfuly!'
  });
});

//Método responsável por listar os posts
app.get('/api/posts', (req, res, next) => {

  //Conteúdo temporáriamente mocado por não ter um banco de dados
  const posts = [
    {
      id: '1',
      title: 'title 1',
      content: 'content 1 from server'
    },
    {
      id: '2',
      title: 'title 2',
      content: 'content 2 from server'
    },
    {
      id: '3',
      title: 'title 3',
      content: 'content 3 from server'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
