const express=require('express');
const path=require('path');

const app=express();
const PORT=3000;

app.set('view engine','ejs');

app.set('views',__dirname);

app.use(express.static(path.join(__dirname,'public')));

//This is the routs I will be put them in a seperate folder at a later stage

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  res.render('pages/Dashboard');
});


app.get('/sync-sessions', (req, res) => {
  res.render('pages/Sync&Sessions');
});
//starting the server
app.listen(PORT,()=>{
    console.log(`The server is currently running on  http://localhost:`+PORT)
})