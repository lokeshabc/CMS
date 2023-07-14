const cors=require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const config=require('config')
const login=require('./routes/login');
const registers=require('./routes/registers')
const students=require('./routes/students')
const hostels=require('./routes/hostels')
const departments=require('./routes/departments')
const degrees =require('./routes/degrees')
const connect=require('./database/connectDB')
const express=require('express');
const app=express();
const PORT=process.env.PORT||7999



app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('views'));


app.set('view engine', 'ejs'); // specify the templating engine
app.set('views', path.join(__dirname, 'views')); // specify the views directory

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey is not defined')
    process.exit(1);
}
app.use(express.json());
app.use('/api/degrees',degrees)
app.use('/api/departments',departments)
app.use('/api/hostels',hostels)
app.use('/api/students',students)
app.use('/api/users',registers)
app.use('/login',login)
connect();




app.listen(PORT,()=>{
    console.log(`the app running sucessfully at port ${PORT}`);
})