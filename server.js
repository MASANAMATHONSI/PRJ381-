const express=require('express');
const path=require('path');

const app=express();
const PORT=3000;

app.set('view engine','ejs');

app.set('views',__dirname);

app.use(express.static(path.join(__dirname,'public')));

const telemetryRouter=require('./routers/telemetryRouter');
app.use('/',telemetryRouter)
//starting the server
app.listen(PORT,()=>{
    console.log(`The server is currently running on  http://localhost:`+PORT)
})