const express = require('express');
const path = require('path');
const Datastore = require('nedb')
// const bcrypt = require('bcrypt');
require('dotenv/config');

const db = new Datastore({filename: "data.db", autoload: true});
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port,()=>{
  console.log(`Server started on port ${port} at ${new Date().toString()}`);
});
app.use('/static',express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.sendFile(`${path.resolve()}/public/sites/index.html`);
});
app.get('/configure',(req,res)=>{
  res.sendFile(`${path.resolve()}/public/sites/setting.html`);
})
app.post('/configure',(req,res)=>{
  db.find({name:req.body.name},(err,databaseArray)=>{
    if(err) res.sendStatus(500);
    if(databaseArray.length >= 1){
      res.redirect('//localhost/configure?rename=true');
    } else {
      db.insert(req.body);
      res.end();
    }
  });
  //res.redirect('/');
})
app.get('/temp',(req,res)=>{
  res.sendFile(`${path.resolve()}/public/sites/temp.html`);
})
// app.post('/secret',(res))
